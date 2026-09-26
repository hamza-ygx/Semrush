import { ProjectsView } from "@/features/tracking/views/Projects";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";
import { loadTrackingLive } from "@/features/tracking/load";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  const p = await searchParams;
  const { begin, end, hours } = snapFrom(p);
  const target = p.target === "ai" || p.target === "seo" ? p.target : "all";
  const { live, demo } = await loadTrackingLive();
  return <ProjectsView target={target} begin={begin} end={end} hours={hours} live={live} demo={demo} />;
}
