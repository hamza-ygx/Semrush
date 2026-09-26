import { OverviewView } from "@/features/tracking/views/Overview";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  const p = await searchParams;
  return <OverviewView {...snapFrom(p, "latest")} prediction={p.prediction === "true"} />;
}
