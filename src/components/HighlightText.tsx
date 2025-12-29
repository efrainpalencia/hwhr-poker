type Props = {
  text: string;
  query: string;
};

export default function HighlightText({ text, query }: Props) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  const lower = text.toLowerCase();
  const lowerQ = q.toLowerCase();

  const parts: Array<{ str: string; hit: boolean }> = [];
  let i = 0;

  while (true) {
    const idx = lower.indexOf(lowerQ, i);
    if (idx === -1) {
      parts.push({ str: text.slice(i), hit: false });
      break;
    }
    if (idx > i) parts.push({ str: text.slice(i, idx), hit: false });
    parts.push({ str: text.slice(idx, idx + q.length), hit: true });
    i = idx + q.length;
  }

  return (
    <>
      {parts.map((p, n) =>
        p.hit ? (
          <mark key={n} className="rounded px-1">
            {p.str}
          </mark>
        ) : (
          <span key={n}>{p.str}</span>
        )
      )}
    </>
  );
}
