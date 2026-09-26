import { Https } from "@/features/siteaudit/part2/Https";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <Https head={headOf(ctx)} live={l ? { score: l.scores.https, mixed: l.https.mixed, notSecure: l.https.notSecure } : null} />;
}
