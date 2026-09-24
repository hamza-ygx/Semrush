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
export const kdRanges = ["Very hard 85–100%", "Hard 70–84%", "Difficult 50–69%", "Possible 30–49%", "Easy 15–29%", "Very easy 0–14%"];

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
  images: "Image pack",
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
    { label: "ab", count: "512" },
    { label: "byrå", count: "498" },
    { label: "ekonomi", count: "131" },
    { label: "extern", count: "127" },
    { label: "revision", count: "119" },
    { label: "stockholm", count: "104" },
    { label: "utbildning", count: "92" },
    { label: "göteborg", count: "80" },
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
