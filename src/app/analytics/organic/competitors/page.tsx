import { OrganicPage } from "@/features/organic/OrganicPage";
import { CompetitorsView } from "@/features/organic/CompetitorsView";

export default function Page() {
  return (
    <OrganicPage tab="competitors">
      <CompetitorsView />
    </OrganicPage>
  );
}
