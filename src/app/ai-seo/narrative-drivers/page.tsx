import { AppShell } from "@/components/shell/AppShell";
import { LandingFooter } from "@/features/ai/landing";
import { AiSampleFrame } from "@/features/ai/AiSampleFrame";
import { NarrativeDrivers } from "@/features/ai/part2/NarrativeDrivers";

export default function NarrativeDriversPage() {
  return (
    <AppShell section="ai" footer={false}>
      <AiSampleFrame report="Narrative Drivers">
        <NarrativeDrivers />
      </AiSampleFrame>
      <LandingFooter gap={34} />
    </AppShell>
  );
}
