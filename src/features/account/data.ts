import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

export const registrationDate = "Jul 14, 2026";

const subRoutes = {
  billing: `${routes.account.subscription}/billing-info`,
  payments: `${routes.account.subscription}/payments`,
};

export const accountRoutes = {
  users: "/corporate/account/users",
  guests: "/corporate/account/guests",
  projects: "/corporate/account/projects",
  usersQueryLog: "/corporate/account/query-log",
  usersActivityLog: "/corporate/account/activity-log",
  notifications: "/accounts/notifications",
  queriesWeb: "/accounts/queries/web",
  queriesApi: "/accounts/queries/api",
  apiKeysActive: "/accounts/api-keys/active",
  apiKeysInactive: "/accounts/api-keys/inactive",
};

export type SideKey = "profile" | "subscription" | "users" | "notifications" | "queryLog" | "activity" | "apiKeys" | "apps" | "agency";

export const sideItems: { key: SideKey; label: string; href?: string }[] = [
  { key: "profile", label: "Profile settings", href: routes.account.profile },
  { key: "subscription", label: "Subscription info", href: routes.account.subscription },
  { key: "users", label: "User Management", href: accountRoutes.users },
  { key: "notifications", label: "Notifications", href: accountRoutes.notifications },
  { key: "queryLog", label: "Query log", href: accountRoutes.queriesWeb },
  { key: "activity", label: "Activity log", href: routes.account.activity },
  { key: "apiKeys", label: "API Keys", href: accountRoutes.apiKeysActive },
  { key: "apps", label: "Authorized Applications", href: routes.account.authorizedApps },
  { key: "agency", label: "Agency Partners", href: routes.account.agencyPartners },
];

export const profileTabs = [
  { key: "info", label: "Account Info", href: routes.account.profile },
  { key: "email", label: "Email", href: routes.account.email },
  { key: "password", label: "Password", href: routes.account.password },
  { key: "security", label: "Security", href: routes.account.security },
] as const;

export type ProfileTab = (typeof profileTabs)[number]["key"];

export const subscriptionTabs = [
  { key: "summary", label: "Summary", href: routes.account.subscription },
  { key: "billing", label: "Billing info", href: subRoutes.billing },
  { key: "payments", label: "Payments", href: subRoutes.payments },
  { key: "api", label: "API Units", href: routes.account.apiUnits },
] as const;

export type SubscriptionTab = (typeof subscriptionTabs)[number]["key"];

export const toolkits = [`${brand.name} One`, "SEO", "AI Visibility", "Traffic & Market", "Local", "Content", "Social", "Advertising", "AI PR"];

type UnitRow = { label: string; used?: number; limit?: number; available?: string; buy: boolean };

export const seoUnits: UnitRow[] = [
  { label: "Users", used: 1, limit: 1, available: "0", buy: false },
  { label: "Keywords", used: 89, limit: 1500, available: "1,411", buy: true },
  { label: "Website monitoring", used: 1, limit: 15, available: "14", buy: true },
  { label: "Pages to crawl", used: 0, limit: 300000, available: "300,000", buy: true },
  { label: "SEO Ideas Units", used: 0, limit: 800, available: "800", buy: true },
  { label: "Plagiarism checks", used: 0, limit: 5, available: "5", buy: true },
  { label: "Smart Writer Words", used: 0, limit: 1000, available: "1,000", buy: true },
  { label: "Reports Base", used: 0, limit: 3, available: "3", buy: true },
  { label: "Reports Pro", used: 0, limit: 0, available: "0", buy: false },
  { label: "Lead Generation", buy: true },
];

export const activities = [
  { date: "2026-09-23 13:52:27", type: "login", ip: "198.51.100.18", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0"] },
  { date: "2026-09-23 06:39:20", type: "login", ip: "203.0.113.212", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/153.0.0.0 Safari/537.36"] },
  { date: "2026-09-07 06:48:47", type: "login", ip: "203.0.113.212", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/152.0.0.0 Safari/537.36 Edg/152.0.0.0"] },
  { date: "2026-07-22 11:55:58", type: "change_password", ip: "172.27.104.6", country: "", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/150.0.0.0 Safari/537.36"] },
  { date: "2026-07-22 08:57:17", type: "login", ip: "198.51.100.28", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/150.0.0.0 Safari/537.36"] },
  { date: "2026-07-14 06:58:24", type: "login", ip: "198.51.100.28", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/150.0.0.0 Safari/537.36"] },
  { date: "2026-07-14 06:57:40", type: "registration", ip: "198.51.100.28", country: "Sweden", ua: ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "AppleWebKit/537.36 (KHTML, like Gecko)", "Chrome/150.0.0.0 Safari/537.36"] },
];

export const countries = ["Sweden", "Denmark", "Finland", "Germany", "Norway", "United Kingdom", "United States"];
export const timeZones = ["(UTC+00:00) London", "(UTC+01:00) Stockholm", "(UTC+02:00) Helsinki", "(UTC-05:00) New York"];

export const userTabs = [
  { key: "users", label: "Users", href: accountRoutes.users },
  { key: "guests", label: "Guests", href: accountRoutes.guests },
  { key: "projects", label: "Projects", href: accountRoutes.projects },
  { key: "queryLog", label: "Query Log", href: accountRoutes.usersQueryLog },
  { key: "activityLog", label: "Activity Log", href: accountRoutes.usersActivityLog },
] as const;

export type UserTab = (typeof userTabs)[number]["key"];

export const queryTabs = [
  { key: "web", label: "Web Queries", href: accountRoutes.queriesWeb },
  { key: "api", label: "API Queries", href: accountRoutes.queriesApi },
] as const;

export type QueryTab = (typeof queryTabs)[number]["key"];

export const apiKeyTabs = [
  { key: "active", label: "Active", href: accountRoutes.apiKeysActive },
  { key: "inactive", label: "Inactive", href: accountRoutes.apiKeysInactive },
] as const;

export type ApiKeyTab = (typeof apiKeyTabs)[number]["key"];

export const notificationGroups = [
  { key: "agency", label: "Agency Partners", items: [{ label: "Profile visibility updates, optimization tips", on: true }] },
  { key: "tracking", label: "Position Tracking", items: [{ label: "Updates on your campaigns, messages about backups", on: true }] },
  {
    key: "general",
    label: "General",
    items: [
      { label: "Educational content", on: false },
      { label: "Product news and updates", on: false },
      { label: "Upcoming events", on: false },
    ],
  },
] as const;

export type NotificationKey = (typeof notificationGroups)[number]["key"];

export type QueryRow = { query: string; link: boolean; time: string; ip: string; db: string; report: string; historical: string; lines?: number; units?: number };

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function stamp(t: number) {
  const d = new Date(t);
  const h = d.getUTCHours();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${months[d.getUTCMonth()]} ${p(d.getUTCDate())}, ${d.getUTCFullYear()} ${p(h % 12 || 12)}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} ${h < 12 ? "AM" : "PM"}`;
}

const webHead: [string, string, string, string][] = [
  ["rkjh.se", "2026-09-25T12:15:23Z", "se", "domain_organic_unique"],
  ["rkjh.se", "2026-09-25T12:12:09Z", "uk", "domain_ranks"],
  ["rkjh.se", "2026-09-25T12:11:49Z", "uk", "domain_organic"],
  ["rkjh.se", "2026-09-25T12:11:32Z", "us", "domain_organic"],
  ["rkjh.se", "2026-09-25T12:10:00Z", "", "domain_organic"],
  ["rkjh.se", "2026-09-25T12:07:48Z", "", "domain_overview"],
  ["redovisning", "2026-09-25T07:39:40Z", "se", "kmt"],
  ["rkjh.se", "2026-09-25T07:38:54Z", "", "domain_organic"],
  ["", "2026-09-25T05:55:26Z", "", "traffic_analytics"],
];

const webQueries = ["rkjh.se", "www.rkjh.se", "redovisning", "bokföring", "revisor stockholm", "rkjh.se", "lönehantering", "rkjh.se"];
const webReports = ["domain_organic", "domain_ranks", "backlinks_overview", "kmt", "keyword_overview", "domain_overview", "traffic_analytics", "position_tracking", "siteaudit"];
const dbs = ["se", "us", "uk", "", "se", "dk"];

function build(n: number, head: [string, string, string, string][], queries: string[], reports: string[], api: boolean): QueryRow[] {
  const rows: QueryRow[] = [];
  let t = Date.parse(head[head.length - 1][1]);
  for (let i = 0; i < n; i++) {
    let q: string, time: number, db: string, report: string;
    if (i < head.length) {
      [q, , db, report] = head[i];
      time = Date.parse(head[i][1]);
    } else {
      t -= 60000 * (7 + ((i * 37) % 180));
      time = t;
      q = queries[i % queries.length];
      db = dbs[i % dbs.length];
      report = reports[(i * 5) % reports.length];
    }
    const link = q.includes(".");
    rows.push({
      query: q || "-",
      link,
      time: stamp(time),
      ip: "0.0.0.0",
      db,
      report,
      historical: "no",
      ...(api ? { lines: link ? 10 + (i % 5) : 1, units: link ? (i * 13) % 40 : 0 } : {}),
    });
  }
  return rows;
}

const apiHead: [string, string, string, string][] = [
  ["", "2026-09-07T13:16:00Z", "", "siteaudit_meta"],
  ["", "2026-09-07T13:16:00Z", "", "siteaudit_snapshot_info"],
  ["", "2026-09-07T13:15:46Z", "", "tracking_targets"],
  ["", "2026-09-07T13:15:46Z", "", "siteaudit_snapshot_list"],
  ["", "2026-09-07T13:15:46Z", "", "siteaudit_campaign_info"],
  ["rkjh.se", "2026-09-07T13:15:35Z", "", "domain_ranks"],
  ["rkjh.se", "2026-09-07T13:15:35Z", "", "backlinks_geo"],
  ["rkjh.se", "2026-09-07T13:15:34Z", "", "backlinks_geo"],
];

const apiReports = ["backlinks_overview", "domain_ranks", "backlinks_geo", "siteaudit_meta", "tracking_targets", "domain_organic", "backlinks_refdomains"];

export const webQueryRows = build(190, webHead, webQueries, webReports, false);
export const apiQueryRows = build(69, apiHead, ["rkjh.se", "", "www.rkjh.se", ""], apiReports, true).map((r, i) =>
  i < 8 ? { ...r, ip: i === 2 || i > 4 ? "0.0.0.0" : "not_valid_ip", lines: [1, 1, 1, 1, 1, 12, 11, 0][i], units: [1, 1, 1, 1, 1, 120, 110, 0][i] } : r,
);
export const queryPageSize = 50;
