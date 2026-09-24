import { AppShell } from "@/components/shell/AppShell";
import { PromptResearchLanding } from "@/features/ai/PromptResearchLanding";

export default function PromptResearchPage() {
  return (
    <AppShell section="ai" footer={false}>
      <PromptResearchLanding />
    </AppShell>
  );
}
