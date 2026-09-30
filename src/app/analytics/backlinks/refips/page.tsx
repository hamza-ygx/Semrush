import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { backlinksProps, type SearchParams } from "@/features/backlinks/load";
import { RefIpsReport } from "@/features/backlinks/Reports";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo, name } = await backlinksProps(searchParams, "header", true);
  return (
    <BacklinksPage tab="refIps" head={live?.head} demo={demo} name={name}>
      <RefIpsReport />
    </BacklinksPage>
  );
}
