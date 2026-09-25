import { TrafficHome } from "@/features/traffic/part1/Landing";

export default async function Page({ searchParams }: { searchParams: Promise<{ lid?: string }> }) {
  const { lid } = await searchParams;
  return <TrafficHome withList={!!lid} />;
}
