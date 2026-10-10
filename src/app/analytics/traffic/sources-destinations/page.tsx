import { SourcesDestinations } from "@/features/traffic/part2/SourcesDestinations";
import { trafficLiveFor } from "@/features/traffic/load";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; lid?: string }> }) {
  const { q, lid } = await searchParams;
  const live = await trafficLiveFor({ q, lid });
  return <SourcesDestinations live={live} />;
}
