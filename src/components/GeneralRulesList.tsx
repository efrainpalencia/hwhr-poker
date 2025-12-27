import React from "react";
import { useRulebook } from "../hooks/useRulebook";

type Props = { rulebookSlug: string };

export default function GeneralRulesList({ rulebookSlug }: Props) {
  const { state } = useRulebook(rulebookSlug);

  if (state.status === "loading") return <div>Loading general rules…</div>;
  if (state.status === "error") return <div>Error: {state.error}</div>;

  const rules = state.rules.rules;
  // Find a matching category in the index. Try exact id match first, then title heuristic.
  const categories = (state as any).index?.categories as
    | { id: string; title: string; description?: string[] }[]
    | undefined;
  const category =
    categories?.find((c) => c.id === "general") ||
    categories?.find((c) => c.title.toLowerCase().includes("general"));
  const description = category?.description ?? [];

  return (
    <section>
      <h2>{category?.title || "General Rules"}</h2>
      {description.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          {description.map((p, i) => (
            <p key={i} style={{ margin: 6, whiteSpace: "pre-wrap" }}>
              {p}
            </p>
          ))}
        </div>
      )}
      <ul>
        {rules.map((r) => (
          <li key={r.id} style={{ marginBottom: 16 }}>
            <strong>
              {r.number ? `${r.number}. ` : ""}
              {r.title}
            </strong>
            {r.text && r.text.length > 0 && (
              <div style={{ marginTop: 6 }}>
                {r.text.map((p, i) => (
                  <p key={i} style={{ margin: 4, whiteSpace: "pre-wrap" }}>
                    {p}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
