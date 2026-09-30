import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { BacklinksTable } from "@/features/backlinks/BacklinksTable";
import { backlinksProps, type SearchParams } from "@/features/backlinks/load";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const ba_mt = Array.isArray(sp.ba_mt) ? sp.ba_mt[0] : sp.ba_mt;
  const { live, demo, name } = await backlinksProps(Promise.resolve(sp), "backlinks");
  return (
    <BacklinksPage tab="backlinks" bodyClassName="px-8 pt-[17px]" head={live?.head} demo={demo} name={name}>
      <BacklinksTable key={ba_mt ?? "all"} mode={ba_mt === "new" ? "new" : undefined} live={live?.table} />
    </BacklinksPage>
  );
}
