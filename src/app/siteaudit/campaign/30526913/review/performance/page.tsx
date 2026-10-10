import { Performance } from "@/features/siteaudit/part2/Performance";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  const l = ctx.live;
  const psi = ctx.psi?.perf ?? null;
  return <Performance head={headOf(ctx)} demo={ctx.env && !psi} psi={psi} live={l ? { loadSpeed: l.loadSpeed, avgLoad: l.avgLoad, pages: l.header.pages, counts: l.counts } : null} />;
}
