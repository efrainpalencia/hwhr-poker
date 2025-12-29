import { useEffect, useState } from "react";
import { fetchJson } from "../utils/fetchJson";
import type { RulebookIndex } from "../types/rulebook";

type State =
  | { status: "loading" }
  | { status: "ready"; data: RulebookIndex }
  | { status: "error"; error: string };

export function useRulebookIndex(rulebookSlug: string) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: "loading" });
      try {
        // IMPORTANT: leading slash so this works under /rb/...
        const data = await fetchJson<RulebookIndex>(`/rules/${rulebookSlug}/index.json`);
        if (!cancelled) setState({ status: "ready", data });
      } catch (e: any) {
        if (!cancelled) setState({ status: "error", error: e?.message ?? "Failed to load rulebook index" });
      }
    }

    run();
    return () => { cancelled = true; };
  }, [rulebookSlug]);

  return state;
}
