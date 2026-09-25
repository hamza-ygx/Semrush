import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { BacklinksTable } from "@/features/backlinks/BacklinksTable";

export default async function Page({ searchParams }: { searchParams: Promise<{ ba_mt?: string }> }) {
  const { ba_mt } = await searchParams;
  return (
    <BacklinksPage tab="backlinks" bodyClassName="px-8 pt-[17px]">
      <BacklinksTable key={ba_mt ?? "all"} mode={ba_mt === "new" ? "new" : undefined} />
    </BacklinksPage>
  );
}
