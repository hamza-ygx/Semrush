import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { AnchorsReport } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="anchors">
      <AnchorsReport />
    </BacklinksPage>
  );
}
