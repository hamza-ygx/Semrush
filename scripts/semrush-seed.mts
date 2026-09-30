import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import * as n from "../src/lib/seo/semrushNormalize";

const dir = new URL("../db/seed/semrush/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
const read = (f: string) => JSON.parse(readFileSync(new URL(f, dir), "utf8")) as { data: n.Raw[] | null; fetched_at: string; params: Record<string, unknown> };
const rows = (f: string) => (files.includes(f) ? (read(f).data ?? []) : []);
const at = (f: string) => read(f).fetched_at;

const out: { domain: string; database: string; source: string; datasets: Partial<Record<n.SemrushDataset, { fetched_at: string; rows: unknown[] }>> } = { domain: "www.rkjh.se", database: "se", source: "semrush-mcp", datasets: {} };
const put = (name: n.SemrushDataset, file: string, map: (r: n.Raw) => unknown) => {
  if (!files.includes(file)) return;
  out.datasets[name] = { fetched_at: at(file), rows: rows(file).map(map) };
};
put("overview", "domain_overview__domain_rank__rkjh-se_se.json", (r) => n.overview(r, "se"));
put("overviewAll", "domain_overview__domain_ranks__rkjh-se_all-databases.json", (r) => n.overview(r, ""));
put("history", "domain_overview__resource_rank_history__rkjh-se_se_monthly.json", n.history);
put("keywords", "organic_research__resource_organic__rkjh-se_se_all.json", n.keyword);
put("pages", "organic_research__resource_organic_unique__rkjh-se_se_pages.json", n.page);
put("subdomains", "organic_research__domain_organic_subdomains__rkjh-se_se.json", n.page);
put("competitors", "competitors_research__domain_organic_organic__rkjh-se_se.json", n.competitor);
put("gap", "competitors_research__domain_domains__rkjh-se_vs_top3_union_se.json", n.gap);
put("backlinksOverview", "backlinks_research__backlinks_overview__rkjh-se_root.json", n.backlinksOverview);
put("backlinks", "backlinks_research__backlinks__rkjh-se_root_all-columns.json", n.backlink);
put("refdomains", "backlinks_research__backlinks_refdomains__rkjh-se_root.json", n.refDomain);
put("backlinksHistory", "backlinks_research__backlinks_historical__rkjh-se_root_monthly.json", n.backlinksHistory);
const kwFiles = files.filter((f) => f.startsWith("keyword_research__phrase_these"));
if (kwFiles.length) out.datasets.keywordMetrics = { fetched_at: at(kwFiles[0]), rows: kwFiles.flatMap((f) => rows(f).map(n.keywordMetrics)) };
const changeFiles = (["new", "lost", "rise", "fall"] as const).map((c) => [c, `organic_research__resource_organic__rkjh-se_se_positions-${c}.json`] as const).filter(([, f]) => files.includes(f));
if (changeFiles.length) out.datasets.changes = { fetched_at: at(changeFiles[0][1]), rows: changeFiles.flatMap(([c, f]) => rows(f).map((r) => ({ ...n.keyword(r), change: c }))) };

writeFileSync(new URL("../db/seed/semrush.json", import.meta.url), JSON.stringify(out));
console.log(Object.entries(out.datasets).map(([k, v]) => `${k}: ${v!.rows.length}`).join(", "));
