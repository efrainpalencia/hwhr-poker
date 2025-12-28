import type { RulebookIndex, RulebookRules } from "../types/rulebookStorage";

export async function fetchRulebookIndex(rulebookSlug: string) {
  const res = await fetch(`/rules/${rulebookSlug}/index.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch index.json");
  return (await res.json()) as RulebookIndex;
}

export async function loadSection(path: string) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to fetch section at ${path}`);
  return res.json();
}

// Fetch all sections for a rulebook. Optionally accepts a pre-fetched index
export async function fetchRulebookRules(rulebookSlug: string, index?: RulebookIndex) {
  const idx = index ?? (await fetchRulebookIndex(rulebookSlug));

  // Fetch sections independently and tolerate individual failures so one
  // bad file doesn't prevent loading other sections.
  const sections: any[] = [];
  for (const s of idx.sections) {
    try {
      const res = await fetch(s.path, { cache: "no-cache" });
      if (!res.ok) {
        // log and skip this section
        // eslint-disable-next-line no-console
        console.warn(`Failed to fetch section ${s.path}: ${res.status}`);
        continue;
      }
      const body = await res.json();
      sections.push(body);
    } catch (err: any) {
      // log and continue
      // eslint-disable-next-line no-console
      console.warn(`Error fetching section ${s.path}:`, err?.message ?? err);
    }
  }

  const rules = sections.flatMap((sec: any) => sec.rules || []);
  return { rules } as RulebookRules;
}
