import { routes } from "@/config/routes";

export type Trend = "up" | "down" | "neutral";

export type Metric = {
  label: string;
  value: string;
  href: string;
  sub?: string;
  trend?: Trend;
  gauge?: boolean;
};

export const project = {
  name: "www.rkjh.se",
  domain: "www.rkjh.se",
  deleteCode: "183628",
  metrics: [
    { label: "AI Visibility", value: "0", gauge: true, href: routes.ai.overview },
    { label: "Mentions", value: "0", href: routes.ai.brandPerformance },
    { label: "Site Health", value: "82%", href: routes.siteAuditCampaign.overview },
    { label: "Visibility", value: "0%", sub: "0, 20h ago", trend: "neutral", href: routes.tracking.landscape },
    { label: "Organic Traffic", value: "60", sub: "-9.09%", trend: "down", href: routes.domainOverview },
    { label: "Organic Keywords", value: "212", sub: "0", trend: "neutral", href: routes.organic.positions },
    { label: "Backlinks", value: "375", sub: "+19.43%", trend: "up", href: routes.backlinks },
  ] satisfies Metric[],
};

export const deleteTargets = ["SEO projects", "Content", "Traffic & Market", "Advertising", "Social"];

export const monitoringCountries = ["US", "UK", "SE", "DE", "FR", "ES"] as const;
