import { Link } from "react-router";
import type { SearchResult } from "../services/searchService";
import HighlightText from "./HighlightText"; // <- your existing component

type Props = {
  result: SearchResult;
  query: string;
};

export default function SearchResultItem({ result, query }: Props) {
  return (
    <Link
      to={`/rule/${encodeURIComponent(result.ruleId)}`}
      className="block rounded-2xl border p-4 hover:bg-slate-50"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-semibold">
          {result.number ? `${result.number}. ` : ""}
          {result.title}
        </div>
        <div className="text-xs text-slate-500">{result.sectionId}</div>
      </div>

      <p className="mt-2 text-sm text-slate-700">
        <HighlightText text={result.snippet} query={query} />
      </p>
    </Link>
  );
}
