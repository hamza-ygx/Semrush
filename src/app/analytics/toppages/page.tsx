import { AppShell } from "@/components/shell/AppShell";
import { PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { LinkSelect } from "@/components/ui/Popover";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { dates, domain, moreDatabases } from "@/features/domain/data";
import { TopPagesReport } from "@/features/domain/TopPages";
import { DatabaseSelector } from "@/features/domain/ui";
import { buildDomainLive, buildTopPagesLive } from "@/features/domain/live";
import { loadOrganicLive, loadSemrush, qOf, type SearchParams } from "@/features/organic/load";

export default async function TopPagesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const [{ live, demo }, sem] = await Promise.all([loadOrganicLive(qOf(sp.q), "wide", qOf(sp.db)), loadSemrush(qOf(sp.q), qOf(sp.db))]);
  const head = live && buildDomainLive(live, sem);
  const report = live && buildTopPagesLive(live, sem);
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: live?.domain ?? domain, scope: true }} footer={false}>
      <PageHeader
        crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Domain Overview", href: routes.domainOverview }, { label: "Top Pages" }]}
        links={
          <>
            <span className="-mr-[4px]">
              <UserManual />
            </span>
            <SendFeedback />
          </>
        }
        title={<ReportTitle label="Top Pages" name={live?.domain} demo={demo} />}
        actions={
          <span className="mr-[9px]">
            <ExportPdf />
          </span>
        }
        className="!pb-[20px]"
      >
        <div className="mt-[7px] flex items-center">
          <DatabaseSelector items={["US", "UK", "SE"] as const} initial="SE" more={moreDatabases} />
          <div className="ml-[25px] flex items-center gap-[5px] text-[14px]">
            Date:
            <LinkSelect value={head ? head.dates[0] : dates[0]} options={head ? head.dates : dates} />
          </div>
        </div>
      </PageHeader>
      <div className="px-8 pt-5">
        <TopPagesReport live={report} />
      </div>
      <AnalyticsFooter />
    </AppShell>
  );
}
