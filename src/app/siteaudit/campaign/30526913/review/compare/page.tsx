import { CompareCrawls } from "@/features/siteaudit/part2/CompareCrawls";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <CompareCrawls head={headOf(ctx)} live={l ? { general: l.compare, counts: l.counts, date: l.dates.short } : null} />;
}
