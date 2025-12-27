import type { RulebookIndex, RulebookRules } from "../types/rulebookStorage";

export async function fetchRulebookIndex(rulebookSlug: string) {
  const res = await fetch(`/rules/${rulebookSlug}/index.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch index.json");
  return (await res.json()) as RulebookIndex;
}

export async function fetchRulebookRules(rulebookSlug: string) {
  const res = await fetch(`/rules/${rulebookSlug}/rules-general.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error("Failed to fetch rules.json");
  return (await res.json()) as RulebookRules;
}
