import { OrganicPage } from "@/features/organic/OrganicPage";
import { ChangesView } from "@/features/organic/ChangesView";

export default function Page() {
  return (
    <OrganicPage tab="changes" date={false}>
      <ChangesView />
    </OrganicPage>
  );
}
