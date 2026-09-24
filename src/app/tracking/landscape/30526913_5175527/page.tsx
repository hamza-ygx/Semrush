import { LandscapeView } from "@/features/tracking/views/Landscape";
import type { TrackingParams } from "@/features/tracking/context";

export default async function Page({ searchParams }: { searchParams: TrackingParams }) {
  const { date_begin, date_end } = await searchParams;
  return <LandscapeView begin={date_begin} fresh={!!date_end} />;
}
