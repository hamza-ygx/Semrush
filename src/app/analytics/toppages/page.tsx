import { AppShell } from "@/components/shell/AppShell";
import { PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { LinkSelect } from "@/components/ui/Popover";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { dates, domain, moreDatabases } from "@/features/domain/data";
import { TopPagesReport } from "@/features/domain/TopPages";
import { DatabaseSelector } from "@/features/domain/ui";

export default function TopPagesPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
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
        title={<ReportTitle label="Top Pages" />}
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
            <LinkSelect value={dates[0]} options={dates} />
          </div>
        </div>
      </PageHeader>
      <div className="px-8 pt-5">
        <TopPagesReport />
      </div>
      <AnalyticsFooter />
    </AppShell>
  );
}
