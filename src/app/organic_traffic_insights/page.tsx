import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { OrganicTrafficInsights } from "@/features/seoextras/OrganicTrafficInsights";

export default function OrganicTrafficInsightsPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <OrganicTrafficInsights />
      <CenteredFooter />
    </AppShell>
  );
}
