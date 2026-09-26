import { LandscapeView } from "@/features/tracking/views/Landscape";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <LandscapeView {...snapFrom(await searchParams, "latest")} {...await loadTrackingLive()} />;
}
