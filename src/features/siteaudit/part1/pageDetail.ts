import { issueId } from "../part2/data";
import { crawledRows, issues, type CrawledRow, type Severity } from "./data";
import type { FixInfo } from "./FixPopover";

export type DetailIssue = {
  sev: Severity;
  name: string;
  count: number;
  id?: number;
  fix: FixInfo;
  table?: { cols: [string, string]; rows: { url: string; value: string; tag?: string }[] };
};

const site = "https://rkjh.se";

const fixOf = (name: string, fallback: FixInfo): FixInfo => {
  const id = safeId(name);
  const i = id ? issues.find((x) => x.id === id) : undefined;
  return i ? { about: i.about, fix: i.fix } : fallback;
};

function safeId(name: string) {
  const id = issueId(name);
  return typeof id === "number" && id > 0 ? id : undefined;
}

const generic = (about: string, fix: string): FixInfo => ({ about, fix });

export const incomingLinks = [
  `${site}/blog/tjanster/startaeget/`,
  `${site}/zh/blog/tjanster/外包/`,
  `${site}/blog/kurser/foretagsanpassade-utbildningar/`,
  `${site}/blog/kurser/att-lasa-forsta-bokslut/`,
  `${site}/blog/tjanster/revision/`,
];

type RawIssue = Omit<DetailIssue, "sev" | "id"> & { sev: string };

function issuesFor(r: CrawledRow): DetailIssue[] {
  const path = r.url.replace(site, "").replace(/\/$/, "") || "";
  const list: RawIssue[] = [
    {
      sev: "error",
      name: "Broken internal links",
      count: 2,
      fix: fixOf(
        "Broken internal links",
        generic(
          "Broken internal links lead users from one page of your website to another nonexistent page. Multiple broken links negatively affect user experience and may worsen your search engine rankings because crawlers may think that your website is poorly maintained or coded.",
          "Please follow all links reported as broken. If a target webpage returns an error, remove the link leading to the error page or replace it with another resource.",
        ),
      ),
      table: {
        cols: ["Broken Link URL", "HTTP Status Code"],
        rows: [
          { url: `${site}${path.startsWith("/zh") ? "/zh" : ""}/vara-servicestandarder/`, value: "404", tag: "New" },
          { url: `${site}${path.startsWith("/zh") ? "/zh" : ""}/blogg/`, value: "404", tag: "New" },
        ],
      },
    },
    {
      sev: "error",
      name: "Issues with hreflang values",
      count: 1,
      fix: {
        about:
          'This issue is triggered if:\n- Your country code is not in the ISO_3166-1_alpha-2 format\n- Your language code is not in the ISO 639-1 format\n\nA hreflang (rel="alternate" hreflang="x") attribute helps search engines understand which page should be shown to visitors based on their location.',
        fix: "Make sure that your hreflang attributes are used correctly. Specify the correct ISO 639-1 language code and the correct ISO_3166-1_alpha-2 country code.",
      },
      table: { cols: ["Hreflang URL", "Hreflang value"], rows: [{ url: `${site}/zh/`, value: "zh-cn" }] },
    },
    {
      sev: "warning",
      name: "Missing meta description",
      count: 1,
      fix: fixOf(
        "Missing meta description",
        generic(
          "Though meta descriptions don't have a direct influence on rankings, they are used by search engines to generate snippets of your pages in search results.",
          "In order to gain a higher click-through rate, you should ensure that all of your webpages have meta descriptions that contain relevant keywords.",
        ),
      ),
    },
    {
      sev: "warning",
      name: "Low word count",
      count: 1,
      fix: fixOf(
        "Low word count",
        generic(
          "This issue is triggered if the number of words on your webpage is less than 200. The amount of text placed on your webpage is a quality signal to search engines.",
          "Improve your on-page content and be sure to include more than 200 meaningful words.",
        ),
      ),
      table: { cols: ["Page URL", "Word count"], rows: [{ url: r.url, value: "84" }] },
    },
    {
      sev: "warning",
      name: "Unminified JavaScript and CSS files",
      count: 10,
      fix: fixOf(
        "Unminified JavaScript and CSS files",
        generic(
          "Minification is the process of removing unnecessary lines, white space and comments from the source code.",
          "Make sure to minify all JavaScript and CSS files.",
        ),
      ),
      table: {
        cols: ["File URL", "Type"],
        rows: ["main", "header", "footer", "blog", "forms", "slider", "cookie", "menu", "search", "theme"].map((f, i) => ({
          url: `${site}/wp-content/themes/rkjh/assets/${f}.${i % 2 ? "css" : "js"}`,
          value: i % 2 ? "CSS" : "JavaScript",
        })),
      },
    },
    {
      sev: "warning",
      name: "Low text to HTML ratio",
      count: 1,
      fix: fixOf(
        "Low text to HTML ratio",
        generic(
          "Your text to HTML ratio indicates the amount of actual text you have on your webpage compared to the amount of code.",
          "Split your webpage's text content and code into separate files and compare their size.",
        ),
      ),
      table: { cols: ["Page URL", "Text to HTML ratio"], rows: [{ url: r.url, value: "7%" }] },
    },
    {
      sev: "notice",
      name: "Links with non-descriptive anchor text",
      count: 2,
      fix: generic(
        'This issue is triggered if a link has non-descriptive anchor text, for example "click here" or "read more".',
        "Replace generic anchor text with a short phrase that describes the page the link points to.",
      ),
      table: {
        cols: ["Link URL", "Anchor text"],
        rows: [
          { url: `${site}/blog/`, value: "Read more" },
          { url: `${site}/kontakt/`, value: "Click here" },
        ],
      },
    },
  ];
  return list.map((i) => ({ ...i, sev: i.sev as Severity, id: safeId(i.name) }));
}

export type PageDetailData = {
  row: CrawledRow;
  title: string;
  ilr: number | null;
  incoming: number | null;
  outgoing: number | null;
  external: number | null;
  canonical: string;
  markup: string[];
  structured: [string, number][];
  issues: DetailIssue[];
  total: number;
};

export function pageDetail(id: string): PageDetailData | null {
  const r = crawledRows.find((x) => x.id === id);
  if (!r) return null;
  const k = Math.max(0, crawledRows.indexOf(r));
  const list = issuesFor(r);
  return {
    row: r,
    title: r.title ?? "",
    ilr: r.ilr ?? 0,
    incoming: k ? Math.max(1, 82 - k * 3) : 82,
    outgoing: 48 - (k % 7),
    external: 6,
    canonical: "Page links to itself",
    markup: ["Twitter Cards", "Open Graph", "Schema.org (JSON-LD)"],
    structured: [
      ["Breadcrumb", 1],
      ["Organization", 1],
    ] as [string, number][],
    issues: list,
    total: list.reduce((a, i) => a + i.count, 0),
  };
}
