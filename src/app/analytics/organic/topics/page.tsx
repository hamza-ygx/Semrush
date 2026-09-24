import { OrganicPage } from "@/features/organic/OrganicPage";
import { TopicsView } from "@/features/organic/TopicsView";

export default async function Page({ searchParams }: { searchParams: Promise<{ subtopic?: string }> }) {
  const { subtopic } = await searchParams;
  return (
    <OrganicPage tab="topics" manual={false} pdf={false} date={false} currency={false}>
      <TopicsView initial={subtopic || undefined} />
    </OrganicPage>
  );
}
