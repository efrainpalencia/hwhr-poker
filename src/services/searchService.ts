import type { Rule } from "../types/rulebook";

export type SearchResult = {
  ruleId: string;
  sectionId: string;
  number?: string;
  title: string;
  snippet: string;
  score: number;
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function makeHaystack(rule: Rule): string {
  const tags = rule.tags?.join(" ") ?? "";
  return normalize([rule.title, rule.number ?? "", rule.text.join(" "), tags].join(" "));
}

function scoreRule(rule: Rule, q: string): { score: number; snippet: string } | null {
  const query = normalize(q);
  if (!query) return null;

  const titleN = normalize(rule.title);
  const textN = normalize(rule.text.join(" "));
  const tagsN = normalize((rule.tags ?? []).join(" "));
  const haystack = `${titleN} ${textN} ${tagsN}`;

  const idx = haystack.indexOf(query);
  if (idx < 0) return null;

  let score = 0;

  // Simple ranking:
  if (titleN.includes(query)) score += 20;
  if (tagsN.includes(query)) score += 10;
  if (textN.includes(query)) score += 5;

  // Boost if title starts with query
  if (titleN.startsWith(query)) score += 10;

  // Small boost for shorter distance to front
  score += Math.max(0, 10 - Math.floor(idx / 80));

  // Snippet from original (human readable)
  const full = rule.text.join(" ");
  const lowerFull = full.toLowerCase();
  const i = lowerFull.indexOf(query);
  const start = Math.max(0, i - 60);
  const end = Math.min(full.length, i + query.length + 80);
  const snippet = (start > 0 ? "…" : "") + full.slice(start, end) + (end < full.length ? "…" : "");

  return { score, snippet };
}

export function searchRules(params: {
  rules: Rule[];
  sectionId: string;
  query: string;
  limit?: number;
}): SearchResult[] {
  const { rules, sectionId, query, limit = 50 } = params;
  const q = normalize(query);
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const rule of rules) {
    const hit = scoreRule(rule, q);
    if (!hit) continue;

    results.push({
      ruleId: rule.id,
      sectionId,
      number: rule.number,
      title: rule.title,
      snippet: hit.snippet,
      score: hit.score,
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
