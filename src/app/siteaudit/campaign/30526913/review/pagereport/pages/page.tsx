import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { CrawledPages } from "@/features/siteaudit/part1/CrawledPages";

export const dynamic = "force-dynamic";

export default async function CrawledPagesPage() {
  const ctx = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} head={headOf(ctx)} />
      <CrawledPages view="pages" live={ctx.live ? { rows: ctx.live.rows } : null} />
    </AppShell>
  );
}
