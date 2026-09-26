import { PagesView } from "@/features/tracking/views/Pages";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <PagesView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
