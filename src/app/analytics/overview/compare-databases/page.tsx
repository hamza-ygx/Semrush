import { AppShell } from "@/components/shell/AppShell";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { DomainHeader } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";
import { CompareCountries } from "@/features/domain/growth/CompareCountries";

export default function CompareByCountriesPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <DomainHeader tab="countries" />
      <div className="px-8 pt-[17px]">
        <CompareCountries />
      </div>
      <AnalyticsFooter />
    </AppShell>
  );
}
