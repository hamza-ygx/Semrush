import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { PagesReport } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="pages">
      <PagesReport />
    </BacklinksPage>
  );
}
