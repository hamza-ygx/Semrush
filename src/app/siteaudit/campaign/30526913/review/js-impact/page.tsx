import { JsImpact } from "@/features/siteaudit/part2/JsImpact";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  return <JsImpact head={headOf(await loadSiteAudit(), true)} />;
}
