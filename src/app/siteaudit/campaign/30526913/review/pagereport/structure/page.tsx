import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { CrawledPages } from "@/features/siteaudit/part1/CrawledPages";

export default function SiteStructurePage() {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} />
      <CrawledPages view="structure" />
    </AppShell>
  );
}
