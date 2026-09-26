import { parse } from "node-html-parser";
import { checks, type CheckId } from "./checks";
import { safeFetch } from "./net";

export const crawlerUserAgent = "RKSiteAudit/1.0 (+https://www.rkjh.se)";

export type CrawledPage = {
  url: string;
  status: number | null;
  redirect_to: string | null;
  content_type: string | null;
  bytes: number | null;
  ms: number | null;
  depth: number;
  title: string | null;
  meta_description: string | null;
  h1: string | null;
  h1_count: number | null;
  canonical: string | null;
  noindex: boolean;
  word_count: number | null;
  internal_links: number | null;
  external_links: number | null;
  images: number | null;
  images_missing_alt: number | null;
};

export type Issue = { check_id: CheckId; severity: (typeof checks)[CheckId]["severity"]; url: string; detail: string | null };

type Rule = { allow: boolean; path: string };

function parseRobots(txt: string): Rule[] {
  const rules: Rule[] = [];
  let applies = false;
  let inAgents = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === "user-agent") {
      if (!inAgents) applies = false;
      inAgents = true;
      if (val === "*" || crawlerUserAgent.toLowerCase().startsWith(val.toLowerCase())) applies = true;
      continue;
    }
    inAgents = false;
    if (applies && (key === "allow" || key === "disallow") && val) rules.push({ allow: key === "allow", path: val });
  }
  return rules;
}

function robotsAllows(rules: Rule[], path: string) {
  let best: Rule | null = null;
  for (const r of rules) {
    const re = new RegExp("^" + r.path.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$"));
    if (re.test(path) && (!best || r.path.length > best.path.length || (r.path.length === best.path.length && r.allow))) best = r;
  }
  return !best || best.allow;
}

const skipExt = /\.(pdf|jpe?g|png|gif|webp|svg|ico|css|js|json|xml|zip|rar|docx?|xlsx?|pptx?|mp4|mp3|woff2?|ttf|eot)$/i;

export async function crawlSite(domain: string, { limit, budgetMs }: { limit: number; budgetMs: number }) {
  const started = Date.now();
  const bare = domain.replace(/^www\./, "");
  const hosts = new Set([bare, `www.${bare}`]);
  const normalize = (href: string, base: string) => {
    try {
      const u = new URL(href, base);
      if (u.protocol !== "http:" && u.protocol !== "https:") return null;
      u.hash = "";
      u.hostname = u.hostname.toLowerCase();
      return u.toString();
    } catch {
      return null;
    }
  };
  const isInternal = (url: string) => hosts.has(new URL(url).hostname);

  let rules: Rule[] = [];
  try {
    const r = await safeFetch(`https://${domain}/robots.txt`, { userAgent: crawlerUserAgent, timeoutMs: 8000, maxBytes: 500_000 });
    if (r.status === 200) rules = parseRobots(r.body);
  } catch {}

  const pages = new Map<string, CrawledPage>();
  const linksFrom = new Map<string, Set<string>>();
  const redirectHops = new Map<string, number>();
  const mixed = new Map<string, number>();
  const blocked = new Set<string>();
  const failed = new Map<string, string>();
  const seen = new Set<string>();
  const queue: { url: string; depth: number }[] = [];
  const enqueue = (url: string, depth: number) => {
    if (seen.has(url) || !isInternal(url) || skipExt.test(new URL(url).pathname)) return;
    seen.add(url);
    const u = new URL(url);
    if (!robotsAllows(rules, u.pathname + u.search)) {
      blocked.add(url);
      return;
    }
    queue.push({ url, depth });
  };
  enqueue(`https://${domain}/`, 0);

  const visit = async ({ url, depth }: { url: string; depth: number }) => {
    try {
      const r = await safeFetch(url, { userAgent: crawlerUserAgent });
      const page: CrawledPage = {
        url, status: r.status, redirect_to: r.location ?? null, content_type: r.contentType || null, bytes: r.bytes, ms: r.ms, depth,
        title: null, meta_description: null, h1: null, h1_count: null, canonical: null, noindex: false,
        word_count: null, internal_links: null, external_links: null, images: null, images_missing_alt: null,
      };
      if (r.status >= 300 && r.status < 400 && r.location) {
        const target = normalize(r.location, url);
        if (target) {
          redirectHops.set(target, (redirectHops.get(url) ?? 0) + 1);
          enqueue(target, depth);
        }
      } else if (r.status < 300 && /html/.test(r.contentType)) {
        const root = parse(r.body, { blockTextElements: { script: false, style: false, noscript: false } });
        const meta = (name: string) => root.querySelector(`meta[name="${name}" i]`)?.getAttribute("content")?.trim() ?? null;
        const h1s = root.querySelectorAll("h1");
        page.title = root.querySelector("title")?.text.trim() || null;
        page.meta_description = meta("description") || null;
        page.h1 = h1s[0]?.text.trim().slice(0, 500) || null;
        page.h1_count = h1s.length;
        page.canonical = root.querySelector('link[rel="canonical" i]')?.getAttribute("href") ?? null;
        page.noindex = /noindex/i.test(meta("robots") ?? "");
        page.word_count = (root.querySelector("body")?.innerHTML ?? "").replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
        const imgs = root.querySelectorAll("img");
        page.images = imgs.length;
        page.images_missing_alt = imgs.filter((i) => !(i.getAttribute("alt") ?? "").trim()).length;
        if (url.startsWith("https:")) {
          const insecure = root.querySelectorAll("img[src],script[src],link[href],iframe[src]").filter((e) => /^http:\/\//i.test(e.getAttribute("src") ?? e.getAttribute("href") ?? "")).length;
          if (insecure) mixed.set(url, insecure);
        }
        const out = new Set<string>();
        let internal = 0;
        let external = 0;
        for (const a of root.querySelectorAll("a[href]")) {
          const target = normalize(a.getAttribute("href") ?? "", url);
          if (!target) continue;
          if (isInternal(target)) {
            internal++;
            out.add(target);
            enqueue(target, depth + 1);
          } else external++;
        }
        page.internal_links = internal;
        page.external_links = external;
        linksFrom.set(url, out);
      }
      pages.set(url, page);
    } catch (e) {
      failed.set(url, e instanceof Error ? e.message.slice(0, 200) : "Request failed");
    }
  };

  let active = 0;
  const workers = Array.from({ length: 4 }, async () => {
    while (pages.size + failed.size + active < limit && Date.now() - started < budgetMs) {
      const next = queue.shift();
      if (!next) {
        if (!active) break;
        await new Promise((r) => setTimeout(r, 50));
        continue;
      }
      active++;
      await visit(next);
      active--;
    }
  });
  await Promise.all(workers);

  const issues: Issue[] = [];
  const add = (check_id: CheckId, url: string, detail: string | null = null) => issues.push({ check_id, severity: checks[check_id].severity, url, detail });
  const html = [...pages.values()].filter((p) => p.status !== null && p.status < 300 && p.content_type?.includes("html"));
  const dupes = (key: "title" | "meta_description", id: CheckId) => {
    const by = new Map<string, string[]>();
    for (const p of html) if (p[key]) by.set(p[key]!, [...(by.get(p[key]!) ?? []), p.url]);
    for (const [v, urls] of by) if (urls.length > 1) for (const u of urls) add(id, u, v.slice(0, 300));
  };
  for (const p of pages.values()) {
    const s = p.status ?? 0;
    if (s >= 400 && s < 500) add("http4xx", p.url, String(s));
    if (s >= 500) add("http5xx", p.url, String(s));
    if (s === 302 || s === 307) add("temporaryRedirect", p.url, p.redirect_to);
    if (s === 301 || s === 308) add("permanentRedirect", p.url, p.redirect_to);
    if ((redirectHops.get(p.url) ?? 0) >= 1 && s >= 300 && s < 400) add("redirectChain", p.url, p.redirect_to);
    if (p.url.startsWith("http:") && s < 300) add("notSecure", p.url);
    if (p.depth > 3) add("deepPage", p.url, String(p.depth));
    if ((p.ms ?? 0) > 1500) add("slowPage", p.url, `${p.ms} ms`);
  }
  for (const p of html) {
    if (!p.title) add("missingTitle", p.url);
    else if (p.title.length > 70) add("titleTooLong", p.url, String(p.title.length));
    else if (p.title.length < 30) add("titleTooShort", p.url, String(p.title.length));
    if (!p.meta_description) add("missingDescription", p.url);
    if (!p.h1_count) add("missingH1", p.url);
    else if (p.h1_count > 1) add("multipleH1", p.url, String(p.h1_count));
    if ((p.word_count ?? 0) < 200) add("lowWordCount", p.url, String(p.word_count));
    if (p.images_missing_alt) add("missingAlt", p.url, String(p.images_missing_alt));
    if (p.noindex) add("noindex", p.url);
    if (mixed.has(p.url)) add("mixedContent", p.url, String(mixed.get(p.url)));
  }
  dupes("title", "duplicateTitle");
  dupes("meta_description", "duplicateDescription");
  for (const [from, targets] of linksFrom)
    for (const t of targets) {
      const s = pages.get(t)?.status ?? 0;
      if (s >= 400) add("brokenInternalLink", from, t);
    }
  for (const [url, reason] of failed) add("fetchFailed", url, reason);
  for (const url of blocked) add("blockedByRobots", url);

  const pageList = [...pages.values()];
  const withSeverity = (sev: string) => new Set(issues.filter((i) => i.severity === sev).map((i) => i.url));
  const errorPages = withSeverity("error");
  const warningPages = [...withSeverity("warning")].filter((u) => !errorPages.has(u));
  const total = Math.max(pageList.length + failed.size, 1);
  const health = Math.max(0, Math.min(100, Math.round(100 * (1 - (errorPages.size + 0.25 * warningPages.length) / total))));
  return {
    pages: pageList,
    issues,
    health,
    counts: { errors: issues.filter((i) => i.severity === "error").length, warnings: issues.filter((i) => i.severity === "warning").length, notices: issues.filter((i) => i.severity === "notice").length },
    truncated: queue.length > 0,
  };
}
