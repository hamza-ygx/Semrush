import { StatisticsGraph } from "@/features/siteaudit/part2/Statistics";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <StatisticsGraph head={headOf(ctx)} live={l ? { tiles: {}, httpStatus: l.httpStatus, crawlDepth: l.crawlDepth, pages: l.header.pages } : null} />;
}
