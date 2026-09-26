import { OrganicPage } from "@/features/organic/OrganicPage";
import { ChangesView } from "@/features/organic/ChangesView";
import { organicProps, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OrganicPage tab="changes" date={false} {...await organicProps(searchParams, "history", "changes")}>
      <ChangesView />
    </OrganicPage>
  );
}
