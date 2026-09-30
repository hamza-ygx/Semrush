import { loadOrganicLive, loadSemrush, qOf, type OrganicNeed, type SearchParams } from "@/features/organic/load";
import type { OrganicLive } from "@/features/organic/live";
import type { LiveSemrush } from "@/lib/seo/semrush";
import { buildDomainLive, type DomainLive } from "./live";

export type DomainLiveProps = { live: DomainLive | null; organic: OrganicLive | null; sem: LiveSemrush | null; demo: boolean };

export async function loadDomainLive(searchParams: SearchParams, need: OrganicNeed = "base"): Promise<DomainLiveProps> {
  const sp = await searchParams;
  const q = qOf(sp.q);
  const db = qOf(sp.db);
  const [{ live, demo }, sem] = await Promise.all([loadOrganicLive(q, need, db), loadSemrush(q, db)]);
  return { live: live && buildDomainLive(live, sem), organic: live, sem, demo };
}
