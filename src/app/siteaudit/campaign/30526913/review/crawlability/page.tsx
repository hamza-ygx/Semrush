import { Crawlability } from "@/features/siteaudit/part2/Crawlability";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <Crawlability head={headOf(ctx)} live={l ? { score: l.scores.crawlability, pages: l.header.pages, indexable: l.indexable, budget: l.budget, counts: l.counts, crawlDepth: l.crawlDepth, httpStatus: l.httpStatus, date: l.dates.long } : null} />;
}
