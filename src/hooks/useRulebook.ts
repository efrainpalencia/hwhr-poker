import { useEffect, useMemo, useState } from "react";
import { fetchRulebookIndex, fetchRulebookRules } from "../api/rulebookApi";
import { loadCachedRulebook, saveCachedRulebook, type RulebookIndex, type RulebookRules } from "../types/rulebookStorage";

type State =
  | { status: "loading"; index?: RulebookIndex; rules?: RulebookRules }
  | { status: "ready"; index: RulebookIndex; rules: RulebookRules }
  | { status: "error"; error: string; index?: RulebookIndex; rules?: RulebookRules };

export function useRulebook(rulebookSlug: string) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      // 1) Load from IndexedDB first (instant UI)
      const cached = await loadCachedRulebook(rulebookSlug);
      if (!cancelled && cached.index && cached.rules) {
        setState({ status: "ready", index: cached.index, rules: cached.rules });
      } else if (!cancelled) {
        setState({ status: "loading" });
      }

      // 2) Fetch latest in background (SW will usually satisfy this fast)
      try {
        const [freshIndex, freshRules] = await Promise.all([
          fetchRulebookIndex(rulebookSlug),
          fetchRulebookRules(rulebookSlug),
        ]);

        if (cancelled) return;

        // Only update state if content changed (cheap check)
        const cachedVersion = cached.index?.version;
        if (cachedVersion !== freshIndex.version) {
          setState({ status: "ready", index: freshIndex, rules: freshRules });
        } else if (!cached.index || !cached.rules) {
          // first-time load
          setState({ status: "ready", index: freshIndex, rules: freshRules });
        }

        // Persist
        await saveCachedRulebook(rulebookSlug, freshIndex, freshRules);
      } catch (e: any) {
        if (cancelled) return;

        // If we had cached data, keep showing it; otherwise show error
        if (cached.index && cached.rules) {
          setState((prev) => prev.status === "ready" ? prev : { status: "ready", index: cached.index!, rules: cached.rules! });
        } else {
          setState({ status: "error", error: e?.message ?? "Failed to load rulebook" });
        }
      }
    }

    boot();
    return () => { cancelled = true; };
  }, [rulebookSlug]);

  // Optional: Build a quick lookup map for fast rule detail page access
  const ruleById = useMemo(() => {
    if (state.status !== "ready") return new Map<string, any>();
    return new Map(state.rules.rules.map((r) => [r.id, r]));
  }, [state]);

  return { state, ruleById };
}