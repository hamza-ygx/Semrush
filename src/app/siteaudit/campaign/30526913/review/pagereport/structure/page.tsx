import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { structureFor } from "@/features/siteaudit/live";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { CrawledPages } from "@/features/siteaudit/part1/CrawledPages";

export const dynamic = "force-dynamic";

function triggered(restrictions?: string) {
  if (!restrictions) return null;
  try {
    const v = JSON.parse(Buffer.from(restrictions, "base64").toString("utf8")) as { triggeredIssue?: unknown };
    return typeof v.triggeredIssue === "number" ? v.triggeredIssue : null;
  } catch {
    return null;
  }
}

export default async function SiteStructurePage({ searchParams }: { searchParams: Promise<{ restrictions?: string }> }) {
  const { restrictions } = await searchParams;
  const ctx = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} head={headOf(ctx)} />
      <CrawledPages view="structure" filtered={!!restrictions} live={ctx.live ? { structure: structureFor(ctx.live, triggered(restrictions)) } : null} />
    </AppShell>
  );
}
