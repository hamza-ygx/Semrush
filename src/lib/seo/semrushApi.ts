import type { Sql } from "@/lib/db";
import * as n from "./semrushNormalize";

export const semrushConfigured = () => Boolean(process.env.SEMRUSH_API_KEY);

function parseCsv(text: string): n.Raw[] {
  const lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
  if (lines.length < 2) return [];
  const head = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const cells = line.split(";");
    return Object.fromEntries(head.map((h, i) => [h, cells[i]?.replace(/^"|"$/g, "")]));
  });
}

async function call(base: "standard" | "backlinks", params: Record<string, string | number>) {
  const key = process.env.SEMRUSH_API_KEY;
  if (!key) throw new Error("SEMRUSH_API_KEY is not set");
  const url = new URL(base === "standard" ? "https://api.semrush.com/" : "https://api.semrush.com/analytics/v1/");
  url.search = new URLSearchParams({ key, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) }).toString();
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const text = await res.text();
  if (/^ERROR 50 ::/.test(text)) return [];
  if (/^ERROR/.test(text) || !res.ok) throw new Error(`Semrush ${params.type}: ${text.slice(0, 120).trim() || res.status}`);
  return parseCsv(text);
}

export async function fetchSemrush(domain: string, database: string) {
  const root = domain.replace(/^www\./, "");
  const d: Partial<{ [K in n.SemrushDataset]: n.SemrushDatasets[K] }> = {};
  d.overview = (await call("standard", { type: "domain_rank", domain: root, database, export_columns: "Dn,Rk,Or,Ot,Oc,Ad,At,Ac" })).map((r) => n.overview(r, database));
  d.overviewAll = (await call("standard", { type: "domain_ranks", domain: root, export_columns: "Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac" })).map((r) => n.overview(r, ""));
  d.history = (await call("standard", { type: "domain_rank_history", domain: root, database, display_limit: 24, display_sort: "dt_desc", export_columns: "Rk,Or,Ot,Oc,Ad,At,Ac,Dt" })).map(n.history).reverse();
  const total = d.overview[0]?.traffic ?? 0;
  d.keywords = (await call("standard", { type: "domain_organic", domain: root, database, display_limit: 500, display_sort: "tr_desc", export_columns: "Ph,Po,Pp,Pd,Nq,Kd,Cp,Ur,Tr,Tc,Co,Nr,Td,In,Fk,Fp,Ts" }))
    .map(n.keyword)
    .map((k) => ({ ...k, traffic: k.traffic ?? (k.trafficPct !== null ? Math.round((k.trafficPct * total) / 100) : null) }));
  d.pages = (await call("standard", { type: "domain_organic_unique", domain: root, database, display_limit: 200, export_columns: "Ur,Pc,Tg,Tr" })).map(n.page);
  d.competitors = (await call("standard", { type: "domain_organic_organic", domain: root, database, display_limit: 50, export_columns: "Dn,Cr,Np,Or,Ot,Oc,Ad" })).map(n.competitor);
  const target = { target: root, target_type: "root_domain" };
  d.backlinksOverview = (await call("backlinks", { type: "backlinks_overview", ...target, export_columns: "ascore,total,domains_num,urls_num,ips_num,ipclassc_num,follows_num,nofollows_num,sponsored_num,ugc_num,texts_num,images_num,forms_num,frames_num" })).map(n.backlinksOverview);
  d.backlinks = (await call("backlinks", { type: "backlinks", ...target, display_limit: 300, export_columns: "page_ascore,source_title,source_url,target_url,anchor,external_num,internal_num,first_seen,last_seen,nofollow,image,sitewide,newlink,lostlink,response_code" })).map(n.backlink);
  d.refdomains = (await call("backlinks", { type: "backlinks_refdomains", ...target, display_limit: 300, export_columns: "domain_ascore,domain,backlinks_num,country,first_seen,last_seen" })).map(n.refDomain);
  d.backlinksHistory = (await call("backlinks", { type: "backlinks_historical", ...target, display_limit: 24 })).map(n.backlinksHistory);
  return d;
}

export async function syncSemrush(db: Sql, project: { id: string; domain: string }, by: string, database = "se") {
  try {
    const data = await fetchSemrush(project.domain, database);
    const now = new Date().toISOString();
    let count = 0;
    for (const [dataset, rows] of Object.entries(data)) {
      if (!rows || (!rows.length && dataset !== "backlinks")) continue;
      await db`insert into semrush_data (project_id, dataset, database, fetched_at, source, rows) values (${project.id}, ${dataset}, ${database}, ${now}, 'semrush-api', ${db.json(rows as never)}) on conflict do nothing`;
      count++;
    }
    await db`insert into semrush_syncs (project_id, datasets, synced_by) values (${project.id}, ${count}, ${by})`;
    return { datasets: count, keywords: data.keywords?.length ?? 0, backlinks: data.backlinks?.length ?? 0 };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Semrush sync failed";
    await db`insert into semrush_syncs (project_id, error, synced_by) values (${project.id}, ${message.slice(0, 500)}, ${by})`;
    throw e;
  }
}
