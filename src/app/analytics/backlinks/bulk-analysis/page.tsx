import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { backlinksProps, type SearchParams } from "@/features/backlinks/load";
import { BulkAnalysis } from "@/features/backlinks/Reports";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo, name } = await backlinksProps(searchParams, "bulk");
  return (
    <BacklinksPage tab="bulkAnalysis" head={live?.head} demo={demo} name={name}>
      <BulkAnalysis live={live?.bulk} />
    </BacklinksPage>
  );
}
