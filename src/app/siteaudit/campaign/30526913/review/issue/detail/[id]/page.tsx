import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { issueDetailLive } from "@/features/siteaudit/live";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { IssueDetail } from "@/features/siteaudit/part1/IssueDetail";
import { issueById } from "@/features/siteaudit/part1/data";

export const dynamic = "force-dynamic";

export default async function SiteAuditIssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = Number(id);
  const ctx = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="issues" looker={false} head={headOf(ctx)} />
      <IssueDetail id={n} live={ctx.live ? issueDetailLive(ctx.live, n, issueById(n)) : null} />
    </AppShell>
  );
}
