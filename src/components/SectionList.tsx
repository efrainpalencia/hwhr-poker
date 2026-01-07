import React, { useState } from "react";
import { Link } from "react-router";
import { useRulebook } from "../hooks/useRulebook";

export default function SectionList() {
  const { state } = useRulebook("seminole-2024");
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (state.status === "loading") return <div>Loading rulebook…</div>;
  if (state.status === "error") return <div>Error: {state.error}</div>;

  const rules = state.rules.rules;
  const grouped = new Map<string, any[]>();
  for (const r of rules) {
    const key = r.categoryId || "";
    const arr = grouped.get(key) ?? [];
    arr.push(r);
    grouped.set(key, arr);
  }

  function toggleSection(id: string) {
    setOpenSection((prev) => (prev === id ? null : id));
  }

  return (
    <section>
      {state.index.sections.map((section: any) => {
        const sectionId = section.id ?? section.sectionId;
        const sectionRules = grouped.get(sectionId) ?? [];
        const isOpen = openSection === sectionId;
        const panelId = `section-panel-${sectionId}`;

        return (
          <div key={sectionId} className="mb-6">
            <button
              onClick={() => toggleSection(sectionId)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-3 bg-white rounded-md dark:bg-slate-950"
            >
              <div>
                <div className="text-lg font-semibold">{section.title}</div>
              </div>
              <div className="ml-4 text-slate-800 dark:text-slate-300">
                {isOpen ? "−" : "+"}
              </div>
            </button>

            <div id={panelId} hidden={!isOpen} className="mt-3 pl-3">
              {section.description && section.description.length > 0 && (
                <div className="text-sm text-slate-800 dark:text-slate-300 mb-3">
                  {section.description.map((p: string, i: number) => (
                    <p key={i} className="mt-1">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {sectionRules.length === 0 ? (
                <p className="text-sm text-slate-800 dark:text-slate-300">
                  No rules in this section.
                </p>
              ) : (
                <ul className="space-y-2">
                  {sectionRules.map((r: any) => (
                    <li key={r.id}>
                      <Link
                        to={`/rule/${encodeURIComponent(r.id)}`}
                        className="block rounded-md p-2 hover:bg-slate-50"
                      >
                        <div className="font-medium">
                          {r.number ? `${r.number}. ` : ""}
                          {r.title}
                        </div>
                        {r.text && r.text.length > 0 && (
                          <div className="text-sm text-slate-800 dark:text-slate-300 mt-1 line-clamp-2">
                            {r.text[0]}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
