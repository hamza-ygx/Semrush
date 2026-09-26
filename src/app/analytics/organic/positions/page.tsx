import { OrganicPage } from "@/features/organic/OrganicPage";
import { PositionsView } from "@/features/organic/PositionsView";
import { organicProps, type SearchParams } from "@/features/organic/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OrganicPage tab="positions" {...await organicProps(searchParams, "history", "positions")}>
      <PositionsView />
    </OrganicPage>
  );
}
