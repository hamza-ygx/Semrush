import { SubfoldersSubdomains } from "@/features/traffic/part2/SubfoldersSubdomains";
import { trafficLiveFor } from "@/features/traffic/load";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; lid?: string }> }) {
  const { q, lid } = await searchParams;
  const live = await trafficLiveFor({ q, lid });
  return <SubfoldersSubdomains live={live} />;
}
