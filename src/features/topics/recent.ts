const KEY = "rk-topic-research-recent";
const listeners = new Set<() => void>();
let cache: { raw: string | null; list: string[] } = { raw: null, list: [] };

function readRaw() {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function readRecent(): string[] {
  const raw = readRaw();
  if (raw !== cache.raw) {
    let list: string[] = [];
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) list = parsed.filter((x): x is string => typeof x === "string");
    } catch {
      list = [];
    }
    cache = { raw, list };
  }
  return cache.list;
}

export const emptyRecent: string[] = [];

export function subscribeRecent(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function addRecent(q: string) {
  const t = q.trim();
  if (!t) return;
  const next = [t, ...readRecent().filter((x) => x !== t)].slice(0, 10);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    return;
  }
  listeners.forEach((l) => l());
}
