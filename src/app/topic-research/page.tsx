import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { TopicLanding } from "@/features/topics/TopicLanding";

export default function TopicResearchPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TopicLanding />
      <CenteredFooter />
    </AppShell>
  );
}
