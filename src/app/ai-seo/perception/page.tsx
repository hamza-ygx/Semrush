import { AppShell } from "@/components/shell/AppShell";
import { LandingFooter } from "@/features/ai/landing";
import { AiSampleFrame } from "@/features/ai/AiSampleFrame";
import { Perception } from "@/features/ai/part2/Perception";

export default function PerceptionPage() {
  return (
    <AppShell section="ai" footer={false}>
      <AiSampleFrame report="Perception">
        <Perception />
      </AiSampleFrame>
      <LandingFooter gap={34} />
    </AppShell>
  );
}
