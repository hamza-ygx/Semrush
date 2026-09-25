export const serpTabs = ["AI-läge", "Allt", "Bilder", "Korta videor", "Videor", "Nyheter", "Webb"];

export type Source = { site: string; title: string; snippet: string[] };

type AiOverview = {
  intro: string;
  introChip: string;
  heading: string;
  bullets: { lead: string; text: string; chip: string }[];
  sources: Source[];
};

export type OrganicResult = { site: string; url: string; path: string; title: string; snippet: string };

type SerpContent = { overview: AiOverview; results: OrganicResult[] };

const arbetsklader: SerpContent = {
  overview: {
    intro: "Du kan endast få avdrag eller skattefrihet för arbetskläder som är skyddskläder eller uniformer som inte kan användas privat.",
    introChip: "Skatteverket +1",
    heading: "Vad som räknas som avdragsgillt",
    bullets: [
      { lead: "Skyddskläder:", text: "Kläder som skyddar mot frätande ämnen, mekaniska skador, väta eller kyla (som inte bara är vanligt väder).", chip: "Skatteverket" },
      { lead: "Skyddsutrustning:", text: "Hjälmar, skyddsglasögon, hörselskydd och skor med stålhätta.", chip: "Skatteverket" },
      { lead: "Uniformer:", text: "Kläder som är detaljutformade för att utmärka en viss befattning eller arbetsgivare och som inte kan användas privat.", chip: "Skatteverket" },
    ],
    sources: [
      {
        site: "Skatteverket",
        title: "Avdragslexikon för privatpersoner – Inkomstår 2025 och 2026",
        snippet: ["Arbetskläder. Du kan inte få avdrag för andra arbetskläder", "än skyddskläder och skyddsutrustning. Skyddskläder är…"],
      },
      {
        site: "Skatteverket",
        title: "Arbetskläder | Skatteverket",
        snippet: ["Kläder som är särskilt anpassade för arbetet och som inte", "är lämpliga att använda privat behöver du inte betala skatt…"],
      },
      { site: "Verksamt.se", title: "Arbetskläder och skyddsutrustning", snippet: ["Som arbetsgivare ansvarar du för att dina anställda har", "den skyddsutrustning som behövs…"] },
    ],
  },
  results: [
    {
      site: "Skatteverket",
      url: "https://www.skatteverket.se",
      path: "› privat › skatter › formaner",
      title: "Arbetskläder | Skatteverket",
      snippet: "Kläder som är särskilt anpassade för arbetet och som inte är lämpliga att använda privat behöver du inte betala skatt för.",
    },
    {
      site: "Skatteverket",
      url: "https://www4.skatteverket.se",
      path: "› rattsligvagledning › arbetsklader",
      title: "Arbetskläder, uniformer och skyddskläder | Rättslig vägledning",
      snippet: "Kostnader för vanliga kläder är privata levnadskostnader. Avdrag medges bara för skyddskläder och uniformer som inte kan användas privat.",
    },
    {
      site: "Fortnox",
      url: "https://www.fortnox.se",
      path: "› fortnox-foretagsguide › arbetsklader",
      title: "Arbetskläder – är de avdragsgilla för företaget?",
      snippet: "Som företagare kan du dra av kostnaden för arbetskläder om de är nödvändiga för verksamheten. Läs om vad som gäller för moms och förmån.",
    },
    {
      site: "Bokio",
      url: "https://www.bokio.se",
      path: "› hjalp › bokforing › arbetsklader",
      title: "Bokföra arbetskläder – så gör du | Bokio",
      snippet: "Här går vi igenom hur du bokför inköp av arbetskläder och skyddsutrustning i enskild firma och aktiebolag.",
    },
    {
      site: "Verksamt.se",
      url: "https://verksamt.se",
      path: "› driva › skatter-och-avgifter",
      title: "Avdrag i näringsverksamhet | Verksamt.se",
      snippet: "Du får göra avdrag för kostnader som du har för att förvärva och bibehålla inkomster i verksamheten.",
    },
  ],
};

export function serpContent(keyword: string): SerpContent {
  if (keyword === "arbetskläder avdragsgillt") return arbetsklader;
  return {
    overview: {
      intro: `Här är en sammanfattning av vad som gäller för ${keyword}, baserat på information från myndigheter och branschkällor.`,
      introChip: "Skatteverket +2",
      heading: "Det här behöver du veta",
      bullets: [
        { lead: "Regler:", text: "Vilka regler som gäller beror på om du är privatperson eller driver företag.", chip: "Skatteverket" },
        { lead: "Deklaration:", text: "Uppgifterna redovisas i inkomstdeklarationen eller i företagets bokföring.", chip: "Verksamt.se" },
        { lead: "Rådgivning:", text: "En redovisningskonsult kan hjälpa dig att göra rätt från början.", chip: "FAR" },
      ],
      sources: arbetsklader.overview.sources,
    },
    results: arbetsklader.results,
  };
}
