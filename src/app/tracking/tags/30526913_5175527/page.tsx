import { TagsView } from "@/features/tracking/views/Tags";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <TagsView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
