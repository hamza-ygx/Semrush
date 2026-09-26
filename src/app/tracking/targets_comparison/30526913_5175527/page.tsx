import { DevicesLocationsView } from "@/features/tracking/views/DevicesLocations";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <DevicesLocationsView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
