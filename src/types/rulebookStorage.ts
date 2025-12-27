import { get, set } from "idb-keyval";

export type RulebookIndex = {
  rulebookId: string;
  title: string;
  version: string;
  categories: { id: string; title: string; description: string[]}[];
};

export type Rule = {
  id: string;
  categoryId: string;
  number?: string;
  title: string;
  text: string[];
  tags?: string[];
};

export type RulebookRules = { rules: Rule[] };

const indexKey = (rb: string) => `rb:${rb}:index`;
const rulesKey = (rb: string) => `rb:${rb}:rules`;

export async function loadCachedRulebook(rb: string) {
  const [index, rules] = await Promise.all([
    get<RulebookIndex>(indexKey(rb)),
    get<RulebookRules>(rulesKey(rb)),
  ]);
  return { index, rules };
}

export async function saveCachedRulebook(rb: string, index: RulebookIndex, rules: RulebookRules) {
  await Promise.all([
    set(indexKey(rb), index),
    set(rulesKey(rb), rules),
  ]);
}
