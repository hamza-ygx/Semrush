import { OrganicPage } from "@/features/organic/OrganicPage";
import { TopicsView } from "@/features/organic/TopicsView";

export default async function Page({ searchParams }: { searchParams: Promise<{ subtopic?: string | string[] }> }) {
  const raw = (await searchParams).subtopic;
  const subtopic = Array.isArray(raw) ? raw[0] : raw;
  return (
    <OrganicPage tab="topics" manual={false} pdf={false} date={false} currency={false}>
      <TopicsView initial={subtopic || undefined} />
    </OrganicPage>
  );
}
