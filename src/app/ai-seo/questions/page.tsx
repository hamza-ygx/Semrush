import { AppShell } from "@/components/shell/AppShell";
import { NoFilterFrame } from "@/features/ai/part2/NoFilterFrame";
import { Questions } from "@/features/ai/part2/Questions";

export default function QuestionsPage() {
  return (
    <AppShell section="ai">
      <NoFilterFrame report="Questions">
        <Questions />
      </NoFilterFrame>
    </AppShell>
  );
}
