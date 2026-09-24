import { MarketOverviewLocked, MarketOverviewSample } from "@/features/traffic/part1/MarketOverview";

export default async function Page({ searchParams }: { searchParams: Promise<{ lid?: string }> }) {
  const { lid } = await searchParams;
  return lid ? <MarketOverviewLocked /> : <MarketOverviewSample />;
}
