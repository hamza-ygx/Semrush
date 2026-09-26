import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { pageDetailLive } from "@/features/siteaudit/live";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";
import { PageDetail } from "@/features/siteaudit/part1/PageDetail";
import { pageDetail } from "@/features/siteaudit/part1/pageDetail";

export const dynamic = "force-dynamic";

export default async function SiteAuditPageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await loadSiteAudit();
  const d = ctx.live ? pageDetailLive(ctx.live, id) : pageDetail(id);
  if (!d) notFound();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} pdf={false} exportBtn={false} head={headOf(ctx)} />
      <PageDetail d={d} />
    </AppShell>
  );
}
