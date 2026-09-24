import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { CompetitorsEmpty } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="competitors">
      <CompetitorsEmpty />
    </BacklinksPage>
  );
}
