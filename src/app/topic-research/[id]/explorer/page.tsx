import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { TopicProject } from "@/features/topics/TopicProject";

export default function TopicExplorerPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TopicProject view="explorer" />
      <CenteredFooter />
    </AppShell>
  );
}
