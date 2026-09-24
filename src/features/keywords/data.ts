export const koKeyword = "redovisningsbyrå halmstad";

export const koSummary = {
  volume: "880",
  kd: 16,
  kdLabel: "Easy",
  kdText: "It is quite possible to rank for this keyword. You will need quality content focused on the keyword’s intent.",
  globalVolume: "890",
  countries: [
    { code: "SE", value: 880 },
    { code: "BR", value: 10 },
    { code: "AU", value: 0 },
    { code: "BE", value: 0 },
    { code: "CA", value: 0 },
    { code: "DE", value: 0 },
  ],
  intent: "Commercial",
  trend: [0.78, 0.53, 0.19, 0.08, 0.06, 0.1, 1, 0.26, 0.1, 0.14, 0.14, 0.12],
  cpc: "$6.01",
  competitiveDensity: "0.61",
  pla: "n/a",
};

export const koVariations = [{ keyword: "redovisningsbyrå halmstad", volume: "880", kd: 16 }];

export type SerpRow =
  | { kind: "local" }
  | { kind: "url"; pos: number; url: string; domain: string; pageAs: number; refDomains: number; backlinks: number; traffic: number; urlKeywords: number };

export const serpRows: SerpRow[] = [
  { kind: "local" },
  { kind: "url", pos: 1, url: "https://bdcg.se/", domain: "bdcg.se", pageAs: 49, refDomains: 168, backlinks: 346, traffic: 34, urlKeywords: 212 },
  { kind: "url", pos: 2, url: "https://www.halmstadrevisionsbyra.se/", domain: "halmstadrevisionsbyra.se", pageAs: 13, refDomains: 1, backlinks: 1, traffic: 31, urlKeywords: 18 },
  { kind: "url", pos: 3, url: "https://rkjh.se/", domain: "rkjh.se", pageAs: 6, refDomains: 213, backlinks: 292, traffic: 52, urlKeywords: 64 },
  { kind: "url", pos: 4, url: "https://bs-redovisning.se/", domain: "bs-redovisning.se", pageAs: 0, refDomains: 177, backlinks: 308, traffic: 33, urlKeywords: 41 },
  { kind: "url", pos: 5, url: "https://www.azets.com/sv-se/kontor/halmstad", domain: "azets.com", pageAs: 0, refDomains: 0, backlinks: 0, traffic: 61, urlKeywords: 27 },
  { kind: "url", pos: 6, url: "https://ludvig.se/kontor/halmstad/redovisningsbyra/", domain: "ludvig.se", pageAs: 9, refDomains: 1, backlinks: 2, traffic: 8, urlKeywords: 12 },
  { kind: "local" },
  { kind: "url", pos: 7, url: "https://www.lrakridi.se/vara-tjanster/redovisning/", domain: "lrakridi.se", pageAs: 0, refDomains: 0, backlinks: 0, traffic: 5, urlKeywords: 9 },
  { kind: "url", pos: 8, url: "https://ek3hjartan.se/", domain: "ek3hjartan.se", pageAs: 0, refDomains: 177, backlinks: 487, traffic: 12, urlKeywords: 21 },
  { kind: "url", pos: 9, url: "https://www.hitta.se/redovisningsbyrå+halmstad/företag/2", domain: "hitta.se", pageAs: 0, refDomains: 0, backlinks: 0, traffic: 4, urlKeywords: 6 },
  { kind: "url", pos: 10, url: "https://www.aspia.se/kontakt/halmstad/", domain: "aspia.se", pageAs: 0, refDomains: 0, backlinks: 0, traffic: 36, urlKeywords: 15 },
];

export const serpRanges = ["1-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"];

export type KwRow = {
  keyword: string;
  intents: string[];
  relevance?: number;
  volume: string;
  kd: number | null;
  cpc: string;
  sf: number | null;
  sfIcon?: boolean;
  added?: boolean;
  results?: string;
};

const r = (keyword: string, intents: string, volume: string, kd: number | null, cpc: string, sf: number | null, sfIcon = false, relevance = 71): KwRow => ({
  keyword,
  intents: intents ? intents.split("") : [],
  relevance,
  volume,
  kd,
  cpc,
  sf,
  sfIcon,
});

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

const filler = (names: string[], volume: string) =>
  names.map((k) => {
    const h = hash(k);
    const has = h % 3 === 0;
    const intents = has ? ["C", "I", "T"][h % 3 === 0 ? (h >>> 3) % 3 : 0] : "";
    return r(k, intents, volume, has ? 5 + (h % 30) : null, (((h >>> 5) % 900) / 100).toFixed(2), has ? 1 + ((h >>> 2) % 6) : null, has && h % 2 === 0);
  });

export const topicRows: KwRow[] = [
  r("redovisning", "C", "1.6K", 23, "6.94", 8, true, 100),
  r("redovisningsbyrå enskild firma", "I", "5.4K", 25, "8.55", 5, true),
  r("redovisningsfirma", "C", "40", 7, "17.65", 4),
  r("accounting firm stockholm", "C", "30", 22, "0.00", 3, true),
  r("billig redovisning", "I", "30", 42, "10.14", 5),
  r("deloitte redovisning", "TN", "30", 28, "2.33", 2, true),
  r("jobba på redovisningsbyrå", "", "30", null, "0.00", null),
  r("praktikplats redovisningsbyrå", "I", "30", 15, "1.77", 3, true),
  r("redovisning halmstad", "C", "30", 12, "5.12", 4, true),
  r("redovisning online", "C", "30", 19, "7.40", 3),
  r("redovisningsbranschen", "", "30", null, "0.00", null),
  r("redovisningsbyrå spanien", "", "30", null, "0.00", null),
  r("redovisningsbyrå stockholm praktik", "C", "30", 8, "3.09", 1, true),
  r("redovisningsbyråer sverige", "C", "30", 29, "3.87", 3, true),
  r("redovisningsföreningen", "", "30", null, "0.91", null),
  r("redovisningsföretag", "C", "30", 22, "8.94", 4),
  r("redovisningsföretag stockholm", "", "30", null, "11.78", null),
  r("råggärds redovisningsbyrå ab", "I", "30", 14, "0.99", 3, true),
  r("seven redovisning göteborg", "", "30", null, "0.00", null),
  r("swedish accounting software", "", "30", null, "0.00", null),
  r("vad är redovisningsbyrå", "", "30", null, "0.00", null),
  r("acca sverige", "", "20", null, "0.00", null),
  r("accountant stockholm", "", "20", null, "6.55", null),
  r("accounting firm sweden", "", "20", null, "0.00", null),
  r("accounting software sweden", "", "20", null, "5.55", null),
  ...filler(
    [
      "aktiebolag redovisning",
      "anlita redovisningsbyrå",
      "arvode redovisningskonsult",
      "auktoriserad redovisningskonsult göteborg",
      "billig redovisningsbyrå stockholm",
      "bokföring och redovisning kurs",
      "bokföringsbyrå halmstad",
      "bokslut och redovisning",
      "digital redovisningsbyrå",
      "ekonomi och redovisning",
      "enskild firma redovisning",
      "extern redovisning bok",
      "finansiell redovisning kurs",
      "god redovisningssed",
      "intern redovisning",
      "k2 redovisning",
      "k3 redovisning",
      "kostnad redovisningsbyrå",
      "lön och redovisning",
      "malmö redovisningsbyrå",
      "redovisning aktiebolag",
      "redovisning distans",
      "redovisning och beskattning",
      "redovisning uppsala",
      "redovisningsbyrå göteborg",
      "redovisningsbyrå malmö",
      "redovisningsbyrå pris",
      "redovisningsekonom",
      "redovisningskonsult lön",
      "srf redovisning",
      "utbildning redovisning",
      "vad kostar redovisningsbyrå",
    ],
    "20",
  ),
  ...filler(
    [
      "acca kurs",
      "aktiebolag bokslut",
      "anläggningsregister redovisning",
      "arbetsgivaravgift redovisning",
      "bokföring bostadsrättsförening pris",
      "bokföringsbyrå göteborg",
      "digital bokföring",
      "ekonomibyrå halmstad",
      "ekonomikonsult stockholm",
      "fakturering och redovisning",
      "förening redovisning",
      "halvårsbokslut",
      "handelsbolag redovisning",
      "ideell förening redovisning",
      "kassaregister redovisning",
      "kontoplan redovisning",
      "leverantörsreskontra",
      "löpande redovisning",
      "momsredovisning",
      "periodisering redovisning",
      "redovisning bostadsrättsförening",
      "redovisning göteborg",
      "redovisning jobb",
      "redovisning kurs distans",
      "redovisningsbyrå jönköping",
      "redovisningsbyrå lund",
      "redovisningsbyrå uppsala",
      "redovisningsprogram",
      "revisionsbyrå halmstad",
      "skatteredovisning",
      "årsbokslut enskild firma",
      "ägarbyte redovisning",
    ],
    "10",
  ),
  r("acca exam sweden", "", "0", null, "0.00", null),
  r("acca stockholm", "", "0", null, "0.00", null),
  r("accountancy firm stockholm", "", "0", null, "0.00", null),
  r("accountancy firms sweden", "", "0", null, "0.00", null),
  r("accountancy in sweden", "", "0", null, "0.00", null),
  r("accountant for freelancers sweden", "", "0", null, "0.00", null),
  r("accountant sme international sweden", "", "0", null, "0.00", null),
  r("accountants in stockholm", "", "0", null, "0.00", null),
  r("accountants in sweden for the past years", "", "0", null, "0.00", null),
  r("accountants today sweden", "", "0", null, "0.00", null),
  r("accounter stockholm", "", "0", null, "0.00", null),
];

const g = (keyword: string, intents: string, volume: string, kd: number | null, cpc: string, sf: number | null, sfIcon = false): KwRow => ({
  keyword,
  intents: intents ? intents.split("") : [],
  volume,
  kd,
  cpc,
  sf,
  sfIcon,
});

export const groupRows: KwRow[] = [
  g("redovisningsbyrå", "C", "1.9K", 33, "10.53", 5, true),
  g("redovisningsekonom utbildning", "I", "1.9K", 27, "0.68", 7, true),
  g("bokföring bostadsrättsförening", "I", "1.6K", 13, "5.49", 4),
  g("outsourcing redovisning", "I", "1.6K", 15, "6.39", 4),
  { ...g("redovisning", "C", "1.6K", 23, "6.94", 8, true), added: true },
  g("redovisningsbyrå sollentuna", "C", "1.6K", 9, "5.48", 3, true),
  g("utbildning bokföring", "I", "1.6K", 14, "0.88", 6),
  g("redovisning rådgivning", "C", "1.0K", 15, "0.00", 5, true),
  g("redovisningskonsult ängelholm", "C", "1.0K", 12, "4.72", 3, true),
  g("redovisningsbyrå stockholm", "C", "880", 31, "12.40", 6, true),
  g("redovisningskonsult", "C", "880", 24, "9.83", 5, true),
  g("auktoriserad redovisningskonsult", "I", "720", 18, "4.21", 4),
  g("redovisningsbyrå göteborg", "C", "590", 21, "11.06", 6, true),
  g("redovisning kurs", "I", "590", 12, "1.85", 5),
  g("redovisningsbyrå malmö", "C", "480", 20, "10.72", 5, true),
  g("extern redovisning", "I", "480", 11, "0.00", 4),
  g("redovisningsekonom", "I", "390", 26, "0.92", 6, true),
  g("redovisningsbyrå uppsala", "C", "320", 17, "9.10", 4),
  g("finansiell redovisning", "I", "320", 22, "0.00", 5, true),
  g("redovisningsbyrå halmstad", "C", "880", 16, "6.01", 5, true),
  g("redovisning enskild firma", "I", "260", 14, "3.44", 4),
  g("redovisningsbyrå pris", "C", "210", 19, "8.02", 3),
  g("intern redovisning", "I", "210", 9, "0.00", 4),
  g("redovisning ab", "C", "170", 21, "5.67", 3, true),
  g("redovisningsbyrå örebro", "C", "170", 15, "7.35", 4),
  g("redovisning förening", "I", "140", 10, "1.22", 3),
];

export const questionRows: KwRow[] = [
  g("vad är bokföring", "I", "320", 20, "1.40", 5, true),
  g("vad är redovisning", "I", "110", 9, "0.86", 4, true),
  g("vad gör en redovisningsbyrå", "I", "50", 9, "1.53", 6),
  g("vad är extern redovisning", "I", "50", 11, "0.00", 5, true),
  g("vad är affärshändelse", "I", "40", 8, "0.00", 5, true),
  g("vad är externredovisning", "I", "40", 10, "0.00", 4),
  g("vad är intern redovisning", "I", "40", 10, "0.00", 5),
  g("vad är kassabok", "I", "40", 8, "0.37", 4, true),
  g("vad är god redovisningssed", "I", "30", 10, "0.10", 4, true),
  g("vad betyder redovisning", "I", "30", 7, "0.00", 4),
  g("vad kostar en redovisningsbyrå", "I", "30", 12, "4.12", 5, true),
  g("vad gör en redovisningsekonom", "I", "30", 10, "0.55", 5),
  g("hur bokför man", "I", "20", 13, "1.02", 4, true),
  g("vad ska man bokföra", "I", "20", 6, "0.00", 3),
  g("vad är skillnaden mellan bokföring och redovisning", "I", "20", 5, "0.00", 4),
  g("varför redovisning", "I", "20", null, "0.00", null),
  g("när ska man göra bokslut", "I", "10", 9, "0.00", 3),
  g("vad är finansiell redovisning", "I", "10", 7, "0.00", 4, true),
  g("hur fungerar redovisning", "I", "10", null, "0.00", null),
  g("vad betyder extern redovisning", "I", "10", 6, "0.00", 3),
];

export const topics = [
  { label: "All", count: "56.4K" },
  { label: "redovisningsbyråer i sverige", count: "562" },
  { label: "rådgivning redovisning", count: "115" },
  { label: "förenklat årsbokslut", count: "695" },
  { label: "finansiell rapportering", count: "213" },
  { label: "inventarier och avskrivningar", count: "989" },
  { label: "rex standard", count: "176" },
  { label: "revision definition och betydelse", count: "247" },
  { label: "revisor eller redovisningskonsult", count: "79" },
  { label: "bokföring enskild firma", count: "1.7K" },
  { label: "Årsredovisning och mallar", count: "951" },
  { label: "bokföring för nybörjare", count: "390" },
  { label: "bokföring i stockholm", count: "151" },
  { label: "koncern och dotterbolag", count: "409" },
  { label: "redovisningsekonom utbildning", count: "518" },
  { label: "moms och skatt", count: "1.2K" },
  { label: "löneadministration", count: "287" },
  { label: "bokslut aktiebolag", count: "644" },
  { label: "k2 och k3 regelverk", count: "301" },
  { label: "redovisningsprogram", count: "455" },
];

export const allGroups = [
  { label: "redovisning", count: "7,747" },
  { label: "ab", count: "534" },
  { label: "bokföra", count: "223" },
  { label: "extern", count: "159" },
  { label: "ekonomi", count: "135" },
  { label: "revision", count: "133" },
  { label: "2", count: "122" },
  { label: "muntlig", count: "121" },
  { label: "stockholm", count: "118" },
  { label: "byrå", count: "104" },
  { label: "utbildning", count: "97" },
  { label: "göteborg", count: "88" },
  { label: "enskild", count: "81" },
  { label: "firma", count: "79" },
  { label: "intern", count: "66" },
  { label: "kurs", count: "61" },
];

export const questionGroups = [
  { label: "redovisning", count: "201" },
  { label: "göra", count: "10" },
  { label: "betyder", count: "8" },
  { label: "bokföra", count: "7" },
  { label: "extern", count: "7" },
  { label: "ska", count: "7" },
  { label: "men", count: "6" },
  { label: "kostar", count: "5" },
  { label: "skillnad", count: "5" },
  { label: "intern", count: "4" },
  { label: "bokslut", count: "4" },
  { label: "fungerar", count: "3" },
];

export const kmStats = {
  topics: { all: "56.4K", volume: "503,070", kd: "18%", pages: 565 },
  groups: { all: "7.9K", total: "7,905", volume: "64,250", kd: "17%", pages: 80 },
  questions: { all: "207", total: "207", volume: "870", kd: "11%", pages: 3 },
};
