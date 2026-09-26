import { OrganicPage } from "@/features/organic/OrganicPage";
import { TopicsView } from "@/features/organic/TopicsView";
import { organicProps, qOf, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const subtopic = qOf((await searchParams).subtopic);
  return (
    <OrganicPage tab="topics" manual={false} pdf={false} date={false} currency={false} {...await organicProps(searchParams, "base", "header")}>
      <TopicsView initial={subtopic || undefined} />
    </OrganicPage>
  );
}
