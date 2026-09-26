import { CompetitorsDiscoveryView } from "@/features/tracking/views/CompetitorsDiscovery";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <CompetitorsDiscoveryView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
