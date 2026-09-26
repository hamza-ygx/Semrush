import type { CheckId } from "@/lib/seo/checks";
import type { LiveAudit } from "@/lib/seo/live";
import { issues as mockIssues, type CrawledRow, type Dir, type Issue, type Severity } from "./part1/data";
import { C, issueId } from "./part2/data";

type Spec = { name: string; unit: [string, string]; text: [string, string]; cats: string[]; category: string; fix?: string; label?: string; cols?: [string, string] };

const pg: [string, string] = ["page", "pages"];

export const checkSpecs: Record<CheckId, Spec> = {
  http4xx: { name: "4xx errors", unit: pg, text: ["returned 4XX status code", "returned 4XX status code"], cats: ["Crawlability", "HTTP Status"], category: "HTTP Status", label: "Status code", cols: ["Page URL", "HTTP Status Code"] },
  http5xx: {
    name: "5xx errors",
    unit: pg,
    text: ["returned 5XX status code", "returned 5XX status code"],
    cats: ["Crawlability", "HTTP Status"],
    category: "HTTP Status",
    fix: "Investigate why the server fails for these URLs. Check the server logs, fix the application errors and make sure the server has enough resources.",
    label: "Status code",
    cols: ["Page URL", "HTTP Status Code"],
  },
  brokenInternalLink: { name: "Broken internal links", unit: ["internal link", "internal links"], text: ["is broken", "are broken"], cats: ["Crawlability", "Links"], category: "Links", label: "Broken link", cols: ["Broken Link URL", "HTTP Status Code"] },
  duplicateTitle: {
    name: "Duplicate title tags",
    unit: pg,
    text: ["has a duplicate title tag", "have duplicate title tags"],
    cats: ["Meta tags", "Duplicates"],
    category: "Meta tags",
    fix: "Give every page a unique, concise title that describes its content.",
    label: "Title",
    cols: ["Page URL", "Title"],
  },
  duplicateDescription: {
    name: "Duplicate meta descriptions",
    unit: pg,
    text: ["has a duplicate meta description", "have duplicate meta descriptions"],
    cats: ["Meta tags", "Duplicates"],
    category: "Meta tags",
    fix: "Write a unique meta description for every page.",
    label: "Description",
    cols: ["Page URL", "Description"],
  },
  missingTitle: {
    name: "Missing title tags",
    unit: pg,
    text: ["doesn't have a title tag", "don't have title tags"],
    cats: ["Meta tags"],
    category: "Meta tags",
    fix: "Add a unique, concise title tag with relevant keywords to every page.",
  },
  fetchFailed: {
    name: "Pages not crawled",
    unit: pg,
    text: ["couldn't be crawled", "couldn't be crawled"],
    cats: ["Crawlability"],
    category: "Crawlability",
    fix: "Make sure these URLs respond quickly and that your server doesn't block or drop the connection.",
    label: "Error",
    cols: ["Page URL", "Error"],
  },
  missingDescription: { name: "Missing meta description", unit: pg, text: ["doesn't have a meta description", "don't have meta descriptions"], cats: ["Meta tags", "Content"], category: "Meta tags" },
  missingH1: { name: "Missing h1", unit: pg, text: ["doesn't have an h1 heading", "don't have an h1 heading"], cats: ["Meta tags"], category: "Meta tags" },
  titleTooLong: { name: "Long title element", unit: pg, text: ["has too much text within the title tags", "have too much text within the title tags"], cats: ["Meta tags"], category: "Meta tags", label: "Title length", cols: ["Page URL", "Title length"] },
  lowWordCount: { name: "Low word count", unit: pg, text: ["has a low word count", "have a low word count"], cats: ["Content", "AI Search"], category: "Content", label: "Word count", cols: ["Page URL", "Word count"] },
  missingAlt: {
    name: "Missing ALT attributes",
    unit: pg,
    text: ["has images without alt attributes", "have images without alt attributes"],
    cats: ["Content"],
    category: "Content",
    fix: "Add a short alt text that describes the image to every meaningful image.",
    label: "Images without alt",
    cols: ["Page URL", "Images without alt"],
  },
  slowPage: { name: "Slow page (HTML) load speed", unit: pg, text: ["has slow load speed", "have slow load speed"], cats: ["Site Performance"], category: "Site Performance", label: "Load time", cols: ["Page URL", "Load time"] },
  temporaryRedirect: {
    name: "Temporary redirects",
    unit: pg,
    text: ["has a temporary redirect", "have temporary redirects"],
    cats: ["Crawlability", "HTTP Status"],
    category: "HTTP Status",
    fix: "If the page has moved permanently, replace the 302/307 redirect with a 301 redirect.",
    label: "Redirects to",
    cols: ["Redirects to", "HTTP Status Code"],
  },
  redirectChain: {
    name: "Redirect chains and loops",
    unit: pg,
    text: ["is part of a redirect chain", "are part of redirect chains"],
    cats: ["Crawlability", "HTTP Status"],
    category: "HTTP Status",
    fix: "Point links and redirects straight at the final URL so every redirect takes a single hop.",
    label: "Redirects to",
    cols: ["Redirects to", "HTTP Status Code"],
  },
  mixedContent: {
    name: "Issues with mixed content",
    unit: pg,
    text: ["has mixed content", "have mixed content"],
    cats: ["Security and HTTPS"],
    category: "HTTPS",
    fix: "Load every image, script, stylesheet and iframe over HTTPS.",
    label: "Insecure resources",
    cols: ["Page URL", "Insecure resources"],
  },
  notSecure: {
    name: "Non-secure pages",
    unit: pg,
    text: ["isn't served over HTTPS", "aren't served over HTTPS"],
    cats: ["Security and HTTPS"],
    category: "HTTPS",
    fix: "Serve every page over HTTPS and redirect the HTTP versions to it.",
  },
  multipleH1: { name: "Multiple h1 tags", unit: pg, text: ["has more than one H1 tag", "have more than one H1 tag"], cats: ["Indexability"], category: "Meta tags", label: "h1 tags", cols: ["Page URL", "h1 tags"] },
  noindex: {
    name: "Pages blocked from indexing",
    unit: pg,
    text: ["is blocked from indexing", "are blocked from indexing"],
    cats: ["Indexability"],
    category: "Indexability",
    fix: "Remove the noindex directive from pages that should appear in search results.",
  },
  deepPage: {
    name: "Page Crawl Depth more than 3 clicks",
    unit: pg,
    text: ["needs more than 3 clicks to be reached", "need more than 3 clicks to be reached"],
    cats: ["Crawlability", "Links"],
    category: "Internal Linking",
    fix: "Link to important pages from the homepage or other well-linked pages so they are no more than 3 clicks away.",
    label: "Crawl depth",
    cols: ["Page URL", "Crawl depth"],
  },
  permanentRedirect: {
    name: "Permanent redirects",
    unit: pg,
    text: ["has a permanent redirect", "have permanent redirects"],
    cats: ["Crawlability", "HTTP Status"],
    category: "HTTP Status",
    fix: "Update internal links so they point straight at the final URL.",
    label: "Redirects to",
    cols: ["Redirects to", "HTTP Status Code"],
  },
  blockedByRobots: {
    name: "Blocked from crawling",
    unit: pg,
    text: ["is blocked from crawling", "are blocked from crawling"],
    cats: ["Crawlability", "Indexability"],
    category: "Crawlability",
    fix: "Check your robots.txt file and allow crawling of pages that should appear in search results.",
  },
  titleTooShort: {
    name: "Short title element",
    unit: pg,
    text: ["doesn't have enough text within the title tag", "don't have enough text within the title tags"],
    cats: ["Meta tags"],
    category: "Meta tags",
    fix: "Rewrite short titles so they describe the page in 30 to 70 characters.",
    label: "Title length",
    cols: ["Page URL", "Title length"],
  },
};

const extraIds: Partial<Record<CheckId, number>> = { noindex: 301 };

export const liveIssueId = (id: CheckId) => extraIds[id] ?? issueId(checkSpecs[id].name);

export const measuredNames = Object.values(checkSpecs).map((s) => s.name);

export type LiveIssue = { issue: Issue; check: CheckId; urls: { url: string; detail: string | null }[] };

export type HeaderLive = { domain: string; updated: string; pages: number; limit: number | null };

export type ProjectLive = HeaderLive & { ago: string; row: Record<string, [string, string]> };

export type StatusSlice = { label: string; n: number; color: string };

export type OverviewIssue = { sev: Severity; text: string; pages: string; id: number; fixInfo: { about: string; fix: string } };

export type OverviewLive = {
  health: number;
  errors: number;
  warnings: number;
  pages: number;
  status: StatusSlice[];
  top: OverviewIssue[];
  scores: Record<string, number>;
};

export type Tab = { key: string; label: string; n: number; ai?: boolean };

export type IssuesLive = { issues: Issue[]; categoryTabs: Tab[]; moreCategories: { key: string; n: number }[]; severityTabs: Tab[] };

export type IssueDetailLive = { issue: Issue; label: string | null; rows: { title: string; url: string; detail: string | null }[]; successful: number; discovered: string };

export type Seg = { label: string; value: number; color: string; pct?: number };

export type Bar = { label: string; value: number };

export type TileLive = { title: string; value: string; caption: string; rows: [string, string][] };

export type SiteAuditLive = {
  header: HeaderLive;
  project: ProjectLive;
  overview: OverviewLive;
  issues: LiveIssue[];
  list: IssuesLive;
  counts: Record<string, number>;
  rows: CrawledRow[];
  structure: Dir[];
  httpStatus: Seg[];
  crawlDepth: Seg[];
  loadSpeed: Seg[];
  avgLoad: { value: string; pages: number };
  outgoing: Bar[];
  tiles: Record<string, TileLive>;
  scores: Record<string, number>;
  indexable: { indexable: number; nonIndexable: number };
  budget: { label: string; value: number }[];
  compare: { label: string; a: string; b: string; fixed: string | null }[];
  topLinked: { url: string; display: string; links: number }[];
  dates: { short: string; long: string; time: string; discovered: string; day: string };
  https: { mixed: number; notSecure: number };
};

const tz = "Europe/Stockholm";
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: tz, ...o }).format(new Date(iso));

export function crawlDates(iso: string) {
  const date = fmt(iso, { month: "short", day: "numeric", year: "numeric" });
  const hm24 = fmt(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const hm12 = fmt(iso, { hour: "numeric", minute: "2-digit", hour12: true });
  return {
    updated: fmt(iso, { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
    short: `${date} (${hm24})`,
    long: `${fmt(iso, { weekday: "short", month: "short", day: "numeric", year: "numeric" })} ${hm12}`,
    time: fmt(iso, { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }),
    discovered: `${date}, ${hm12.replace(/\s?[AP]M$/, "")}`,
    day: fmt(iso, { month: "short", day: "numeric" }),
  };
}

export function ago(iso: string, now: number) {
  const m = Math.max(0, Math.floor((now - Date.parse(iso)) / 60_000));
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 7 ? `${d}d ago` : `${Math.floor(d / 7)}w ago`;
}

export function pageId(url: string) {
  let a = 0x811c9dc5;
  let b = 0x2545f491;
  for (let i = 0; i < url.length; i++) {
    const c = url.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ c, 0x5bd1e995) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
}

const n0 = (v: number) => v.toLocaleString("en-US");
const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);

export function niceScale(v: number, steps: number) {
  if (v <= 0) return { max: steps, ticks: Array.from({ length: steps + 1 }, (_, i) => i) };
  const raw = v / steps;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw && Number.isInteger(s)) ?? Math.ceil(raw);
  return { max: step * steps, ticks: Array.from({ length: steps + 1 }, (_, i) => i * step) };
}

function toIssue(c: LiveAudit["checks"][number]): LiveIssue {
  const s = checkSpecs[c.id];
  const id = liveIssueId(c.id);
  const own = mockIssues.find((i) => i.id === id);
  const one = c.count === 1;
  return {
    check: c.id,
    urls: c.urls,
    issue: {
      id,
      severity: c.severity,
      count: c.count,
      unit: one ? s.unit[0] : s.unit[1],
      text: one ? s.text[0] : s.text[1],
      cats: s.cats,
      about: own?.about ?? c.description,
      fix: own?.fix ?? s.fix ?? "Review the affected pages and resolve the issue.",
      category: s.category,
    },
  };
}

function statusBucket(s: number | null) {
  if (s == null) return "No code";
  if (s >= 500) return "5xx";
  if (s >= 400) return "4xx";
  if (s >= 300) return "3xx";
  if (s >= 200) return "2xx";
  return "1xx";
}

function buildTree(urls: { url: string; issues: number }[]): Dir[] {
  type Node = { name: string; urls: number; issues: number; kids: Map<string, Node> };
  const roots = new Map<string, Node>();
  for (const { url, issues } of urls) {
    let u: URL;
    try {
      u = new URL(url);
    } catch {
      continue;
    }
    const origin = `${u.protocol}//${u.host}`;
    const root = roots.get(origin) ?? { name: origin, urls: 0, issues: 0, kids: new Map() };
    roots.set(origin, root);
    root.urls++;
    root.issues += issues;
    const segs = u.pathname.split("/").filter(Boolean);
    let node = root;
    for (const seg of segs) {
      const k = node.kids.get(seg) ?? { name: `/${decodeURIComponent(seg)}`, urls: 0, issues: 0, kids: new Map() };
      node.kids.set(seg, k);
      k.urls++;
      k.issues += issues;
      node = k;
    }
  }
  const toDir = (n: Node): Dir => {
    const kids = [...n.kids.values()].filter((k) => k.urls > 1).sort((a, b) => b.urls - a.urls || a.name.localeCompare(b.name));
    return { name: n.name, urls: n.urls, issues: n0(n.issues), ...(kids.length ? { children: kids.map(toDir) } : {}) };
  };
  return [...roots.values()].sort((a, b) => b.urls - a.urls).map(toDir);
}

export function structureFor(live: SiteAuditLive, issue?: number | null): Dir[] {
  if (issue == null) return live.structure;
  const hit = live.issues.find((i) => i.issue.id === issue);
  const per = new Map<string, number>();
  for (const u of hit?.urls ?? []) per.set(u.url, (per.get(u.url) ?? 0) + 1);
  return buildTree([...per].map(([url, issues]) => ({ url, issues })));
}

export function buildSiteAuditLive({ audit, domain, limit = null, now = Date.now() }: { audit: LiveAudit; domain: string; limit?: number | null; now?: number }): SiteAuditLive {
  const { crawl, pages } = audit;
  const when = crawl.finished_at ?? crawl.started_at;
  const d = crawlDates(when);
  const P = pages.length;
  const issues = audit.checks.map(toIssue);
  const byCheck = new Map(issues.map((i) => [i.check, i]));
  const urlsOf = (...ids: CheckId[]) => new Set(ids.flatMap((id) => byCheck.get(id)?.urls.map((u) => u.url) ?? []));
  const countOf = (id: CheckId) => byCheck.get(id)?.issue.count ?? 0;

  const counts: Record<string, number> = Object.fromEntries(measuredNames.map((n) => [n, 0]));
  for (const i of issues) counts[checkSpecs[i.check].name] = i.issue.count;

  const blocked = urlsOf("blockedByRobots").size;
  const failed = urlsOf("fetchFailed").size;
  const s3 = pages.filter((p) => p.status != null && p.status >= 300 && p.status < 400).length;
  const broken = pages.filter((p) => p.status == null || p.status >= 400).length;
  const ok = pages.filter((p) => p.status != null && p.status < 300);
  const status: StatusSlice[] = [
    { label: "Healthy", n: ok.filter((p) => !p.issues).length, color: "#00c78f" },
    { label: "Broken", n: broken, color: "#ff6b70" },
    { label: "Have issues", n: ok.filter((p) => p.issues).length, color: "#ffb400" },
    { label: "Redirects", n: s3, color: "#6167e6" },
    { label: "Blocked", n: blocked, color: "#d6d8d7" },
  ];

  const scoreOf = (ids: CheckId[], extra = 0) => {
    const bad = [...urlsOf(...ids)].length;
    const total = P + extra;
    return total ? Math.max(0, Math.min(100, Math.round(100 * (1 - bad / total)))) : 100;
  };
  const scores = {
    crawlability: scoreOf(["http4xx", "http5xx", "fetchFailed", "redirectChain", "temporaryRedirect", "noindex", "blockedByRobots", "deepPage"], blocked + failed),
    https: scoreOf(["notSecure", "mixedContent"]),
    linking: scoreOf(["brokenInternalLink", "deepPage"]),
  };

  const top: OverviewIssue[] = issues.slice(0, 5).map(({ issue: i, check }) => ({ sev: i.severity, text: checkSpecs[check].name, pages: `${i.count} ${i.unit}`, id: i.id, fixInfo: { about: i.about, fix: i.fix } }));

  const plain = issues.map((i) => i.issue);
  const catN = (k: string) => plain.filter((i) => i.cats.includes(k)).length;
  const list: IssuesLive = {
    issues: plain,
    categoryTabs: [
      { key: "all", label: "All", n: plain.length },
      { key: "AI Search", label: "AI Search", n: catN("AI Search"), ai: true },
      ...["Crawlability", "Content", "Meta tags"].map((k) => ({ key: k, label: k, n: catN(k) })),
    ],
    moreCategories: ["Indexability", "Duplicates", "HTTP Status", "Links", "Site Performance", "Mobile SEO", "Canonicalization", "Security and HTTPS"].map((k) => ({ key: k, n: catN(k) })),
    severityTabs: [
      { key: "all", label: "All", n: plain.length },
      { key: "error", label: "Errors", n: plain.filter((i) => i.severity === "error").length },
      { key: "warning", label: "Warnings", n: plain.filter((i) => i.severity === "warning").length },
      { key: "notice", label: "Notices", n: plain.filter((i) => i.severity === "notice").length },
    ],
  };

  const rows: CrawledRow[] = pages.map((p) => {
    const s = p.status;
    const redirect = s != null && s >= 300 && s < 400;
    const bad = s == null || s >= 400;
    const state = bad ? "Broken" : redirect ? "Redirected" : p.issues ? undefined : "Healthy";
    return {
      url: p.url,
      title: p.title ?? undefined,
      status: s,
      issues: state ? undefined : p.issues,
      state,
      depth: p.depth,
      reaudit: true,
      id: pageId(p.url),
      ms: p.ms,
      words: p.word_count,
      outlinks: p.internal_links,
    };
  });

  const bucketCount = (labels: string[], of: (p: (typeof pages)[number]) => string | null) => labels.map((l) => pages.filter((p) => of(p) === l).length);
  const hsLabels = ["5xx", "4xx", "3xx", "2xx", "1xx", "No code"];
  const hsColors = [C.red, C.orange, C.blue, C.green, C.gray, C.light];
  const hs = bucketCount(hsLabels, (p) => statusBucket(p.status));
  const httpStatus = hsLabels.map((label, i) => ({ label, value: hs[i], color: hsColors[i], pct: pct(hs[i], P) }));

  const depthLabels = ["1 click", "2 clicks", "3 clicks", "4+ clicks"];
  const depthOf = (p: (typeof pages)[number]) => depthLabels[Math.min(3, Math.max(1, p.depth) - 1)];
  const dc = bucketCount(depthLabels, depthOf);
  const crawlDepth = depthLabels.map((label, i) => ({ label, value: dc[i], color: [C.green, C.blue, C.orange, C.red][i], pct: pct(dc[i], P) }));

  const timed = pages.filter((p) => p.ms != null);
  const speedLabels = ["0 – 0.5s", "0.5 – 1s", "1 – 3s", ">3s"];
  const speedOf = (ms: number) => (ms < 500 ? 0 : ms < 1000 ? 1 : ms <= 3000 ? 2 : 3);
  const loadSpeed = speedLabels.map((label, i) => ({ label, value: timed.filter((p) => speedOf(p.ms!) === i).length, color: [C.green, C.blue, C.orange, C.red][i] }));
  const avgMs = timed.length ? timed.reduce((a, p) => a + p.ms!, 0) / timed.length : 0;

  const linkLabels = ["0", "1", "2-5", "6-15", "16-50", "51-150", "151-500", "500+"];
  const linkOf = (n: number) => (n <= 1 ? String(n) : n <= 5 ? "2-5" : n <= 15 ? "6-15" : n <= 50 ? "16-50" : n <= 150 ? "51-150" : n <= 500 ? "151-500" : "500+");
  const linked = pages.filter((p) => p.internal_links != null);
  const outgoing = linkLabels.map((label) => ({ label, value: linked.filter((p) => linkOf(p.internal_links!) === label).length }));

  const bad45 = hs[0] + hs[1];
  const tiles: Record<string, TileLive> = {
    "HTTP Status Code": { title: "HTTP Status Code", value: `${pct(bad45, P)}%`, caption: "pages with 4xx and 5xx status codes", rows: httpStatus.map((h) => [h.label, `${h.pct}%`]) },
    "Pages Crawl Depth": { title: "Pages Crawl Depth", value: `${crawlDepth[3].pct}%`, caption: "pages with more than 3 clicks", rows: crawlDepth.slice(0, 3).map((h) => [h.label, `${h.pct}%`]) },
  };

  const noindex = urlsOf("noindex");
  const indexable = ok.filter((p) => !noindex.has(p.url)).length;

  const budget = [
    ["Temporary redirects", countOf("temporaryRedirect")],
    ["Permanent redirects", countOf("permanentRedirect")],
    ["Duplicate content", 0],
    ["Canonical to another page", 0],
    ["Large page size", 0],
    ["Slow page (HTML) load speed", countOf("slowPage")],
    ["Blocked from crawling", countOf("blockedByRobots")],
    ["4xx errors", countOf("http4xx")],
    ["5xx errors", countOf("http5xx")],
    ["Redirect chains and loops", countOf("redirectChain")],
  ].map(([label, value]) => ({ label: label as string, value: value as number }));

  const total = crawl.errors + crawl.warnings + crawl.notices;
  const compare = [
    { label: "Pages crawled", v: n0(P), fixed: null },
    { label: "Site Health", v: String(crawl.health), fixed: null },
    { label: "Total issues", v: n0(total), fixed: "—" },
    { label: "Total errors", v: n0(crawl.errors), fixed: "—" },
    { label: "Total warnings", v: n0(crawl.warnings), fixed: "—" },
    { label: "Total notices", v: n0(crawl.notices), fixed: "—" },
  ].map((r) => ({ label: r.label, a: r.v, b: r.v, fixed: r.fixed }));

  const header: HeaderLive = { domain, updated: d.updated, pages: P, limit };
  const row: Record<string, [string, string]> = {
    health: [`${crawl.health}%`, "0%"],
    errors: [n0(crawl.errors), "0"],
    warnings: [n0(crawl.warnings), "0"],
    crawlability: [`${scores.crawlability}%`, "0%"],
    https: [`${scores.https}%`, "0%"],
    linking: [`${scores.linking}%`, "0%"],
  };

  return {
    header,
    project: { ...header, ago: ago(when, now), row },
    overview: { health: crawl.health, errors: crawl.errors, warnings: crawl.warnings, pages: P, status, top, scores },
    issues,
    list,
    counts,
    rows,
    structure: buildTree(rows.map((r) => ({ url: r.url, issues: r.issues ?? 0 }))),
    httpStatus,
    crawlDepth,
    loadSpeed,
    avgLoad: { value: `${(avgMs / 1000).toFixed(2)} sec`, pages: timed.length },
    outgoing,
    tiles,
    scores,
    indexable: { indexable, nonIndexable: P - indexable },
    budget,
    compare,
    topLinked: [...linked].sort((a, b) => b.internal_links! - a.internal_links! || a.url.localeCompare(b.url)).slice(0, 10).map((p) => ({ url: p.url, display: p.url.length > 27 ? `${p.url.slice(0, 16)}...${p.url.slice(-9)}` : p.url, links: p.internal_links! })),
    dates: { short: d.short, long: d.long, time: d.time, discovered: d.discovered, day: d.day },
    https: { mixed: countOf("mixedContent"), notSecure: countOf("notSecure") },
  };
}

export function issueDetailLive(live: SiteAuditLive, id: number, fallback: Issue): IssueDetailLive {
  const hit = live.issues.find((i) => i.issue.id === id);
  const titles = new Map(live.rows.map((r) => [r.url, r.title ?? ""]));
  const affected = hit ? new Set(hit.urls.map((u) => u.url)).size : 0;
  return {
    issue: hit ? hit.issue : { ...fallback, count: 0 },
    label: hit ? (checkSpecs[hit.check].label ?? null) : null,
    rows: hit ? hit.urls.map((u) => ({ title: titles.get(u.url) ?? "", url: u.url, detail: u.detail })) : [],
    successful: Math.max(0, live.header.pages - affected),
    discovered: live.dates.discovered,
  };
}

export type LiveDetailIssue = { sev: Severity; name: string; count: number; id: number; fix: { about: string; fix: string }; table?: { cols: [string, string]; rows: { url: string; value: string }[] } };

export function pageDetailLive(live: SiteAuditLive, id: string) {
  const row = live.rows.find((r) => r.id === id);
  if (!row) return null;
  const status = new Map(live.rows.map((r) => [r.url, r.status]));
  const list: LiveDetailIssue[] = [];
  for (const { issue: i, check, urls } of live.issues) {
    const mine = urls.filter((u) => u.url === row.url);
    if (!mine.length) continue;
    const s = checkSpecs[check];
    const redirect = s.cols?.[0] === "Redirects to";
    const withDetail = mine.filter((u) => u.detail);
    list.push({
      sev: i.severity,
      name: s.name,
      count: mine.length,
      id: i.id,
      fix: { about: i.about, fix: i.fix },
      ...(s.cols && withDetail.length
        ? {
            table: {
              cols: s.cols,
              rows: withDetail.map((u) =>
                check === "brokenInternalLink"
                  ? { url: u.detail!, value: String(status.get(u.detail!) ?? "") }
                  : redirect
                    ? { url: u.detail!, value: String(row.status ?? "") }
                    : { url: row.url, value: u.detail! },
              ),
            },
          }
        : {}),
    });
  }
  return {
    row,
    title: row.title ?? "",
    ilr: null,
    incoming: null,
    outgoing: row.outlinks ?? null,
    external: null,
    canonical: "n/a",
    markup: ["n/a"],
    structured: [] as [string, number][],
    issues: list,
    total: list.reduce((a, i) => a + i.count, 0),
  };
}
