import type { LiveSource } from "@/lib/seo/sources";

type Metrics = {
  sessions: number;
  totalUsers: number;
  newUsers: number;
  screenPageViews: number;
  engagedSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  engagementRate: number;
};
type Ranged = { dateRange?: string };

export type Ga4Sets = {
  daily: (Metrics & { date: string })[];
  channels: (Metrics & Ranged & { sessionDefaultChannelGroup: string })[];
  monthlyChannels: { yearMonth: string; sessionDefaultChannelGroup: string; sessions: number; totalUsers: number }[];
  countries: (Metrics & Ranged & { country: string; countryId: string })[];
  pages: (Ranged & { hostName?: string; pagePath: string; pageTitle: string; screenPageViews: number; totalUsers: number; averageSessionDuration: number; engagementRate: number })[];
  landing: (Metrics & Ranged & { landingPage: string })[];
  devices: (Metrics & Ranged & { deviceCategory: string })[];
  sources: (Metrics & Ranged & { sessionSource: string; sessionMedium: string })[];
  countryDevices: (Ranged & { countryId: string; deviceCategory: string; sessions: number; totalUsers: number })[];
  monthlyCountries: { yearMonth: string; countryId: string; sessions: number; totalUsers: number }[];
};

export type Ga4Source = LiveSource<Ga4Sets>;

export type Cell = { v: string; up: boolean; none?: boolean };
export type ChartKind = "num" | "dec" | "time" | "pct";
export type TrendMetric = "Visits" | "Unique Visitors" | "Pages / Visit" | "Avg. Visit Duration" | "Bounce Rate";
export type LiveChart = { data: number[]; ticks: number[]; kind: ChartKind; tip: string[]; delta: (number | null)[] };
export type LiveFlow = { name: string; channel: string; sessions: number; share: number; up: boolean };
export type LivePage = { path: string; label: string; title: string; views: number; prevViews: number; users: number; visits: number | null; share: number; dur: number; bounce: number };
export type LiveFolder = { path: string; share: number; views: number; users: number; visits: number; ppv: number; dur: number; bounce: number; children: string[] };
export type LiveCountry = { name: string; mapName: string; code: string; sessions: number; users: number; share: number; desktop: number | null; ppv: number; dur: number; bounce: number; up: boolean };
export type LiveSubdomain = { name: string; visits: number; views: number; desktop: number | null; ppv: number; dur: number };
export type CountrySeries = { name: string; code: string; visits: number[]; users: number[] };
export type Totals = { sessions: number; users: number; views: number; ppv: number; dur: number; bounce: number };

export type TrafficLive = {
  domain: string;
  fetchedAt: string;
  range: { from: string; to: string; label: string };
  summary: Cell[];
  totals: Totals;
  device: { desktop: number; mobile: number };
  months: string[];
  partialLast: boolean;
  trend: Record<TrendMetric, LiveChart>;
  channels: { label: string; sessions: number; prev: number }[];
  channelTicks: number[];
  channelTrend: Record<string, { data: number[]; ticks: number[] }>;
  sources: LiveFlow[];
  sourceCount: number;
  landing: LiveFlow[];
  landingCount: number;
  pages: LivePage[];
  folders: LiveFolder[];
  subdomains: LiveSubdomain[];
  countries: LiveCountry[];
  countryTrend: { byCountry: boolean; series: CountrySeries[]; visitTicks: number[]; userTicks: number[] };
};

export const channelLabels = ["Direct", "AI Traffic", "Referral", "Organic Search", "Google AI Mode", "Paid Search", "Organic Social", "Paid Social", "Email", "Display Ads"];

const groupMap: Record<string, string> = {
  Direct: "Direct",
  Unassigned: "Direct",
  "(other)": "Direct",
  Referral: "Referral",
  Affiliates: "Referral",
  "Organic Search": "Organic Search",
  "Organic Shopping": "Organic Search",
  "Paid Search": "Paid Search",
  "Paid Shopping": "Paid Search",
  "Cross-network": "Paid Search",
  "Paid Other": "Paid Search",
  "Organic Social": "Organic Social",
  "Organic Video": "Organic Social",
  "Paid Social": "Paid Social",
  "Paid Video": "Paid Social",
  Email: "Email",
  SMS: "Email",
  "Mobile Push Notifications": "Email",
  Display: "Display Ads",
  Audio: "Display Ads",
};

export const channelOf = (group: string) => groupMap[group] ?? "Direct";

const aiRe = /(^|\.)(chatgpt\.com|chat\.openai\.com|openai\.com|perplexity\.ai|gemini\.google\.com|bard\.google\.com|claude\.ai|copilot\.microsoft\.com|you\.com|poe\.com|chat\.deepseek\.com|deepseek\.com|meta\.ai|grok\.com|chat\.mistral\.ai)$|^(chatgpt|perplexity|gemini|claude|copilot)$/i;
const socialRe = /(^|\.)(facebook\.com|instagram\.com|linkedin\.com|lnkd\.in|t\.co|twitter\.com|x\.com|reddit\.com|youtube\.com|pinterest\.com|tiktok\.com|threads\.net)$|^(facebook|instagram|linkedin|twitter|youtube|tiktok|fb|ig)$/i;

const hostAlias: Record<string, string> = {
  google: "google.com",
  bing: "bing.com",
  yahoo: "yahoo.com",
  duckduckgo: "duckduckgo.com",
  baidu: "baidu.com",
  yandex: "yandex.ru",
  ecosia: "ecosia.org",
  "(direct)": "Direct",
  "(not set)": "(not set)",
};

export const sourceName = (s: string) => hostAlias[s.toLowerCase()] ?? s.toLowerCase();

export function sourceChannel(source: string, medium: string) {
  const m = medium.toLowerCase();
  if (/^(cpc|ppc|paidsearch|paid-search)$/.test(m)) return "Paid Search";
  if (aiRe.test(source)) return "AI Traffic";
  if (source === "(direct)" || m === "(none)") return "Direct";
  if (m === "organic") return "Organic Search";
  if (/^(paid-?social|paid_social|social-?paid|cpm-social)$/.test(m)) return "Paid Social";
  if (/^(social|social-network|social-media|sm|social_media)$/.test(m) || socialRe.test(source)) return "Organic Social";
  if (/e-?mail|newsletter/.test(m)) return "Email";
  if (/^(display|banner|cpm|expandable|interstitial)$/.test(m)) return "Display Ads";
  return "Referral";
}

const mapAlias: Record<string, string> = {
  "United States": "United States of America",
  "Dominican Republic": "Dominican Rep.",
  "Bosnia & Herzegovina": "Bosnia and Herz.",
  "North Macedonia": "Macedonia",
  "Côte d’Ivoire": "Côte d'Ivoire",
  "Congo - Kinshasa": "Dem. Rep. Congo",
  "Congo - Brazzaville": "Congo",
  "Central African Republic": "Central African Rep.",
  Eswatini: "eSwatini",
  "Equatorial Guinea": "Eq. Guinea",
  "Solomon Islands": "Solomon Is.",
  "Falkland Islands (Islas Malvinas)": "Falkland Is.",
  "Falkland Islands": "Falkland Is.",
  "Palestinian Territories": "Palestine",
  "South Sudan": "S. Sudan",
  "Western Sahara": "W. Sahara",
  "Trinidad & Tobago": "Trinidad and Tobago",
  "Czech Republic": "Czechia",
  Türkiye: "Turkey",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtCount(v: number) {
  const n = Math.round(v);
  if (n >= 1e9) return `${+(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)}K`;
  return `${n}`;
}

export function fmtDur(sec: number) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export const fmtRate = (r: number) => `${+(r * 100).toFixed(2)}%`;
export const fmtPpv = (v: number) => `${+v.toFixed(1)}`;

export function fmtChart(kind: ChartKind, v: number) {
  if (kind === "time") return fmtDur(v);
  if (kind === "pct") return `${+v.toFixed(1)}%`;
  if (kind === "dec") return `${+v.toFixed(2)}`;
  return v === 0 ? "0" : fmtCount(v);
}

export function niceTicks(max: number, kind: ChartKind = "num") {
  if (kind === "pct") {
    const top = Math.min(100, Math.max(20, Math.ceil(max / 20) * 20));
    const step = top <= 40 ? 10 : top <= 80 ? 20 : 25;
    return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  }
  if (kind === "time") {
    const steps = [15, 30, 60, 120, 180, 300, 600, 900, 1800, 3600];
    const step = steps.find((s) => Math.ceil(Math.max(max, 1) / s) <= 4) ?? 3600;
    return Array.from({ length: Math.max(2, Math.ceil(Math.max(max, 1) / step)) + 1 }, (_, i) => i * step);
  }
  if (!(max > 0)) return kind === "dec" ? [0, 0.5, 1] : [0, 5, 10];
  const mag = 10 ** Math.floor(Math.log10(max));
  const cand = [0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10].map((m) => m * mag).filter((s) => kind === "dec" || s >= 1);
  const step = cand.find((s) => Math.ceil(max / s) <= 4) ?? mag * 10;
  const n = Math.max(2, Math.ceil(max / step));
  return Array.from({ length: n + 1 }, (_, i) => +(i * step).toFixed(6));
}

const ymd = (d: Date) => d.toISOString().slice(0, 10);
const shortDate = (s: string, year = false) => {
  const [y, m, d] = s.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}${year ? `, ${y}` : ""}`;
};
const monthLabel = (ym: string) => `${MONTHS[Number(ym.slice(4, 6)) - 1]} ${ym.slice(0, 4)}`;

const cur = <T extends Ranged>(rows: T[] | undefined) => (rows ?? []).filter((r) => (r.dateRange ?? "current") === "current" || r.dateRange === "date_range_0");
const prev = <T extends Ranged>(rows: T[] | undefined) => (rows ?? []).filter((r) => r.dateRange === "previous" || r.dateRange === "date_range_1");

function weigh<T>(rows: T[], w: (r: T) => number, v: (r: T) => number) {
  const tw = rows.reduce((a, r) => a + w(r), 0);
  return tw ? rows.reduce((a, r) => a + w(r) * v(r), 0) / tw : 0;
}

const sum = <T>(rows: T[], f: (r: T) => number) => rows.reduce((a, r) => a + (Number(f(r)) || 0), 0);

function totalsOf(rows: Metrics[], users?: number): Totals {
  const sessions = sum(rows, (r) => r.sessions);
  const views = sum(rows, (r) => r.screenPageViews);
  return {
    sessions,
    users: users ?? sum(rows, (r) => r.totalUsers),
    views,
    ppv: sessions ? views / sessions : 0,
    dur: weigh(rows, (r) => r.sessions, (r) => r.averageSessionDuration),
    bounce: weigh(rows, (r) => r.sessions, (r) => r.bounceRate),
  };
}

export function rangeOf(fetchedAt: string, lastDaily?: string) {
  const base = lastDaily ? new Date(`${lastDaily}T00:00:00Z`) : new Date(Date.parse(fetchedAt) - 864e5);
  const to = ymd(base);
  const from = ymd(new Date(base.getTime() - 27 * 864e5));
  const sameYear = from.slice(0, 4) === to.slice(0, 4);
  return { from, to, label: `${shortDate(from, !sameYear)} – ${shortDate(to, true)}` };
}

function pctDelta(a: number, b: number) {
  return b ? ((a - b) / b) * 100 : null;
}

function chart(data: number[], kind: ChartKind, before: number | null): LiveChart {
  const max = Math.max(0, ...data);
  return {
    data,
    kind,
    ticks: niceTicks(kind === "pct" ? max : max * 1.05, kind),
    tip: data.map((v) => fmtChart(kind, v)),
    delta: data.map((v, i) => pctDelta(v, i ? data[i - 1] : (before ?? 0))),
  };
}

const firstFolder = (path: string) => {
  const m = path.match(/^\/([^/?#]+)\/(.*)$/);
  return m ? `/${m[1]}/` : null;
};

export function pageLabel(domain: string, path: string) {
  return path === "/" ? domain : `${domain}${path}`;
}

export function buildTrafficLive(src: Ga4Source | null | undefined, monthsBack = 7): TrafficLive | null {
  if (!src) return null;
  const channelsCur = cur(src.channels?.rows);
  const daily = [...(src.daily?.rows ?? [])].sort((a, b) => a.date.localeCompare(b.date));
  if (!channelsCur.length && !daily.length) return null;
  const domain = src.domain.replace(/^www\./, "");
  const fetchedAt = src.channels?.fetchedAt ?? src.daily?.fetchedAt ?? new Date().toISOString();
  const range = rangeOf(fetchedAt, daily.at(-1)?.date);

  const devCur = cur(src.devices?.rows);
  const devPrev = prev(src.devices?.rows);
  const baseCur = channelsCur.length ? channelsCur : daily.filter((d) => d.date >= range.from && d.date <= range.to);
  const basePrev = channelsCur.length ? prev(src.channels?.rows) : daily.filter((d) => d.date < range.from && d.date >= ymd(new Date(Date.parse(range.from) - 28 * 864e5)));
  const totals = totalsOf(baseCur, devCur.length ? sum(devCur, (r) => r.totalUsers) : undefined);
  const before = totalsOf(basePrev, devPrev.length ? sum(devPrev, (r) => r.totalUsers) : undefined);
  const hasPrev = basePrev.length > 0;
  const cell = (v: string, a: number, b: number): Cell => ({ v, up: hasPrev ? a >= b : true, none: !hasPrev });
  const summary: Cell[] = [
    cell(fmtCount(totals.sessions), totals.sessions, before.sessions),
    cell(fmtCount(totals.users), totals.users, before.users),
    { v: "n/a", up: true, none: true },
    cell(fmtPpv(totals.ppv), totals.ppv, before.ppv),
    cell(fmtDur(totals.dur), totals.dur, before.dur),
    cell(fmtRate(totals.bounce), totals.bounce, before.bounce),
  ];

  const devSessions = sum(devCur, (r) => r.sessions);
  const desktop = devSessions ? sum(devCur.filter((r) => r.deviceCategory === "desktop"), (r) => r.sessions) / devSessions : 0;
  const device = { desktop, mobile: devSessions ? 1 - desktop : 0 };

  const monthly = new Map<string, (typeof daily)[number][]>();
  for (const d of daily) {
    const k = d.date.slice(0, 7).replace("-", "");
    monthly.set(k, [...(monthly.get(k) ?? []), d]);
  }
  const monthUsers = new Map<string, number>();
  for (const r of src.monthlyChannels?.rows ?? []) monthUsers.set(r.yearMonth, (monthUsers.get(r.yearMonth) ?? 0) + r.totalUsers);
  const lastYm = daily.at(-1)?.date.slice(0, 7).replace("-", "") ?? range.to.slice(0, 7).replace("-", "");
  const yms: string[] = [];
  for (let i = monthsBack; i >= 0; i--) {
    const y = Number(lastYm.slice(0, 4));
    const m = Number(lastYm.slice(4, 6)) - 1 - i;
    const dt = new Date(Date.UTC(y, m, 1));
    yms.push(`${dt.getUTCFullYear()}${String(dt.getUTCMonth() + 1).padStart(2, "0")}`);
  }
  const mt = yms.map((ym) => {
    const rows = monthly.get(ym) ?? [];
    return { ym, ...totalsOf(rows, monthUsers.get(ym)) };
  });
  const shown = mt.slice(1);
  const lastDay = daily.at(-1)?.date;
  const partialLast = !!lastDay && new Date(Date.parse(`${lastDay}T00:00:00Z`) + 864e5).getUTCDate() !== 1;
  const prior = mt[0];
  const trend: Record<TrendMetric, LiveChart> = {
    Visits: chart(shown.map((m) => m.sessions), "num", prior.sessions || null),
    "Unique Visitors": chart(shown.map((m) => m.users), "num", prior.users || null),
    "Pages / Visit": chart(shown.map((m) => +m.ppv.toFixed(2)), "dec", prior.ppv || null),
    "Avg. Visit Duration": chart(shown.map((m) => Math.round(m.dur)), "time", prior.dur || null),
    "Bounce Rate": chart(shown.map((m) => +(m.bounce * 100).toFixed(2)), "pct", prior.bounce ? prior.bounce * 100 : null),
  };

  const sourcesCur = cur(src.sources?.rows);
  const sourcesPrev = prev(src.sources?.rows);
  const aiCur = sum(sourcesCur.filter((r) => sourceChannel(r.sessionSource, r.sessionMedium) === "AI Traffic"), (r) => r.sessions);
  const aiPrev = sum(sourcesPrev.filter((r) => sourceChannel(r.sessionSource, r.sessionMedium) === "AI Traffic"), (r) => r.sessions);
  const byLabel = (rows: { sessionDefaultChannelGroup: string; sessions: number }[]) => {
    const m = new Map<string, number>();
    for (const r of rows) m.set(channelOf(r.sessionDefaultChannelGroup), (m.get(channelOf(r.sessionDefaultChannelGroup)) ?? 0) + r.sessions);
    return m;
  };
  const chCur = byLabel(channelsCur);
  const chPrev = byLabel(prev(src.channels?.rows));
  const channels = channelLabels.map((label) => {
    if (label === "AI Traffic") return { label, sessions: aiCur, prev: aiPrev };
    if (label === "Referral") return { label, sessions: Math.max(0, (chCur.get(label) ?? 0) - aiCur), prev: Math.max(0, (chPrev.get(label) ?? 0) - aiPrev) };
    return { label, sessions: chCur.get(label) ?? 0, prev: chPrev.get(label) ?? 0 };
  });
  const channelTicks = niceTicks(Math.max(...channels.map((c) => c.sessions)) * 1.05);
  const monthCh = new Map<string, Map<string, number>>();
  for (const r of src.monthlyChannels?.rows ?? []) {
    const l = channelOf(r.sessionDefaultChannelGroup);
    const m = monthCh.get(l) ?? new Map<string, number>();
    m.set(r.yearMonth, (m.get(r.yearMonth) ?? 0) + r.sessions);
    monthCh.set(l, m);
  }
  const channelTrend = Object.fromEntries(
    channelLabels.map((l) => {
      const data = shown.map((m) => monthCh.get(l)?.get(m.ym) ?? 0);
      return [l, { data, ticks: niceTicks(Math.max(...data) * 1.05) }];
    }),
  );

  const total = totals.sessions || 1;
  const flowsOf = (rowsCur: typeof sourcesCur, rowsPrev: typeof sourcesPrev): LiveFlow[] => {
    const agg = new Map<string, LiveFlow & { prev: number }>();
    for (const r of rowsCur) {
      if (!r.sessionSource || r.sessionSource === "(not set)") continue;
      const name = sourceName(r.sessionSource);
      const channel = sourceChannel(r.sessionSource, r.sessionMedium);
      const k = `${name}|${channel}`;
      const a = agg.get(k) ?? { name, channel, sessions: 0, share: 0, up: true, prev: 0 };
      a.sessions += r.sessions;
      agg.set(k, a);
    }
    for (const r of rowsPrev) {
      const a = agg.get(`${sourceName(r.sessionSource)}|${sourceChannel(r.sessionSource, r.sessionMedium)}`);
      if (a) a.prev += r.sessions;
    }
    return [...agg.values()]
      .filter((a) => a.sessions > 0)
      .sort((a, b) => b.sessions - a.sessions)
      .map(({ prev: p, ...a }) => ({ ...a, share: (a.sessions / total) * 100, up: a.sessions >= p }));
  };
  const sources = flowsOf(sourcesCur, sourcesPrev);

  const landCur = cur(src.landing?.rows).filter((r) => r.landingPage && r.landingPage !== "(not set)");
  const landPrev = prev(src.landing?.rows);
  const landPrevMap = new Map<string, number>();
  for (const r of landPrev) landPrevMap.set(r.landingPage, (landPrevMap.get(r.landingPage) ?? 0) + r.sessions);
  const landMap = new Map<string, number>();
  for (const r of landCur) landMap.set(r.landingPage, (landMap.get(r.landingPage) ?? 0) + r.sessions);
  const landing: LiveFlow[] = [...landMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([p, s]) => ({ name: pageLabel(domain, p), channel: "", sessions: s, share: (s / total) * 100, up: s >= (landPrevMap.get(p) ?? 0) }));

  const hostOf = (r: { hostName?: string }) => (r.hostName ?? "").trim().toLowerCase();
  const onMain = (r: { hostName?: string }) => {
    const h = hostOf(r);
    return !h || h === "(not set)" || h.replace(/^www\./, "") === domain;
  };
  const pagesAll = cur(src.pages?.rows).filter((r) => r.pagePath && r.pagePath !== "(not set)");
  const mainOnly = pagesAll.some(onMain);
  const pagesCur = mainOnly ? pagesAll.filter(onMain) : pagesAll;
  const pagesPrev = mainOnly ? prev(src.pages?.rows).filter(onMain) : prev(src.pages?.rows);
  const pAgg = new Map<string, { views: number; users: number; durW: number; engW: number; title: string; top: number }>();
  for (const r of pagesCur) {
    const a = pAgg.get(r.pagePath) ?? { views: 0, users: 0, durW: 0, engW: 0, title: "", top: -1 };
    a.views += r.screenPageViews;
    a.users += r.totalUsers;
    a.durW += r.averageSessionDuration * r.screenPageViews;
    a.engW += r.engagementRate * r.screenPageViews;
    if (r.screenPageViews > a.top) {
      a.top = r.screenPageViews;
      a.title = r.pageTitle;
    }
    pAgg.set(r.pagePath, a);
  }
  const pPrev = new Map<string, number>();
  for (const r of pagesPrev) pPrev.set(r.pagePath, (pPrev.get(r.pagePath) ?? 0) + r.screenPageViews);
  const totalViews = [...pAgg.values()].reduce((a, p) => a + p.views, 0) || 1;
  const pages: LivePage[] = [...pAgg.entries()]
    .sort((a, b) => b[1].views - a[1].views)
    .map(([path, a]) => ({
      path,
      label: path === "/" ? "Home page" : path,
      title: a.title,
      views: a.views,
      prevViews: pPrev.get(path) ?? 0,
      users: a.users,
      visits: landMap.get(path) ?? null,
      share: +((a.views / totalViews) * 100).toFixed(2),
      dur: a.views ? a.durW / a.views : 0,
      bounce: a.views ? 1 - a.engW / a.views : 0,
    }));

  const fAgg = new Map<string, { views: number; users: number; land: typeof landCur; children: Map<string, number> }>();
  for (const p of pages) {
    const f = firstFolder(p.path);
    if (!f) continue;
    const a = fAgg.get(f) ?? { views: 0, users: 0, land: [], children: new Map<string, number>() };
    a.views += p.views;
    a.users += p.users;
    if (p.path !== f) a.children.set(p.path, p.views);
    fAgg.set(f, a);
  }
  for (const r of landCur) {
    const f = firstFolder(r.landingPage);
    const a = f && fAgg.get(f);
    if (a) a.land.push(r);
  }
  const folders: LiveFolder[] = [...fAgg.entries()]
    .map(([path, a]) => {
      const t = totalsOf(a.land);
      return {
        path,
        share: +((a.views / totalViews) * 100).toFixed(2),
        views: a.views,
        users: a.users,
        visits: t.sessions,
        ppv: t.ppv,
        dur: t.dur,
        bounce: t.bounce,
        children: [...a.children.entries()].sort((x, y) => y[1] - x[1]).slice(0, 3).map(([c]) => c),
      };
    })
    .sort((a, b) => b.views - a.views);

  const hostViews = new Map<string, { views: number; durW: number }>();
  for (const r of pagesAll) {
    const h = hostOf(r);
    if (!h || h === "(not set)" || (h !== domain && !h.endsWith(`.${domain}`))) continue;
    const a = hostViews.get(h) ?? { views: 0, durW: 0 };
    a.views += r.screenPageViews;
    a.durW += r.averageSessionDuration * r.screenPageViews;
    hostViews.set(h, a);
  }
  const allViews = sum(pagesAll, (r) => r.screenPageViews) || 1;
  const subdomains: LiveSubdomain[] =
    hostViews.size > 1
      ? [...hostViews.entries()]
          .map(([name, a]) => {
            const visits = Math.max(1, Math.round((totals.sessions * a.views) / allViews));
            return { name, visits, views: a.views, desktop: null, ppv: a.views / visits, dur: a.views ? a.durW / a.views : 0 };
          })
          .sort((a, b) => b.visits - a.visits || b.views - a.views)
      : [{ name: [...hostViews.keys()][0] ?? domain, visits: totals.sessions, views: totals.views, desktop: devSessions ? desktop : null, ppv: totals.ppv, dur: totals.dur }];

  const ctDev = new Map<string, { all: number; desk: number }>();
  for (const r of cur(src.countryDevices?.rows)) {
    const k = (r.countryId || "").toUpperCase();
    const a = ctDev.get(k) ?? { all: 0, desk: 0 };
    a.all += r.sessions;
    if (r.deviceCategory === "desktop") a.desk += r.sessions;
    ctDev.set(k, a);
  }
  const ctCur = cur(src.countries?.rows).filter((r) => r.country && r.country !== "(not set)");
  const ctPrev = new Map<string, number>();
  for (const r of prev(src.countries?.rows)) ctPrev.set(r.countryId || r.country, (ctPrev.get(r.countryId || r.country) ?? 0) + r.sessions);
  const ctTotal = sum(cur(src.countries?.rows), (r) => r.sessions) || total;
  const countries: LiveCountry[] = ctCur
    .map((r) => {
      const code = (r.countryId || "").toUpperCase();
      const dev = ctDev.get(code);
      return {
        name: r.country,
        mapName: mapAlias[r.country] ?? r.country,
        code,
        sessions: r.sessions,
        users: r.totalUsers,
        share: +((r.sessions / ctTotal) * 100).toFixed(2),
        desktop: dev?.all ? +((dev.desk / dev.all) * 100).toFixed(2) : null,
        ppv: r.sessions ? r.screenPageViews / r.sessions : 0,
        dur: r.averageSessionDuration,
        bounce: r.bounceRate,
        up: r.sessions >= (ctPrev.get(r.countryId || r.country) ?? 0),
      };
    })
    .sort((a, b) => b.sessions - a.sessions);
  const mCt = new Map<string, { s: number; u: number }>();
  for (const r of src.monthlyCountries?.rows ?? []) {
    const k = `${(r.countryId || "").toUpperCase()}|${r.yearMonth}`;
    const a = mCt.get(k) ?? { s: 0, u: 0 };
    a.s += r.sessions;
    a.u += r.totalUsers;
    mCt.set(k, a);
  }
  const byCountry = mCt.size > 0;
  const series: CountrySeries[] = byCountry
    ? countries
        .filter((c) => c.code)
        .slice(0, 5)
        .map((c) => ({ name: c.name, code: c.code, visits: shown.map((m) => mCt.get(`${c.code}|${m.ym}`)?.s ?? 0), users: shown.map((m) => mCt.get(`${c.code}|${m.ym}`)?.u ?? 0) }))
    : [{ name: domain, code: "", visits: trend.Visits.data, users: trend["Unique Visitors"].data }];
  const peak = (k: "visits" | "users") => Math.max(0, ...series.flatMap((s) => s[k]));
  const countryTrend = { byCountry, series, visitTicks: niceTicks(peak("visits") * 1.05), userTicks: niceTicks(peak("users") * 1.05) };

  return {
    domain,
    fetchedAt,
    range,
    summary,
    totals,
    device,
    months: shown.map((m) => monthLabel(m.ym)),
    partialLast,
    trend,
    channels,
    channelTicks,
    channelTrend,
    sources,
    sourceCount: new Set(sources.map((r) => r.name)).size,
    landing,
    landingCount: landMap.size,
    pages,
    folders,
    subdomains,
    countries,
    countryTrend,
  };
}

export type TrendingLive = { kind: "Spiked" | "Trending up" | "Trending down"; pct: string; url: string; value: string };

const shortUrl = (domain: string, path: string) => {
  const full = pageLabel(domain, path);
  return full.length > 28 ? `${full.slice(0, 13)}...${full.slice(-11)}` : full;
};

export function trendingPages(live: TrafficLive, min = 3): Record<"Growing" | "Declining" | "Newly Detected", TrendingLive[]> {
  const fmtPct = (v: number) => `${v >= 1000 ? fmtCount(v) : +v.toFixed(1)}%`;
  const withPrev = live.pages.filter((p) => p.prevViews > 0);
  const growing = withPrev
    .filter((p) => p.views > p.prevViews && p.views >= min)
    .map((p) => ({ p, g: ((p.views - p.prevViews) / p.prevViews) * 100 }))
    .sort((a, b) => b.g - a.g)
    .slice(0, 5)
    .map(({ p, g }) => ({ kind: (g >= 100 ? "Spiked" : "Trending up") as TrendingLive["kind"], pct: fmtPct(g), url: shortUrl(live.domain, p.path), value: fmtCount(p.views) }));
  const declining = withPrev
    .filter((p) => p.views < p.prevViews && p.prevViews >= min)
    .map((p) => ({ p, g: ((p.prevViews - p.views) / p.prevViews) * 100 }))
    .sort((a, b) => b.g - a.g)
    .slice(0, 5)
    .map(({ p, g }) => ({ kind: "Trending down" as const, pct: fmtPct(g), url: shortUrl(live.domain, p.path), value: fmtCount(p.views) }));
  const fresh = live.pages
    .filter((p) => p.prevViews === 0 && p.views >= min)
    .slice(0, 5)
    .map((p) => ({ kind: "Spiked" as const, pct: "100%", url: shortUrl(live.domain, p.path), value: fmtCount(p.views) }));
  return { Growing: growing, Declining: declining, "Newly Detected": fresh };
}
