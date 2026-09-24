import { CompetitorMonitoringLocked, CompetitorMonitoringSample } from "@/features/traffic/part1/CompetitorMonitoring";

export default async function Page({ searchParams }: { searchParams: Promise<{ lid?: string }> }) {
  const { lid } = await searchParams;
  return lid ? <CompetitorMonitoringLocked /> : <CompetitorMonitoringSample />;
}
