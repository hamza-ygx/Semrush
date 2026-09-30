import { OrganicPage } from "@/features/organic/OrganicPage";
import { CompetitorsView } from "@/features/organic/CompetitorsView";
import { organicProps, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OrganicPage tab="competitors" {...await organicProps(searchParams, "base", "competitors")}>
      <CompetitorsView />
    </OrganicPage>
  );
}
