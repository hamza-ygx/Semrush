import { CompetitorsDiscoveryView } from "@/features/tracking/views/CompetitorsDiscovery";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <CompetitorsDiscoveryView {...snapFrom(await searchParams)} />;
}
