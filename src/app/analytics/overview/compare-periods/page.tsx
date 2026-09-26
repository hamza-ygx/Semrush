import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { DomainHeader } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";
import { EmptyState } from "@/features/domain/growth/EmptyState";
import { GrowthControls } from "@/features/domain/growth/GrowthControls";
import { GrowthReport } from "@/features/domain/growth/GrowthReport";
import { PeriodsIllustration } from "@/features/domain/growth/Illustrations";

export default async function GrowthReportPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { periodType } = await searchParams;
  const active = typeof periodType === "string" ? periodType : undefined;
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <div className="flex min-h-[calc(100vh-52px)] flex-col">
        <DomainHeader tab="growth" />
        <div className={`px-8 ${active ? "pt-[17px]" : "pt-[15.5px]"}`}>
          <GrowthControls key={active ?? "empty"} active={active} />
          {active ? (
            <GrowthReport />
          ) : (
            <EmptyState
              illustration={<PeriodsIllustration />}
              title="Compare your domain performance by time periods"
              bullets={[
                "Save time on reporting by getting the key data on a domain’s growth trend in one place",
                "Evaluate a domain’s progress for organic traffic, paid traffic, and backlinks for a specific period: three months, a quarter, 6 months, a season, or 1 year",
                "Easily export the report to xls or csv",
              ]}
              example="imdb.com"
              exampleHref={`${routes.domainGrowthReport}?periodType=past_months_6`}
            />
          )}
        </div>
        <AnalyticsFooter />
      </div>
    </AppShell>
  );
}
