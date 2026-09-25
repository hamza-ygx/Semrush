import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { errorsList, issueCounts, issueId, noticesList, warningsList } from "../part2/data";

export const projectColumns = [
  { key: "update", label: "Last Update", w: 109, align: "left" as const },
  { key: "crawled", label: "Pages Crawled", w: 108, align: "left" as const },
  { key: "health", label: "Site Health", w: 84 },
  { key: "ai", label: "AI Search Health", w: 136, ai: true },
  { key: "errors", label: "Errors", w: 57 },
  { key: "warnings", label: "Warnings", w: 76 },
  { key: "crawlability", label: "Crawlability", w: 89 },
  { key: "https", label: "HTTPS", w: 62 },
  { key: "intseo", label: "Int. SEO", w: 68 },
  { key: "perf", label: "Site Performance", w: 121 },
  { key: "linking", label: "Internal Linking", w: 109 },
  { key: "markups", label: "Markups", w: 72 },
  { key: "cwv", label: "Core Web Vitals", w: 113 },
];

export const projectRow: Record<string, [string, string]> = {
  health: ["82%", "0%"],
  ai: ["91%", "0%"],
  errors: ["16", "0"],
  warnings: ["1,099", "0"],
  crawlability: ["92%", "0%"],
  https: ["98%", "0%"],
  intseo: ["90%", "0%"],
  perf: ["89%", "0%"],
  linking: ["90%", "0%"],
  markups: ["100%", "0%"],
  cwv: ["10%", "0%"],
};

export const auditSettings = [
  "Scope: www.rkjh.se",
  "Subdomains included: no",
  "Pages to crawl: website",
  "Google Analytics: not connected",
  "Page limit: 100",
  "User agent: SiteAuditBot (Desktop)",
  "Crawl delay: minimum",
  "Allow/disallow URLs: no",
  "Remove URL parameters: no",
  "Bypass website restrictions: no",
  "Crawl with my credentials: no",
  "Crawl with Web Bot Auth signature: no",
  "Exclude checks",
  "Schedule: once",
];

export type Severity = "error" | "warning" | "notice";

export type Issue = {
  id: number;
  severity: Severity;
  count: number;
  unit: string;
  text: string;
  cats: string[];
  isNew?: boolean;
  about: string;
  fix: string;
  category: string;
  title?: string;
};

export const issues: Issue[] = [
  {
    id: issueId("Slow page (HTML) load speed"),
    severity: "error",
    count: 7,
    unit: "pages",
    text: "have slow load speed",
    cats: ["Site Performance"],
    about: "Page (HTML) load speed is one of the most important ranking factors. The quicker your page loads, the higher the rankings it can receive. Moreover, fast-loading pages positively affect user experience and may increase your conversion rates.",
    fix: "The main factors that negatively affect your HTML page generation time are your server's performance and the density of your webpage's HTML code. Try to clean up your webpage's HTML code. If the problem is with your web server, think about moving to a better hosting service with more resources.",
    category: "Site Performance",
  },
  {
    id: issueId("4xx errors"),
    severity: "error",
    count: 3,
    unit: "pages",
    text: "returned 4XX status code",
    cats: ["Crawlability", "HTTP Status"],
    about: "A 4xx error means that a webpage cannot be accessed. This is usually the result of broken links. These errors prevent users and search engine robots from accessing your webpages, and can negatively affect both user experience and search engine crawlability.",
    fix: "If a webpage returns an error, remove all links leading to the error page or replace it with another resource.",
    category: "HTTP Status",
  },
  {
    id: issueId("Broken internal links"),
    severity: "error",
    count: 3,
    unit: "internal links",
    text: "are broken",
    cats: ["Crawlability", "Links"],
    about: "Broken internal links lead users from one website to another and bring them to non-existent webpages. Multiple broken links negatively affect user experience and may worsen your search engine rankings because crawlers may think that your website is poorly maintained.",
    fix: "Please follow all links reported as broken. If a target webpage returns an error, remove the link leading to the error page or replace it with another resource.",
    category: "Links",
  },
  {
    id: issueId("Issues with hreflang values"),
    severity: "error",
    count: 3,
    unit: "issues",
    text: "with hreflang values",
    cats: ["Indexability"],
    about: "A hreflang (rel=\"alternate\" hreflang=\"x\") attribute helps search engines understand which page should be shown to visitors based on their location. Utilizing this attribute is necessary if you're running a multilingual website.",
    fix: "Make sure that your hreflang attributes use correct language and region codes that follow the ISO 639-1 and ISO 3166-1 Alpha 2 formats.",
    category: "International SEO",
  },
  {
    id: issueId("Unminified JavaScript and CSS files"),
    severity: "warning",
    count: 893,
    unit: "issues",
    text: "with unminified JavaScript and CSS files",
    cats: ["Site Performance"],
    about: "Minification is the process of removing unnecessary lines, white space and comments from the source code. Minifying JavaScript and CSS files makes their size smaller, thereby decreasing your page load time, providing a better user experience and improving your search engine rankings. For more information, please see ",
    fix: "Minify your JavaScript and CSS files.\nIf your webpage uses CSS and JS files that are hosted on an external site, contact the website owner and ask them to minify their files.\nIf this issue doesn't affect your page load time, simply ignore it.",
    category: "Site Performance",
  },
  {
    id: issueId("Low text to HTML ratio"),
    severity: "warning",
    count: 81,
    unit: "pages",
    text: "have low text-HTML ratio",
    cats: ["Content", "AI Search"],
    about: "Your text to HTML ratio indicates the amount of actual text you have on your webpage compared to the amount of code. This issue is triggered when your text to HTML is 10% or less. Search engines have begun focusing on pages that contain more content.",
    fix: "Split your webpage's text content and code into separate files and compare their size. If the size of your code file exceeds the size of the text file, review your page's HTML code and consider optimizing its structure and removing embedded scripts and styles.",
    category: "Content",
  },
  {
    id: issueId("Missing meta description"),
    severity: "warning",
    count: 55,
    unit: "pages",
    text: "don't have meta descriptions",
    cats: ["Meta tags", "Content"],
    about: "Though meta descriptions don't have a direct influence on rankings, they are used by search engines to generate snippets for search results. A good description helps users know what your page is about and encourages them to click on it.",
    fix: "In order to gain a higher click-through rate, you should ensure that all of your webpages have meta descriptions that contain relevant keywords.",
    category: "Meta tags",
  },
  {
    id: issueId("Low word count"),
    severity: "warning",
    count: 48,
    unit: "pages",
    text: "have a low word count",
    cats: ["Content", "AI Search"],
    about: "This issue is triggered if the number of words on your webpage is less than 200. The amount of text placed on your webpage is a quality signal to search engines.",
    fix: "Improve your on-page content and be sure to include more than 200 meaningful words.",
    category: "Content",
  },
  {
    id: issueId("Missing h1"),
    severity: "warning",
    count: 18,
    unit: "pages",
    text: "don't have an h1 heading",
    cats: ["Meta tags"],
    about: "While less important than <title> tags, h1 headings still help define your page's topic for search engines and users. If an <h1> tag is empty or missing, search engines may place your page lower than they would otherwise.",
    fix: "Provide a concise, relevant h1 heading for each of your pages.",
    category: "Meta tags",
  },
  {
    id: issueId("Long title element"),
    severity: "warning",
    count: 3,
    unit: "pages",
    text: "have too much text within the title tags",
    cats: ["Meta tags"],
    about: "Most search engines truncate titles containing more than 70 characters. Incomplete and shortened titles look unappealing to users and won't entice them to click on your page.",
    fix: "Try to rewrite your page titles to be 70 characters or less.",
    category: "Meta tags",
  },
  {
    id: issueId("Duplicate content in h1 and title"),
    severity: "warning",
    count: 1,
    unit: "page",
    text: "has duplicate H1 and title tags",
    cats: ["Meta tags", "Duplicates"],
    about: "It is a bad idea to duplicate your title tag content in your first-level header. If your page's <title> and <h1> tags match, the latter may appear over-optimized to search engines.",
    fix: "Provide different and concise text for your page's title and h1 heading.",
    category: "Meta tags",
  },
  {
    id: issueId("Blocked external resources in robots.txt"),
    severity: "notice",
    count: 33,
    unit: "issues",
    text: "with blocked external resources in robots.txt",
    cats: ["Crawlability", "Indexability"],
    about: "Blocked external resources are resources (e.g., CSS, JavaScript, image files, etc.) that are hosted on an external website but blocked from crawling by a \"Disallow\" directive in an external robots.txt file.",
    fix: "If blocked resources that are hosted on an external website have a strong impact on your website, contact the website owner and ask them to edit their robots.txt file.",
    category: "Crawlability",
  },
  {
    id: issueId("Pages with only one internal link"),
    severity: "notice",
    count: 24,
    unit: "pages",
    text: "have only one incoming internal link",
    cats: ["Crawlability", "Links"],
    about: "Having very few incoming internal links means very few visits, or even none, and fewer chances of placing in search results.",
    fix: "Add more incoming internal links to pages with useful content.",
    category: "Internal Linking",
  },
  {
    id: issueId("Links with no anchor text"),
    severity: "notice",
    count: 15,
    unit: "links",
    text: "have no anchor text",
    cats: ["AI Search", "Links"],
    about: "This issue is triggered if a link (either external or internal) on your website has an empty or naked anchor, or anchor text that only contains symbols.",
    fix: "To help search engines and users better understand the context of your links, use clear and relevant anchor text.",
    category: "Internal Linking",
  },
  {
    id: issueId("Multiple h1 tags"),
    severity: "notice",
    count: 4,
    unit: "pages",
    text: "have more than one H1 tag",
    cats: ["Indexability"],
    about: "Although multiple <h1> tags are allowed in HTML5, we still do not recommend that you use more than one <h1> tag per page.",
    fix: "Use multiple <h2>-<h6> tags instead of an <h1>.",
    category: "Meta tags",
  },
  {
    id: issueId("Resources formatted as page links"),
    severity: "notice",
    count: 4,
    unit: "resources",
    text: "are formatted as page link",
    cats: ["Indexability", "Crawlability"],
    about: "We detected that some links to resources are formatted with an <a href> HTML element. An <a> tag with an href attribute is used to link to other webpages and must only contain a page URL.",
    fix: "Replace <a href> links with tags appropriate for the type of resource being linked.",
    category: "Crawlability",
  },
  {
    id: issueId("No HSTS support"),
    severity: "notice",
    count: 2,
    unit: "subdomains",
    text: "don't support HSTS",
    cats: ["Security and HTTPS"],
    about: "HTTP Strict Transport Security informs web browsers that they can communicate with servers only through HTTPS connections.",
    fix: "Switch to a server that supports HSTS.",
    category: "HTTPS",
  },
  {
    id: issueId("Links with non-descriptive anchor text"),
    severity: "notice",
    count: 2,
    unit: "links",
    text: "have non-descriptive anchor text",
    cats: ["Indexability", "AI Search"],
    about: "This issue is triggered when anchor text doesn't describe the page it links to, e.g. \"click here\" or \"read more\".",
    fix: "Use descriptive anchor text that tells users and search engines what the linked page is about.",
    category: "Internal Linking",
  },
  {
    id: issueId("Content not optimized"),
    severity: "notice",
    count: 1,
    unit: "page",
    text: "requires content optimization",
    cats: ["Indexability", "AI Search"],
    isNew: true,
    about: "This page's content isn't structured in a way that AI search engines can easily understand and cite.",
    fix: "Add clear headings, concise answers and structured data to the page.",
    category: "AI Search",
  },
];

export function issueById(id: number): Issue {
  const own = issues.find((i) => i.id === id);
  if (own) return own;
  const [list, severity, base]: [string[], Severity, number] = id >= 201 ? [noticesList, "notice", 201] : id >= 101 ? [warningsList, "warning", 101] : [errorsList, "error", 1];
  const name = list[id - base];
  if (!name) return issues.find((i) => i.id === issueId("Low text to HTML ratio"))!;
  return { id, severity, count: issueCounts[name] ?? 0, unit: "", text: name, title: name, cats: [], about: name, fix: "Review the affected pages and resolve the issue.", category: "Site Audit" };
}

export const categoryTabs = [
  { key: "all", label: "All", n: 19 },
  { key: "AI Search", label: "AI Search", n: 4, ai: true },
  { key: "Crawlability", label: "Crawlability", n: 6 },
  { key: "Content", label: "Content", n: 6 },
  { key: "Meta tags", label: "Meta tags", n: 5 },
];

export const moreCategories = [
  { key: "Indexability", n: 9 },
  { key: "Duplicates", n: 1 },
  { key: "HTTP Status", n: 2 },
  { key: "Links", n: 4 },
  { key: "Site Performance", n: 2 },
  { key: "Mobile SEO", n: 0 },
  { key: "Canonicalization", n: 0 },
  { key: "Security and HTTPS", n: 1 },
];

export const severityTabs = [
  { key: "all", label: "All", n: 19 },
  { key: "error", label: "Errors", n: 4 },
  { key: "warning", label: "Warnings", n: 7 },
  { key: "notice", label: "Notices", n: 8 },
];

const hreflangFix = {
  about:
    'This issue is triggered if:\n- Your country code is not in the ISO_3166-1_alpha-2 format\n- Your language code is not in the ISO 639-1 format\n\nA hreflang (rel="alternate" hreflang="x") attribute helps search engines understand which page should be shown to visitors based on their location. Utilizing this attribute is necessary if you\'re running a multilingual website.',
  fix: "Make sure that your hreflang attributes are used correctly. Here are a few ways to avoid hreflang implementation issues:\n- Specify the correct ISO 639-1 language code. For language script variations, use the ISO 15924 standard format\n- Specify the correct ISO_3166-1_alpha-2 country code\n- Make sure all pages in a hreflang cluster link to each other",
};

const fixFor = (text: string) => {
  const i = issues.find((x) => x.id === issueId(text));
  return i ? { about: i.about, fix: i.fix } : hreflangFix;
};

export const overviewIssues = [
  { sev: "error" as Severity, text: "Issues with hreflang values", pages: "3 pages", id: issueId("Issues with hreflang values"), fixInfo: hreflangFix },
  { sev: "error" as Severity, text: "Slow page (HTML) load speed", pages: "7 pages", id: issueId("Slow page (HTML) load speed"), fixInfo: fixFor("Slow page (HTML) load speed") },
  { sev: "error" as Severity, text: "4xx errors", pages: "3 pages", id: issueId("4xx errors"), fixInfo: fixFor("4xx errors") },
  { sev: "notice" as Severity, text: "Content not optimized", pages: "1 page", id: issueId("Content not optimized"), ai: true, fixInfo: fixFor("Content not optimized") },
  { sev: "notice" as Severity, text: "Links with no anchor text", pages: "15 pages", id: issueId("Links with no anchor text"), ai: true, fixInfo: fixFor("Links with no anchor text") },
];

export const industries: [string, number][] = [
  ["Top-10% websites", 92],
  ["Arts & Entertainment", 77],
  ["Autos & Vehicles", 76],
  ["Beauty & Fitness", 78],
  ["Books & Literature", 75],
  ["Business & Industrial", 77],
  ["Computers & Electronics", 75],
  ["Finance", 75],
  ["Food & Drink", 78],
  ["Games", 74],
  ["Health", 77],
  ["Hobbies & Leisure", 76],
  ["Home & Garden", 78],
  ["Internet & Telecom", 75],
  ["Jobs & Education", 77],
  ["Law & Government", 76],
  ["News", 72],
  ["Online Communities", 74],
  ["People & Society", 76],
  ["Pets & Animals", 78],
  ["Real Estate", 77],
  ["Reference", 75],
  ["Science", 76],
  ["Shopping", 77],
  ["Sports", 76],
  ["Travel", 78],
];

export const crawledStatus = [
  { label: "Healthy", n: 12, color: "#00c78f" },
  { label: "Broken", n: 3, color: "#ff6b70" },
  { label: "Have issues", n: 83, color: "#ffb400" },
  { label: "Redirects", n: 2, color: "#6167e6" },
  { label: "Blocked", n: 0, color: "#c4c7cf" },
];

export type Bot = "ChatGPT-User" | "OAI-SearchBot" | "Googlebot" | "Google-Extended" | "PerplexityBot" | "Perplexity-User" | "Claude-User" | "Claude-SearchBot";
export const bots: Bot[] = ["ChatGPT-User", "OAI-SearchBot", "Googlebot", "Google-Extended", "PerplexityBot", "Perplexity-User", "Claude-User", "Claude-SearchBot"];

export const thematic = [
  { key: "robots", label: "Robots.txt" },
  { key: "crawlability", label: "Crawlability", v: 92 },
  { key: "https", label: "HTTPS", v: 98 },
  { key: "international", label: "International SEO", v: 90 },
  { key: "webVitals", label: "Core Web Vitals", v: 10 },
  { key: "performance", label: "Site Performance", v: 89 },
  { key: "linking", label: "Internal Linking", v: 90 },
  { key: "markups", label: "Markup", v: 100 },
] as const;

const T = (t: string) => `${t} - ${brand.legalName}`;

export const ratioRows = [
  { title: `Redovisningsbyrå i Halmstad | ${brand.legalName}`, url: "https://rkjh.se/", ratio: "0.02" },
  { title: T("Begränsad klimatpåverkan – saker företag kan göra"), url: "https://rkjh.se/begransad-klimatpaverkan-saker-foretag-kan-gora/", ratio: "0.04" },
  { title: T("Bemanning"), url: "https://rkjh.se/blog/branscher/bemanning/", ratio: "0.02" },
  { title: T("Fastighet"), url: "https://rkjh.se/blog/branscher/fastighet/", ratio: "0.03" },
  { title: T("FordonMaskin"), url: "https://rkjh.se/blog/branscher/fordonmaskin/", ratio: "0.02" },
  { title: T("Fordonsindustri"), url: "https://rkjh.se/blog/branscher/fordonsindustri/", ratio: "0.02" },
  { title: T("Handel"), url: "https://rkjh.se/blog/branscher/handel/", ratio: "0.04" },
  { title: T("Hantverkare/entreprenad"), url: "https://rkjh.se/blog/branscher/hantverkare-entreprenad/", ratio: "0.02" },
  { title: T("IT, Telekom & Media"), url: "https://rkjh.se/blog/branscher/it-telekom-media/", ratio: "0.02" },
  { title: T("Konsult"), url: "https://rkjh.se/blog/branscher/konsult/", ratio: "0.02" },
];

export type CrawledRow = {
  ilr?: number;
  url: string;
  title?: string;
  status: 200 | 301 | 404;
  issues?: number;
  state?: "Redirected" | "Healthy" | "Broken";
  depth: number;
  reaudit: boolean;
  id: string;
};

const site = "https://rkjh.se";
const L = brand.legalName;

const middle: [string, string][] = [
  ["om-oss/", "Om oss"],
  ["kontakt/", "Kontakt"],
  ["tjanster/", "Tjänster"],
  ["redovisning/", "Redovisning"],
  ["revision/", "Revision"],
  ["skatteradgivning/", "Skatterådgivning"],
  ["blog/", "Blogg"],
  ["lonehantering/", "Lönehantering"],
  ["bokslut/", "Bokslut"],
  ["zh/about-us/", "关于我们"],
  ["deklaration/", "Deklaration"],
  ["bolagsbildning/", "Bolagsbildning"],
  ["en/about/", "About us"],
  ["karriar/", "Karriär"],
  ["nyheter/", "Nyheter"],
  ["zh/services/", "服务"],
  ["priser/", "Priser"],
  ["vara-kunder/", "Våra kunder"],
  ["team/", "Vårt team"],
  ["en/services/", "Services"],
  ["vanliga-fragor/", "Vanliga frågor"],
  ["begransad-klimatpaverkan-saker-foretag-kan-gora/", "Begränsad klimatpåverkan – saker företag kan göra"],
  ["zh/contact/", "联系我们"],
  ["blog/tjanster/arsredovisning/", "Årsredovisning"],
  ["blog/tjanster/bokforing/", "Bokföring"],
  ["blog/tjanster/budget-och-prognos/", "Budget och prognos"],
  ["blog/tjanster/cfo-tjanster/", "CFO-tjänster"],
  ["blog/tjanster/due-diligence/", "Due diligence"],
  ["en/contact/", "Contact"],
  ["blog/tjanster/ekonomisk-radgivning/", "Ekonomisk rådgivning"],
  ["blog/tjanster/generationsskifte/", "Generationsskifte"],
  ["blog/tjanster/hallbarhetsrapportering/", "Hållbarhetsrapportering"],
  ["blog/tjanster/internkontroll/", "Internkontroll"],
  ["blog/tjanster/koncernredovisning/", "Koncernredovisning"],
  ["zh/accounting/", "会计"],
  ["blog/tjanster/momsradgivning/", "Momsrådgivning"],
  ["blog/tjanster/vardering/", "Värdering"],
  ["blog/tjanster/verksamhetsstyrning/", "Verksamhetsstyrning"],
  ["blog/branscher/bemanning/", "Bemanning"],
  ["blog/branscher/fastighet/", "Fastighet"],
  ["blog/branscher/fordonmaskin/", "FordonMaskin"],
  ["blog/branscher/fordonsindustri/", "Fordonsindustri"],
  ["zh/audit/", "审计"],
  ["blog/branscher/handel/", "Handel"],
  ["blog/branscher/hantverkare-entreprenad/", "Hantverkare/entreprenad"],
  ["blog/branscher/it-telekom-media/", "IT, Telekom & Media"],
  ["blog/branscher/konsult/", "Konsult"],
  ["blog/branscher/livsmedel/", "Livsmedel"],
  ["en/accounting/", "Accounting"],
  ["blog/branscher/transport/", "Transport"],
  ["blog/branscher/vard-omsorg/", "Vård & omsorg"],
  ["blog/branscher/tillverkning/", "Tillverkning"],
  ["zh/tax/", "税务"],
  ["blog/events/frukostseminarium/", "Frukostseminarium"],
  ["blog/events/skattedagen/", "Skattedagen"],
  ["blog/events/arsbokslut-workshop/", "Årsbokslut workshop"],
  ["blog/events/nyforetagarkvall/", "Nyföretagarkväll"],
  ["en/audit/", "Audit"],
  ["blog/events/formanskvall/", "Förmånskväll"],
  ["blog/events/hallbarhetsforum/", "Hållbarhetsforum"],
  ["blog/events/ledarskapsdag/", "Ledarskapsdag"],
  ["blog/events/kundkvall/", "Kundkväll"],
  ["zh/payroll/", "工资管理"],
  ["blog/kurser/bokforing-grund/", "Bokföring grund"],
  ["blog/kurser/excel-for-ekonomer/", "Excel för ekonomer"],
  ["blog/kurser/lon-och-formaner/", "Lön och förmåner"],
  ["blog/kurser/skatt-for-foretagare/", "Skatt för företagare"],
  ["en/tax/", "Tax"],
  ["zh/company-formation/", "公司注册"],
  ["project/ekonomisystem-byte/", "Byte av ekonomisystem"],
  ["project/digital-bokforing/", "Digital bokföring"],
  ["project/kvalitetssakring/", "Kvalitetssäkring"],
  ["project/hallbar-redovisning/", "Hållbar redovisning"],
  ["zh/team/", "团队"],
  ["project/tillvaxtplan/", "Tillväxtplan"],
  ["project/rekonstruktion/", "Rekonstruktion"],
  ["project/forvarvsanalys/", "Förvärvsanalys"],
  ["en/careers/", "Careers"],
  ["project/esg-rapport/", "ESG-rapport"],
  ["project/skatteoptimering/", "Skatteoptimering"],
  ["project/kassaflodesanalys/", "Kassaflödesanalys"],
  ["zh/news/", "新闻"],
  ["en/news/", "News"],
  ["cookiepolicy/", "Cookiepolicy"],
  ["zh/careers/", "招聘"],
  ["partners/", "Partners"],
  ["integritetspolicy/", "Integritetspolicy"],
  ["zh/faq/", "常见问题"],
];

const baseRows: Omit<CrawledRow, "id">[] = [
  { ilr: 100, url: `${site}/zh/`, title: `主页 - ${L} ZH`, status: 200, issues: 18, depth: 1, reaudit: true },
  { ilr: 96, url: `${site}/en/`, title: `Home - ${L} EN`, status: 200, issues: 13, depth: 1, reaudit: true },
  { ilr: 91, url: `${site}/`, title: `Redovisningsbyrå i Halmstad | ${L}`, status: 200, issues: 16, depth: 0, reaudit: true },
  { ilr: 87, url: `${site}/framgangssagor/`, title: `Framgångssagor - ${L}`, status: 200, issues: 15, depth: 1, reaudit: true },
  { ilr: 83, url: `${site}/hallbarhet/`, title: `Hållbarhet - ${L}`, status: 200, issues: 13, depth: 1, reaudit: true },
  ...middle.map(([p, t], i): Omit<CrawledRow, "id"> => ({
    ilr: Math.max(1, Math.round(80 - (i * 79) / middle.length)),
    url: `${site}/${p}`,
    title: `${t} - ${L}${p.startsWith("zh/") ? " ZH" : p.startsWith("en/") ? " EN" : ""}`,
    status: 200,
    issues: 9 + ((i * 7) % 9),
    depth: p.split("/").length > 3 ? 3 : p.split("/").length > 2 ? 2 : 1,
    reaudit: true,
  })),
  { url: "https://www.rkjh.se/", status: 301, state: "Redirected", depth: 0, reaudit: true },
  { url: "https://www.rkjh.se/llms.txt", status: 200, state: "Healthy", depth: 0, reaudit: false },
  { url: "https://www.rkjh.se/robots.txt", status: 301, state: "Redirected", depth: 0, reaudit: false },
  { url: `${site}/blog/events/formanskvall/anmalan/`, status: 404, state: "Broken", depth: 2, reaudit: true },
  { url: `${site}/zh/blogg/`, status: 404, state: "Broken", depth: 2, reaudit: true },
  { url: `${site}/zh/vara-servicestandarder/`, status: 404, state: "Broken", depth: 2, reaudit: true },
];
export const crawledRows: CrawledRow[] = baseRows.map((r, i) => ({ ...r, id: i ? `6a60cf96c96be8027779${(0x3d7 + i * 0x2b).toString(16).padStart(4, "0")}` : "6a60cf96c96be802777903d7" }));

export const pageDetailHref = (id: string) => `${routes.siteAuditCampaign.issues.replace(/\/issues$/, "/page")}/${id}`;


export const pageColumns = [
  { key: "ilr", label: "ILR", w: 71, fixed: true, on: true },
  { key: "url", label: "Page URL", w: 267, fixed: true, on: true },
  { key: "title", label: "Title", w: 171, on: true },
  { key: "description", label: "Description", w: 200 },
  { key: "status", label: "Status Code", w: 104, on: true },
  { key: "issues", label: "Issues", w: 106, on: true },
  { key: "blocked", label: "Blocked AI Search Bots", w: 157, on: true },
  { key: "depth", label: "Crawl Depth", w: 95, on: true },
  { key: "pageviews", label: "Pageviews", w: 123, on: true },
  { key: "load", label: "Load Time", w: 100 },
  { key: "markup", label: "Markup", w: 100 },
  { key: "structured", label: "Structured data", w: 130 },
  { key: "canonical", label: "Canonicalization", w: 130 },
  { key: "sitemap", label: "Sitemap", w: 90 },
  { key: "inlinks", label: "Incoming Int. Links", w: 140 },
  { key: "outlinks", label: "Outgoing Int. Links", w: 140 },
  { key: "extlinks", label: "Outgoing Ext. Links", w: 140 },
  { key: "hreflang", label: "Hreflang", w: 100 },
  { key: "amp", label: "AMP", w: 80 },
  { key: "words", label: "Word count", w: 100 },
  { key: "ratio", label: "Text/HTML ratio", w: 120 },
  { key: "reaudit", label: "Reaudit", w: 75, on: true },
];

export const pageFilterFields = [
  "Issue Status",
  "Crawl Depth",
  "HTTP Status Code",
  "Page (HTML) Load Time",
  "Markup",
  "Structured data Items",
  'With rel="canonical"',
  "Pages in sitemap",
  "Incoming Internal Links",
  "Outgoing Internal Links",
  "With AMP link",
  "Hreflang Usage",
  "JS and CSS Files",
  "JS and CSS Size",
  "Type of Page URL",
  "New pages",
  "Triggered issue",
];

export type Dir = { name: string; urls: number; issues: string; children?: Dir[] };

export const structure: Dir = {
  name: "https://rkjh.se",
  urls: 81,
  issues: "1,170",
  children: [
    {
      name: "/blog",
      urls: 38,
      issues: "516",
      children: [
        { name: "/tjanster", urls: 13, issues: "172" },
        { name: "/branscher", urls: 12, issues: "165" },
        { name: "/events", urls: 8, issues: "105" },
        { name: "/kurser", urls: 4, issues: "60" },
      ],
    },
    {
      name: "/zh",
      urls: 12,
      issues: "159",
      children: [
        { name: "/services", urls: 5, issues: "68" },
        { name: "/about-us", urls: 4, issues: "52" },
        { name: "/careers", urls: 3, issues: "39" },
      ],
    },
    { name: "/project", urls: 10, issues: "152" },
  ],
};

export const structureAll: Dir[] = [
  {
    name: "https://rkjh.se",
    urls: 97,
    issues: "1,199",
    children: [
      {
        name: "/blog",
        urls: 40,
        issues: "530",
        children: [
          { name: "/tjanster", urls: 14, issues: "185" },
          { name: "/branscher", urls: 12, issues: "165" },
          {
            name: "/events",
            urls: 9,
            issues: "106",
            children: [
              { name: "/2026", urls: 5, issues: "59" },
              { name: "/2025", urls: 4, issues: "47" },
            ],
          },
          { name: "/kurser", urls: 4, issues: "60" },
        ],
      },
      {
        name: "/zh",
        urls: 14,
        issues: "161",
        children: [
          { name: "/services", urls: 6, issues: "72" },
          { name: "/about-us", urls: 5, issues: "53" },
          { name: "/careers", urls: 3, issues: "36" },
        ],
      },
      { name: "/project", urls: 10, issues: "152" },
    ],
  },
  { name: "https://www.rkjh.se", urls: 3, issues: "1" },
];
