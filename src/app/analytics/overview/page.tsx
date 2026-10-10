import { AppShell } from "@/components/shell/AppShell";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { DomainHeader } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";
import { AdvertisingResearch } from "@/features/domain/overview/Advertising";
import { BacklinksSection } from "@/features/domain/overview/BacklinksSection";
import { MarketTrends } from "@/features/domain/overview/MarketTrends";
import { OrganicResearch } from "@/features/domain/overview/OrganicResearch";
import { AiSearchCard, SeoCard } from "@/features/domain/overview/Summary";
import { TrendsWidget } from "@/features/domain/overview/TrendsWidget";
import { loadDomainLive } from "@/features/domain/load";
import { qOf, type SearchParams } from "@/features/organic/load";

export default async function DomainOverviewPage({ searchParams }: { searchParams: SearchParams }) {
  const db = qOf((await searchParams).db);
  const worldwide = !db;
  const { live, demo } = await loadDomainLive(searchParams);
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: live?.domain ?? domain, scope: true }} footer={false}>
      <DomainHeader tab="overview" db={db ? db.toUpperCase() : "Worldwide"} live={live} demo={demo} />
      <div className="px-8 pt-[15.5px]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4">
          <AiSearchCard demo={!!live} />
          <SeoCard worldwide={worldwide} live={live} />
        </div>
        <TrendsWidget worldwide={worldwide} live={live} />
        <MarketTrends demo={!!live} />
        <OrganicResearch live={live} />
        <AdvertisingResearch />
        <BacklinksSection live={live?.backlinks} demo={!!live} />
      </div>
      <AnalyticsFooter gap={136} bottom={44} />
    </AppShell>
  );
}
