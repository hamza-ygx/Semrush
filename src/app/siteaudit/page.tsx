import { AppShell } from "@/components/shell/AppShell";
import { PageHeader } from "@/components/shell/PageHeader";
import { routes } from "@/config/routes";
import { ProjectsList } from "@/features/siteaudit/part1/ProjectsList";

export default function SiteAuditProjects() {
  return (
    <AppShell section="seo">
      <PageHeader crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Site Audit" }]} title="Site Audit" border={false} className="[&>div:nth-child(2)]:mt-[6px]" />
      <div className="-mt-[5px] px-8">
        <ProjectsList />
      </div>
    </AppShell>
  );
}
