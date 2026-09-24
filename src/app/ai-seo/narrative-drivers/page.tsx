import { AppShell } from "@/components/shell/AppShell";
import { AiSampleFrame } from "@/features/ai/AiSampleFrame";
import { NarrativeDrivers } from "@/features/ai/part2/NarrativeDrivers";

export default function NarrativeDriversPage() {
  return (
    <AppShell section="ai">
      <AiSampleFrame report="Narrative Drivers">
        <NarrativeDrivers />
      </AiSampleFrame>
    </AppShell>
  );
}
