import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { footerColumns as pricingFooterColumns } from "@/features/pricing/data";
import { marketingRoutes as M } from "./routes";

const B = brand.name;

export { marketingRoutes } from "./routes";

export const navMenus = {
  Product: [
    { label: `${B} One`, href: routes.pricing.one },
    { label: "SEO", href: routes.seoDashboard },
    { label: "AI Visibility", href: routes.ai.overview },
    { label: "Traffic & Market", href: routes.traffic.home },
    { label: "Local", href: routes.local.start },
    { label: "Content", href: routes.content.dashboard },
    { label: "Social", href: routes.social.dashboard },
    { label: "Advertising", href: routes.ad.home },
    { label: "AI PR", href: routes.aipr.dashboard },
    { label: "App Center", href: routes.apps },
  ],
  Solutions: [
    { label: "For agencies", href: routes.account.agencyPartners },
    { label: "For enterprises", href: routes.pricing.enterprise },
    { label: "For small businesses", href: routes.local.start },
    { label: "For content teams", href: routes.content.dashboard },
  ],
  Resources: [
    { label: "Blog", href: M.blog },
    { label: "Knowledge Base", href: routes.kb },
    { label: "About us", href: M.about },
    { label: "Contact us", href: M.contacts },
    { label: "Legal info", href: M.legal },
  ],
};

const footerOverrides: Record<string, string> = {
  "About Us": M.about,
  "Contact Us": M.contacts,
  [`${B} Blog`]: M.blog,
  "Knowledge Base": routes.kb,
};

export const footerColumns = pricingFooterColumns.map((c) => ({ ...c, links: c.links.map((l) => ({ ...l, href: footerOverrides[l.label] ?? l.href })) }));

export const footerLegal = [
  { label: "Privacy Policy", href: M.privacyPolicy },
  { label: "Terms of Service", href: M.legalDoc("terms-of-service") },
];

export const contactCards = [
  { icon: "sales", title: "Reach out to sales", text: "Get to know how to upgrade or customize our tools for your needs.", cta: "Contact sales", href: "#contact-form" },
  { icon: "help", title: "Want to find an answer yourself?", br: "Want to find an|answer yourself?", text: "Learn how to use our tools with user manuals, FAQs, videos and more!", cta: "Go to Help Center", href: routes.kb },
  { icon: "support", title: "Need help?", text: "Contact us to get your issue resolved as soon as possible.", cta: "Contact Support", href: "#contact-form" },
  { icon: "phone", title: "Want to get help by phone?", br: "Want to get|help by phone?", text: "See local support numbers", cta: "Call Regional Support", href: "#offices" },
];

export const offices = [
  { city: "Stockholm", role: "Headquarters", address: ["Exempelgatan 1", "111 11 Stockholm", "Sweden"], phone: "+46 00 000 00 00" },
  { city: "Göteborg", role: "Sales & Support", address: ["Exempelvägen 2", "411 11 Göteborg", "Sweden"], phone: "+46 00 000 00 01" },
  { city: "Malmö", role: "Customer Success", address: ["Exempeltorget 3", "211 11 Malmö", "Sweden"], phone: "+46 00 000 00 02" },
  { city: "Halmstad", role: "Accounting Services", address: ["Exempelplatsen 4", "302 11 Halmstad", "Sweden"], phone: "+46 00 000 00 03" },
];

export const contactTopics = ["Sales and pricing", "Technical support", "Billing", "Partnerships", "Media and press", "Other"];

export const contactFaq = [
  { q: "How quickly will I get a reply?", a: "Our support team replies to most requests within one business day. Sales requests are usually answered the same day." },
  { q: "Can I get a demo before I buy?", a: `Yes. Reach out to sales and we will set up a personal walkthrough of ${B} for your team.` },
  { q: "Where can I find my invoices?", a: "Invoices are available on the Subscription info page of your account. You can download them at any time." },
  { q: "Do you offer support in Swedish?", a: "Yes. Our support team answers in Swedish and English." },
];

export const aboutStats = [
  { value: "10M+", label: "marketers and business owners have tried our tools" },
  { value: "55+", label: "tools and apps for search, content, social and AI" },
  { value: "140+", label: "country databases with keyword data" },
  { value: "25B+", label: "keywords in our database" },
];

export const aboutValues = [
  { title: "Customer first", text: "We build for the people who use our product every day and listen to their feedback." },
  { title: "Clarity over noise", text: "We turn complex data into clear answers and next steps." },
  { title: "Always learning", text: "Search changes fast. We test, learn, and share what we find with our community." },
  { title: "Own the result", text: "We take responsibility for our work, from the first idea to the last detail." },
];

export const aboutTimeline = [
  { year: "2008", text: "A small team of SEO and IT specialists starts building a tool for keyword research." },
  { year: "2014", text: "The toolkit grows into a platform for SEO, content, advertising and social media." },
  { year: "2020", text: "Our database passes 20 billion keywords across 140+ countries." },
  { year: "2024", text: "We launch AI Visibility tools so brands can see how AI platforms talk about them." },
  { year: "2026", text: `${B} One brings every toolkit together in one subscription.` },
];

export type BlogCategory = "SEO" | "Marketing" | "News & Research" | "Product";
export const blogCategories: ("Blog" | BlogCategory)[] = ["Blog", "SEO", "Marketing", "News & Research", "Product"];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tag: string;
  author: string;
  read: number;
  date: string;
  art: "chart" | "ledger" | "search" | "chat" | "calendar" | "coins" | "magnifier" | "rocket";
  body: [string, string][];
};

const body = (topic: string): [string, string][] => [
  ["Why it matters", `${topic} affects how customers find you and how much each new client costs. Small improvements add up over a year, especially for firms that rely on local search.`],
  ["Where to start", "Begin with the data you already have: your top pages, the searches that bring visitors in, and the questions clients ask most often. Pick the three biggest opportunities and work on those first."],
  ["How to measure progress", "Track rankings, organic traffic and enquiries every month. Compare against the same period last year to remove seasonal effects such as the tax return rush."],
];

export const blogPosts: BlogPost[] = [
  { slug: "zero-click-marketing", title: "What is zero-click marketing? How to win when users don't click", excerpt: "Zero-click marketing is a content strategy for delivering value without requiring a click to your website.", category: "Marketing", tag: "General Marketing", author: "Content Team", read: 9, date: "September 11, 2026", art: "chat", body: body("Zero-click marketing") },
  { slug: "keyword-research-for-accounting-firms", title: "How to do keyword research for accounting firms", excerpt: "Find the searches your future clients use, from “bokföring” to “årsredovisning”, and turn them into a content plan.", category: "SEO", tag: "Keyword Research", author: "SEO Editor", read: 13, date: "September 10, 2026", art: "search", body: body("Keyword research") },
  { slug: "ai-search-and-small-businesses", title: "AI search changes how small businesses get found", excerpt: "We looked at how AI answers mention local firms and what makes a business more likely to be recommended.", category: "News & Research", tag: "AI", author: "Research Team", read: 14, date: "September 7, 2026", art: "chart", body: body("AI search visibility") },
  { slug: "b2b-answer-engine-optimization", title: "B2B answer engine optimization: a practical guide", excerpt: "How B2B service firms can structure content so AI assistants cite it.", category: "SEO", tag: "AI Search", author: "SEO Editor", read: 11, date: "September 5, 2026", art: "rocket", body: body("Answer engine optimization") },
  { slug: "conduct-an-seo-audit", title: "How to conduct an SEO audit in 8 steps", excerpt: "A step-by-step checklist to find technical, on-page and content issues on your site.", category: "SEO", tag: "Technical SEO", author: "Technical SEO Lead", read: 12, date: "September 3, 2026", art: "magnifier", body: body("An SEO audit") },
  { slug: "local-seo-for-accountants", title: "Local SEO for accountants: rank in your city", excerpt: "Google Business Profile, reviews and local pages: what moves the needle for accounting firms.", category: "SEO", tag: "Local SEO", author: "Local SEO Specialist", read: 10, date: "September 1, 2026", art: "ledger", body: body("Local SEO") },
  { slug: "content-calendar-for-tax-season", title: "Build a content calendar around tax season", excerpt: "Plan articles, newsletters and social posts around the deadlines your clients care about.", category: "Marketing", tag: "Content Marketing", author: "Content Team", read: 8, date: "August 28, 2026", art: "calendar", body: body("A seasonal content calendar") },
  { slug: "pricing-pages-that-convert", title: "Pricing pages that convert: lessons from service firms", excerpt: "What we learned from reviewing pricing pages of 200 professional service websites.", category: "News & Research", tag: "Research", author: "Research Team", read: 9, date: "August 25, 2026", art: "coins", body: body("Pricing page optimization") },
  { slug: "new-in-site-audit", title: "New in Site Audit: faster crawls and clearer reports", excerpt: "Site Audit now crawls large sites faster and groups issues by the fix they need.", category: "Product", tag: "Product News", author: "Product Team", read: 5, date: "August 22, 2026", art: "chart", body: body("Faster Site Audit crawls") },
  { slug: "ppc-for-professional-services", title: "PPC for professional services: a beginner's guide", excerpt: "How to set up search ads for an accounting or consulting firm without wasting budget.", category: "Marketing", tag: "PPC", author: "PPC Specialist", read: 12, date: "August 19, 2026", art: "coins", body: body("Pay-per-click advertising") },
  { slug: "position-tracking-for-ai-answers", title: "Track your rankings in AI answers", excerpt: "Position Tracking now shows where your brand appears in AI answers next to classic rankings.", category: "Product", tag: "Product News", author: "Product Team", read: 6, date: "August 15, 2026", art: "search", body: body("Tracking AI answers") },
  { slug: "email-newsletters-for-accountants", title: "Email newsletters that clients actually read", excerpt: "Subject lines, frequency and topics that keep clients engaged all year.", category: "Marketing", tag: "Email Marketing", author: "Content Team", read: 7, date: "August 12, 2026", art: "ledger", body: body("Email marketing") },
];

export const legalDocs = [
  { slug: "terms-of-service", title: "Terms of Service" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "cookie-policy", title: "Cookie Policy" },
  { slug: "website-terms-of-use", title: "Website Terms of Use" },
  { slug: "cancellation-and-refund-policy", title: "Cancellation and Refund Policy" },
  { slug: "content-policy", title: "Content Policy" },
  { slug: "trademarks-and-brand-usage-policy", title: "Trademarks and Brand Usage Policy" },
  { slug: "app-center-terms-of-service", title: "App Center Terms of Service" },
  { slug: "app-center-partner-agreement", title: "App Center Partner Agreement" },
  { slug: "security-info", title: "Security Info" },
  { slug: "general-event-terms-and-conditions", title: "General Event Terms and Conditions" },
  { slug: "recruitment-privacy-policy", title: "Recruitment Privacy Policy" },
  { slug: "data-processing-addendum", title: "Data Processing Addendum" },
  { slug: "custom-report-marketplace-terms-of-use", title: "Custom Report Marketplace Terms of Use" },
  { slug: "customer-support-terms-and-conditions", title: "Customer Support Terms and Conditions" },
  { slug: "sub-processors-and-joint-controllers", title: "Approved sub-processors and joint controllers" },
  { slug: "ai-services-terms", title: `${B} Artificial Intelligence Services Terms` },
  { slug: "agency-partners-platform-terms-of-use", title: `${B} Agency Partners Platform Terms of Use` },
];

export type TocItem = { n: string; label: string; id: string; sub?: boolean; gap?: boolean };

export const privacyToc: TocItem[] = [
  { n: "1.", label: "INTRODUCTION", id: "introduction" },
  { n: "2.", label: "KEY DEFINITIONS", id: "key-definitions" },
  { n: "3.", label: " INFORMATION WE COLLECT", id: "information-we-collect" },
  { n: "3.1", label: "Information Provided Directly by You", id: "provided-by-you" },
  { n: "3.2", label: "Information Received From Third Parties", id: "third-parties" },
  { n: "3.3", label: "Information Collected Automatically", id: "collected-automatically" },
  { n: "(a)", label: "Device and Usage Data", id: "device-data", sub: true },
  { n: "(b)", label: "Third-Party Widgets", id: "widgets", sub: true },
  { n: "(c)", label: "Cookies and Similar Technologies.", id: "cookies", sub: true },
  { n: "4.", label: "HOW WE USE YOUR PERSONAL DATA", id: "how-we-use", gap: true },
  { n: "5.", label: "HOW WE DISCLOSE YOUR PERSONAL DATA", id: "how-we-disclose" },
  { n: "6.", label: "DATA RETENTION", id: "data-retention" },
  { n: "7.", label: "INTERNATIONAL DATA TRANSFERS", id: "transfers" },
  { n: "8.", label: "YOUR RIGHTS", id: "your-rights" },
  { n: "9.", label: "SECURITY", id: "security" },
  { n: "10.", label: "CHILDREN'S PRIVACY", id: "children" },
  { n: "11.", label: "CHANGES TO THIS PRIVACY POLICY", id: "changes" },
  { n: "12.", label: "CONTACT US", id: "contact" },
];

export const privacySections: Record<string, string[]> = {
  introduction: [
    `This Privacy Policy explains how ${brand.legalName} (“${B}”, “we”, “us”) collects, uses and shares personal data when you use our website, products and services.`,
    "Please read this Privacy Policy carefully. By using our services you acknowledge that you have read and understood it.",
  ],
  "key-definitions": [
    "“Personal data” means any information relating to an identified or identifiable natural person.",
    "“Processing” means any operation performed on personal data, such as collection, storage, use or disclosure.",
    "“Services” means our website, software, apps, and any related support and training.",
  ],
  "information-we-collect": ["We collect personal data that you give us, that we receive from third parties, and that is collected automatically when you use our Services."],
  "provided-by-you": ["Account data such as your name, email address and password; billing data such as your company name, address and payment details; and any content you submit to us, for example when you contact support."],
  "third-parties": ["We may receive data from partners who resell our Services, from payment providers, and from services you choose to connect to your account, such as Google Analytics."],
  "collected-automatically": ["When you use our Services we automatically collect some technical data."],
  "device-data": ["IP address (for example 192.0.2.10), browser type, operating system, pages viewed, and the date and time of your visit."],
  widgets: ["Our website may include widgets from third parties, such as video players or social media buttons, that collect data according to their own policies."],
  cookies: ["We use cookies and similar technologies to keep you signed in, remember your settings and understand how our Services are used. You can manage cookies in Cookie settings."],
  "how-we-use": ["We use personal data to provide and improve our Services, process payments, communicate with you, keep our Services secure, and comply with legal obligations."],
  "how-we-disclose": ["We share personal data with service providers acting on our behalf, with partners when you ask us to, and with authorities when required by law. We do not sell your personal data."],
  "data-retention": ["We keep personal data for as long as your account is active and as needed to comply with our legal obligations, resolve disputes and enforce our agreements."],
  transfers: ["When personal data is transferred outside the EU/EEA we use appropriate safeguards, such as the European Commission’s Standard Contractual Clauses."],
  "your-rights": ["You have the right to access, correct, delete and port your personal data, to object to or restrict processing, and to lodge a complaint with a supervisory authority."],
  security: ["We use technical and organizational measures to protect personal data against loss, misuse and unauthorized access."],
  children: ["Our Services are not directed to children under 16 and we do not knowingly collect their personal data."],
  changes: ["We may update this Privacy Policy from time to time. We will post the new version on this page and update the Last Modified Date."],
  contact: ["If you have questions about this Privacy Policy, contact us at privacy@example.se or by post at Exempelgatan 1, 111 11 Stockholm, Sweden."],
};
