import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { backlinksProps, type SearchParams } from "@/features/backlinks/load";
import { AnchorsReport } from "@/features/backlinks/Reports";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo, name } = await backlinksProps(searchParams, "anchors");
  return (
    <BacklinksPage tab="anchors" head={live?.head} demo={demo} name={name}>
      <AnchorsReport live={live?.anchors} />
    </BacklinksPage>
  );
}
