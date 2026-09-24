import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { HeaderLink, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { Info } from "@/components/ui/primitives";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { BacklinkTabs, BacklinksOverviewBody } from "@/features/domain/BacklinksOverview";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { domain } from "@/features/domain/data";

const MegaphoneIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M2.5 6.5v3h2l5 3.5v-10l-5 3.5zM4.5 9.5l1 4h2l-1-3.5M12 6a2.5 2.5 0 0 1 0 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export default function BacklinksOverviewPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <PageHeader
        crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Backlink Analytics" }]}
        links={
          <div className="flex items-center gap-5">
            <HeaderLink icon={<MegaphoneIcon />}>Link building ideas</HeaderLink>
            <UserManual />
            <SendFeedback />
          </div>
        }
        title={<ReportTitle label="Backlinks" />}
        actions={<ExportPdf />}
        meta={
          <>
            <span className="flex items-center gap-1">
              Live Update:
              <Link href={routes.backlinks} className="text-rk-link hover:text-rk-link-hover">
                3 backlinks
              </Link>
              found today
              <Info className="ml-1" />
            </span>
            <span>Category: Accounting &amp; Auditing</span>
          </>
        }
        tabs={<BacklinkTabs />}
        border={false}
      />
      <div className="px-8 pt-4">
        <BacklinksOverviewBody />
      </div>
      <AnalyticsFooter />
    </AppShell>
  );
}
