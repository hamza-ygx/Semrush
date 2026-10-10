import type { SemBacklink, SemRefDomain } from "@/lib/seo/semrushNormalize";
import { hostOf, rootOf, snapshotAt, toMs, urlKey, type BacklinksSource } from "./live";

type Ds<T> = { fetchedAt: string; rows: T[] };

export type BingLinkCount = { targetUrl: string; links: number };
export type BingLink = { targetUrl: string; sourceUrl: string; anchor: string };
export type BingDatasets = { linkCounts: BingLinkCount[]; links: BingLink[] };
export type BingBacklinks = { domain: string; linkCounts?: Ds<BingLinkCount>; links?: Ds<BingLink> };

const slds = new Set(["co", "com", "org", "net", "ac", "gov", "edu", "ne", "or", "go"]);

export function regDomain(host: string) {
  const p = host.split(".");
  if (p.length > 2 && p[p.length - 1].length === 2 && slds.has(p[p.length - 2])) return p.slice(-3).join(".");
  return p.slice(-2).join(".");
}

const linkKey = (sourceUrl: string, targetUrl: string) => `${urlKey(sourceUrl)} ${urlKey(targetUrl)}`;

const ownHost = (h: string, own: string) => h === own || h.endsWith(`.${own}`);

export function bingNewer(sem: BacklinksSource | null, bing: BingBacklinks | null) {
  const b = toMs(bing?.links?.fetchedAt);
  if (!Number.isFinite(b) || !bing?.links?.rows.length) return false;
  const s = sem ? snapshotAt(sem) : NaN;
  return !Number.isFinite(s) || b > s;
}

function bingRows(sem: BacklinksSource | null, bing: BingBacklinks, iso: string): SemBacklink[] {
  const own = hostOf(sem?.domain || bing.domain);
  const seen = new Set((sem?.backlinks?.rows ?? []).map((b) => linkKey(b.sourceUrl, b.targetUrl)));
  const out: SemBacklink[] = [];
  for (const l of bing.links?.rows ?? []) {
    if (!l.sourceUrl || !l.targetUrl || ownHost(hostOf(l.sourceUrl), own)) continue;
    const k = linkKey(l.sourceUrl, l.targetUrl);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({
      sourceUrl: l.sourceUrl,
      sourceTitle: "",
      targetUrl: l.targetUrl,
      anchor: l.anchor ?? "",
      pageAscore: null,
      nofollow: false,
      image: false,
      sitewide: false,
      newLink: true,
      lostLink: false,
      firstSeen: iso,
      lastSeen: iso,
      responseCode: null,
      externalLinks: null,
      internalLinks: null,
    });
  }
  return out;
}

export function mergeBing(sem: BacklinksSource | null, bing: BingBacklinks | null): BacklinksSource | null {
  if (!bing) return sem;
  const out: BacklinksSource = { ...(sem ?? { domain: bing.domain }) };
  if (bing.linkCounts?.rows.length) out.linkCounts = bing.linkCounts;
  if (!bingNewer(sem, bing)) return sem || out.linkCounts ? out : null;
  const fetchedAt = bing.links!.fetchedAt;
  const iso = new Date(toMs(fetchedAt)).toISOString();
  const added = bingRows(sem, bing, iso);
  const semLinks = sem?.backlinks?.rows ?? [];
  const semRds = sem?.refdomains?.rows ?? [];
  const roots = new Set(semRds.map((r) => r.domain.toLowerCase()));
  const rootFor = (url: string) => {
    const h = hostOf(url);
    const r = rootOf(h, roots);
    return roots.has(r) ? r : regDomain(h);
  };
  const listed = new Map<string, number>();
  for (const b of semLinks) {
    const r = rootFor(b.sourceUrl);
    listed.set(r, (listed.get(r) ?? 0) + 1);
  }
  const fresh = new Map<string, number>();
  for (const b of added) {
    const r = rootFor(b.sourceUrl);
    fresh.set(r, (fresh.get(r) ?? 0) + 1);
  }
  const rds: SemRefDomain[] = semRds.map((r) => {
    const n = fresh.get(r.domain.toLowerCase());
    if (!n) return r;
    const merged = (listed.get(r.domain.toLowerCase()) ?? 0) + n;
    return { ...r, backlinks: Math.max(r.backlinks ?? 0, merged), lastSeen: iso };
  });
  for (const [d, n] of fresh) if (!roots.has(d)) rds.push({ domain: d, ascore: null, backlinks: n, country: null, firstSeen: iso, lastSeen: iso });
  const linkTotal = new Set([...semLinks, ...added].map((b) => linkKey(b.sourceUrl, b.targetUrl))).size;
  const domainTotal = new Set([...rds.map((r) => r.domain.toLowerCase()), ...listed.keys()]).size;
  out.backlinks = { fetchedAt, rows: [...semLinks, ...added] };
  if (added.length) out.refdomains = { fetchedAt, rows: rds };
  const ov = sem?.backlinksOverview?.rows[0];
  if (ov && sem?.backlinksOverview) {
    out.backlinksOverview = { ...sem.backlinksOverview, rows: [{ ...ov, total: Math.max(ov.total ?? 0, linkTotal), domains: Math.max(ov.domains ?? 0, domainTotal) }, ...sem.backlinksOverview.rows.slice(1)] };
  }
  return out;
}
