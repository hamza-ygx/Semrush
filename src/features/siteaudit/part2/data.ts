export const C = {
  green: "#00c89a",
  orange: "#ffb000",
  blue: "#6569e2",
  red: "#ff7072",
  gray: "#8c8c8c",
  light: "#dfdfdf",
  silver: "#c4c4c4",
  track: "#f0f2f2",
  lavender: "#b1b4eb",
  mint: "#9befd9",
  overlap: "#75cad1",
};

export const errorsList = [
  "5xx errors",
  "4xx errors",
  "Missing title tags",
  "Duplicate title tags",
  "Duplicate content",
  "Broken internal links",
  "Pages not crawled",
  "DNS resolution issue",
  "We couldn’t open the page’s URL",
  "Broken internal images",
  "Duplicate meta descriptions",
  "Invalid robots.txt format",
  "Invalid sitemap.xml format",
  "Incorrect pages found in sitemap.xml",
  "www resolve issues",
  "Viewport not configured",
  "Large HTML page size",
  "Missing canonical tags in AMP pages",
  "Issues with hreflang values",
  "Hreflang conflicts within page source code",
  "Issues with incorrect hreflang links",
  "Non-secure pages",
  "Certificate Expiration",
  "Old security protocol version",
  "Certificate registered to incorrect name",
  "Issues with mixed content",
  "Neither canonical URL nor 301 redirect from HTTP homepage",
  "Redirect chains and loops",
  "Broken canonical URLs",
  "Multiple canonical URLs",
  "Meta refresh redirects",
  "Broken internal JavaScript and CSS files",
  "Insecure encryption algorithms",
  "Too large sitemap.xml",
  "Malformed links",
  "Invalid structured data items",
  "Viewport width not set",
  "Slow page (HTML) load speed",
];

export const warningsList = [
  "Broken external links",
  "Broken external images",
  "Links lead to HTTP pages for HTTPS site",
  "Short title element",
  "Long title element",
  "Missing h1",
  "Duplicate content in h1 and title",
  "Missing meta description",
  "Too many on-page links",
  "Temporary redirects",
  "Missing ALT attributes",
  "Low text to HTML ratio",
  "Too many URL parameters",
  "Missing hreflang and lang attributes",
  "Encoding not declared",
  "Doctype not declared",
  "Low word count",
  "Incompatible plugins used",
  "Frames used",
  "Underscores in URL",
  "Nofollow attributes in outgoing internal links",
  "Sitemap.xml not specified in robots.txt",
  "Sitemap.xml not found",
  "HTTPS encryption not used",
  "No SNI support",
  "HTTP URLs in sitemap.xml for HTTPS site",
  "Uncompressed pages",
  "Blocked internal resources in robots.txt",
  "Uncompressed JavaScript and CSS files",
  "Uncached JavaScript and CSS files",
  "Too large JavaScript and CSS total size",
  "Too many JavaScript and CSS files",
  "Unminified JavaScript and CSS files",
  "Too long link URLs",
];

export const noticesList = [
  "Multiple h1 tags",
  "Llms.txt not found",
  "Blocked from crawling",
  "URLs longer than 200 characters",
  "Nofollow attributes in outgoing external links",
  "Robots.txt not found",
  "Hreflang language mismatch issues",
  "No HSTS support",
  "Orphaned pages (Google Analytics)",
  "Orphaned sitemap pages",
  "Blocked by X-Robots-Tag: noindex HTTP header",
  "Blocked external resources in robots.txt",
  "Broken external JavaScript and CSS files",
  "Page Crawl Depth more than 3 clicks",
  "Pages with only one internal link",
  "Permanent redirects",
  "Resources formatted as page links",
  "Links with no anchor text",
  "Links with non-descriptive anchor text",
  "External pages or resources with 403 HTTP status code",
  "Llms.txt has formatting issues",
  "Too much content",
  "Outdated content",
  "Low Semantic HTML usage",
  "Content not optimized",
];

export const issueCounts: Record<string, number> = {
  "Slow page (HTML) load speed": 7,
  "4xx errors": 3,
  "Broken internal links": 3,
  "Issues with hreflang values": 3,
  "Unminified JavaScript and CSS files": 893,
  "Low text to HTML ratio": 81,
  "Missing meta description": 55,
  "Low word count": 48,
  "Missing h1": 18,
  "Long title element": 3,
  "Duplicate content in h1 and title": 1,
  "Blocked external resources in robots.txt": 33,
  "Pages with only one internal link": 24,
  "Links with no anchor text": 15,
  "Multiple h1 tags": 4,
  "Resources formatted as page links": 4,
  "No HSTS support": 2,
  "Links with non-descriptive anchor text": 2,
  "Content not optimized": 1,
};

export function issueId(name: string) {
  const e = errorsList.indexOf(name);
  if (e >= 0) return 1 + e;
  const w = warningsList.indexOf(name);
  if (w >= 0) return 101 + w;
  const n = noticesList.indexOf(name);
  return n >= 0 ? 201 + n : 0;
}

export const statTiles = [
  {
    title: "HTTP Status Code",
    value: "3%",
    caption: "pages with 4xx and 5xx status codes",
    rows: [
      ["5xx", "0%"],
      ["4xx", "3%"],
      ["3xx", "2%"],
      ["2xx", "95%"],
      ["1xx", "0%"],
      ["No code", "0%"],
    ],
  },
  {
    title: "Sitemap vs. Crawled Pages",
    value: "170",
    caption: "pages in sitemap",
    rows: [
      ["Crawled pages found in sitemap", "69%"],
      ["Crawled pages not found in sitemap", "31%"],
    ],
  },
  {
    title: "Pages Crawl Depth",
    value: "0%",
    caption: "pages with more than 3 clicks",
    rows: [
      ["1 click", "60%"],
      ["2 clicks", "40%"],
      ["3 clicks", "0%"],
    ],
  },
  {
    title: "Incoming Internal Links",
    value: "24%",
    caption: "pages have only 1 incoming internal link",
    rows: [
      ["2-5", "3%"],
      ["6-15", "11%"],
      ["16-50", "0%"],
      ["51-150", "45%"],
      ["151-500", "0%"],
      ["500+", "0%"],
    ],
  },
  {
    title: "Markup Types",
    value: "0%",
    caption: "pages have no markup",
    rows: [
      ["Schema.org (Microdata)", "0%"],
      ["Schema.org (JSON-LD)", "100%"],
      ["Open Graph", "100%"],
      ["Twitter Cards", "100%"],
      ["Microformats", "0%"],
    ],
  },
  {
    title: "Canonicalization",
    value: "17%",
    caption: 'pages without rel="canonical" tag',
    rows: [
      ["Canonical to another page", "0%"],
      ["Self-canonical", "83%"],
    ],
  },
  {
    title: "Hreflang Usage",
    value: "0%",
    caption: "pages without issues",
    rows: [
      ["With issues", "3%"],
      ["Without hreflang", "97%"],
    ],
  },
] as const;

export const httpStatus = [
  { label: "5xx", value: 0, color: C.red },
  { label: "4xx", value: 3, color: C.orange },
  { label: "3xx", value: 2, color: C.blue },
  { label: "2xx", value: 95, color: C.green },
  { label: "1xx", value: 0, color: C.gray },
  { label: "No code", value: 0, color: C.light },
];

export const crawlDepth = [
  { label: "1 click", value: 60, color: C.green },
  { label: "2 clicks", value: 40, color: C.blue },
  { label: "3 clicks", value: 0, color: C.orange },
  { label: "4+ clicks", value: 0, color: C.red },
];

export const incomingLinks = [
  { label: "0", value: 0 },
  { label: "1", value: 24 },
  { label: "2-5", value: 3 },
  { label: "6-15", value: 11 },
  { label: "16-50", value: 0 },
  { label: "51-150", value: 45 },
  { label: "151-500", value: 0 },
  { label: "500+", value: 0 },
];

export const markupTypes = [
  { label: "Schema.org (Microdata)", pct: 0, count: 0 },
  { label: "Schema.org (JSON-LD)", pct: 100, count: 83 },
  { label: "Open Graph", pct: 100, count: 83 },
  { label: "Twitter Cards", pct: 100, count: 83 },
  { label: "Microformats", pct: 0, count: 0 },
];

export const canonicalization = [
  { label: "Canonical to another page", value: 0, color: C.green },
  { label: "Self-canonical", value: 83, color: C.orange },
  { label: 'Without rel="canonical"', value: 17, color: C.blue },
];

export const hreflangUsage = [
  { label: "With issues", value: 3, color: C.red },
  { label: "Without issues", value: 0, color: C.green },
  { label: "Without hreflang", value: 97, color: C.silver },
];

export const crawlDate = "Jul 22, 2026 (16:11)";

export const compareGeneral = [
  { label: "Pages crawled", a: "100", b: "100", fixed: null },
  { label: "Site Health", a: "82", b: "82", fixed: null },
  { label: "Total issues", a: "1,200", b: "1,200", fixed: "—" },
  { label: "Total errors", a: "16", b: "16", fixed: "—" },
  { label: "Total warnings", a: "1,099", b: "1,099", fixed: "—" },
  { label: "Total notices", a: "85", b: "85", fixed: "—" },
];

export const crawlBudget = [
  { label: "Temporary redirects", value: 0 },
  { label: "Permanent redirects", value: 2 },
  { label: "Duplicate content", value: 0 },
  { label: "Canonical to another page", value: 0 },
  { label: "Large page size", value: 0 },
  { label: "Slow page (HTML) load speed", value: 7 },
  { label: "Blocked from crawling", value: 0 },
  { label: "4xx errors", value: 3 },
  { label: "5xx errors", value: 0 },
  { label: "Redirect chains and loops", value: 0 },
];

type Check = {
  ok: boolean;
  text: string;
  link?: string;
  count?: string;
};

export const httpsSections: { title: string; checks: Check[] }[] = [
  {
    title: "Security Certificate",
    checks: [
      { ok: true, text: "All certificates are up to date" },
      { ok: true, text: "All certificates are registered to correct names" },
    ],
  },
  {
    title: "Server",
    checks: [
      { ok: true, text: "Security protocols are up to date" },
      { ok: true, text: "All subdomains support secure encryption algorithms" },
      { ok: true, text: "All subdomains support SNI" },
      {
        ok: false,
        count: "2 subdomains",
        text: " don't support HSTS",
        link: "No HSTS support",
      },
    ],
  },
  {
    title: "Website Architecture",
    checks: [
      { ok: true, text: "No pages with mixed content" },
      { ok: true, text: "All links lead to HTTPS pages" },
      { ok: true, text: "No non-secure pages" },
      { ok: true, text: "HTTP homepage is redirected to the HTTPS version" },
      { ok: true, text: "No HTTP URLs in sitemap.xml" },
    ],
  },
];

export type IssueGroup = {
  severity: "Errors" | "Warnings" | "Notices";
  items: string[];
};

export const hreflangIssues: IssueGroup[] = [
  {
    severity: "Errors",
    items: [
      "Issues with hreflang values",
      "Hreflang conflicts within page source code",
      "Issues with incorrect hreflang links",
    ],
  },
  { severity: "Notices", items: ["Hreflang language mismatch issues"] },
];

export const performanceIssues: IssueGroup[] = [
  {
    severity: "Errors",
    items: [
      "Large HTML page size",
      "Redirect chains and loops",
      "Slow page (HTML) load speed",
    ],
  },
  {
    severity: "Warnings",
    items: [
      "Uncompressed pages",
      "Uncompressed JavaScript and CSS files",
      "Uncached JavaScript and CSS files",
      "Too large JavaScript and CSS total size",
      "Too many JavaScript and CSS files",
      "Unminified JavaScript and CSS files",
    ],
  },
];

export const linkingIssues: IssueGroup[] = [
  { severity: "Errors", items: ["Broken internal links", "Malformed links"] },
  {
    severity: "Warnings",
    items: [
      "Broken external links",
      "Too many on-page links",
      "Nofollow attributes in outgoing internal links",
      "Too long link URLs",
    ],
  },
  {
    severity: "Notices",
    items: [
      "Nofollow attributes in outgoing external links",
      "Orphaned sitemap pages",
      "Page Crawl Depth more than 3 clicks",
      "Pages with only one internal link",
      "Permanent redirects",
      "Resources formatted as page links",
      "Links with no anchor text",
      "Links with non-descriptive anchor text",
    ],
  },
];

export const loadSpeed = [
  { label: "0 – 0.5s", value: 3, color: C.green },
  { label: "0.5 – 1s", value: 0, color: C.blue },
  { label: "1 – 3s", value: 87, color: C.orange },
  { label: ">3s", value: 7, color: C.red },
];

export const jsCssFiles = [
  { label: "0 – 10", value: 0 },
  { label: "11 – 20", value: 0 },
  { label: "21 – 50", value: 51 },
  { label: "51 – 100", value: 32 },
  { label: ">100", value: 0 },
];

export const jsCssSize = [
  { label: "0 – 0,2", value: 0 },
  { label: "0,2 – 0,5", value: 49 },
  { label: "0,5 – 1", value: 34 },
  { label: "1 – 2", value: 0 },
  { label: ">2", value: 0 },
];

export const linkDistribution = [
  {
    links: "20%",
    linksPct: 20,
    pages: "11%",
    pagesPct: 11,
    label: "9 Strong pages",
    sub: "ILR of more than 70",
  },
  {
    links: "79%",
    linksPct: 79,
    pages: "70%",
    pagesPct: 70,
    label: "58 Medium pages",
    sub: "ILR between 10-70",
  },
  {
    links: "~0%",
    linksPct: 1,
    pages: "19%",
    pagesPct: 19,
    label: "16 Weak pages",
    sub: "ILR of less than 10",
  },
];

export const linkRankPages = [
  { ilr: 100, url: "https://rkjh.se/zh/", links: 54 },
  { ilr: 96, url: "https://rkjh.se/en/", links: 53 },
  { ilr: 91, url: "https://rkjh.se/", links: 51 },
  { ilr: 87, url: "https://rkjh.se/framgangssagor/", links: 56 },
  { ilr: 83, url: "https://rkjh.se/hallbarhet/", links: 52 },
  { ilr: 78, url: "https://rkjh.se/kurser/", links: 50 },
  { ilr: 78, url: "https://rkjh.se/insikter/", links: 50 },
  { ilr: 74, url: "https://rkjh.se/podcasts/", links: 49 },
  {
    ilr: 74,
    url: "https://rkjh.se/blog/events/business-event/",
    display: "https://rkjh.se/blog...ents/business-event/",
    links: 49,
  },
  { ilr: 70, url: "https://rkjh.se/om-oss/", links: 48 },
];

export const vitalsStatus = [
  { label: "Good", value: 1, color: C.green },
  { label: "To Improve", value: 7, color: C.orange },
  { label: "Poor", value: 2, color: C.red },
  { label: "n/a", value: 0, color: C.silver },
];

export const vitalsMetrics = [
  {
    title: "Largest Contentful Paint (LCP)",
    values: [1, 7, 2, 0],
    tips: [
      ["Eliminate render-blocking resources", 9],
      ["Reduce server response time", 9],
      ["Remove Unused CSS", 9],
    ] as [string, number][],
    empty: "",
  },
  {
    title: "Total Blocking Time (TBT)",
    values: [9, 1, 0, 0],
    tips: [
      ["Avoid serving legacy JavaScript to modern browsers", 1],
      ["Minimize main thread work", 1],
      ["Reduce JavaScript execution time", 1],
    ] as [string, number][],
    empty: "",
  },
  {
    title: "Cumulative Layout Shift (CLS)",
    values: [10, 0, 0, 0],
    tips: [] as [string, number][],
    empty:
      "All pages have good visual stability. Content doesn’t shift or shifts slightly upon loading.",
  },
];

export type VitalsRow = {
  url: string;
  status: "Poor" | "To Improve" | "Good";
  lcp: string;
  tbt: string;
  cls: string;
};

export const vitalsPages: VitalsRow[] = [
  {
    url: "https://rkjh.se/blog/tjanster/finansiell-rapportering/",
    status: "Poor",
    lcp: "4.64s",
    tbt: "241ms",
    cls: "0.020",
  },
  {
    url: "https://rkjh.se/kontakta-oss/",
    status: "Poor",
    lcp: "5.25s",
    tbt: "334ms",
    cls: "0.021",
  },
  {
    url: "https://rkjh.se/blog/tjanster/startaeget/",
    status: "To Improve",
    lcp: "2.77s",
    tbt: "265ms",
    cls: "0.025",
  },
  {
    url: "https://rkjh.se/",
    status: "To Improve",
    lcp: "2.94s",
    tbt: "278ms",
    cls: "0.041",
  },
  {
    url: "https://rkjh.se/blog/tjanster/affarsjuridik/",
    status: "To Improve",
    lcp: "2.90s",
    tbt: "132ms",
    cls: "0.029",
  },
  {
    url: "https://rkjh.se/blog/branscher/fordonsindustri/",
    status: "To Improve",
    lcp: "3.27s",
    tbt: "139ms",
    cls: "0.024",
  },
  {
    url: "https://rkjh.se/hallbarhet/",
    status: "To Improve",
    lcp: "3.02s",
    tbt: "217ms",
    cls: "0.026",
  },
  {
    url: "https://rkjh.se/framgangssagor/",
    status: "To Improve",
    lcp: "3.10s",
    tbt: "54ms",
    cls: "0.040",
  },
  {
    url: "https://rkjh.se/event/",
    status: "To Improve",
    lcp: "2.68s",
    tbt: "109ms",
    cls: "0.020",
  },
  {
    url: "https://rkjh.se/blog/events/internationell-handel/",
    status: "Good",
    lcp: "1.90s",
    tbt: "39ms",
    cls: "0.032",
  },
];

export const structuredItems = [
  { item: "Breadcrumb", invalid: 0, valid: 83 },
  { item: "Organization", invalid: 0, valid: 83 },
  { item: "Article", invalid: 0, valid: 1 },
  { item: "Site names", invalid: 0, valid: 1 },
];
