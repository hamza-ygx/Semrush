import { OrganicPage } from "@/features/organic/OrganicPage";
import { OverviewView } from "@/features/organic/OverviewView";
import { organicProps, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OrganicPage tab="overview" prev {...await organicProps(searchParams, "wide", "overview")}>
      <OverviewView />
    </OrganicPage>
  );
}
