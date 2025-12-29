export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed ${res.status} for ${url}. Body starts: ${text.slice(0, 80)}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON for ${url}, got ${contentType}. Body starts: ${text.slice(0, 80)}`);
  }

  return res.json() as Promise<T>;
}
