import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchJson } from "../utils/fetchJson";
import type {
  Rule,
  RulebookIndex,
  RulebookSectionData,
} from "../types/rulebook";

const RULEBOOK_SLUG = "seminole-2024";

type State =
  | { status: "loading" }
  | { status: "ready"; rule: Rule; sectionTitle: string }
  | { status: "not-found" }
  | { status: "error"; error: string };

export default function RuleDetailPage() {
  const { ruleId } = useParams();

  const decodedRuleId = useMemo(() => {
    try {
      return decodeURIComponent(ruleId ?? "");
    } catch {
      return ruleId ?? "";
    }
  }, [ruleId]);

  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!decodedRuleId) {
        setState({ status: "not-found" });
        return;
      }

      setState({ status: "loading" });

      try {
        const index = await fetchJson<RulebookIndex>(
          `/rules/${RULEBOOK_SLUG}/index.json`
        );

        for (const meta of index.sections) {
          const section = await fetchJson<RulebookSectionData>(meta.path);
          const found = section.rules.find((r) => r.id === decodedRuleId);

          if (found) {
            if (!cancelled)
              setState({
                status: "ready",
                rule: found,
                sectionTitle: section.title,
              });
            return;
          }
        }

        if (!cancelled) setState({ status: "not-found" });
      } catch (e: any) {
        if (!cancelled)
          setState({
            status: "error",
            error: e?.message ?? "Failed to load rule",
          });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [decodedRuleId]);

  if (state.status === "loading") {
    return <div className="p-4">Loading rule…</div>;
  }

  if (state.status === "error") {
    return (
      <div className="p-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {state.error}
        </div>
        <div className="mt-3">
          <Link className="underline" to="/search">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <div className="p-4">
        <div className="rounded-xl border p-4 text-slate-700">
          Rule not found: <span className="font-mono">{decodedRuleId}</span>
        </div>
        <div className="mt-3">
          <Link className="underline" to="/search">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const { rule, sectionTitle } = state;

  return (
    <div className="p-2">
      <div className="mb-3">
        <Link className="text-sm underline" to="/search">
          ← Back to search
        </Link>
      </div>

      <div className="rounded-2xl border p-4 bg-white dark:bg-slate-950">
        <div className="text-xs text-slate-500">
          {sectionTitle}
          {rule.number ? ` • Rule ${rule.number}` : ""}
        </div>

        <h1 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
          {rule.title}
        </h1>

        <div className="mt-4 space-y-3">
          {rule.text.map((p, i) => (
            <p key={i} className="text-slate-800 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {rule.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {rule.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border px-2 py-1 text-xs text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
