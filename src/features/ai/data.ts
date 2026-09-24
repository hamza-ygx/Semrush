import { routes } from "@/config/routes";

export const bpInsights = [
  {
    title: "Make Style the Default",
    text: "Build on 80% positive perception with seasonal fashion stories that beat discount-led rivals.",
    link: { label: "Go to Perception", href: `${routes.ai.perception}?pid=9` },
  },
  {
    title: "Broaden the Worldwide Narrative",
    text: "Move beyond U.S./Canada framing with contacts, kids, and smart-eyewear stories that match broader rivals.",
    link: { label: "Go to Narrative Drivers", href: `${routes.ai.narrativeDrivers}?pid=9` },
  },
  {
    title: "Own Digital Fit Confidence",
    text: "Amplify 19 frame-selection technology mentions to establish inclusive, accurate virtual try-on leadership.",
    link: { label: "Go to Perception", href: `${routes.ai.perception}?pid=9` },
  },
  {
    title: "Close the Value Gap",
    text: "Answer affordability comparisons with all-in pricing, included coatings, guarantees, and frame longevity.",
    link: { label: "Go to Narrative Drivers", href: `${routes.ai.narrativeDrivers}?pid=9` },
  },
];

export type Bubble = { name: string; color: string; x: number; y: number; r: number; you?: boolean };

export const sovBubbles: Bubble[] = [
  { name: "Ac lens", color: "#2bd9a8", x: 14.7, y: 86.5, r: 49 },
  { name: "Warby parker", color: "#6167e6", x: 10.05, y: 89.3, r: 42, you: true },
  { name: "Zenni optical", color: "#c38aff", x: 5.4, y: 91.1, r: 31 },
  { name: "Glassesusa", color: "#ffb301", x: 4.05, y: 92, r: 28 },
  { name: "Eyebuydirect", color: "#ff6973", x: 3.95, y: 88.5, r: 28 },
];

export const sentiment = [
  { label: "Favorable", value: 89, color: "#00c190", delta: "5%", up: false },
  { label: "General", value: 11, color: "#e8920a", delta: "5%", up: true },
];

export const shareOfVoice = [
  { name: "Ac lens", color: "#2bd9a8", value: 15, delta: "0" },
  { name: "Warby parker", color: "#6167e6", value: 10, delta: "0", you: true },
  { name: "Zenni optical", color: "#c38aff", value: 5, delta: "down" },
  { name: "Glassesusa", color: "#ffb301", value: 4, delta: "0" },
  { name: "Eyebuydirect", color: "#ff6973", value: 4, delta: "0" },
  { name: "Other", color: "", value: 62, delta: "up" },
];

export type Driver = { name: string; values: (number | null)[]; total: number; brands: number };

export const drivers: Driver[] = [
  { name: "Online Conversion Growth", values: [61, 39, 40, 33, 18], total: 286, brands: 60 },
  { name: "Purchase Risk Reduction", values: [49, 40, 17, 15, 15], total: 338, brands: 112 },
  { name: "Omnichannel Market Reach", values: [46, 38, 10, 15, 3], total: 308, brands: 97 },
  { name: "Affordable Market Expansion", values: [40, 108, 104, 46, 63], total: 685, brands: 135 },
  { name: "Premium Pricing Power", values: [37, 41, 15, 12, 16], total: 640, brands: 232 },
  { name: "Purpose-Led Loyalty", values: [31, 17, 4, null, 6], total: 244, brands: 82 },
  { name: "Digital Market Reach", values: [18, 18, 10, 12, 10], total: 163, brands: 76 },
  { name: "Retention Revenue Growth", values: [14, 30, 19, 11, 22], total: 212, brands: 71 },
  { name: "Conversion Confidence", values: [12, 10, 4, 2, 3], total: 59, brands: 26 },
  { name: "Sustainability-Led Preference", values: [9, 4, 1, null, null], total: 205, brands: 81 },
  { name: "Integrated Care Revenue", values: [8, 11, null, 2, 1], total: 89, brands: 39 },
  { name: "Urgent Demand Capture", values: [5, 12, 2, 2, 8], total: 74, brands: 29 },
  { name: "Category Revenue Expansion", values: [4, 5, 2, 2, 1], total: 51, brands: 32 },
  { name: "Inclusive Market Expansion", values: [4, 2, 2, 1, null], total: 36, brands: 26 },
  { name: "Wallet Share Expansion", values: [1, 5, 1, 7, 1], total: 26, brands: 14 },
];

export const heatScale = [
  { label: "0", min: 0, max: 0, bg: "#f3f5f5", fg: "#6c6e79" },
  { label: "1–9", min: 1, max: 9, bg: "#eff4fe", fg: "#6c6e79" },
  { label: "10–18", min: 10, max: 18, bg: "#cfdbff", fg: "#6c6e79" },
  { label: "19–36", min: 19, max: 36, bg: "#94a8f3", fg: "#ffffff" },
  { label: "37–63", min: 37, max: 63, bg: "#5c5bc4", fg: "#ffffff" },
  { label: "64–108", min: 64, max: 108, bg: "#2e296b", fg: "#ffffff" },
];

export const comparisons = [
  {
    idx: 1,
    title: "They lead on share",
    text: "AC Lens leads 15% vs our 10%. Defend with affordability messaging.",
    sov: { them: 15, themDelta: "0", us: 10, usDelta: "0" },
    fav: { them: 86, themDelta: "1%", us: 89, usDelta: "5%" },
  },
  {
    idx: 2,
    title: "We lead overall",
    text: "Zenni Optical 5% vs our 10% share. Defend premium strengths; answer affordability gap.",
    sov: { them: 5, themDelta: "1%", us: 10, usDelta: "0" },
    fav: { them: 91, themDelta: "2%", us: 89, usDelta: "5%" },
  },
  {
    idx: 3,
    title: "We lead on share",
    text: "Glassesusa 4% vs our 10% share. Keep conversion lead; close the affordability gap.",
    sov: { them: 4, themDelta: "0", us: 10, usDelta: "0" },
    fav: { them: 92, themDelta: "1%", us: 89, usDelta: "5%" },
  },
  {
    idx: 4,
    title: "We lead overall",
    text: "Eyebuydirect 4% vs our 10% share. Protect loyalty strengths; counter value pricing.",
    sov: { them: 4, themDelta: "0", us: 10, usDelta: "0" },
    fav: { them: 88, themDelta: "3%", us: 89, usDelta: "5%" },
  },
];

export const opportunities = [
  {
    tf: "short",
    title: "Turn Warby Parker’s leading trust and satisfaction halo into a stronger reason to choose the brand over both budget e-tailers and legacy chains.",
    text: "AI platforms already associate Warby Parker with positive customer satisfaction, free returns, guarantees, durable everyday products, and supportive service. Its leadership in risk reduction is a meaningful competitive advantage, but models do not always translate these protections into a clear recommendation rationale when comparing lower-priced online retailers or chains offering immediate service. Making the practical safety of choosing Warby Parker more explicit can strengthen conversion without requiring the brand to compete solely on price or speed.",
    recs: [
      "Frame guarantees, remakes, easy returns, free adjustments, quality control, and predictable fulfillment as an integrated promise of confidence in every purchase.",
      "Where Warby Parker cannot match same-day service or the lowest advertised price, explain the compensating value through reliability, included features, quality, and resolution support.",
      "Encourage customer stories, expert reviews, and comparison content to show how Warby Parker reduces the downside of buying eyewear while preserving style and fair value.",
    ],
  },
  {
    tf: "medium",
    title: "Make Warby Parker the trusted default for modern everyday eyewear by unifying style, fair value, low risk, and omnichannel access in one repeatable brand promise.",
    text: "Warby Parker has strong share of voice, very high positive perception, and leading signals in product performance, customer risk reduction, try-before-you-buy, omnichannel reach, transparent pricing, and social impact. However, AI platforms often describe these advantages separately and position the brand as one of several good mid-range options rather than the best overall choice. Price-led comparisons with ultra-budget competitors also fail to consistently convey the included lens features, guarantees, and customer experience that support Warby Parker’s value proposition.",
    recs: [
      "Lead with one concise promise that ties designer style, fair all-in pricing, risk-free trial, and in-store or online support into a single reason to choose Warby Parker.",
      "Use the same framing across owned brand communications, PR, reviewer briefs, and comparison materials, making clear what customers receive for the price, including standard lens benefits, returns, scratch guarantees, and adjustments.",
      "Position premium lens tiers as clear “good, better, best” upgrades anchored in the trusted base offering, using simple customer-benefit language rather than technical specifications.",
    ],
  },
  {
    tf: "urgent",
    title: "Expand Warby Parker’s role from stylish eyewear retailer to credible, integrated eye-care choice across exams, virtual vision services, insurance, contacts, and prescription fulfillment.",
    text: "Warby Parker is already associated with eye exams, virtual vision tests, insurance and FSA/HSA usage, contacts, and omnichannel service, but AI answers still tend to favor legacy chains, warehouse clubs, and other providers for healthcare- or insurance-led questions. This narrows Warby Parker’s perceived relevance to frame shopping even when consumers seek an exam-and-glasses journey or ongoing vision-care services. Greater authority in these entry points can increase both lifetime value and the brand’s participation across the full eye-care journey.",
    recs: [
      "Establish a clear, unified eye-care narrative that connects exams, prescription renewal, insurance use, contacts, virtual vision services, and eyewear into one consumer journey.",
      "Strengthen clinical-quality, convenience, eligibility, and total-value messaging through authoritative owned content and balanced partnerships with health and consumer media.",
      "Coordinate marketing and operations so service information is accurate, easy to understand, and supported by the capacity to deliver when interest rises.",
    ],
  },
  {
    tf: "urgent",
    title: "Protect the effortless brand promise through rigorous policy clarity, operational expectation-setting, and proactive management of recurring AI caveats.",
    text: "AI descriptions identify shipping waits, out-of-network reimbursement complexity, lens-service limitations, and inconsistent Home Try-On information as friction points that can undermine Warby Parker’s convenience credentials. Other recurring caveats—higher prices than ultra-budget options, no lined bifocals, limited geographic footprint, and sustainability limitations—can similarly cause models to recommend alternatives for specific needs. Because Warby Parker has high visibility, outdated or conflicting information across its own and third-party sources can be amplified widely.",
    recs: [
      "Create a formal content-governance process for high-intent policies and service details, including try-on, shipping, insurance, returns, warranties, lens services, product availability, and store coverage.",
      "Set clear expectations on delivery times, reimbursement steps, and lens options so customers and AI platforms receive one consistent, current answer.",
      "When policies or programs change, coordinate updates across site content, FAQs, partner materials, press outreach, and monitoring of AI responses.",
    ],
  },
  {
    tf: "urgent",
    title: "Own a cohesive “Future of Seeing” platform that makes Warby Parker the mainstream leader in inclusive, purposeful, and intelligent eyewear.",
    text: "Warby Parker has distinctive signals across social impact, inclusive fit, sustainability efforts, style leadership, and intelligent-eyewear partnerships with Google and Samsung. AI platforms currently surface these as disconnected facts, rather than recognizing a single forward-looking vision for accessible, human-centered eyewear. This leaves space for pure technology companies, sustainability specialists, and inclusion-focused challengers to define the category’s future.",
    recs: [
      "Build a single “Future of Seeing” narrative that links inclusive design, social mission, sustainability evolution, fashion expertise, and intelligent eyewear.",
      "Use innovation-focused leadership communications, founder perspectives, impact reporting, and technology, lifestyle, sustainability, and DEI media to reinforce Warby Parker’s role in making advanced eyewear practical and accessible for everyday life.",
      "Ensure smart-eyewear storytelling remains closely connected to the brand’s established strengths in fit, virtual try-on, and omnichannel care, rather than appearing as a separate initiative.",
    ],
  },
] as const;

export const overviewFaqs = (name: string) => [
  {
    q: `What is the ${name} AI SEO Toolkit?`,
    a: `The ${name} AI SEO Toolkit shows how your brand appears in AI-generated answers, how you compare with competitors, and what to do next to grow your visibility across AI platforms and traditional search.`,
  },
  {
    q: "How does it work?",
    a: "We run a large set of relevant prompts across AI platforms, record which brands and sources are mentioned or cited, and turn the results into visibility scores, share of voice, sentiment, and recommendations.",
  },
  {
    q: `Which AI platforms (LLMs) does the ${name} AI SEO Toolkit track?`,
    a: "The toolkit tracks ChatGPT, Google AI Overviews, Google AI Mode, Gemini, and Perplexity, and the list keeps growing as new platforms gain adoption.",
  },
  {
    q: "Can I track my competitors?",
    a: "Yes. Add up to several competitors to compare mentions, citations, share of voice, and sentiment, and to find the prompts and sources where they appear but you don't.",
  },
  {
    q: "How often is AI visibility data updated?",
    a: "Visibility data is refreshed regularly, and tracked prompts are updated daily so you can monitor changes and spot trends over time.",
  },
  {
    q: "What is AI crawlability, and why does it matter?",
    a: "AI crawlability describes whether AI bots can access and read your pages. If crawlers are blocked, your content can't be used or cited in AI-generated answers.",
  },
  {
    q: `How can I access the ${name} AI SEO Toolkit?`,
    a: `The toolkit is available in your ${name} account. Open AI Visibility from the main navigation to start with a free example or analyze your own domain.`,
  },
  {
    q: "How is AI SEO different from traditional SEO?",
    a: "Traditional SEO focuses on rankings in search results, while AI SEO focuses on being mentioned, cited, and recommended inside AI-generated answers. Both work best together.",
  },
];

export const voChart = {
  xs: [426, 471, 583, 694, 806, 918, 1030, 1075],
  labels: [
    { x: 471, t: "Apr 2026" },
    { x: 583, t: "May 2026" },
    { x: 694, t: "Jun 2026" },
    { x: 806, t: "Jul 2026" },
    { x: 918, t: "Aug 2026" },
    { x: 1030, t: "Sep 2026" },
  ],
  mentions: [0, 0, 0, 0, 0, 0, 0, 0],
  citations: [3, 3, 7, 5, 3, 1, 1, 1],
  citedPages: [3, 3, 6, 3, 3, 1, 1, 1],
};

export const voLlms = [
  { name: "ChatGPT", icon: "chatgpt", share: "n/a", count: "n/a" },
  { name: "AI Overview", icon: "google", share: "0%", count: "0" },
  { name: "AI Mode", icon: "google", share: "n/a", count: "n/a" },
  { name: "Gemini", icon: "gemini", share: "n/a", count: "n/a" },
] as const;

export const voNext = [
  {
    title: "Find hot topics for your brand",
    text: "Discover high-potential topics where your brand is missing. Create content that puts you back in the conversation and boost your AI Visibility.",
    link: "Uncover topic opportunities",
    href: routes.ai.promptResearch,
  },
  {
    title: "Explore competitor strategies",
    text: "See which topics competitors dominate and where they publish. Use these insights to create content and grow visibility in AI-generated answers.",
    link: "Find competitor gaps",
    href: routes.ai.competitorResearch,
  },
  {
    title: "Optimize your domain for AI",
    text: "Make sure AI bots can crawl your domain and use your content. If crawlers can't access it, your site won't appear in AI answers.",
    link: "Check your domain's AI Health",
    href: routes.siteAudit,
  },
  {
    title: "Track your brand narrative",
    text: "Learn how AI platforms describe your brand, which sentiment drivers matter, and how you compare with competitors.",
    link: "Open Brand Performance",
    href: `${routes.ai.brandPerformance}?pid=9`,
  },
];

export const voTabs = [
  { label: "Your Performing Topics", count: 1 },
  { label: "Topic Opportunities" },
  { label: "Cited Sources" },
  { label: "Source Opportunities" },
  { label: "Cited Pages", count: 1 },
];
