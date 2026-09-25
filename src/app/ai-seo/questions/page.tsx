import { AppShell } from "@/components/shell/AppShell";
import { LandingFooter } from "@/features/ai/landing";
import { NoFilterFrame } from "@/features/ai/part2/NoFilterFrame";
import { Questions } from "@/features/ai/part2/Questions";

export default function QuestionsPage() {
  return (
    <AppShell section="ai" footer={false}>
      <NoFilterFrame report="Questions">
        <Questions />
      </NoFilterFrame>
      <LandingFooter gap={34} />
    </AppShell>
  );
}
