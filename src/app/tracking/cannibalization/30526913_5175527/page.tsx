import { CannibalizationView } from "@/features/tracking/views/Cannibalization";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <CannibalizationView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
