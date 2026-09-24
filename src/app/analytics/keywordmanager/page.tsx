import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { StrategyBuilder } from "@/features/keywords/StrategyBuilder";

export default function KeywordStrategyBuilderPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <StrategyBuilder />
      <CenteredFooter />
    </AppShell>
  );
}
