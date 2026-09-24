import { routes } from "@/config/routes";
import { HelpCenter, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { DesktopIcon, WarningIcon } from "@/components/ui/icons";
import { Tabs } from "@/components/ui/primitives";
import { ProjectSwitcher, SiteAuditActions } from "./HeaderActions";

const c = routes.siteAuditCampaign;

export type SiteAuditTab = "overview" | "issues" | "pages" | "statistics" | "compare" | "progress" | "js";

const tabs = [
  { key: "overview", label: "Overview", href: c.overview },
  { key: "issues", label: "Issues", href: c.issues },
  { key: "pages", label: "Crawled Pages", href: c.crawledPages },
  { key: "statistics", label: "Statistics", href: c.statisticsTile },
  { key: "compare", label: "Compare Crawls", href: c.compare },
  { key: "progress", label: "Progress", href: c.progress },
  { key: "js", label: "JS Impact", href: c.jsImpact },
];

const LookerIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="9.5" r="4" fill="none" stroke="#4285f4" strokeWidth={1.8} />
    <circle cx="5" cy="3.5" r="1.8" fill="#fbbc04" />
  </svg>
);

export function SiteAuditHeader({ tab, looker = true, pdf = true, exportBtn = true }: { tab: SiteAuditTab; looker?: boolean; pdf?: boolean; exportBtn?: boolean }) {
  return (
    <PageHeader
      crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Site Audit" }]}
      className="[&>div:nth-child(2)]:mt-[8px] [&>div:nth-child(3)]:mt-[8px] [&>div:last-child]:mt-[33px] xl:[&>div:last-child]:mt-[32px]"
      links={
        <>
          <HelpCenter />
          <SendFeedback />
        </>
      }
      title={
        <>
          Site Audit:
          <ProjectSwitcher />
        </>
      }
      actions={<SiteAuditActions looker={looker} pdf={pdf} exportBtn={exportBtn} lookerIcon={<LookerIcon />} />}
      meta={
        <>
          <span>www.rkjh.se</span>
          <span>Updated: Wed, Jul 22, 2026</span>
          <span className="flex items-center gap-1">
            <DesktopIcon />
            Desktop
          </span>
          <span>JS rendering: Disabled</span>
          <span className="flex items-center gap-1">
            Pages crawled: <WarningIcon /> 100/100
          </span>
        </>
      }
      tabs={<Tabs tabs={tabs} active={tab} />}
    />
  );
}
