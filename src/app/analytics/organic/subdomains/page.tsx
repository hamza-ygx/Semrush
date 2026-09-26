import { OrganicPage } from "@/features/organic/OrganicPage";
import { SubdomainsView } from "@/features/organic/SubdomainsView";
import { organicProps, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OrganicPage tab="subdomains" pdf={false} prev {...await organicProps(searchParams, "base", "subdomains")}>
      <SubdomainsView />
    </OrganicPage>
  );
}
