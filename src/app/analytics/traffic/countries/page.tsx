import { GeoReport } from "@/features/traffic/part2/GeoReport";
import { trafficLiveFor } from "@/features/traffic/load";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; lid?: string }> }) {
  const { q, lid } = await searchParams;
  const live = q || lid ? await trafficLiveFor({ q, lid }) : null;
  return <GeoReport kind="countries" live={live} />;
}
