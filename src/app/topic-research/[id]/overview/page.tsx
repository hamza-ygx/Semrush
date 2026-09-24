import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { TopicProject } from "@/features/topics/TopicProject";

export default function TopicOverviewPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TopicProject view="overview" />
      <CenteredFooter />
    </AppShell>
  );
}
