import { ProjectsView } from "@/features/tracking/views/Projects";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  const p = await searchParams;
  const { begin, end, hours } = snapFrom(p);
  const target = p.target === "ai" || p.target === "seo" ? p.target : "all";
  return <ProjectsView target={target} begin={begin} end={end} hours={hours} />;
}
