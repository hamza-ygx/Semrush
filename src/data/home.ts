export type Trend = "up" | "down" | "neutral";

export type Metric = {
  label: string;
  value: string;
  sub?: string;
  trend?: Trend;
  gauge?: boolean;
};

export const project = {
  name: "www.rkjh.se",
  domain: "www.rkjh.se",
  metrics: [
    { label: "AI Visibility", value: "0", gauge: true },
    { label: "Mentions", value: "0" },
    { label: "Site Health", value: "82%" },
    { label: "Visibility", value: "0%", sub: "0, 15h ago", trend: "neutral" },
    { label: "Organic Traffic", value: "60", sub: "-9.09%", trend: "down" },
    { label: "Organic Keywords", value: "212", sub: "0", trend: "neutral" },
    { label: "Backlinks", value: "373", sub: "+18.79%", trend: "up" },
  ] satisfies Metric[],
};
