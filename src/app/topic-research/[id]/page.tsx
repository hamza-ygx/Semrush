import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { TopicProject } from "@/features/topics/TopicProject";

export default async function TopicCardsPage({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
  const loading = (await searchParams).new === "1";
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TopicProject view="cards" initialLoading={loading} />
      <CenteredFooter />
    </AppShell>
  );
}
