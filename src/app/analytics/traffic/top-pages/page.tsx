import { TopPagesLive, TopPagesLocked, TopPagesSample } from "@/features/traffic/part1/TopPages";
import { trafficLiveFor } from "@/features/traffic/load";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; lid?: string }> }) {
  const { q, lid } = await searchParams;
  const live = q || lid ? await trafficLiveFor({ q, lid }) : null;
  if (live) return <TopPagesLive live={live} />;
  return lid ? <TopPagesLocked /> : <TopPagesSample />;
}
