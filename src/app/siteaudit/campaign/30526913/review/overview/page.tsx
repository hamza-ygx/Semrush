import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { Overview } from "@/features/siteaudit/part1/Overview";

export const dynamic = "force-dynamic";

export default async function SiteAuditOverviewPage() {
  const ctx = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="overview" exportReport="Crawled Pages with all Issues" head={headOf(ctx)} />
      <Overview live={ctx.live?.overview} scores={ctx.psi?.scores} />
    </AppShell>
  );
}
