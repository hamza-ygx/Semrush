import { Progress } from "@/features/siteaudit/part2/Progress";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  return <Progress head={headOf(ctx)} live={l ? { health: l.overview.health, time: l.dates.time, date: l.dates.short } : null} />;
}
