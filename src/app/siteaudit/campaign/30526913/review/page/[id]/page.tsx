import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "@/features/siteaudit/SiteAuditHeader";
import { PageDetail } from "@/features/siteaudit/part1/PageDetail";
import { pageDetail } from "@/features/siteaudit/part1/pageDetail";

export default async function SiteAuditPageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = pageDetail(id);
  if (!d) notFound();
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="pages" looker={false} pdf={false} exportBtn={false} />
      <PageDetail d={d} />
    </AppShell>
  );
}
