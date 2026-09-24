import { AppShell } from "@/components/shell/AppShell";
import { AiSampleFrame } from "@/features/ai/AiSampleFrame";
import { Perception } from "@/features/ai/part2/Perception";

export default function PerceptionPage() {
  return (
    <AppShell section="ai">
      <AiSampleFrame report="Perception">
        <Perception />
      </AiSampleFrame>
    </AppShell>
  );
}
