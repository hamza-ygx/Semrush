import { OrganicPage } from "@/features/organic/OrganicPage";
import { PagesView } from "@/features/organic/PagesView";

export default function Page() {
  return (
    <OrganicPage tab="pages" pdf={false}>
      <PagesView />
    </OrganicPage>
  );
}
