import { useState } from "react";
import { useRulebookIndex } from "../hooks/useRulebookIndex";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useProgressiveSearch } from "../hooks/useProgressiveSearch";
import SearchResultItem from "../components/SearchResultItem";
import SearchBar from "../components/SearchBar";

const RULEBOOK_SLUG = "seminole-2024";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 250);

  const indexState = useRulebookIndex(RULEBOOK_SLUG);

  const index = indexState.status === "ready" ? indexState.data : null;
  const searchState = useProgressiveSearch({
    index,
    query: debounced,
    maxResults: 50,
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Search</h1>

      <div className="mt-3">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search keywords (e.g., misdeal, all-in, showdown)…"
          isBusy={searchState.status === "searching"}
        />
        <div className="mt-2 text-sm text-slate-800 dark:text-slate-300">
          {searchState.status === "idle" &&
            "Type to search the entire rulebook."}

          {searchState.status === "searching" && (
            <>
              Searching… Loaded {searchState.loadedSections}/
              {searchState.totalSections} sections
            </>
          )}

          {searchState.status === "done" && (
            <>
              Loaded {searchState.loadedSections}/{searchState.totalSections}{" "}
              sections
            </>
          )}

          {searchState.status === "error" && (
            <span className="text-red-600">Error: {searchState.error}</span>
          )}
        </div>
      </div>

      <div className="mt-4">
        {debounced.trim() && (
          <div className="mb-2 text-sm text-slate-800 dark:text-slate-400">
            Results for{" "}
            <span className="font-semibold">“{debounced.trim()}”</span>:{" "}
            <span className="font-semibold">{searchState.results.length}</span>
          </div>
        )}

        <div className="space-y-3">
          {searchState.results.map((r) => (
            <SearchResultItem
              key={`${r.sectionId}::${r.ruleId}`}
              result={r}
              query={debounced}
            />
          ))}

          {debounced.trim() &&
            searchState.results.length === 0 &&
            searchState.status !== "searching" && (
              <div className="rounded-xl border p-4 text-slate-800 dark:text-slate-300">
                No matches found.
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
