import { quickViews, sfLabels, type QuickViewData, type SfKind } from "./data";
import { allGroups, groupRows, kmStats, questionGroups, questionRows, topicQuestionRows, topicRows, topics, type KwRow } from "../data";

export type KmtStats = { all: string; total?: string; volume: string; kd: string; pages: number };
export type KmtGroup = { label: string; count: string };
export type KmtTopic = { label: string; count: string; qCount: string };

export type KmtDataset = {
  seed: string;
  topicRows: KwRow[];
  groupRows: KwRow[];
  questionRows: KwRow[];
  topicQuestionRows: KwRow[];
  topics: KmtTopic[];
  allGroups: KmtGroup[];
  questionGroups: KmtGroup[];
  stats: { topics: KmtStats; topicQuestions: KmtStats; groups: KmtStats; questions: KmtStats };
};

const captured: KmtDataset = {
  seed: "redovisning",
  topicRows,
  groupRows,
  questionRows,
  topicQuestionRows,
  topics,
  allGroups,
  questionGroups,
  stats: kmStats,
};

const modifiers = [
  "online",
  "pris",
  "kurs",
  "stockholm",
  "göteborg",
  "malmö",
  "gratis",
  "bäst",
  "test",
  "jobb",
  "utbildning",
  "företag",
  "app",
  "tips",
  "guide",
  "uppsala",
  "billig",
  "sverige",
  "near me",
  "for beginners",
];
const topicWords = ["pris och kostnad", "utbildning och kurser", "tjänster i stockholm", "jämförelse och test", "tips för nybörjare", "företag och byråer", "jobb och karriär", "online verktyg"];
const questionStarts = ["vad är", "hur fungerar", "vad kostar", "varför", "hur mycket kostar", "när behöver man", "var hittar man", "vilken är bäst"];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const fmt = (n: number) => n.toLocaleString("en-US");
const short = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));
const vol = (n: number) => (n >= 1000 ? `${(Math.round(n / 100) / 10).toFixed(1)}K` : String(n));
const volumes = [2400, 1900, 1600, 1300, 1000, 880, 720, 590, 480, 390, 320, 260, 210, 170, 140, 110, 90, 70, 50, 40, 30, 20, 10];

function row(keyword: string, i: number, relevance?: number): KwRow {
  const h = hash(keyword);
  const has = i < 14 || h % 3 !== 0;
  const intents = ["C", "I", "T", "N"];
  return {
    keyword,
    intents: has ? [intents[h % 4], ...(h % 7 === 0 ? [intents[(h >>> 3) % 4]] : [])].filter((x, j, a) => a.indexOf(x) === j) : [],
    relevance,
    volume: vol(volumes[Math.min(volumes.length - 1, i)]),
    kd: has ? 5 + (h % 60) : null,
    cpc: ((h >>> 5) % 1500 / 100).toFixed(2),
    sf: has ? 1 + ((h >>> 2) % 7) : null,
    sfIcon: has && h % 2 === 0,
  };
}

function generate(q: string): KmtDataset {
  const seed = q.toLowerCase();
  const h = hash(seed);
  const total = 400 + (h % 9000);
  const groupKeywords = [seed, ...modifiers.map((m) => `${seed} ${m}`)];
  const byVolume = groupKeywords.map((k, i) => row(k, i));
  const topicList = topicWords.map((t) => `${seed} ${t}`).map((label, i) => {
    const c = Math.max(3, Math.round(total / (3 + i * 1.7)));
    return { label, count: short(c), qCount: String(Math.max(1, Math.round(c / 11))) };
  });
  const questionKw = questionStarts.map((s, i) => (i % 2 ? `${s} ${seed}` : `${s} en ${seed}`));
  const qRows = questionKw.map((k, i) => row(k, i + 12));
  const groups = modifiers.filter((m) => m !== seed).slice(0, 16).map((m, i) => ({ label: m, count: fmt(Math.max(1, Math.round(total / (2.5 + i * 1.3)))) }));
  const sum = (rows: KwRow[]) => rows.reduce((a, r) => a + (parseFloat(r.volume) * (/K$/.test(r.volume) ? 1000 : 1) || 0), 0);
  const avgKd = (rows: KwRow[]) => `${Math.round(rows.reduce((a, r) => a + (r.kd ?? 0), 0) / Math.max(1, rows.filter((r) => r.kd != null).length))}%`;
  const topicTotal = total * 7;
  const qTotal = Math.max(qRows.length, Math.round(total / 11));
  return {
    seed,
    topicRows: byVolume.map((r, i) => ({ ...r, relevance: i === 0 ? 100 : 71 })),
    groupRows: byVolume,
    questionRows: qRows,
    topicQuestionRows: qRows.map((r) => ({ ...r, relevance: 71 })),
    topics: [{ label: "All", count: short(topicTotal), qCount: short(Math.round(topicTotal / 10)) }, ...topicList],
    allGroups: [{ label: seed, count: fmt(Math.round(total * 0.97)) }, ...groups],
    questionGroups: [{ label: seed, count: fmt(qTotal) }, ...["vad", "hur", "varför", "kostar"].filter((w) => w !== seed).map((w, i) => ({ label: w, count: fmt(Math.max(1, Math.round(qTotal / (2 + i)))) }))],
    stats: {
      topics: { all: short(topicTotal), total: fmt(topicTotal), volume: fmt(sum(byVolume) * 6), kd: avgKd(byVolume), pages: Math.ceil(topicTotal / 100) },
      topicQuestions: { all: short(Math.round(topicTotal / 10)), total: fmt(Math.round(topicTotal / 10)), volume: fmt(sum(qRows) * 4), kd: avgKd(qRows), pages: Math.ceil(topicTotal / 1000) },
      groups: { all: short(total), total: fmt(total), volume: fmt(sum(byVolume)), kd: avgKd(byVolume), pages: Math.ceil(total / 100) },
      questions: { all: fmt(qTotal), total: fmt(qTotal), volume: fmt(sum(qRows)), kd: avgKd(qRows), pages: Math.ceil(qTotal / 100) },
    },
  };
}

export function kmtDataset(q: string): KmtDataset {
  const seed = q.trim().toLowerCase();
  return seed === captured.seed ? captured : generate(seed || captured.seed);
}

export function quickViewFor(row: KwRow): QuickViewData {
  const known = quickViews[row.keyword];
  if (known) return known;
  const h = hash(row.keyword);
  const base = parseFloat(row.volume) * (/K$/.test(row.volume) ? 1000 : 1) || 0;
  const n = (f: number) => {
    const v = Math.round(base * f);
    return v >= 1000 ? short(v) : String(v);
  };
  const intentNames: Record<string, string> = { C: "Commercial", I: "Informational", N: "Navigational", T: "Transactional" };
  const feats: SfKind[] = ["local", "paa", "video", "images"];
  const feat = feats[h % 4];
  const domain = row.keyword.split(" ")[0].replace(/[^a-z0-9åäö]/gi, "");
  return {
    global: n(1.4),
    countries: [
      { code: "SE", name: "Sweden", value: row.volume },
      { code: "US", name: "United States", value: n(0.12) },
      { code: "DE", name: "Germany", value: n(0.03) },
      { code: "NO", name: "Norway", value: n(0.02) },
      { code: "FI", name: "Finland", value: n(0.01) },
    ],
    kd: row.kd ?? 0,
    intent: intentNames[row.intents[0]] ?? "n/a",
    cpc: row.cpc,
    trend: Array.from({ length: 12 }, (_, i) => 4 + ((h >>> i) % 20)),
    questions: [`vad är ${row.keyword}`, `hur fungerar ${row.keyword}`, `vad kostar ${row.keyword}`].map((k, i) => ({ keyword: k, volume: String([40, 30, 20][i]) })),
    related: [`${row.keyword} pris`, `${row.keyword} online`, `bästa ${row.keyword}`].map((k, i) => ({ keyword: k, volume: String([90, 50, 30][i]) })),
    serpTotal: String(20 + (h % 180)),
    serp: [
      { kind: "feature", feature: feat, label: `${sfLabels[feat]} (1 link)` },
      ...Array.from({ length: 10 }, (_, i) => ({
        kind: "url" as const,
        pos: i + 1,
        url: `${domain || "example"}${["", "-guide", "-byra", "-tips", "-online", "-pris", "-sverige", "-info", "-hjalp", "-expert"][i]}.se/`,
        pageAs: 10 + ((h >>> i) % 60),
        refDomains: (h >>> (i + 2)) % 300,
        keywords: (h >>> (i + 1)) % 900,
      })),
    ],
  };
}
