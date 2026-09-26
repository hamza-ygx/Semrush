import { AppShell } from "@/components/shell/AppShell";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { DomainHeader } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";
import { CompareCountries } from "@/features/domain/growth/CompareCountries";

export default function CompareByCountriesPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <div className="flex min-h-[calc(100vh-52px)] flex-col">
        <DomainHeader tab="countries" />
        <div className="px-8 pt-[15.5px]">
          <CompareCountries />
        </div>
        <AnalyticsFooter />
      </div>
    </AppShell>
  );
}
