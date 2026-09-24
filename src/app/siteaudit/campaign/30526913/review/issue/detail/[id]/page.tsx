import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { IssueDetail } from "@/features/siteaudit/part1/IssueDetail";

export default async function SiteAuditIssueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="issues" looker={false} />
      <IssueDetail id={Number(id)} />
    </AppShell>
  );
}
