import { cache } from "react";
import { liveRankHistory, liveSearch } from "@/lib/seo/live";
import { supabaseEnv } from "@/lib/supabase/env";
import { buildOrganicLive, forView, type OrganicLive, type OrganicView, type RankHistory } from "./live";

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

export const loadOrganicLive = cache(async (q: string | null | undefined, need: OrganicNeed = "base"): Promise<OrganicLiveProps> => {
  if (!supabaseEnv) return { live: null, demo: false };
  try {
    const domain = q?.trim() || null;
    const [cur, wide] = await Promise.all([liveSearch(domain), need === "base" ? null : liveSearch(domain, 56)]);
    if (!cur) return { live: null, demo: true };
    const keywords = [...new Set([...cur.queries, ...(wide?.queries ?? [])].map((k) => k.query))];
    const history = need === "history" ? await historyFor(keywords, domain, 62) : null;
    return { live: buildOrganicLive({ cur, wide, history }), demo: false };
  } catch {
    return { live: null, demo: true };
  }
});

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const qOf = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function organicProps(searchParams: SearchParams, need: OrganicNeed, view: OrganicView): Promise<OrganicLiveProps> {
  const { live, demo } = await loadOrganicLive(qOf((await searchParams).q), need);
  return { live: live && forView(live, view), demo: demo || (view === "header" && !!supabaseEnv) };
}
