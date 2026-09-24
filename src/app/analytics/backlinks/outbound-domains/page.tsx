import { BacklinksPage } from "@/features/backlinks/BacklinksPage";
import { OutboundReport } from "@/features/backlinks/Reports";

export default function Page() {
  return (
    <BacklinksPage tab="outboundDomains">
      <OutboundReport />
    </BacklinksPage>
  );
}
