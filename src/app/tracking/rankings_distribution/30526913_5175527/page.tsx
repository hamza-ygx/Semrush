import { RankingsDistributionView } from "@/features/tracking/views/RankingsDistribution";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <RankingsDistributionView {...snapFrom(await searchParams)} />;
}
