import { AppShell } from "@/components/shell/AppShell";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { DomainHeader } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";
import { CompareCountries } from "@/features/domain/growth/CompareCountries";
import { loadDomainLive } from "@/features/domain/load";
import type { SearchParams } from "@/features/organic/load";

export default async function CompareByCountriesPage({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo } = await loadDomainLive(searchParams);
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: live?.domain ?? domain, scope: true }} footer={false}>
      <div className="flex min-h-[calc(100vh-52px)] flex-col">
        <DomainHeader tab="countries" live={live} demo={demo} />
        <div className="px-8 pt-[15.5px]">
          <CompareCountries metrics={live?.compare} />
        </div>
        <AnalyticsFooter />
      </div>
    </AppShell>
  );
}
