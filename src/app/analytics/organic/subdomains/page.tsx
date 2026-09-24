import { OrganicPage } from "@/features/organic/OrganicPage";
import { SubdomainsView } from "@/features/organic/SubdomainsView";

export default function Page() {
  return (
    <OrganicPage tab="subdomains" pdf={false}>
      <SubdomainsView />
    </OrganicPage>
  );
}
