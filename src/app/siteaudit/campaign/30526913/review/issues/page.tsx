import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { IssuesList } from "@/features/siteaudit/part1/IssuesList";

export const dynamic = "force-dynamic";

export default async function SiteAuditIssuesPage() {
  const ctx = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="issues" looker={false} head={headOf(ctx)} />
      <IssuesList live={ctx.live?.list} />
    </AppShell>
  );
}
