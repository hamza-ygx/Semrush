import { TrafficLanding } from "@/features/traffic/part1/Landing";
import { TrafficAnalyticsLive, TrafficAnalyticsLocked, TrafficAnalyticsSample } from "@/features/traffic/part1/TrafficAnalytics";
import { trafficLiveFor } from "@/features/traffic/load";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; sample?: string; lid?: string }> }) {
  const { q, sample, lid } = await searchParams;
  if (sample) return <TrafficAnalyticsSample />;
  const live = await trafficLiveFor({ q, lid });
  if (live) return <TrafficAnalyticsLive live={live} />;
  if (lid && q) return <TrafficAnalyticsLocked />;
  if (lid) return <TrafficAnalyticsSample />;
  return <TrafficLanding />;
}
