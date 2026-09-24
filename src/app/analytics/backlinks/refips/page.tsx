import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { RefIpsReport } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="refIps">
      <RefIpsReport />
    </BacklinksPage>
  );
}
