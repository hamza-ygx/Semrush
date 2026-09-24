import { OrganicPage } from "@/features/organic/OrganicPage";
import { PositionsView } from "@/features/organic/PositionsView";

export default function Page() {
  return (
    <OrganicPage tab="positions">
      <PositionsView />
    </OrganicPage>
  );
}
