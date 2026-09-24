import { sampleBrands } from "../AiSampleFrame";

export const brands = sampleBrands;
export const brandColor = Object.fromEntries(sampleBrands.map((b) => [b.name, b.color])) as Record<string, string>;

export type Insight = { title: string; text: string };
export type AiNote = { title: string; text: string };
export type Timeframe = "short" | "medium" | "urgent";
export type Opportunity = { timeframe: Timeframe; title: string; body: string; recs: string[] };

export const platformSeries = [
  { key: "google", label: "Google AI Mode", color: "#bcb0ec", on: true },
  { key: "chatgpt", label: "ChatGPT", color: "#cfdbff", on: true },
  { key: "gemini", label: "Gemini", color: "#5b5bc5", on: true },
  { key: "perplexity", label: "Perplexity", color: "#a5a8e6", on: false },
] as const;

export const trendDates = ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22", "Jul 29", "Aug 5", "Aug 12", "Aug 19", "Aug 26", "Sep 2", "Sep 9", "Sep 16"];
export const trendTicks = [
  { label: "Jul 14", at: 0.238 },
  { label: "Aug 6", at: 0.51 },
  { label: "Aug 29", at: 0.782 },
];

/* ---------------- Perception ---------------- */

export const perceptionInsights: Insight[] = [
  { title: "Make Style the Default", text: "Build on 80% positive perception with seasonal fashion stories that beat discount-led rivals." },
  { title: "Own Digital Fit Confidence", text: "Amplify 19 frame-selection technology mentions to establish inclusive, accurate virtual try-on leadership." },
  { title: "Prove the Smart-Middle Value", text: "Defend the $95 choice with all-in pricing, coatings, guarantees, and longevity." },
  { title: "Remove Service Friction Fast", text: "Protect 94.38% positive sentiment by improving insurance, promotions, and 7–10-day delivery expectations." },
  { title: "Turn Purpose Into Leadership", text: "Connect 85 social-impact mentions to verifiable sustainability proof points that close the eco-brand gap." },
];

export const perceptionPlatformNote: AiNote = {
  title: "ChatGPT lags",
  text: "80% on ChatGPT vs 91% Google AI, 94% Gemini. Improve ChatGPT visibility to match stronger platforms.",
};

export const perceptionByPlatform: { brand: string; values: [number, number, number, number] }[] = [
  { brand: "Warby parker", values: [91, 80, 94.3, 0] },
  { brand: "Ac lens", values: [86.6, 77.9, 93.4, 0] },
  { brand: "Zenni optical", values: [89.7, 89.6, 94.2, 0] },
  { brand: "Glassesusa", values: [95.9, 82.8, 93.6, 0] },
  { brand: "Eyebuydirect", values: [88.3, 80.1, 95.2, 0] },
];

export const favorableNote: AiNote = {
  title: "Strong but slipping",
  text: "94% favorable sentiment at peak, ending at 89%. Lift consistency and defend against Eyebuydirect.",
};

export const favorableRanking: { brand: string; value: number; trend: "up" | "down" }[] = [
  { brand: "Glassesusa", value: 92, trend: "up" },
  { brand: "Zenni optical", value: 91, trend: "up" },
  { brand: "Warby parker", value: 89, trend: "down" },
  { brand: "Eyebuydirect", value: 89, trend: "up" },
  { brand: "Ac lens", value: 86, trend: "down" },
];

export const favorableTrend: Record<string, number[]> = {
  Glassesusa: [90, 91.5, 88.5, 89, 91, 88, 88.5, 92, 91, 89.5, 89, 90, 90.5],
  "Zenni optical": [85, 92, 90.5, 88, 91, 87, 87.5, 89, 92, 87, 88, 88.5, 91],
  "Warby parker": [86.5, 92, 94.5, 93, 94.5, 91, 89.5, 89.5, 90, 87.5, 90.5, 93.5, 89],
  Eyebuydirect: [91, 92, 87, 87, 91, 87, 86.5, 90.5, 93, 88, 88.5, 89, 89.5],
  "Ac lens": [89, 93, 92, 90.5, 90.5, 88, 85, 88, 89, 83, 85, 86.5, 86],
};

export type Driver = { text: string; score: number };

export const strengthFactors: Driver[] = [
  { text: "Transparent mid-range pricing, with standard prescription lenses and coatings included, is viewed as strong value versus traditional optical shops", score: 5 },
  { text: "Stylish, contemporary, designer-like frame designs with a broad choice of acetate and metal styles", score: 5 },
  { text: "Mission-driven, socially responsible brand reputation through Buy a Pair, Give a Pair, broader philanthropy, and sustainability efforts", score: 5 },
  { text: "Integrated eye exams and payment options such as insurance, FSA/HSA, and financing support a convenient one-stop vision-care experience", score: 4 },
  { text: "Solid everyday product quality and a broad, inclusive eyewear assortment, including specialty lenses, kids' options, varied fits, and durable coatings", score: 4 },
  { text: "Strong customer care, including helpful support, easy returns, adjustments, warranties, and other protections", score: 5 },
  { text: "Convenient omnichannel shopping, led by virtual try-on, Home Try-On/at-home selection, easy online ordering, and physical stores", score: 5 },
];

export const improvementAreas: Driver[] = [
  { text: "Sustainability efforts are seen as improving but not as comprehensive as those of highly eco-focused brands", score: 3 },
  { text: "Limits in lens and service flexibility, including no re-lensing of non-Warby Parker frames, limited repairs, and no traditional/lined bifocals", score: 4 },
  { text: "Inconsistent availability of clinical and coverage-related services, including out-of-network insurance friction and eye exams not offered at every location", score: 4 },
  { text: "Deals and discounts are limited, with few promotions and no dedicated student or military pricing", score: 2 },
  { text: "Limited international reach, with stores and services perceived as primarily focused on the U.S. and Canada", score: 5 },
  { text: "Not the lowest-cost option, particularly for progressives and other advanced lenses, versus ultra-budget online competitors", score: 5 },
  { text: "Customer experience can be variable, including prescription-order wait times and mixed reviews relative to competitors", score: 3 },
  { text: "Home Try-On availability has been confusing or discontinued, while virtual try-on cannot fully replicate real-world fit, comfort, and color", score: 4 },
];

export const featureCategories = [
  "Social Impact Sustainability And Ethics",
  "Lens Technology Customization And Performance",
  "Frames Design Fit And Materials",
  "Shopping Experience Access And Omnichannel",
  "Smart Glasses And Advanced Technology",
  "Pricing Value And Discounts",
  "Eye Exams Clinical Care And Insurance",
];

export const sentimentNote: AiNote = { title: "Fix eye exam perception", text: "77% on eye exams, lowest category. Improve care and insurance messaging." };

export const sentimentByCategory: number[][] = [
  [96, 86, 100, 100, 92],
  [95, 89, 92, 97, 96],
  [95, 96, 98, 95, 96],
  [95, 94, 87, 94, 92],
  [94, 91, 81, 88, 100],
  [85, 96, 98, 97, 98],
  [77, 92, 50, 100, 50],
];

export const mentionsNote: AiNote = {
  title: "Own the experience",
  text: "309 mentions in shopping, 31% above AC Lens. Defend convenience leadership; fix value perception.",
};

export const mentionsByCategory: number[][] = [
  [85, 36, 11, 3, 13],
  [63, 114, 74, 32, 49],
  [101, 109, 57, 62, 57],
  [309, 236, 106, 125, 98],
  [33, 33, 16, 8, 6],
  [78, 181, 170, 75, 100],
  [26, 48, 6, 7, 4],
];

export const featureNote: AiNote = { title: "Owns try-on experience", text: "69% mention virtual try-on, 100% like home try-on. Push try-on and returns harder." };

export type Cell = [number, number] | null;
export type FeatureRow = { title: string; category: string; answers: number; cells: Cell[] };

const SE = "Shopping Experience Access And Omnichannel";

export const featureRows: FeatureRow[] = [
  { title: "Virtual try‐on tools using camera or uploaded photo", category: SE, answers: 91, cells: [[63, 97], [30, 97], [30, 90], [22, 95], [11, 100]] },
  { title: "Free at‐home frame testing with prepaid returns", category: SE, answers: 46, cells: [[28, 100], [7, 100], [1, 0], [2, 100], [2, 100]] },
  { title: "Easy returns, exchanges, and money‐back guarantees", category: SE, answers: 45, cells: [[28, 100], [28, 100], [7, 86], [13, 100], [13, 100]] },
  { title: "Mail‐home try‐on boxes with multiple frames", category: SE, answers: 43, cells: [[23, 78], [4, 100], [1, 100], null, [1, 100]] },
  { title: "Fashion‐forward, trendy frame styles for every face", category: "Frames Design Fit And Materials", answers: 38, cells: [[22, 95], [8, 100], [3, 100], [8, 100], [12, 100]] },
  { title: "Buy‐a‐pair, give‐a‐pair vision donation models", category: "Social Impact Sustainability And Ethics", answers: 27, cells: [[22, 100], [5, 100], null, null, [4, 100]] },
  { title: "Transparent flat‐rate or fixed package pricing", category: "Pricing Value And Discounts", answers: 32, cells: [[18, 94], [9, 89], [2, 100], [2, 50], [3, 100]] },
  { title: "Strong customer support via chat, phone, and email", category: SE, answers: 24, cells: [[17, 100], [8, 100], [7, 100], [4, 75], [8, 88]] },
  { title: "Returns available both online and at retail stores", category: SE, answers: 46, cells: [[15, 87], [14, 86], [1, 100], null, [1, 100]] },
  { title: "Hybrid model with online store plus physical showrooms", category: SE, answers: 22, cells: [[15, 87], [2, 100], [1, 100], null, null] },
];

export const perceptionOpportunities: Opportunity[] = [
  {
    timeframe: "medium",
    title: "Own the “smart middle” position: design-led, reliable eyewear with transparent all-in value rather than the lowest sticker price.",
    body: "Across AI platforms, Warby Parker is strongly associated with transparent pricing, included standard lenses and coatings, style, and service. However, AI also repeatedly notes that the brand is not the cheapest, that progressives cost more than at budget sites, and that insurance reimbursement and limited promotions can create friction. Without a more explicit value frame, comparisons with ultra-budget competitors can make a well-regarded mid-tier offer seem overpriced rather than thoughtfully priced.",
    recs: [
      "Make the case for total value in clear, consistent language: what is included at each price point, how coatings, guarantees, returns, in-store care, and design contribute to the offer, and why this differs from barebones discount alternatives.",
      "Simplify insurance and reimbursement explanations with empathetic, practical guidance, while testing accessible entry points such as multi-pair value propositions or targeted partner offers.",
      "Reinforce a single competitive takeaway across owned communications and independent reviews: Warby Parker is the best balance of price, design, and support for customers who do not want to choose between quality and affordability.",
    ],
  },
  {
    timeframe: "medium",
    title: "Convert Warby Parker’s existing design halo into category-defining authority for fashion-forward, accessible everyday eyewear.",
    body: "AI consistently recognizes Warby Parker for stylish, modern, contemporary in-house frames and often places it ahead of value competitors in style-led recommendations. Yet it can still appear as one option among several rather than the defining reference point, which weakens a key justification for its mid-range price. Stronger evidence of design provenance, materials, silhouettes, seasonal collections, and collaborations would help preserve its aspirational appeal as cheaper rivals gain visibility.",
    recs: [
      "Elevate design storytelling beyond product promotion by giving collections, materials, silhouette choices, and collaborations a clear editorial narrative.",
      "Prioritize fashion, lifestyle, and design coverage with visual galleries and plain-language descriptions that establish Warby Parker as design-led and contemporary.",
      "Pair every style story with fit guidance and face-shape recommendations so aesthetic leadership also translates into purchase confidence.",
    ],
  },
  {
    timeframe: "short",
    title: "Close the service-consistency gap so the omnichannel promise matches what AI describes in every market.",
    body: "AI praises Warby Parker’s helpful support, easy returns, and adjustments, but also highlights variable prescription wait times, eye exams that are not available at every location, and out-of-network insurance friction. These inconsistencies surface in comparison answers and allow competitors with simpler service models to appear more dependable, even when overall satisfaction remains high.",
    recs: [
      "Set and publish clear expectations for delivery times, exam availability, and insurance handling by location and channel.",
      "Publish credible evidence of service performance and improvements, such as satisfaction, remake, or resolution measures, alongside independent retesting where available.",
      "Explain unavoidable policies and service boundaries with clear rationale, while framing clinical and telehealth expansion as part of a growing integrated eye-care ecosystem.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Establish Warby Parker as the credible sustainable choice at mainstream scale, rather than a mid-level alternative to niche eco brands.",
    body: "AI acknowledges Warby Parker’s B Corp status, carbon-neutral operations, recycling efforts, and partnerships, but generally positions the brand below niche environmental leaders in sustainability-focused answers. Current descriptions such as “improving” or “not fully eco-friendly” leave the brand absent from many sustainable-eyewear shortlists. A more coherent and verifiable account of existing work could differentiate Warby Parker as an accessible, responsible option without overstating its position relative to specialist eco labels.",
    recs: [
      "Bring existing sustainability efforts under one consumer-facing platform with specific, substantiated claims on materials, recycling, carbon accounting, and partner initiatives.",
      "Publish recurring, easy-to-reference progress reporting that gives independent eco publications concrete facts to cite.",
      "Position the brand consistently as making eco-conscious eyewear available at mainstream prices and scale, while retaining transparent language about ongoing progress.",
    ],
  },
];

/* ---------------- Narrative drivers ---------------- */

export const narrativeInsights: Insight[] = [
  { title: "Broaden the Worldwide Narrative", text: "Move beyond U.S./Canada framing with contacts, kids, and smart-eyewear stories that match broader rivals." },
  { title: "Close the Value Gap", text: "Win “best affordable” recommendations where AC Lens leads 13.8% share versus Warby Parker’s 11.1%." },
  { title: "Make Sustainability Mainstream", text: "Convert 8 sustainability and 13 impact mentions into stronger placement against Eco, Pala, and Sea2See." },
  { title: "Own the Try-On Journey", text: "Turn 15 try-on, 20 digital-first, and 27 risk-free mentions into one clear “Ways to Try” story." },
  { title: "Upgrade Recommendation Authority", text: "Improve the 2.97 average position by strengthening cited “best of” and mid-price style-list coverage." },
];

export const sovPlatformNote: AiNote = { title: "ChatGPT trails", text: "11% on Google AI, 9% on ChatGPT. Improve ChatGPT share to close the gap." };

export const sovByPlatform: { brand: string; values: [number, number, number, number] }[] = [
  { brand: "Warby parker", values: [11.1, 9.2, 9.6, 0] },
  { brand: "Ac lens", values: [14.3, 16, 14, 0] },
  { brand: "Zenni optical", values: [5.8, 6, 4.7, 0] },
  { brand: "Glassesusa", values: [4.7, 3.6, 3.8, 0] },
  { brand: "Eyebuydirect", values: [4.8, 3.7, 3.4, 0] },
];

export type MetricTab = "sov" | "mentions" | "position";

export const brandMetrics: Record<
  MetricTab,
  { label: string; note: AiNote; unit: string; max: number; ticks: number[]; ranking: { brand: string; value: number; change: "up" | "down" | 0 }[]; trend: Record<string, number[]> }
> = {
  sov: {
    label: "Share of Voice",
    note: { title: "Closing the gap", text: "10% share, up from 9%; trails AC Lens at 15%. Push always-on content to close the gap." },
    unit: "%",
    max: 18.06,
    ticks: [0, 5, 10, 15],
    ranking: [
      { brand: "Ac lens", value: 15, change: 0 },
      { brand: "Warby parker", value: 10, change: 0 },
      { brand: "Zenni optical", value: 5, change: "down" },
      { brand: "Glassesusa", value: 4, change: 0 },
      { brand: "Eyebuydirect", value: 4, change: 0 },
    ],
    trend: {
      "Ac lens": [15.8, 15.5, 15.1, 14.6, 14.6, 14.8, 15.5, 15.5, 15.7, 15.9, 15.2, 14.6, 14.4],
      "Warby parker": [8.7, 8.3, 8.3, 8.2, 8.9, 9.2, 9.2, 8.7, 8.9, 9.4, 9.1, 9.7, 10],
      "Zenni optical": [5.4, 5.2, 5.3, 5.1, 5.3, 5.6, 5.8, 5.6, 5.4, 5.5, 5.8, 5.6, 5.3],
      Glassesusa: [3.8, 3.5, 4.6, 3.6, 4.4, 4.4, 4.6, 4.6, 4, 4.3, 3.9, 4, 3.9],
      Eyebuydirect: [4.5, 4.3, 4.4, 4.4, 4.5, 4.1, 4.6, 4.5, 4.4, 3.8, 3.9, 4.1, 3.9],
    },
  },
  mentions: {
    label: "Mentions",
    note: { title: "Second in mentions", text: "418 mentions, up 6%; AC Lens leads with 627. Expand comparison content to close the gap." },
    unit: "",
    max: 700,
    ticks: [0, 200, 400, 600],
    ranking: [
      { brand: "Ac lens", value: 627, change: 0 },
      { brand: "Warby parker", value: 418, change: "up" },
      { brand: "Zenni optical", value: 221, change: "down" },
      { brand: "Glassesusa", value: 168, change: 0 },
      { brand: "Eyebuydirect", value: 163, change: 0 },
    ],
    trend: {
      "Ac lens": [650, 640, 630, 610, 612, 618, 640, 642, 650, 660, 634, 610, 627],
      "Warby parker": [365, 350, 348, 345, 372, 385, 384, 363, 372, 392, 380, 405, 418],
      "Zenni optical": [225, 218, 220, 213, 221, 234, 242, 234, 225, 230, 242, 234, 221],
      Glassesusa: [160, 146, 192, 150, 184, 184, 192, 192, 167, 180, 163, 167, 168],
      Eyebuydirect: [188, 180, 184, 184, 188, 171, 192, 188, 184, 159, 163, 171, 163],
    },
  },
  position: {
    label: "Average Position",
    note: { title: "Third on average", text: "Average position 2.97; AC Lens leads at 2.1. Strengthen “best of” list coverage to move up." },
    unit: "",
    max: 5,
    ticks: [0, 1, 2, 3, 4],
    ranking: [
      { brand: "Ac lens", value: 2.1, change: 0 },
      { brand: "Warby parker", value: 2.97, change: "up" },
      { brand: "Zenni optical", value: 3.8, change: 0 },
      { brand: "Glassesusa", value: 4.1, change: "down" },
      { brand: "Eyebuydirect", value: 4.3, change: 0 },
    ],
    trend: {
      "Ac lens": [2.2, 2.1, 2.2, 2.3, 2.2, 2.1, 2, 2.1, 2.1, 2, 2.2, 2.1, 2.1],
      "Warby parker": [3.3, 3.2, 3.2, 3.3, 3.1, 3, 3, 3.1, 3, 2.9, 3, 2.9, 2.97],
      "Zenni optical": [3.9, 3.8, 3.9, 4, 3.8, 3.7, 3.8, 3.9, 3.8, 3.8, 3.7, 3.8, 3.8],
      Glassesusa: [4, 4.1, 3.9, 4.2, 4, 4, 4.1, 4, 4.2, 4.1, 4.2, 4, 4.1],
      Eyebuydirect: [4.2, 4.3, 4.2, 4.3, 4.2, 4.4, 4.2, 4.3, 4.3, 4.4, 4.3, 4.3, 4.3],
    },
  },
};

export const citationsNote: AiNote = {
  title: "Leading, but volatile",
  text: "You lead at 145 vs Forbes 102, after peaking at 397. Sustain momentum with always-on citation content.",
};

export const citationDomains: { domain: string; color: string; share: number; value: number; trend: "up" | "down"; you?: boolean; data: number[] }[] = [
  { domain: "warbyparker.com", color: "#6167e6", share: 7, value: 145, trend: "up", you: true, data: [122, 72, 108, 117, 190, 166, 173, 397, 340, 95, 138, 122, 145] },
  { domain: "forbes.com", color: "#fd8af5", share: 5, value: 102, trend: "up", data: [68, 76, 78, 110, 170, 164, 152, 192, 195, 115, 152, 90, 102] },
  { domain: "goodhousekeeping.com", color: "#10a82e", share: 3, value: 67, trend: "up", data: [39, 70, 70, 76, 102, 88, 56, 72, 73, 32, 70, 36, 67] },
  { domain: "zennioptical.com", color: "#d4b0fd", share: 3, value: 62, trend: "down", data: [62, 72, 64, 64, 75, 61, 90, 246, 190, 28, 75, 67, 62] },
  { domain: "eyebuydirect.com", color: "#f03d4c", share: 2, value: 40, trend: "down", data: [66, 76, 85, 94, 116, 95, 126, 295, 190, 90, 90, 52, 40] },
];

export const diveTiles = [
  { key: "answers-nb", title: "Answers | Non-branded", text: "Grow visibility beyond direct brand searches by reviewing answers to non-branded queries." },
  { key: "answers-b", title: "Answers | Branded", text: "Secure your top position — see how your brand appears in answers to direct queries." },
  { key: "citations-nb", title: "Citations | Non-branded", text: "Identify growth opportunities by exploring sources that shape answers to non-branded queries." },
  { key: "citations-b", title: "Citations | Branded", text: "Ensure the right story is told by checking sources cited in answers to branded queries." },
] as const;

export const breakdownNote: AiNote = { title: "Own the mission", text: "#1 in mission and try-on queries. Defend strengths, fix weaker style and review topics." };

export type QCell = { pres: string; avg: string; sent: number | null; delta: number | null } | null;
export type PlatformCell = { pos: number; change: number | "new"; sent: number; delta: number } | null;
export type QuestionRow = { q: string; cells: QCell[]; platforms?: { name: "Google AI Mode" | "ChatGPT" | "Gemini"; cells: PlatformCell[] }[] };

const c = (pres: string, avg: string, sent: number | null = null, delta: number | null = null): QCell => ({ pres, avg, sent, delta });
const none = (pres = "0/4"): QCell => ({ pres, avg: "-", sent: null, delta: null });

export const questionRows: QuestionRow[] = [
  {
    q: "What eyewear companies partner with social impact programs?",
    cells: [c("3/4", "1", 100, 0), c("3/4", "4.7", 100, 0), c("1/4", "12", 100, null), c("2/4", "6", 100, 0), c("1/4", "9", 100, null)],
    platforms: [
      { name: "Google AI Mode", cells: [{ pos: 1, change: 0, sent: 100, delta: 0 }, { pos: 3, change: 0, sent: 100, delta: 0 }, { pos: 12, change: "new", sent: 100, delta: 0 }, { pos: 5, change: 0, sent: 100, delta: 0 }, { pos: 9, change: "new", sent: 100, delta: 0 }] },
      { name: "ChatGPT", cells: [{ pos: 1, change: 3, sent: 100, delta: 0 }, { pos: 7, change: -5, sent: 100, delta: 0 }, null, { pos: 7, change: 1, sent: 100, delta: 0 }, null] },
      { name: "Gemini", cells: [{ pos: 1, change: 0, sent: 100, delta: 0 }, { pos: 4, change: -1, sent: 100, delta: 0 }, null, null, null] },
    ],
  },
  { q: "What are some socially responsible eyewear companies based in the US?", cells: [c("3/4", "1", 100, 0), none(), none(), c("1/4", "4", 100, 0), none()] },
  { q: "Which eyewear brands offer virtual try‐on with face mapping?", cells: [c("3/4", "1", 100, 0), c("3/4", "2.3", 100, 0), c("2/4", "3", 100, 0), c("1/4", "5", 100, 0), c("2/4", "4", 100, 0)] },
  { q: "What are some eyewear companies with mission‐driven approaches?", cells: [c("3/4", "1", 100, 0), none(), none(), none(), c("1/4", "6", 100, 0)] },
  { q: "Which companies donate glasses with every purchase?", cells: [c("3/4", "1", 100, 0), c("3/4", "2", 100, 0), none(), none(), none()] },
  { q: "Where can I find glasses that flatter a square face shape?", cells: [c("3/4", "1", 71, -29), c("3/4", "2", 67, -33), c("2/4", "3.5", 100, null), c("2/4", "4", 100, 0), c("2/4", "5", 100, 0)] },
  { q: "What are the best options for trying frames at home before committing to a purchase?", cells: [c("3/4", "1", 89, 7), c("3/4", "3.7", 100, 0), c("3/4", "5.3", 100, 20), c("2/4", "4.5", 100, 0), c("1/4", "6", 100, 0)] },
  { q: "Are there brands that let you try glasses at home before buying?", cells: [c("3/4", "1", 67, -33), c("3/4", "2", 100, 0), c("2/4", "5.5", 80, -20), c("2/4", "4", 100, 0), c("1/4", "7", 100, 0)] },
  { q: "What eyewear brands stand out for their philanthropic programs?", cells: [c("3/4", "1.3", 100, 0), c("1/4", "1", 100, 0), c("1/4", "8", 100, null), none(), none()] },
  { q: "Who are the leading socially conscious eyewear companies that donate with each purchase?", cells: [c("3/4", "1.3", 100, 0), c("2/4", "3.5", 100, 0), none(), none(), c("1/4", "5", 100, 0)] },
  { q: "What are the best optical retailers for affordable designer frames?", cells: [c("3/4", "1.7", 93, -7), c("3/4", "2", 93, -7), c("2/4", "3", 100, 11), c("3/4", "3.3", 100, 0), c("2/4", "4", 100, 0)] },
  { q: "Which online glasses stores have the best return policies?", cells: [c("3/4", "1.7", 100, 0), c("3/4", "1.3", 100, 0), c("2/4", "4", 100, 0), c("3/4", "3", 88, -12), c("3/4", "3.7", 100, 0)] },
  { q: "Where can I find transparent, all‐in pricing for prescription eyeglasses?", cells: [c("3/4", "2", 100, 0), c("3/4", "2", 86, -14), c("2/4", "4", 83, -17), c("3/4", "3.3", 100, 0), c("3/4", "4", 100, 0)] },
  { q: "Who has the best online frame‐fitting tools?", cells: [c("3/4", "2", 100, 0), c("3/4", "1.7", 100, 0), c("3/4", "4", 100, 0), c("2/4", "3", 100, 0), c("2/4", "5", 100, 0)] },
  { q: "Where can I find stylish eyeglasses at a reasonable price?", cells: [c("3/4", "2", 90, -10), c("3/4", "1.7", 100, 0), c("3/4", "3.7", 100, 0), c("3/4", "4", 100, 0), c("3/4", "4.3", 100, 0)] },
  { q: "Who offers in‐app virtual try‐on for glasses?", cells: [c("3/4", "2.3", 89, -11), c("3/4", "2.7", 89, -11), c("3/4", "4.3", 88, -12), c("2/4", "4", 100, 0), c("2/4", "5", 100, 0)] },
  { q: "What brands have transparent pricing for eyewear?", cells: [c("3/4", "2.3", 86, -2), c("3/4", "1.3", 100, 12), c("2/4", "2.5", 100, 0), c("3/4", "3.7", 100, 0), c("3/4", "4.3", 100, 0)] },
  { q: "Who offers the best online experience for progressive lens wearers?", cells: [c("3/4", "2.3", 100, 0), c("3/4", "1.3", 88, -12), c("3/4", "3.7", 87, 20), c("2/4", "3", 100, 0), c("2/4", "4.5", 100, 0)] },
];

export const narrativeOpportunities: Opportunity[] = [
  {
    timeframe: "short",
    title: "Make Warby Parker the unmistakable reference brand for a modern, risk-free omnichannel try-on experience.",
    body: "Warby Parker leads the supplied data on try-before-you-buy, omnichannel access, risk-free purchase assurance, and digital-first distribution, yet AI answers do not consistently place it first for virtual try-on or easy online buying. A major cause is conflicting descriptions of the legacy Home Try-On offer: some responses still characterize it as current, while others state it has been replaced by virtual and store-based experiences. This inconsistency weakens trust and lets competitors occupy the virtual-try-on leadership position.",
    recs: [
      "Create a single, current narrative explaining every available way to try, buy, adjust, and return glasses, clearly distinguishing legacy Home Try-On from today’s virtual and in-store experience.",
      "Carry that narrative consistently through customer communications, FAQs, press materials, and partner updates, with direct proof points on virtual fitting, support, returns, and in-store service.",
      "Frame the evolution as a stronger blended experience rather than the removal of a signature benefit, and seek independent validation of ease and risk reduction through trusted consumer publications.",
    ],
  },
  {
    timeframe: "medium",
    title: "Reposition Warby Parker as the smart-value default in high-intent eyewear decisions.",
    body: "Warby Parker has strong visibility—roughly 9–11% share of voice and a #2 overall position in the supplied analyses—but typically appears around third in recommendation order. In affordable and best-online-retailer conversations, AI platforms often frame it as a pricier alternative to Zenni, EyeBuyDirect, GlassesUSA, or AC Lens, rather than as the leading balance of style, quality, service, and all-in value. This leaves AC Lens especially well placed to become the default transactional recommendation.",
    recs: [
      "Define a clear smart-value proposition that explains what every price includes, from lenses and coatings to guarantees, adjustments, and in-store support.",
      "Earn inclusion in independent “best affordable” and “best online retailer” round-ups with transparent comparisons that show total value rather than sticker price alone.",
      "Make pricing, insurance, and FSA/HSA explanations consistent across channels so AI platforms describe the offer accurately.",
    ],
  },
  {
    timeframe: "medium",
    title: "Turn Warby Parker’s social-impact leadership into a mainstream purchase reason, not just a brand story.",
    body: "AI reliably names Warby Parker first in mission, donation, and socially conscious eyewear questions, but these answers rarely connect the mission to everyday purchase decisions. Sustainability answers still favor niche eco brands, and Buy a Pair, Give a Pair is often described in general terms that are easy for competitors with similar programs to match. The result is strong recognition that remains associated with niche positioning.",
    recs: [
      "Quantify impact with current, verifiable figures and connect them to specific collections, materials, and packaging choices.",
      "Publish regular impact updates that independent media and review sites can cite in sustainability and mission-driven round-ups.",
      "Bring impact messaging into product pages and comparison content so mission becomes a tiebreaker in purchase-stage answers rather than a separate brand story associated with niche positioning.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Broaden Warby Parker’s relevance beyond core glasses while setting clear expectations for worldwide audiences.",
    body: "AI visibility is still heavily concentrated in glasses, even though the supplied insights identify potential associations with contacts, kids’ eyewear, smart eyewear, and integrated eye exams. At the same time, worldwide answers frequently describe Warby Parker as primarily focused on the U.S. and Canada, causing international chains and locally available brands to dominate broad global recommendations. Greater category breadth can expand consideration, but it must be paired with transparent communication about where and how customers can be served.",
    recs: [
      "Develop distinct, connected narratives for contacts, kids, smart eyewear, and eye-care services so Warby Parker is recognized across more consumer needs than frame shopping alone.",
      "Clearly communicate the brand’s current geographic footprint, cross-border proposition where applicable, and global social-impact context, without overstating availability.",
      "Support these narratives through relevant partnerships and media activity, particularly for smart eyewear and international-purpose conversations, to make Warby Parker more salient in worldwide AI responses while preserving credibility.",
    ],
  },
];

/* ---------------- Questions ---------------- */

export const questionsInsights: Insight[] = [
  { title: "Make Impact Tangible", text: "Answer 40+ sustainability and philanthropy queries through a proof-driven Impact hub and recycling programs." },
  { title: "Own Fit Confidence", text: "Capture hundreds of try-on and face-shape searches via a unified ‘best-in-class’ fitting ecosystem." },
  { title: "Win The Value Debate", text: "Turn 80+ price and insurance queries into conversions with transparent, all-in competitor comparisons." },
];

export const intents = [
  { key: "product", label: "product & brand discovery (styles, materials, trends)", color: "#b0c0fd", share: 19 },
  { key: "retailer", label: "retailer comparison, reviews & market landscape", color: "#f46aeb", share: 18 },
  { key: "access", label: "access, channels & shopping experience", color: "#6ae270", share: 10 },
  { key: "clinical", label: "clinical & technical vision needs (exams, prescriptions, lens types, fit)", color: "#5b5dcc", share: 9 },
  { key: "comparison", label: "comparison", color: "#ffb400", share: 5 },
  { key: "pricingIns", label: "pricing, insurance & promotions", color: "#00c99a", share: 5 },
  { key: "research", label: "research", color: "#c28cff", share: 5 },
  { key: "education", label: "education", color: "#6369dc", share: 5 },
  { key: "fitting", label: "fitting, style & product selection", color: "#f59208", share: 4 },
  { key: "brandExp", label: "brand & experience comparison", color: "#fc96f8", share: 4 },
  { key: "experience", label: "experience & service (shipping, returns, warranty, omnichannel, staff, customer reviews)", color: "#00ae2a", share: 4 },
  { key: "tryon", label: "shopping & try‐on experience", color: "#d4b0fd", share: 4 },
  { key: "insurance", label: "insurance & promotions", color: "#f03e3e", share: 3 },
  { key: "policies", label: "policies, insurance & support & practical how-to", color: "#00c99a", share: 3 },
  { key: "pricing", label: "pricing", color: "#b0c0fd", share: 2 },
  { key: "shopping", label: "shopping", color: "#00c93a", share: 2 },
  { key: "policies2", label: "policies, insurance, support & practical how-to", color: "#d86c00", share: 1 },
  { key: "purchase", label: "purchase", color: "#ff6b70", share: 1 },
] as const;

export type IntentKey = (typeof intents)[number]["key"];

export type Topic = {
  name: string;
  short: string;
  color: string;
  mix: [IntentKey, number][];
  questions: Partial<Record<IntentKey, [string, string]>>;
};

export const topics: Topic[] = [
  {
    name: "Pricing, insurance, discounts & financials",
    short: "pricing, insurance, discounts & financials",
    color: "#c28cff",
    mix: [["pricingIns", 24], ["insurance", 21], ["comparison", 17], ["pricing", 14], ["product", 7], ["retailer", 7], ["shopping", 7], ["policies", 3]],
    questions: {
      pricingIns: ["Who offers scratch-resistant lens upgrades at no extra cost?", "What are affordable luxury options for eyewear?"],
      insurance: ["Does Warby Parker accept insurance for prescription glasses?", "Where can I find flexible spending account eligible glasses and contacts?"],
      comparison: ["How do Warby Parker prices compare to Zenni Optical?", "What are the best options for progressive lenses at affordable prices?"],
    },
  },
  {
    name: "Shopping experience & channels (online, in-store, omnichannel, delivery)",
    short: "shopping experience & channels (online, in-store, omnichannel, delivery)",
    color: "#6369dc",
    mix: [["retailer", 35], ["access", 27], ["experience", 13], ["brandExp", 6], ["tryon", 4], ["pricingIns", 4], ["policies", 4], ["purchase", 2], ["education", 2], ["policies2", 2], ["comparison", 2]],
    questions: {
      retailer: ["Which companies provide home try-on services for eyewear?", "Who provides both contacts and glasses in one online store?"],
      access: ["Where is the nearest Warby Parker store?", "Where can I find prescription sunglasses online?"],
      experience: ["Which eyewear retailers offer free shipping and free returns?", "What is Warby Parker’s warranty on glasses?"],
    },
  },
  {
    name: "Technology, innovation & market comparison",
    short: "technology, innovation & market comparison",
    color: "#ffb400",
    mix: [["retailer", 18], ["education", 18], ["product", 14], ["comparison", 14], ["brandExp", 14], ["research", 11], ["tryon", 11]],
    questions: {
      retailer: ["Which eyewear brands are leading in smart glasses?", "Who are the most innovative online eyewear retailers?"],
      education: ["How does virtual try-on technology work for glasses?", "What is blue light filtering and does it work?"],
      product: ["What are the newest trends in eyewear technology?", "Which brands offer lightweight titanium frames?"],
    },
  },
  {
    name: "Product & style discovery (frames, lenses, fashion, fit)",
    short: "product & style discovery (frames, lenses, fashion, fit)",
    color: "#3ae2b5",
    mix: [["product", 41], ["fitting", 20], ["retailer", 13], ["clinical", 13], ["access", 5], ["shopping", 5], ["research", 3]],
    questions: {
      product: ["What are the most popular eyeglass frame styles this year?", "Which brands offer stylish acetate frames?"],
      fitting: ["What glasses suit a round face shape?", "How do I choose the right frame size?"],
      retailer: ["Which online retailers have the widest frame selection?", "Where can I buy trendy glasses online?"],
    },
  },
  {
    name: "Brand values, sustainability & social impact",
    short: "brand values, sustainability & social impact",
    color: "#ff6e74",
    mix: [["product", 48], ["research", 22], ["education", 11], ["retailer", 7], ["policies", 7], ["policies2", 4]],
    questions: {
      product: ["What are sustainable eyewear brands committed to carbon neutrality?", "What eyewear companies partner with social impact programs?"],
      research: ["Which eyewear companies are known for social responsibility?", "Which companies support global access to vision care?"],
      education: ["How does Warby Parker's Buy a Pair, Give a Pair program work?", "How does buy one, give one work in eyewear?"],
    },
  },
  {
    name: "Vision care, exams & prescriptions",
    short: "vision care, exams & prescriptions",
    color: "#b0c0fd",
    mix: [["clinical", 57], ["retailer", 14], ["access", 10], ["product", 10], ["pricingIns", 5], ["policies", 5]],
    questions: {
      clinical: ["How can I get a prescription updated without visiting an optometrist?", "Can I get progressive lenses at Warby Parker?"],
      retailer: ["Which eyewear retailers offer eye exams in store?", "Who provides both eye exams and glasses under one roof?"],
      access: ["Where can I book a same-day eye exam?", "Does Warby Parker offer eye exams everywhere?"],
    },
  },
  {
    name: "Shopping experience & channels (online, in-store, omnichannel, delivery)",
    short: "shopping experience & channels (online, in-store, omnichannel, delivery)",
    color: "#f46aee",
    mix: [["tryon", 50], ["access", 50]],
    questions: {
      tryon: ["How does Warby Parker's Home Try-On program work?", "How do at-home try-on kits work for glasses?"],
      access: ["Where can I get prescription sports sunglasses?", "Where can I buy transitional or photochromic lenses online?"],
    },
  },
];

export const treemap: { rows: { h: number; cells: { topic: number; w: number }[] }[] } = {
  rows: [
    { h: 295, cells: [{ topic: 1, w: 359 }, { topic: 3, w: 269 }, { topic: 0, w: 201 }, { topic: 2, w: 194 }] },
    { h: 105, cells: [{ topic: 4, w: 531 }, { topic: 5, w: 413 }, { topic: 6, w: 79 }] },
  ],
};

export const questionsOpportunities: Opportunity[] = [
  {
    timeframe: "urgent",
    title: "Clarify and defend Warby Parker’s value story versus low-cost and legacy competitors.",
    body: "Many queries compare Warby Parker directly to Zenni, Eyebuydirect, LensCrafters, Pearle Vision, and Ray-Ban, with strong interest in “affordable,” “transparent pricing,” included coatings, bundles, insurance usage, FSA eligibility, and discounts for students/teachers/military. Users are weighing not just price but perceived quality, craftsmanship, warranty, and service. This shows that WP sits in a ‘better but still affordable’ consideration set and must continually justify its price premium over budget DTC players while undercutting or matching perceived value versus legacy chains.",
    recs: [
      "Reframe pricing as ‘all-in fair value’ across every touchpoint: make a simple side-by-side comparison chart on-site and in-store showing what’s included (AR, UV, scratch-resistant, warranty, returns) versus key competitors, with real total ticket prices.",
      "Build a content series and landing pages around “Affordable luxury eyewear” and “Is Warby Parker worth it?” that address concerns like lens quality, coatings, durability, and long-term cost of ownership.",
      "Highlight insurance/FSA/HSA usage and any promotional levers clearly in cart and PDPs so value is obvious at decision time.",
      "Test targeted campaigns for students, teachers, and young professionals explaining how WP balances design, quality, and ethics at a price below traditional luxury brands but with more trust than the cheapest online options.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Double down on owning “best-in-class try-on” by integrating and elevating home, virtual, and in-store styling experiences.",
    body: "There is heavy search volume around home try-on, how at-home kits work, virtual try-on accuracy, in-app try-on, and “best online frame-fitting tools.” People also ask about face-shape specific recommendations (round, square, heart-shaped, small/large/narrow faces) and “virtual frame recommendations.” This shows that fit confidence is still a major barrier, and consumers are actively comparing retailers on the sophistication and ease of their try-on experiences.",
    recs: [
      "Position Warby Parker explicitly as the easiest place to know what will look good on you before you buy: tighten the story around the ecosystem of Home Try-On, Virtual Try-On, and in-store styling, and show it visually in marketing.",
      "Improve and promote algorithmic style and face-shape recommendations in-app and on-site, then surface personalized “Best for your face shape” edits on PDPs and emails.",
      "Run campaigns and influencer content that walk through the full ‘try-on journey’ (scan face → virtual try-on shortlist → Home Try-On box → in-store final tweaks) to remove anxiety for first-time eyeglass buyers.",
      "Encourage and highlight UGC and reviews that show before/after try-ons so prospects can see real-world accuracy of the tools.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Elevate and modernize Warby Parker’s sustainability and social-impact story to stay ahead of rising expectations.",
    body: "Numerous queries focus on sustainable eyewear, carbon neutrality, recycled materials, eco-friendly packaging, ethical supply chains, social responsibility, inclusive brands, and “companies that donate with each purchase.” Warby Parker is already known for Buy a Pair, Give a Pair, but queries like “How eco-friendly are Warby Parker glasses?” and “Can I recycle my old glasses at Warby Parker?” suggest consumers want more clarity and proof points around environmental performance, circularity, and transparency of impact, not just a cause-marketing tagline.",
    recs: [
      "Refresh Warby Parker’s brand narrative so sustainability and impact are not a side note but a key pillar, with a dedicated “Impact & Sustainability” hub that clearly outlines carbon goals, materials mix, packaging practices, and supply chain ethics.",
      "Make the Buy a Pair, Give a Pair program more tangible with impact counters, partner spotlights, and transparent reporting; translate this into bite-sized visuals and messaging for emails, stores, and PDPs.",
      "Expand and promote recycling and donation programs (old frames, lenses, cases) and make participation extremely simple in-store and via mail-in.",
      "Emphasize inclusive design and marketing (face shapes, sizes, gender-neutral styles, diverse models) and call it out explicitly to capture shoppers searching for ethical, inclusive, and mission-driven eyewear brands.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Lean into Warby Parker as a full-service vision-care destination, not just a frame brand.",
    body: "Many queries revolve around eye exams, prescription updates without visiting an optometrist, digital eye exams, what’s included in a WP eye exam, same-day eye exams, progressive and bifocal lenses, high prescriptions, astigmatism, and getting lenses in old frames. Users are also asking which companies offer exams, tests, contacts, and glasses under one roof and which use independent optometrists. This indicates strong demand for one-stop, convenient clinical plus retail solutions, where WP is already active but may not be fully perceived as a comprehensive provider.",
    recs: [
      "Reposition Warby Parker’s marketing from ‘cool glasses brand’ to ‘modern eye care & eyewear in one place,’ especially in performance media and store signage.",
      "Make exam capabilities, digital prescription tools, and contact lens offerings prominent on the homepage, in-app, and on location pages, with plain-language explanations of what’s included and for whom each service is best.",
      "Create clear pathways for complex-need customers (progressives, high Rx, astigmatism) that explain lens options, expected outcomes, and pricing, reducing the perceived risk of handling those needs online.",
      "Integrate booking CTAs and prescription-management prompts throughout the customer journey so users naturally move from browsing frames to scheduling exams or renewing prescriptions with WP instead of going elsewhere.",
    ],
  },
  {
    timeframe: "urgent",
    title: "Sharpen Warby Parker’s omnichannel promise around speed, convenience, and support to win first-time and time-sensitive shoppers.",
    body: "Users ask who offers fast, free shipping, speedy prescription fulfillment, same-day exams with glasses, BOPIS, generous return policies, warranties, free adjustments, and “seamless omnichannel eyewear shopping with easy returns.” They also search for nearby Warby stores, appointment booking, and what WP’s return policy and warranty entail. This indicates that convenience, service reliability, and post-purchase support are key differentiators, especially for emergencies and first-time buyers who are comparing online players and brick-and-mortar chains.",
    recs: [
      "Make service promises front and center: clearly advertise average shipping times, free shipping/returns, hassle-free exchanges, in-store adjustments, and satisfaction guarantees on every main page and in ad copy.",
      "Highlight “Order online, pick up in store” and other hybrid options wherever available, including geo-targeted campaigns that show nearby stores and their capabilities (exams, adjustments, same-day frame availability).",
      "Build dedicated landing pages for “first-time glasses buyers” and “need glasses fast?” that explain step-by-step how Warby Parker handles timing, fitting, and fixes, reducing perceived risk.",
      "Use post-purchase email and SMS to reinforce easy support options (repairs, adjustments, cleaning, warranty help) to turn a smooth experience into advocacy and positive reviews that feed back into comparison-driven searches.",
    ],
  },
];
