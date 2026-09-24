import { TrafficLanding } from "@/features/traffic/part1/Landing";
import { TrafficAnalyticsLocked, TrafficAnalyticsSample } from "@/features/traffic/part1/TrafficAnalytics";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; sample?: string; lid?: string }> }) {
  const { q, sample, lid } = await searchParams;
  if (sample) return <TrafficAnalyticsSample />;
  if (lid && q) return <TrafficAnalyticsLocked />;
  if (lid) return <TrafficAnalyticsSample />;
  return <TrafficLanding />;
}
