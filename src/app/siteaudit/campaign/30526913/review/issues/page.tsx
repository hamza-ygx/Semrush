import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { IssuesList } from "@/features/siteaudit/part1/IssuesList";

export default function SiteAuditIssuesPage() {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="issues" looker={false} />
      <IssuesList />
    </AppShell>
  );
}
