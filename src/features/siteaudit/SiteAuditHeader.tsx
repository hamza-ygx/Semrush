import { routes } from "@/config/routes";
import { HelpCenter, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { DesktopIcon, WarningIcon } from "@/components/ui/icons";
import { Tabs } from "@/components/ui/primitives";
import { DemoTag } from "@/features/tracking/ui";
import { ProjectSwitcher, SiteAuditActions } from "./HeaderActions";
import type { SiteAuditHead } from "./load";

const c = routes.siteAuditCampaign;

type SiteAuditTab = "overview" | "issues" | "pages" | "statistics" | "compare" | "progress" | "js";

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

export function SiteAuditHeader({
  tab,
  looker = true,
  pdf = true,
  exportBtn = true,
  exportReport,
  head = {},
}: {
  tab: SiteAuditTab;
  looker?: boolean;
  pdf?: boolean;
  exportBtn?: boolean;
  exportReport?: string;
  head?: SiteAuditHead;
}) {
  const { live, demo, projectId } = head;
  const full = live ? live.limit != null && live.pages >= live.limit : true;
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
          <ProjectSwitcher domain={live?.domain} />
          {demo && <DemoTag className="!ml-0" />}
        </>
      }
      actions={<SiteAuditActions looker={looker} pdf={pdf} exportBtn={exportBtn} exportReport={exportReport} lookerIcon={<LookerIcon />} projectId={projectId} domain={live?.domain} />}
      meta={
        <>
          <span>{live?.domain ?? "www.rkjh.se"}</span>
          <span>Updated: {live?.updated ?? "Wed, Jul 22, 2026"}</span>
          <span className="flex items-center gap-1">
            <DesktopIcon />
            Desktop
          </span>
          <span>JS rendering: Disabled</span>
          <span className="flex items-center gap-1">
            Pages crawled: {full && <WarningIcon />} {live ? `${live.pages}/${live.limit ?? live.pages}` : "100/100"}
          </span>
        </>
      }
      tabs={<Tabs tabs={tabs} active={tab} className="max-xl:[&>a]:pb-[8px]" />}
    />
  );
}
