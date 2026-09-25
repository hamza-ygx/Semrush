export const kmtDatabases: { code: string; name: string }[] = [
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MY", name: "Malaysia" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NG", name: "Nigeria" },
  { code: "NO", name: "Norway" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TW", name: "Taiwan" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "VN", name: "Vietnam" },
];

export const kmtLanguages = ["English", "Swedish", "German", "French", "Spanish", "Italian", "Polish", "Dutch", "Portuguese", "Danish", "Norwegian", "Finnish"];

export const volumeRanges = ["100,001+", "10,001–100,000", "1,001–10,000", "101–1,000", "11–100", "1–10"];
export const kdRanges = [
  { name: "Very hard", range: "85–100%" },
  { name: "Hard", range: "70–84%" },
  { name: "Difficult", range: "50–69%" },
  { name: "Possible", range: "30–49%" },
  { name: "Easy", range: "15–29%" },
  { name: "Very easy", range: "0–14%" },
];

export const currencies = [
  { code: "USD", label: "USD, $", rate: 1 },
  { code: "SEK", label: "SEK", rate: 10.5 },
] as const;

export type Currency = (typeof currencies)[number]["code"];

export const intentInfo: Record<string, { name: string; text: string }> = {
  I: { name: "Informational", text: "The user wants to find an answer to a specific question." },
  N: { name: "Navigational", text: "The user wants to find a specific page or site." },
  C: { name: "Commercial", text: "The user wants to investigate brands or services." },
  T: { name: "Transactional", text: "The user wants to complete an action (conversion)." },
};

export function kdInfo(kd: number) {
  if (kd < 15) return { name: "Very easy", text: "Your chance to start ranking new pages." };
  if (kd < 30) return { name: "Easy", text: "You will need quality content focused on the keyword’s intent." };
  if (kd < 50) return { name: "Possible", text: "You will need well-structured and unique content." };
  if (kd < 70) return { name: "Difficult", text: "You will need lots of ref. domains and optimized content." };
  if (kd < 85) return { name: "Hard", text: "You will need lots of high-quality ref. domains and optimized content." };
  return { name: "Very hard", text: "It will take a lot of on-page SEO, link building, and content promotion efforts." };
}

export type SfKind = "ai" | "video" | "paa" | "related" | "local" | "sitelinks" | "reviews" | "images";

export const sfLabels: Record<SfKind, string> = {
  ai: "AI Overview",
  video: "Video",
  paa: "People also ask",
  related: "Related searches",
  local: "Local pack",
  sitelinks: "Sitelinks",
  reviews: "Reviews",
  images: "Image",
};

const sfOrder: SfKind[] = ["ai", "video", "paa", "related", "local", "sitelinks", "reviews", "images"];
export const sfFeatures = (n: number, withAi: boolean) => (withAi ? sfOrder : sfOrder.slice(1)).slice(0, n);

export type KmtColumn = "intent" | "trend" | "kd" | "cpc" | "density" | "sf" | "results" | "updated";

export const kmtColumns: { key: KmtColumn | "keyword" | "volume"; label: string; locked?: boolean }[] = [
  { key: "keyword", label: "Keyword", locked: true },
  { key: "intent", label: "Intent" },
  { key: "volume", label: "Volume", locked: true },
  { key: "trend", label: "Trend" },
  { key: "kd", label: "KD %" },
  { key: "cpc", label: "CPC (USD)" },
  { key: "density", label: "Competitive Density" },
  { key: "sf", label: "SERP Features" },
  { key: "results", label: "Results" },
  { key: "updated", label: "Updated", locked: true },
];

export const subGroups: Record<string, { label: string; count: string }[]> = {
  "questions:redovisning": [
    { label: "göra", count: "9" },
    { label: "betyder", count: "8" },
    { label: "extern", count: "7" },
    { label: "ska", count: "7" },
    { label: "bokföra", count: "6" },
    { label: "men", count: "6" },
    { label: "finns", count: "5" },
    { label: "kostar", count: "5" },
    { label: "skillnad", count: "4" },
    { label: "intern", count: "4" },
  ],
  "all:redovisning": [
    { label: "ab", count: "528" },
    { label: "bokföra", count: "198" },
    { label: "extern", count: "159" },
    { label: "ekonomi", count: "135" },
    { label: "revision", count: "131" },
    { label: "2", count: "122" },
    { label: "muntlig", count: "121" },
    { label: "stockholm", count: "116" },
    { label: "byrå", count: "102" },
    { label: "utbildning", count: "95" },
    { label: "göteborg", count: "86" },
    { label: "enskild", count: "79" },
  ],
};

export const recentSearches = [{ day: "Today", items: [{ q: "redovisning", db: "SE" }] }];

export const startExamples = ["loans", "movies", "how to buy audible books"];

export const koLocations: { name: string; type: string }[] = [
  { name: "Ahus, Skane County", type: "City" },
  { name: "Balsta, Uppsala County", type: "City" },
  { name: "Bastad Municipality, Skane County", type: "Municipality" },
  { name: "Blekinge County", type: "County" },
  { name: "Charlottenberg, Varmland County", type: "City" },
  { name: "Degerfors, Orebro County", type: "City" },
  { name: "Danderyd Municipality, Stockholm County", type: "Municipality" },
  { name: "Falkenberg, Halland County", type: "City" },
  { name: "Gothenburg, Vastra Gotaland County", type: "City" },
  { name: "Halland County", type: "County" },
  { name: "Halmstad, Halland County", type: "City" },
  { name: "Helsingborg, Skane County", type: "City" },
  { name: "Jonkoping, Jonkoping County", type: "City" },
  { name: "Kalmar, Kalmar County", type: "City" },
  { name: "Malmo, Skane County", type: "City" },
  { name: "Stockholm, Stockholm County", type: "City" },
  { name: "Uppsala, Uppsala County", type: "City" },
  { name: "Varberg, Halland County", type: "City" },
];

export type QvSerpRow =
  | { kind: "feature"; feature: SfKind; label: string }
  | { kind: "url"; pos: number; url: string; pageAs: number; refDomains: number; keywords: number; features?: SfKind[] };

export type QuickViewData = {
  global: string;
  countries: { code: string; name: string; value: string }[];
  kd: number;
  intent: string;
  cpc: string;
  trend: number[];
  questions: { keyword: string; volume: string }[];
  related: { keyword: string; volume: string }[];
  serpTotal: string;
  serp: QvSerpRow[];
};

export const quickViews: Record<string, QuickViewData> = {
  redovisningsbyrå: {
    global: "2.7K",
    countries: [
      { code: "SE", name: "Sweden", value: "1.9K" },
      { code: "US", name: "United States", value: "260" },
      { code: "DE", name: "Germany", value: "50" },
      { code: "NO", name: "Norway", value: "40" },
      { code: "ID", name: "Indonesia", value: "30" },
    ],
    kd: 33,
    intent: "Commercial",
    cpc: "10.53",
    trend: [5, 8, 16, 10, 8, 6.5, 8, 10, 13.5, 24, 17, 12],
    questions: [
      { keyword: "vad gör en redovisningsbyrå", volume: "50" },
      { keyword: "vad kostar redovisningsbyrå", volume: "30" },
      { keyword: "vad är redovisningsbyrå", volume: "30" },
    ],
    related: [
      { keyword: "redovisningsbyrå enskild firma", volume: "5.4K" },
      { keyword: "hjälp med bokföring aktiebolag", volume: "170" },
      { keyword: "revision", volume: "4.4K" },
    ],
    serpTotal: "113",
    serp: [
      { kind: "feature", feature: "local", label: "Local pack (2 links)" },
      { kind: "url", pos: 1, url: "redovisningsbyrån.nu/", pageAs: 73, refDomains: 243, keywords: 1265, features: ["images"] },
      { kind: "feature", feature: "paa", label: "People also ask (1 link)" },
      { kind: "url", pos: 2, url: "redovisningskollen.se/", pageAs: 69, refDomains: 187, keywords: 842 },
      { kind: "url", pos: 3, url: "fortnox.se/fortnox-foretagsguide/redovisningsbyra/", pageAs: 41, refDomains: 12, keywords: 96 },
      { kind: "url", pos: 4, url: "www.bokio.se/redovisningsbyra/", pageAs: 38, refDomains: 9, keywords: 211 },
      { kind: "url", pos: 5, url: "www.aspia.se/redovisning/", pageAs: 35, refDomains: 21, keywords: 164 },
      { kind: "url", pos: 6, url: "www.azets.com/sv-se/redovisning", pageAs: 33, refDomains: 14, keywords: 120 },
      { kind: "url", pos: 7, url: "www.srfkonsult.se/hitta-konsult/", pageAs: 30, refDomains: 18, keywords: 77 },
      { kind: "url", pos: 8, url: "www.hitta.se/redovisningsbyrå/", pageAs: 27, refDomains: 3, keywords: 52 },
      { kind: "url", pos: 9, url: "www.verksamt.se/driva/ekonomi", pageAs: 44, refDomains: 36, keywords: 310 },
      { kind: "url", pos: 10, url: "sv.wikipedia.org/wiki/Redovisningsbyrå", pageAs: 52, refDomains: 11, keywords: 28 },
    ],
  },
};
