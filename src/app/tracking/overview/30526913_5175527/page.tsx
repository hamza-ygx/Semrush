import { OverviewView } from "@/features/tracking/views/Overview";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  const p = await searchParams;
  return <OverviewView {...snapFrom(p, "latest")} {...await loadTrackingLive()} prediction={p.prediction === "true"} />;
}
