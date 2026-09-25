import { brand } from "@/config/brand";

export type Illustration = "topic" | "journalist" | "search" | "inbox" | "mentions" | "alerts" | "lists" | "senders" | "digest";

export type Feature = { title: string; bullets: string[]; art: Illustration; artHeight?: number };

export type Landing = {
  title: string;
  subtitle: string;
  price?: string;
  gap: number;
  features: Feature[];
};

export const heroTitleCls = "text-[42px] leading-[44px] font-semibold tracking-[-0.057em] text-rk-text";

export const dashboardHero = {
  title: "Be present in the media LLMs trust",
  subtitle: "Identify top media outlets cited by LLMs, pitch them using AI, and track your media presence — no PR experience needed.",
};

export const exampleDomains = [
  { domain: "warbyparker.com", logo: "wp" as const },
  { domain: brand.domain, logo: "rk" as const },
];

export const dashboardFeatures: Feature[] = [
  {
    title: "Target media with high AI visibility",
    bullets: [
      "Enter industry topics and view impactful media outlets in your niche",
      "Automatically see which outlets to pitch for the best results in LLMs",
      "Instantly access information about the outlet’s traffic and contributing journalists",
    ],
    art: "topic",
  },
  {
    title: "Find journalists who will cover your story",
    bullets: [
      "Detailed journalist profiles, including recent articles and audience insights",
      "Conversational AI search and AI-driven contact suggestions",
      "Easy media list management",
    ],
    art: "journalist",
  },
  {
    title: "Pitch journalists with AI-powered outreach",
    bullets: [
      "Generate personalized pitches based on each journalist’s recent coverage",
      "Send emails from your own domain and keep every conversation in one inbox",
      "See who opened, clicked, and read your pitch",
    ],
    art: "inbox",
  },
  {
    title: "Track and measure your media visibility",
    bullets: [
      "Create unlimited queries to monitor online media and calculate your PR impact",
      "Track which mentions resulted from your pitches",
      "Set up real-time alerts and recurring news scans with AI summaries of new mentions",
    ],
    art: "mentions",
  },
];

export const landings: Record<string, Landing> = {
  aiCitedMedia: {
    title: "See which media to pitch to break into LLMs",
    subtitle: "Control your brand narrative in LLMs by featuring in the most-cited media in your industry.",
    price: "7 days free, then $149/mo.",
    gap: 64,
    features: [
      {
        title: "Find the top-cited media in your industry",
        bullets: [
          "Enter a topic and see which outlets ChatGPT, Gemini, and Google AI Mode cite most",
          "Compare outlets by AI authority, traffic, and audience",
          "Discover the journalists who write for each outlet",
        ],
        art: "topic",
      },
      {
        title: "Know exactly who to pitch",
        bullets: [
          "Open detailed journalist profiles with recent articles and audience insights",
          "Add journalists to media lists in one click",
          "Get AI-driven suggestions for similar contacts",
        ],
        art: "journalist",
      },
      {
        title: "Measure your share of AI citations",
        bullets: [
          "Track how often AI-cited outlets mention your brand",
          "Spot new coverage opportunities as they appear",
          "Report your PR impact on AI visibility",
        ],
        art: "mentions",
      },
    ],
  },
  contactSearch: {
    title: "Find journalists who care about your story",
    subtitle: "Use AI and keyword search to quickly spot relevant journalists. Research their background and audience in a few clicks.",
    gap: 40,
    features: [
      {
        title: "Identify the right contacts in seconds",
        bullets: [
          "Search by topic, keyword, outlet, or location",
          "Describe your story and let AI suggest relevant journalists",
          "Filter by outlet authority and audience size",
        ],
        art: "search",
        artHeight: 440,
      },
      {
        title: "Research journalists before you pitch",
        bullets: [
          "See recent articles and the topics each journalist covers",
          "Understand the outlet’s audience demographics",
          "Find verified contact details",
        ],
        art: "journalist",
      },
      {
        title: "Organize your contacts into media lists",
        bullets: ["Save journalists to lists for each campaign", "Share lists with your team", "Pitch a whole list in one go"],
        art: "lists",
      },
    ],
  },
  mediaLists: {
    title: "Find journalists who are looking for stories like yours",
    subtitle: "Know who you’re pitching. Research journalists’ work and audience, and create targeted media lists so you can land press hits faster.",
    gap: 56,
    features: [
      {
        title: "Identify the right contacts in seconds",
        bullets: [
          "Search by topic, keyword, outlet, or location",
          "Describe your story and let AI suggest relevant journalists",
          "Filter by outlet authority and audience size",
        ],
        art: "search",
        artHeight: 440,
      },
      {
        title: "Build targeted media lists",
        bullets: ["Save journalists to lists for each campaign", "Remove duplicates and keep contacts up to date", "Share lists with your team"],
        art: "lists",
      },
      {
        title: "Research journalists before you pitch",
        bullets: [
          "See recent articles and the topics each journalist covers",
          "Understand the outlet’s audience demographics",
          "Find verified contact details",
        ],
        art: "journalist",
      },
    ],
  },
  yourEmails: {
    title: "Go from story idea to targeted PR outreach",
    subtitle: "Create personalized outreach that earns responses and media coverage. Write, send, and track in one AI-powered workflow.",
    gap: 56,
    features: [
      {
        title: "AI-assisted outreach, sent from your own domain",
        bullets: [
          "Generate personalized pitches based on each journalist’s recent coverage",
          "Send emails from your own domain to improve deliverability",
          "Keep every conversation with journalists in one inbox",
        ],
        art: "inbox",
        artHeight: 412,
      },
      {
        title: "Track how journalists engage with your pitch",
        bullets: ["See opens, clicks, and replies for every email", "Learn how long journalists spend reading your pitch", "Follow up at the right time"],
        art: "digest",
      },
      {
        title: "Connect senders and domains in minutes",
        bullets: ["Add multiple senders for your team", "Verify your domain with guided setup", "Monitor sending health in one place"],
        art: "senders",
      },
    ],
  },
  mediaMonitoring: {
    title: "Know who talks about your brand and own the narrative",
    subtitle: "Track brand mentions, monitor trends, and measure your presence across news sites, blogs, forums, and AI engines.",
    price: "7 days free, then $279/mo.",
    gap: 20,
    features: [],
  },
  alerts: {
    title: "Never miss what the media says about you",
    subtitle: "Stay on top of every media mention with real-time alerts and scheduled digests. Set it once, stay informed at all times.",
    price: "7 days free, then $279/mo.",
    gap: 64,
    features: [
      {
        title: "Get notified the moment you’re mentioned",
        bullets: ["Set up real-time alerts for any monitoring query", "Choose email or Slack delivery", "Filter alerts by sentiment, source, and reach"],
        art: "alerts",
      },
      {
        title: "Receive scheduled digests with AI summaries",
        bullets: ["Get daily or weekly digests of new mentions", "Read AI summaries of what changed", "Share digests with your team and stakeholders"],
        art: "digest",
      },
      {
        title: "Act on what matters",
        bullets: ["Spot negative coverage before it spreads", "Jump straight to the mention from any alert", "Track which mentions resulted from your pitches"],
        art: "mentions",
      },
    ],
  },
};

landings.senders = { ...landings.yourEmails };

export const journalists = [
  {
    name: "Andrea Montgomery",
    role: "Editor in Chief",
    tone: "#c79a7e",
    outlet: "PC MAg",
    domain: "pcmag.com",
    logo: "pc" as const,
    text: "Andrea Montgomery is the Managing Editor for Consumer Electronics at PCMag, specializing in products, services, and wellness technology. With eight articles published in the last year, she actively covers the latest trends in consumer electronics and wellness gadgets. Given her recent focus on wellness technology, a PR professional could pitch her a story about innovative health-related gadgets or services that enhance consumer well-being.",
    article: "Survey: Americans Intrigued But Skeptical of Wearable Tech",
  },
  {
    name: "Amira Khalid",
    role: "Journalist",
    tone: "#8d7a6a",
    outlet: "TechCrunch TV",
    domain: "techcrunch.com",
    logo: "tc" as const,
    text: "Amira Khalid is a Consumer News Reporter at TechCrunch, specializing in products and services, business information, and mass media. With 95 articles published in the last year, she actively covers developments in technology and engineering, as well as occasional insights into arts and entertainment. A PR professional could pitch her a story about innovative product launches or shifts in consumer behavior that align with current trends in the tech industry.",
    article: "Meta debuts new, cheaper smart glasses under its own brand | TechCrunch",
  },
  {
    name: "Daniel Whitford",
    role: "Senior Writer",
    tone: "#a07e62",
    outlet: "Fast Company",
    domain: "fastcompany.com",
    logo: "fc" as const,
    text: "Daniel Whitford is a Senior Writer at Fast Company covering retail, design, and direct-to-consumer brands. With 41 articles published in the last year, he regularly reports on how emerging brands reinvent shopping experiences. A PR professional could pitch him a story about a new retail concept or a design-led product launch that changes how customers buy everyday goods.",
    article: "How DTC brands are rethinking the store",
  },
];

export const exampleMentions = [
  {
    source: "msn.com/pt-br",
    title: "Meta deve apresentar óculos inteligentes sem câmera em meio a crescentes preocupações com a privacidade",
    text: "A Meta deve apresentar nesta quarta-feira (23) novos modelos de óculos inteligentes , incluindo versões sem câmera, durante sua conferência anual Connect na Califórnia nos Estados Unidos. A mudança ocorre enquanto a empresa e outras gigantes de tecnologia enfrentam pressão crescente sobre privacidade.",
    date: "Sep 24, 2026 5:54 AM",
  },
  {
    source: "UA.NEWS • UA.NEWS",
    title: "Побоювання щодо приватності можуть гальмувати поширення ШІ-пристроїв — Cyprus Mail",
    text: "На Кіпрі видання Cyprus Mail повідомляє, що компанії, які розробляють пристрої зі штучним інтелектом як можливу альтернативу смартфонам, стикаються з побоюваннями щодо приватності. Такі занепокоєння можуть уповільнити поширення нових пристроїв.",
    date: "Sep 24, 2026 5:49 AM",
  },
];

export const emailStats = [
  { label: "Emails sent", value: "25", rows: [["Delivered", "25"], ["Average opens", "1.2"]] },
  { label: "Open rate", value: "64%", rows: [["Opened", "16"], ["Click through rate", "32%"]] },
  { label: "Reply rate", value: "12%", rows: [] },
  { label: "Coverage", value: "3", rows: [] },
  { label: "Bounced", value: "0", rows: [] },
];

export const viewing = [
  { label: "Unknown", pct: 10, color: "#c4c4c4" },
  { label: "Glanced", pct: 50, color: "#5b5fc7" },
  { label: "Skimmed", pct: 30, color: "#94a3f2" },
  { label: "Read", pct: 10, color: "#ccd7fb" },
];

export type Sentiment = "Positive" | "Negative" | "Neutral";

export type Mention = {
  outlet: string;
  logo: { bg: string; fg?: string; text?: string };
  date: string;
  author: string;
  title: string;
  text: string;
  sentiment: Sentiment;
  stats: [string, string, string, string];
  country: string;
  flag: "ve" | "us" | "de" | "es" | "gb" | "fr" | "br";
};

export const mmQueries = [
  { name: "Warby Parker", count: "11,129" },
  { name: "Home Try-on", count: "314" },
  { name: "Intelligent Eyewear", count: "1,573" },
];

export const mmSentiments = [
  { label: "All", count: 11280 },
  { label: "Positive", count: 7238 },
  { label: "Neutral", count: 2553 },
  { label: "Negative", count: 1489 },
  { label: "Unknown", count: 0 },
] as const;

export const mmMetrics: { label: string; value: string; spark: string; wrap?: boolean }[] = [
  { label: "Number of Mentions", value: "11.3K", spark: "spiky", wrap: true },
  { label: "Mentions Reach", value: "202M", spark: "spiky" },
  { label: "Domains Reach", value: "52.3B", spark: "busy" },
  { label: "Backlinks", value: "0", spark: "flat" },
  { label: "Mentions with Backlinks", value: "0", spark: "flat", wrap: true },
  { label: "AI-Cited Mentions", value: "", spark: "lock" },
];

export const mmSentimentBreakdown = [
  { label: "Positive", pct: "64.2%", count: "7.24K", color: "#4ed45a", value: 64.2 },
  { label: "Negative", pct: "13.2%", count: "1.49K", color: "#f0303e", value: 13.2 },
  { label: "Neutral", pct: "22.6%", count: "2.55K", color: "#d6d8d7", value: 22.6 },
  { label: "Unknown", pct: "0%", count: "0", color: "#6a6c6a", value: 0 },
];

export const mmSources = [
  { label: "Online news", count: 10772, color: "#5b5fc7" },
  { label: "Blogs", count: 361, color: "#5b5fc7" },
  { label: "Discussions", count: 139, color: "#94a3f2" },
  { label: "YouTube", count: 8, color: "#aab4f8" },
];

export const mmOutlets = [
  { name: "yahoo.com", icon: "yahoo", score: 100, reach: "426.1M" },
  { name: "samsung.com", icon: "samsung", score: 100, reach: "235.6M" },
  { name: "yahoo.co.jp", icon: "", score: 100, reach: "74.3M" },
  { name: "The Economic Times", icon: "et", score: 100, reach: "51.1M" },
  { name: "Trustpilot Reviews", icon: "", score: 100, reach: "7.7M" },
  { name: "CNN US", icon: "", score: 100, reach: "135.6K" },
  { name: "Investing.com Suomi", icon: "", score: 99, reach: "26.3M" },
  { name: "MSN", icon: "", score: 98, reach: "153.6M" },
  { name: "Business Insider", icon: "", score: 97, reach: "98.4M" },
  { name: "Forbes", icon: "", score: 96, reach: "88.2M" },
];

export const mmReach = [
  { label: ">1M", count: 2628, color: "#5b5fc7" },
  { label: "100K-1M", count: 2177, color: "#6c70d6" },
  { label: "10K-100K", count: 2128, color: "#94a3f2" },
  { label: "1K-10K", count: 1696, color: "#aab4f8" },
  { label: "<1K", count: 2569, color: "#ccd7fb" },
];

export const mmAge = [
  { label: "18-24", male: 5.6, total: 9.1 },
  { label: "25-34", male: 7.9, total: 16.2 },
  { label: "35-44", male: 7.5, total: 14.6 },
  { label: "45-54", male: 9.6, total: 18 },
  { label: "55-64", male: 12.3, total: 22.7 },
  { label: "65+", male: 9.9, total: 18.5 },
];

export const mentions: Mention[] = [
  {
    outlet: "Alta Densidad",
    logo: { bg: "#e9e9e9", fg: "#555", text: "AD" },
    date: "Sep 24, 2026 6:14 PM",
    author: "Alta Densidad",
    title: "Meta VR Glasses: nuevos lentes de realidad virtual de 1.299 dólares que desafía al Vision Pro de Apple",
    text: "dominante en un mercado que crece con rapidez. Esa ventaja empieza a estar en riesgo. Samsung y Google preparan el lanzamiento de sus propios anteojos para este otoño boreal, con diseños firmados por Warby Parker y Gentle Monster y basados en Android...",
    sentiment: "Negative",
    stats: ["n/a", "0", "30", "170"],
    country: "Venezuela",
    flag: "ve",
  },
  {
    outlet: "Retail Brew",
    logo: { bg: "#f97a3f" },
    date: "Sep 24, 2026 4:51 PM",
    author: "Vera Chandler",
    title: "How Boll & Branch stores helped build the brand's first AI tool",
    text: "Boston, Atlanta, Charlotte, and Dallas, among other cities. “Service and building a relationship with the customer was at the core of why we opened these stores.” DTC brands like Brooklinen , Mejuri, and Warby Parker have all focused on building out...",
    sentiment: "Positive",
    stats: ["n/a", "0", "43", "767"],
    country: "United States",
    flag: "us",
  },
  {
    outlet: "Teltarif.de",
    logo: { bg: "#f97a3f" },
    date: "Sep 24, 2026 3:51 PM",
    author: "Robin Nordberg, Henrik Lanz",
    title: "PCs, Audio und Smart Glasses: Snapdragon als Ökosystem",
    text: "Lautsprecher und können dadurch ihre Umgebung erfassen. Qualcomm sieht darin eine weitere Möglichkeit, KI \"kontextbezogen\" einzusetzen. Auf dem Summit wurden unter anderem neue Brillen von Warby Parker gezeigt...",
    sentiment: "Positive",
    stats: ["n/a", "0", "48", "9.38K"],
    country: "Germany",
    flag: "de",
  },
  {
    outlet: "yahoo.com",
    logo: { bg: "#7e1fff", fg: "#fff", text: "y!" },
    date: "Sep 24, 2026 2:30 PM",
    author: "Yahoo Finance",
    title: "Warby Parker stock rises after Google smart glasses partnership update",
    text: "Shares of Warby Parker climbed in afternoon trading after the company shared new details about its smart glasses partnership. Analysts said the collaboration could open a new revenue stream for the eyewear retailer...",
    sentiment: "Positive",
    stats: ["n/a", "0", "100", "426.1M"],
    country: "United States",
    flag: "us",
  },
  {
    outlet: "The Economic Times",
    logo: { bg: "#e5313a", fg: "#fff", text: "ET" },
    date: "Sep 24, 2026 1:12 PM",
    author: "ET Bureau",
    title: "Smart eyewear market set to double by 2028 as big tech bets on glasses",
    text: "Tech majors are racing to put AI on your face. Partnerships between device makers and fashion brands such as Warby Parker and Gentle Monster signal that design will be as important as specs...",
    sentiment: "Neutral",
    stats: ["n/a", "0", "100", "51.1M"],
    country: "United States",
    flag: "us",
  },
  {
    outlet: "Xataka",
    logo: { bg: "#2d2d2d", fg: "#fff", text: "X" },
    date: "Sep 24, 2026 11:47 AM",
    author: "Redacción",
    title: "Las gafas inteligentes de Google llegarán con monturas de Warby Parker",
    text: "Google ha confirmado que sus próximas gafas con Android XR se venderán con monturas diseñadas por Warby Parker. La compañía busca evitar los errores de Google Glass con un diseño más discreto...",
    sentiment: "Positive",
    stats: ["n/a", "0", "71", "12.4M"],
    country: "Spain",
    flag: "es",
  },
  {
    outlet: "The Guardian",
    logo: { bg: "#052962", fg: "#fff", text: "G" },
    date: "Sep 24, 2026 10:05 AM",
    author: "Technology desk",
    title: "Privacy campaigners warn over rise of camera-equipped smart glasses",
    text: "Campaigners have raised concerns about a new wave of smart glasses from Meta, Google and partners including Warby Parker, warning that bystanders may be recorded without their knowledge...",
    sentiment: "Negative",
    stats: ["n/a", "0", "94", "38.9M"],
    country: "United Kingdom",
    flag: "gb",
  },
  {
    outlet: "Frandroid",
    logo: { bg: "#00b8d4", fg: "#fff", text: "F" },
    date: "Sep 24, 2026 9:31 AM",
    author: "Frandroid",
    title: "Android XR : tout savoir sur les lunettes connectées attendues cet automne",
    text: "Samsung, Google, Warby Parker et Gentle Monster travaillent ensemble sur une nouvelle génération de lunettes connectées. Voici ce que l’on sait sur leur date de sortie et leur prix...",
    sentiment: "Neutral",
    stats: ["n/a", "0", "65", "4.2M"],
    country: "France",
    flag: "fr",
  },
  {
    outlet: "Tecmundo",
    logo: { bg: "#1f6fe5", fg: "#fff", text: "T" },
    date: "Sep 24, 2026 8:18 AM",
    author: "Redação",
    title: "Óculos inteligentes do Google terão armações da Warby Parker",
    text: "O Google revelou que os novos óculos inteligentes com Android XR terão armações criadas pela Warby Parker, marca conhecida por vender óculos de grau pela internet...",
    sentiment: "Positive",
    stats: ["n/a", "0", "58", "2.9M"],
    country: "Brazil",
    flag: "br",
  },
  {
    outlet: "Glossy",
    logo: { bg: "#111", fg: "#fff", text: "Gl" },
    date: "Sep 24, 2026 7:02 AM",
    author: "Glossy staff",
    title: "Why eyewear brands are opening more stores in 2026",
    text: "Warby Parker plans to open 45 new stores this year, and competitors are following suit. Executives say in-person eye exams remain the strongest driver of customer loyalty...",
    sentiment: "Positive",
    stats: ["n/a", "0", "52", "1.1M"],
    country: "United States",
    flag: "us",
  },
];
