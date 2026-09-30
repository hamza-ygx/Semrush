import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { backlinksProps, type SearchParams } from "@/features/backlinks/load";
import { OverviewBody } from "@/features/backlinks/Overview";

export default async function BacklinksOverviewPage({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo, name } = await backlinksProps(searchParams, "overview");
  return (
    <BacklinksPage tab="overview" head={live?.head} demo={demo} name={name}>
      <OverviewBody live={live?.overview} />
    </BacklinksPage>
  );
}
