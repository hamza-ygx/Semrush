import type { Sql } from "@/lib/db";
import { bingConfigured, fetchBing } from "./bing";
import { fetchGa4, ga4Configured } from "./ga4";
import type { ProjectRow } from "./jobs";
import { runPagespeed } from "./psi";
import { logSourceError, storeSource } from "./sources";

export const ga4Property = (p: Pick<ProjectRow, "ga4_property">) => p.ga4_property ?? process.env.GA4_PROPERTY_ID ?? null;

export async function syncGa4(db: Sql, project: ProjectRow, by: string) {
  const property = ga4Property(project);
  if (!ga4Configured()) throw new Error("Google is not connected (GOOGLE_SERVICE_ACCOUNT_JSON missing)");
  if (!property) throw new Error("No GA4 property ID set (GA4_PROPERTY_ID)");
  try {
    const data = await fetchGa4(property);
    const datasets = await storeSource(db, project.id, "ga4", data, by);
    return { datasets, days: data.daily.length, pages: data.pages.length };
  } catch (e) {
    throw new Error(await logSourceError(db, project.id, "ga4", e, by));
  }
}

export async function runPsi(db: Sql, project: ProjectRow, by: string, extraPages = 0) {
  try {
    const home = `https://${project.domain}/`;
    const urls = [home];
    if (extraPages > 0) {
      const top = await db<{ url: string }[]>`
        select p.url from crawl_pages p join crawls c on c.id = p.crawl_id
        where c.project_id = ${project.id} and c.status = 'done' and p.status = 200 and p.url <> ${home}
          and c.started_at = (select max(started_at) from crawls where project_id = ${project.id} and status = 'done')
        order by p.depth, p.internal_links desc nulls last limit ${extraPages}`;
      urls.push(...top.map((t) => t.url));
    }
    const results = [];
    for (const url of urls) for (const strategy of ["mobile", "desktop"] as const) results.push(await runPagespeed(url, strategy));
    const datasets = await storeSource(db, project.id, "psi", { runs: results }, by);
    return { datasets, runs: results.length, mobileScore: results[0]?.scores.performance ?? null };
  } catch (e) {
    throw new Error(await logSourceError(db, project.id, "psi", e, by));
  }
}

export async function syncBing(db: Sql, project: ProjectRow, by: string) {
  if (!bingConfigured()) throw new Error("Bing is not connected (BING_WEBMASTER_API_KEY missing)");
  try {
    const data = await fetchBing(`https://${project.domain}/`);
    const datasets = await storeSource(db, project.id, "bing", data, by);
    return { datasets, linkedPages: data.linkCounts.length, links: data.links.length, queries: data.queries.length };
  } catch (e) {
    throw new Error(await logSourceError(db, project.id, "bing", e, by));
  }
}
