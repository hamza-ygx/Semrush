import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { Overview } from "@/features/siteaudit/part1/Overview";

export default function SiteAuditOverviewPage() {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="overview" exportReport="Crawled Pages with all Issues" />
      <Overview />
    </AppShell>
  );
}
