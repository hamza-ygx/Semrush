import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import { HeaderLink, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { ExportPdf } from "./ExportPdf";
import { ManualIcon } from "@/features/tracking/icons";
import { Tabs } from "@/components/ui/primitives";
import { databases, domain, moreDatabases, worldwideDate } from "./data";
import { CurrencySelect, DateSelect, DeviceSelect } from "./HeaderSelects";
import { DatabaseSelector, ExtLink } from "./ui";
import { DemoTag } from "@/features/organic/ui";
import type { DomainLive } from "./live";

type DomainTab = "overview" | "growth" | "countries";

const tabs = [
  { key: "overview", label: "Overview", href: routes.domainOverview },
  { key: "growth", label: "Growth report", href: routes.domainGrowthReport },
  { key: "countries", label: "Compare by countries", href: routes.domainCompareCountries },
];

export const UserManual = () => (
  <HeaderLink href={routes.kb} icon={<ManualIcon />}>
    User manual
  </HeaderLink>
);

export { ExportPdf };

export function ReportTitle({ label, name = domain, demo = false }: { label: string; name?: string; demo?: boolean }) {
  return (
    <>
      {label}:
      <span className="-ml-[2px] flex items-center gap-[3px] text-rk-muted">
        {name}
        <ExtLink href={`https://${name}`} className="text-[#a9abaa]" />
      </span>
      {demo && <DemoTag className="!ml-[2px]" />}
    </>
  );
}

export function DomainHeader({ tab, crumbs, db, children, live = null, demo = false }: { tab?: DomainTab; crumbs?: { label: string; href?: string }[]; db?: string; children?: ReactNode; live?: DomainLive | null; demo?: boolean }) {
  return (
    <PageHeader
      crumbs={crumbs ?? [{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Domain Overview" }]}
      links={
        <>
          <span className="-mr-[4px]">
            <UserManual />
          </span>
          <SendFeedback />
        </>
      }
      title={<ReportTitle label="Domain Overview" name={live?.domain} demo={demo} />}
      actions={tab === "overview" ? <ExportPdf /> : undefined}
      tabs={tab ? <Tabs tabs={tabs} active={tab} className="-mb-px !gap-[17px]" /> : undefined}
    >
      <div className="mt-[7px] flex items-center">
        <DatabaseSelector key={db ?? "SE"} items={databases} initial={db ?? "SE"} more={moreDatabases} param={db ? "db" : undefined} />
        <div className="ml-[25px] flex items-center gap-[23px]">
          <DeviceSelect />
          <DateSelect key={db === "Worldwide" ? "ww" : "db"} current={live ? live.date : db === "Worldwide" ? worldwideDate : undefined} history={live?.history} />
          <CurrencySelect />
        </div>
      </div>
      {children}
    </PageHeader>
  );
}
