import { AppShell } from "@/components/shell/AppShell";
import { CompetitorResearchLanding } from "@/features/ai/CompetitorResearchLanding";

export default function CompetitorResearchPage() {
  return (
    <AppShell section="ai" footer={false}>
      <CompetitorResearchLanding />
    </AppShell>
  );
}
