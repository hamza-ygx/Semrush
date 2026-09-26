import { WebVitals } from "@/features/siteaudit/part2/WebVitals";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  return <WebVitals head={headOf(ctx)} demo={ctx.env} />;
}
