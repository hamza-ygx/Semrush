import { OverviewView } from "@/features/tracking/views/Overview";
import type { TrackingParams } from "@/features/tracking/context";

export default async function Page({ searchParams }: { searchParams: TrackingParams }) {
  const { date_begin, date_end, prediction } = await searchParams;
  return <OverviewView begin={date_begin ?? "latest"} fresh={!!date_end} prediction={prediction === "true"} />;
}
