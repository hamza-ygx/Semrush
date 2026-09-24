import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { BacklinksTable } from "@/features/backlinks/BacklinksTable";

export default function Page() {
  return (
    <BacklinksPage tab="backlinks" bodyClassName="px-8 pt-[17px]">
      <BacklinksTable />
    </BacklinksPage>
  );
}
