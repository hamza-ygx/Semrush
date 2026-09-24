import { AppShell } from "@/components/shell/AppShell";
import { PageHeader } from "@/components/shell/PageHeader";

export default function SeoDashboard() {
  return (
    <AppShell section="seo">
      <PageHeader crumbs={[{ label: "Home", href: "/" }, { label: "SEO" }]} title="SEO Dashboard: www.rkjh.se" />
      <div className="h-[600px]" />
    </AppShell>
  );
}
