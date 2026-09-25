import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { CrawledPages } from "@/features/siteaudit/part1/CrawledPages";

export default async function SiteStructurePage({ searchParams }: { searchParams: Promise<{ restrictions?: string }> }) {
  const { restrictions } = await searchParams;
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} />
      <CrawledPages view="structure" filtered={!!restrictions} />
    </AppShell>
  );
}
