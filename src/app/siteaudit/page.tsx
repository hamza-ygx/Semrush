import { AppShell } from "@/components/shell/AppShell";
import { PageHeader } from "@/components/shell/PageHeader";
import { routes } from "@/config/routes";
import { DemoTag } from "@/features/tracking/ui";
import { loadSiteAudit } from "@/features/siteaudit/load";
import { ProjectsList } from "@/features/siteaudit/part1/ProjectsList";

export const dynamic = "force-dynamic";

export default async function SiteAuditProjects() {
  const { live, demo, projectId } = await loadSiteAudit();
  return (
    <AppShell section="seo">
      <PageHeader
        crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Site Audit" }]}
        title={
          <>
            Site Audit
            {demo && <DemoTag className="!ml-0" />}
          </>
        }
        border={false}
        className="[&>div:nth-child(2)]:mt-[6px]"
      />
      <div className="-mt-[2px] px-8">
        <ProjectsList live={live?.project} projectId={projectId} />
      </div>
    </AppShell>
  );
}
