import { loadOrganicLive, qOf, type OrganicNeed, type SearchParams } from "@/features/organic/load";
import type { OrganicLive } from "@/features/organic/live";
import { buildDomainLive, type DomainLive } from "./live";

export type DomainLiveProps = { live: DomainLive | null; organic: OrganicLive | null; demo: boolean };

export async function loadDomainLive(searchParams: SearchParams, need: OrganicNeed = "base"): Promise<DomainLiveProps> {
  const { live, demo } = await loadOrganicLive(qOf((await searchParams).q), need);
  return { live: live && buildDomainLive(live), organic: live, demo };
}
