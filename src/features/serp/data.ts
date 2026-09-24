export const dbNames: Record<string, string> = {
  se: "Sweden",
  us: "United States",
  uk: "United Kingdom",
  de: "Germany",
  no: "Norway",
  dk: "Denmark",
  fi: "Finland",
};

export const tabs = ["AI-läge", "Allt", "Bilder", "Platser", "Videor", "Platswebbplatser", "Nyheter"];

export type Place = {
  name: string;
  rating: string;
  stars: number;
  reviews: number;
  kind: string;
  line2: string;
  open: boolean;
  line3: string;
};

export const places: Place[] = [
  { name: "Jb Ekonomipartner AB", rating: "5,0", stars: 5, reviews: 1, kind: "Bokföringstjänster", line2: "Över 7 år i branschen · Halmstad", open: false, line3: "Öppnar tis kl. 10 · 070-743 09 11" },
  { name: "Palms Redovisningsbyrå AB", rating: "4,8", stars: 5, reviews: 6, kind: "Redovisningsbyrå", line2: "Över 20 år i branschen · Halmstad", open: false, line3: "Öppnar tis kl. 08 · 035-21 04 50" },
  { name: "Accenten Redovisning", rating: "4,6", stars: 4.5, reviews: 9, kind: "Revisor", line2: "Över 10 år i branschen · Halmstad", open: false, line3: "Öppnar tis kl. 08 · 035-18 22 30" },
];

export const questions = [
  "Vad kostar en redovisningsbyrå per månad?",
  "Hur mycket kostar det att ha en redovisningskonsult?",
  "Vad är skillnaden mellan revisor och redovisningskonsult?",
  "Behöver ett aktiebolag en redovisningsbyrå?",
];

export type Result = {
  site: string;
  url: string;
  path: string;
  title: string;
  snippet: string[];
  favicon: { bg: string; fg: string; text: string };
  highlight?: boolean;
};

const base: Result[] = [
  {
    site: "Jb Ekonomipartner",
    url: "https://jbekonomi.com",
    path: "",
    title: "Jb Ekonomipartner – Redovisningsbyrå i Halmstad",
    snippet: ["Vi är en **redovisningsbyrå i Halmstad** som hjälper småföretag med bokföring, löner, bokslut och deklarationer. Personlig service och fasta priser."],
    favicon: { bg: "#1b4f8a", fg: "#fff", text: "JB" },
  },
  {
    site: "Palms Redovisningsbyrå",
    url: "https://www.palmsredovisning.se",
    path: "› kontakt",
    title: "Palms Redovisningsbyrå AB – Redovisning och bokslut",
    snippet: ["Auktoriserade redovisningskonsulter i **Halmstad**. Vi tar hand om din löpande bokföring, moms, löner och årsredovisning så att du kan fokusera på din verksamhet."],
    favicon: { bg: "#2f7d4b", fg: "#fff", text: "P" },
  },
  {
    site: "rkjh.se",
    url: "https://rkjh.se",
    path: "",
    title: "Redovisning och revision i Halmstad | rkjh.se",
    snippet: ["Erfaren **redovisningsbyrå i Halmstad** med tjänster inom bokföring, bokslut, årsredovisning, skatterådgivning och revision för företag i alla storlekar."],
    favicon: { bg: "#6167e6", fg: "#fff", text: "R" },
    highlight: true,
  },
  {
    site: "Accenten Redovisning",
    url: "https://www.accentenredovisning.se",
    path: "› om-oss",
    title: "Accenten Redovisning i Halmstad – Din lokala byrå",
    snippet: ["Accenten är en **redovisningsbyrå** mitt i **Halmstad**. Vi erbjuder bokföring, lönehantering och ekonomisk rådgivning till enskilda firmor och aktiebolag."],
    favicon: { bg: "#e8710a", fg: "#fff", text: "A" },
  },
  {
    site: "Ellox Redovisning",
    url: "https://www.ellox.se",
    path: "› tjanster",
    title: "Ellox Redovisning AB | Bokföring och bokslut i Halmstad",
    snippet: ["Behöver du hjälp med **redovisning**? Vi är en modern byrå som arbetar digitalt och erbjuder allt från löpande bokföring till bokslut och deklaration."],
    favicon: { bg: "#b31412", fg: "#fff", text: "E" },
  },
  {
    site: "BDCG",
    url: "https://www.bdcg.se",
    path: "› redovisning",
    title: "Redovisningsbyrå Halmstad – BDCG AB",
    snippet: ["BDCG hjälper företag i **Halmstad** med redovisning, rapportering och ekonomistyrning. Kontakta oss för en kostnadsfri genomgång av dina behov."],
    favicon: { bg: "#202124", fg: "#fff", text: "B" },
  },
  {
    site: "Allabolag",
    url: "https://www.allabolag.se",
    path: "› bransch › redovisning › halmstad",
    title: "Redovisningsbyråer i Halmstad – Allabolag",
    snippet: ["Hitta **redovisningsbyråer i Halmstad**. Se omsättning, resultat, styrelse och kontaktuppgifter för företag inom redovisning och bokföring."],
    favicon: { bg: "#0b6e4f", fg: "#fff", text: "ab" },
  },
  {
    site: "Halmstad Ekonomitjänst",
    url: "https://www.halmstadekonomi.se",
    path: "",
    title: "Halmstad Ekonomitjänst – Redovisning för småföretag",
    snippet: ["Vi erbjuder **redovisning**, bokslut och deklarationer till småföretag i **Halmstad** med omnejd. Kontakta oss på telefon 035-10 20 30 eller besök oss på", "**Vapnö 211, 305 91 Halmstad** · Läs vår integritetspolicy ..."],
    favicon: { bg: "#5f6368", fg: "#fff", text: "H" },
  },
  {
    site: "Hitta.se",
    url: "https://www.hitta.se",
    path: "› redovisningsbyrå+halmstad › före...",
    title: "Redovisningsbyrå Halmstad (43 Sökträffar) - Företag",
    snippet: ["**Uppgifter om Redovisning i Halmstad**. Se telefonnummer, adress, hemsida, öppettider mm. Gratis", "årsredovisning."],
    favicon: { bg: "#1a8fdd", fg: "#fff", text: "hitta" },
  },
  {
    site: "Aspia",
    url: "https://www.aspia.se",
    path: "› kontakt › halmstad",
    title: "Din personliga redovisningsbyrå i Halmstad",
    snippet: ["**Aspia är en redovisningsbyrå och affärspartner i Halmstad** som hjälper företag med", "redovisningstjänster som bokföring, kvittohantering, fakturahantering, bokslut ..."],
    favicon: { bg: "#fff", fg: "#e8453c", text: "aspia" },
  },
];

const more: [string, string, string, string, string][] = [
  ["Ekonomibyrån Halmstad", "https://www.ekonomibyranhalmstad.se", "", "Ekonomibyrån i Halmstad – Bokföring och löner", "Vi hjälper företag i **Halmstad** med bokföring, löner, moms och bokslut. Snabb återkoppling och personlig kontakt med din egen konsult."],
  ["Företagarna", "https://www.foretagarna.se", "› radgivning › redovisning", "Så väljer du rätt redovisningsbyrå – Företagarna", "Att anlita en **redovisningsbyrå** kan spara tid och pengar. Här är fem saker du bör tänka på innan du väljer byrå för ditt företag."],
  ["Visma", "https://www.visma.se", "› redovisningsbyraer › halmstad", "Redovisningsbyråer i Halmstad – Hitta byrå via Visma", "Sök bland anslutna **redovisningsbyråer i Halmstad** och jämför tjänster inom bokföring, lön och bokslut. Kontakta byrån direkt via formuläret."],
  ["Fortnox", "https://www.fortnox.se", "› byralistan › halmstad", "Byrålistan – redovisningsbyråer i Halmstad | Fortnox", "Hitta en **redovisningsbyrå** i **Halmstad** som arbetar i Fortnox. Filtrera på tjänster, bransch och storlek för att hitta rätt partner."],
  ["Srf konsulterna", "https://www.srfkonsult.se", "› hitta-konsult", "Hitta auktoriserad redovisningskonsult – Srf konsulterna", "Sök efter en **auktoriserad redovisningskonsult** nära dig. Alla konsulter följer branschens kvalitetskrav och fortbildas löpande."],
  ["Eniro", "https://www.eniro.se", "› redovisningsbyrå › halmstad", "Redovisningsbyrå i Halmstad – 38 företag | Eniro", "**Redovisningsbyrå i Halmstad**: adresser, telefonnummer, öppettider och omdömen för företag inom redovisning och bokföring."],
  ["Bokföringshjälpen", "https://www.bokforingshjalpen.se", "› halmstad", "Bokföringshjälp i Halmstad – fast pris per månad", "Slipp krångel med **bokföringen**. Vi erbjuder paketpriser för enskild firma och aktiebolag i **Halmstad** med omnejd."],
  ["Revisorsnämnden", "https://www.revisorsinspektionen.se", "› register", "Sök revisor – Revisorsinspektionens register", "I registret kan du söka efter godkända och auktoriserade **revisorer** och registrerade **revisionsbolag** i hela Sverige."],
  ["Verksamt", "https://www.verksamt.se", "› driva › ekonomi-och-bokforing", "Ekonomi och bokföring – Verksamt.se", "Information om **bokföring**, årsredovisning och deklaration för dig som driver företag. Läs om vad som gäller och när du behöver hjälp."],
];

const palette = ["#1a73e8", "#188038", "#c5221f", "#e37400", "#9334e6", "#007b83", "#5f6368", "#b06000", "#1967d2"];

export const results: Result[] = [
  ...base.slice(0, 7),
  ...more.slice(0, 2).map(([site, url, path, title, snippet], i) => ({
    site,
    url,
    path,
    title,
    snippet: [snippet],
    favicon: { bg: palette[i], fg: "#fff", text: site[0] },
  })),
  ...base.slice(7),
];

export const related = [
  "Bs redovisning ab",
  "Slipp Redovisning Stenungsund",
  "Slipp Redovisning",
  "Slipp redovisning tyresö",
  "Bokföringsbyrå halmstad pris",
  "Slipp Redovisning Sundsvall",
  "Slipp Redovisning Uppsala",
  "Slipp Redovisning Allabolag",
];
