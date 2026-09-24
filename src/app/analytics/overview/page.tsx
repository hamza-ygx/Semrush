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

export default function DomainOverviewPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <DomainHeader tab="overview" />
      <div className="px-8 pt-[15.5px]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4">
          <AiSearchCard />
          <SeoCard />
        </div>
        <TrendsWidget />
        <MarketTrends />
        <OrganicResearch />
        <AdvertisingResearch />
        <BacklinksSection />
      </div>
      <AnalyticsFooter gap={136} bottom={44} />
    </AppShell>
  );
}
