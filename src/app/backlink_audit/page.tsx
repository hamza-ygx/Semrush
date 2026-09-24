import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { BacklinkAudit } from "@/features/seoextras/BacklinkAudit";

export default function BacklinkAuditPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <BacklinkAudit />
      <CenteredFooter />
    </AppShell>
  );
}
