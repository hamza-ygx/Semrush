import { FeaturedSnippetsView } from "@/features/tracking/views/FeaturedSnippets";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <FeaturedSnippetsView {...snapFrom(await searchParams)} {...await loadTrackingLive()} />;
}
