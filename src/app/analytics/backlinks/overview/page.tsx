import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { OverviewBody } from "@/features/backlinks/Overview";

export default function BacklinksOverviewPage() {
  return (
    <BacklinksPage tab="overview">
      <OverviewBody />
    </BacklinksPage>
  );
}
