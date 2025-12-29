import { useEffect, useMemo, useRef, useState } from "react";
import { fetchJson } from "../utils/fetchJson";
import { searchRules, type SearchResult } from "../services/searchService";
import type { RulebookIndex, RulebookSectionData } from "../types/rulebook";

type Status = "idle" | "searching" | "done" | "error";

type State = {
  status: Status;
  query: string;
  results: SearchResult[];
  loadedSections: number;
  totalSections: number;
  error?: string;
};

export function useProgressiveSearch(params: {
  index: RulebookIndex | null;
  query: string;
  maxResults?: number;
}) {
  const { index, query, maxResults = 50 } = params;

  const [state, setState] = useState<State>(() => ({
    status: "idle",
    query,
    results: [],
    loadedSections: 0,
    totalSections: index ? index.sections.length : 0,
  }));

  // Cache loaded section data in-memory to avoid refetching on every query
  const cacheRef = useRef<Map<string, RulebookSectionData>>(new Map());

  // A "run id" to cancel in-flight work when query changes fast
  const runIdRef = useRef(0);

  // Merge + keep top N results globally
  const mergeTop = useMemo(() => {
    return (existing: SearchResult[], incoming: SearchResult[]) => {
      const combined = [...existing, ...incoming];
      combined.sort((a, b) => b.score - a.score);
      return combined.slice(0, maxResults);
    };
  }, [maxResults]);

  useEffect(() => {

    if (!index) {
    setState({
      status: "idle",
      query,
      results: [],
      loadedSections: 0,
      totalSections: 0,
    });
    return;
  }

    const q = query.trim();

    // Reset for empty query
    if (!q) {
      setState({
        status: "idle",
        query,
        results: [],
        loadedSections: 0,
        totalSections: index.sections.length,
      });
      return;
    }

    runIdRef.current += 1;
    const runId = runIdRef.current;

    setState((prev) => ({
      ...prev,
      status: "searching",
      query,
      results: [],
      loadedSections: 0,
      totalSections: index.sections.length,
      error: undefined,
    }));

    async function run() {
      let results: SearchResult[] = [];
      let loadedCount = 0;

      // 1) Search any cached sections first (instant)
      for (const meta of index!.sections) {
        const cached = cacheRef.current.get(meta.id);
        if (!cached) continue;

        loadedCount += 1;
        const hits = searchRules({
          rules: cached.rules,
          sectionId: meta.id,
          query: q,
          limit: maxResults,
        });

        results = mergeTop(results, hits);

        if (runIdRef.current !== runId) return; // cancelled
        setState((prev) => ({
          ...prev,
          status: "searching",
          results,
          loadedSections: loadedCount,
        }));
      }

      // 2) Load remaining sections progressively
      for (const meta of index!.sections) {
        if (cacheRef.current.has(meta.id)) continue;

        try {
          const section = await fetchJson<RulebookSectionData>(meta.path);
          cacheRef.current.set(meta.id, section);
          loadedCount += 1;

          const hits = searchRules({
            rules: section.rules,
            sectionId: meta.id,
            query: q,
            limit: maxResults,
          });

          results = mergeTop(results, hits);

          if (runIdRef.current !== runId) return; // cancelled
          setState((prev) => ({
            ...prev,
            status: "searching",
            results,
            loadedSections: loadedCount,
          }));
        } catch (e: any) {
          if (runIdRef.current !== runId) return;
          setState((prev) => ({
            ...prev,
            status: "error",
            error: e?.message ?? `Failed loading section ${meta.id}`,
          }));
          return;
        }
      }

      if (runIdRef.current !== runId) return;
      setState((prev) => ({ ...prev, status: "done", results, loadedSections: loadedCount }));
    }

    run();
  }, [index, query, maxResults, mergeTop]);

  return state;
}
