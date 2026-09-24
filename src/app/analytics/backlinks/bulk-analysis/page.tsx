import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { BulkAnalysis } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="bulkAnalysis">
      <BulkAnalysis />
    </BacklinksPage>
  );
}
