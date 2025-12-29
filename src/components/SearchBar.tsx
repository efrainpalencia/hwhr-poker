type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isBusy?: boolean; // optional: show "searching" state
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  isBusy = false,
}: Props) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 pr-24 text-base"
        autoCapitalize="none"
        autoCorrect="off"
      />

      {/* Right-side actions */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isBusy && <span className="text-xs text-slate-500">Searching…</span>}

        {value.trim().length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-lg border px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
