import { cache } from "react";
import { liveRankHistory, liveSearch } from "@/lib/seo/live";
import { liveSemrush, type LiveSemrush } from "@/lib/seo/semrush";
import { backendEnabled } from "@/lib/auth/config";
import { buildOrganicLive, forView, type OrganicLive, type OrganicView, type RankHistory } from "./live";
import { applySemrush } from "./semrushLive";

export type OrganicLiveProps = { live: OrganicLive | null; demo: boolean };

export type OrganicNeed = "base" | "wide" | "history";

const CHUNK = 150;
const MAX_KEYWORDS = 1500;

async function historyFor(keywords: string[], domain: string | null, days: number): Promise<RankHistory | null> {
  const list = keywords.slice(0, MAX_KEYWORDS);
  const chunks = Array.from({ length: Math.ceil(list.length / CHUNK) }, (_, i) => list.slice(i * CHUNK, (i + 1) * CHUNK));
  const parts = await Promise.all(chunks.map((c) => liveRankHistory(c, domain, days)));
  if (parts.some((p) => !p)) return null;
  const out: RankHistory = new Map();
  for (const p of parts) for (const [k, v] of p!) out.set(k, v);
  return out;
}

const dbOf = (db: string | null | undefined) => {
  const v = db?.trim().toLowerCase();
  return v && /^[a-z-]{2,12}$/.test(v) && v !== "worldwide" ? v : "se";
};

export const loadSemrush = cache(async (q: string | null | undefined, db?: string | null): Promise<LiveSemrush | null> => {
  if (!backendEnabled) return null;
  try {
    return await liveSemrush(q?.trim() || null, dbOf(db));
  } catch {
    return null;
  }
});

export const loadOrganicLive = cache(async (q: string | null | undefined, need: OrganicNeed = "base", db?: string | null): Promise<OrganicLiveProps> => {
  if (!backendEnabled) return { live: null, demo: false };
  try {
    const domain = q?.trim() || null;
    const [sem, cur, wide] = await Promise.all([loadSemrush(q, db), liveSearch(domain), need === "base" ? null : liveSearch(domain, 56)]);
    const semTrend = !!(sem?.overview && sem.changes);
    const keywords = cur ? [...new Set([...cur.queries, ...(wide?.queries ?? [])].map((k) => k.query))] : [];
    const history = cur && need === "history" && !semTrend ? await historyFor(keywords, domain, 62) : null;
    const gsc = cur ? buildOrganicLive({ cur, wide, history }) : null;
    const live = sem ? applySemrush(sem, gsc) : gsc;
    return live ? { live, demo: false } : { live: null, demo: true };
  } catch {
    return { live: null, demo: true };
  }
});

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const qOf = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function organicProps(searchParams: SearchParams, need: OrganicNeed, view: OrganicView): Promise<OrganicLiveProps> {
  const sp = await searchParams;
  const { live, demo } = await loadOrganicLive(qOf(sp.q), need, qOf(sp.db));
  const mock = view === "header" || (view === "competitors" && !live?.competitors);
  return { live: live && forView(live, view), demo: demo || (mock && !!backendEnabled) };
}
