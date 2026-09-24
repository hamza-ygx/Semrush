import { AiTrafficLocked, AiTrafficSample } from "@/features/traffic/part1/AiTraffic";

export default async function Page({ searchParams }: { searchParams: Promise<{ lid?: string }> }) {
  const { lid } = await searchParams;
  return lid ? <AiTrafficLocked /> : <AiTrafficSample />;
}
