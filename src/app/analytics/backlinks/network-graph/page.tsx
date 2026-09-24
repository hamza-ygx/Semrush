import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { NetworkGraphReport } from "@/features/backlinks/NetworkGraph";

export default function Page() {
  return (
    <BacklinksPage tab="networkGraph">
      <NetworkGraphReport />
    </BacklinksPage>
  );
}
