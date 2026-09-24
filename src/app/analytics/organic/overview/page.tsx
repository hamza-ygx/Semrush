import { OrganicPage } from "@/features/organic/OrganicPage";
import { OverviewView } from "@/features/organic/OverviewView";

export default function Page() {
  return (
    <OrganicPage tab="overview">
      <OverviewView />
    </OrganicPage>
  );
}
