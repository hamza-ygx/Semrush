import type { SemKeyword, SemKeywordMetrics } from "@/lib/seo/semrushNormalize";
import type { KwRow } from "./data";
import type { KmtDataset } from "./kmt/dataset";

export type KwMetric = {
  keyword: string;
  volume: number | null;
  kd: number | null;
  cpc: number | null;
  competition: number | null;
  results: number | null;
  trends: number[];
  intents: string[];
  updated: string | null;
};

export type KwMetrics = Record<string, KwMetric>;

type Sets = { keywordMetrics?: { fetchedAt: string; rows: SemKeywordMetrics[] }; keywords?: { fetchedAt: string; rows: SemKeyword[] } };

const intentCodes = ["C", "I", "N", "T"];
export const intentLetters = (codes: number[]) => [...new Set(codes.map((c) => intentCodes[c]).filter(Boolean))];
export const normKw = (k: string) => k.trim().toLowerCase().replace(/\s+/g, " ");

const pickNum = (a: number | null | undefined, b: number | null | undefined) => (a ?? b ?? null);

export function buildKwMetrics(sem: Sets | null | undefined): KwMetrics {
  const out: KwMetrics = {};
  const kwRows = [...(sem?.keywords?.rows ?? [])].sort((a, b) => (a.position ?? 999) - (b.position ?? 999));
  const byKw = new Map<string, SemKeyword>();
  for (const r of kwRows) if (!byKw.has(normKw(r.keyword))) byKw.set(normKw(r.keyword), r);
  const metricDate = sem?.keywordMetrics?.fetchedAt ?? null;
  for (const m of sem?.keywordMetrics?.rows ?? []) {
    const k = normKw(m.keyword);
    if (!k) continue;
    const o = byKw.get(k);
    out[k] = {
      keyword: m.keyword,
      volume: pickNum(m.volume, o?.volume),
      kd: pickNum(m.kd, o?.kd),
      cpc: pickNum(m.cpc, o?.cpc),
      competition: pickNum(m.competition, o?.competition),
      results: pickNum(m.results, o?.results),
      trends: m.trends.length ? m.trends : (o?.trends ?? []),
      intents: intentLetters(m.intents.length ? m.intents : (o?.intents ?? [])),
      updated: metricDate ?? o?.updated ?? null,
    };
  }
  for (const [k, o] of byKw) {
    if (out[k]) continue;
    out[k] = {
      keyword: o.keyword,
      volume: o.volume,
      kd: o.kd,
      cpc: o.cpc,
      competition: o.competition,
      results: o.results,
      trends: o.trends,
      intents: intentLetters(o.intents),
      updated: o.updated ?? sem?.keywords?.fetchedAt ?? null,
    };
  }
  return out;
}

export const metricFor = (metrics: KwMetrics | null | undefined, keyword: string) => metrics?.[normKw(keyword)];

export function pickMetrics(metrics: KwMetrics, keywords: string[]): KwMetrics {
  const out: KwMetrics = {};
  for (const k of keywords) {
    const m = metrics[normKw(k)];
    if (m) out[normKw(k)] = m;
  }
  return out;
}

export function shortNum(n: number) {
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1000) return `${+(n / 1000).toFixed(1)}K`;
  return String(n);
}

export const kmtVolume = (n: number) => (n >= 1000 ? `${(Math.round(n / 100) / 10).toFixed(1)}K` : String(n));

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const dateLabel = (iso: string) => `${months[+iso.slice(5, 7) - 1]} ${+iso.slice(8, 10)}, ${iso.slice(0, 4)}`;

export function applyMetrics(row: KwRow, metrics: KwMetrics | null | undefined): KwRow {
  const m = metricFor(metrics, row.keyword);
  if (!m) return row;
  return {
    ...row,
    intents: m.intents.length ? m.intents : row.intents,
    volume: m.volume != null ? kmtVolume(m.volume) : row.volume,
    kd: m.kd != null ? Math.round(m.kd) : row.kd,
    cpc: m.cpc != null ? m.cpc.toFixed(2) : row.cpc,
    sf: row.sf ?? (m.kd != null ? 0 : null),
    trend: m.trends.length === 12 ? m.trends : row.trend,
    com: m.competition ?? row.com,
    results: m.results != null ? shortNum(m.results) : row.results,
    live: true,
  };
}

export function kmtWithMetrics(data: KmtDataset, metrics: KwMetrics | null | undefined): KmtDataset {
  if (!metrics || !Object.keys(metrics).length) return data;
  const map = (rows: KwRow[]) => rows.map((r) => applyMetrics(r, metrics));
  return { ...data, topicRows: map(data.topicRows), groupRows: map(data.groupRows), questionRows: map(data.questionRows), topicQuestionRows: map(data.topicQuestionRows) };
}

export const kmtKeywords = (data: KmtDataset) => [...new Set([...data.topicRows, ...data.groupRows, ...data.questionRows, ...data.topicQuestionRows].map((r) => r.keyword))];

const intentNames: Record<string, string> = { C: "Commercial", I: "Informational", N: "Navigational", T: "Transactional" };

function kdLabel(kd: number) {
  if (kd < 15) return { label: "Very easy", lead: "The easiest keyword to rank for." };
  if (kd < 30) return { label: "Easy", lead: "It is quite possible to rank for this keyword." };
  if (kd < 50) return { label: "Possible", lead: "Slightly more competition." };
  if (kd < 70) return { label: "Difficult", lead: "Even more competition." };
  if (kd < 85) return { label: "Hard", lead: "Very tough competition." };
  return { label: "Very hard", lead: "The hardest keyword to compete for." };
}

const kdTail: Record<string, string> = {
  "Very easy": "Your chance to start ranking new pages.",
  Easy: "You will need quality content focused on the keyword’s intent.",
  Possible: "You will need well-structured and unique content.",
  Difficult: "You will need lots of ref. domains and optimized content.",
  Hard: "You will need lots of high-quality ref. domains and optimized content.",
  "Very hard": "It will take a lot of on-page SEO, link building, and content promotion efforts.",
};

export type KoSummary = {
  volume: string;
  kd: number;
  kdLabel: string;
  kdText: string;
  globalVolume: string;
  countries: { code: string; value: number }[];
  intent: string;
  intents?: string[];
  trend: number[];
  cpc: string;
  competitiveDensity: string;
  pla: string;
};

export type KoLive = {
  keyword: string;
  summary: KoSummary;
  variations: { keyword: string; volume: string; kd: number }[];
  totalVolume: string;
  results: string | null;
  date: string | null;
};

export function buildKoLive(q: string, metrics: KwMetrics | null | undefined, mock: KoSummary): KoLive | null {
  const m = metricFor(metrics, q);
  if (!m) return null;
  const kd = m.kd != null ? Math.round(m.kd) : mock.kd;
  const info = kdLabel(kd);
  const se = m.volume ?? mock.countries.find((c) => c.code === "SE")?.value ?? 0;
  const countries = mock.countries.map((c) => (c.code === "SE" ? { ...c, value: se } : c));
  const intents = m.intents.map((i) => intentNames[i]).filter(Boolean);
  const vol = m.volume != null ? shortNum(m.volume) : mock.volume;
  return {
    keyword: m.keyword,
    summary: {
      ...mock,
      volume: vol,
      kd,
      kdLabel: info.label,
      kdText: `${info.lead} ${kdTail[info.label]}`,
      globalVolume: shortNum(countries.reduce((s, c) => s + c.value, 0)),
      countries: [...countries].sort((a, b) => b.value - a.value),
      intent: intents[0] ?? mock.intent,
      intents: intents.length ? intents : undefined,
      trend: m.trends.length === 12 ? m.trends : mock.trend,
      cpc: m.cpc != null ? `$${m.cpc.toFixed(2)}` : mock.cpc,
      competitiveDensity: m.competition != null ? m.competition.toFixed(2) : mock.competitiveDensity,
    },
    variations: [{ keyword: m.keyword, volume: vol, kd }],
    totalVolume: vol,
    results: m.results != null ? shortNum(m.results) : null,
    date: m.updated ? dateLabel(m.updated) : null,
  };
}
