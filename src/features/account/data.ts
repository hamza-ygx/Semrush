import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

export const registrationDate = "Jul 14, 2026";

export const subRoutes = {
  billing: `${routes.account.subscription}/billing-info`,
  payments: `${routes.account.subscription}/payments`,
};

export type SideKey = "profile" | "subscription" | "users" | "notifications" | "queryLog" | "activity" | "apiKeys" | "apps" | "agency";

export const sideItems: { key: SideKey; label: string; href?: string }[] = [
  { key: "profile", label: "Profile settings", href: routes.account.profile },
  { key: "subscription", label: "Subscription info", href: routes.account.subscription },
  { key: "users", label: "User Management" },
  { key: "notifications", label: "Notifications" },
  { key: "queryLog", label: "Query log" },
  { key: "activity", label: "Activity log", href: routes.account.activity },
  { key: "apiKeys", label: "API Keys" },
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

export type UnitRow = { label: string; used?: number; limit?: number; available?: string; buy: boolean };

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
