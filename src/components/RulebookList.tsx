import React from "react";
import { useRulebook } from "../hooks/useRulebook";

export default function RulebookList() {
  const { state } = useRulebook("seminole-2024");

  if (state.status === "loading") return <div>Loading rulebook…</div>;
  if (state.status === "error") return <div>Error: {state.error}</div>;

  // Build a lookup of rules by `categoryId` and normalize section id names
  const rules = state.rules.rules;
  const grouped = new Map<string, any[]>();
  for (const r of rules) {
    const key = r.categoryId || "";
    const arr = grouped.get(key) ?? [];
    arr.push(r);
    grouped.set(key, arr);
  }

  return (
    <section>
      {state.index.sections.map((section: any) => {
        const sectionId = section.id ?? section.sectionId;
        const sectionRules = grouped.get(sectionId) ?? [];
        return (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-bold">{section.title}</h2>
            {section.description && section.description.length > 0 && (
              <div className="mt-2 mb-4">
                {section.description.map((p, i) => (
                  <p key={i} className="mt-2 mb-2">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {sectionRules.length === 0 ? (
              <p className="text-sm text-gray-600">No rules in this section.</p>
            ) : (
              <ul>
                {sectionRules.map((r: any) => (
                  <li key={r.id} className="mb-4">
                    <strong>
                      {r.number ? `${r.number}. ` : ""}
                      {r.title}
                    </strong>
                    {r.text && r.text.length > 0 && (
                      <div>
                        {r.text.map((p: string, i: number) => (
                          <p key={i} className="mt-2 mb-6">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}
