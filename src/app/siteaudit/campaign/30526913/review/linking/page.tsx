import { Linking } from "@/features/siteaudit/part2/Linking";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <Linking head={headOf(ctx)} live={l ? { score: l.scores.linking, pages: l.header.pages, crawlDepth: l.crawlDepth, outgoing: l.outgoing, counts: l.counts, topLinked: l.topLinked } : null} />;
}
