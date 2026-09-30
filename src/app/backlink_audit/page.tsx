import { AppShell } from "@/components/shell/AppShell";
import { backendEnabled } from "@/lib/auth/config";
import { CenteredFooter } from "@/features/keywords/common";
import { BacklinkAudit } from "@/features/seoextras/BacklinkAudit";

export default function BacklinkAuditPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <BacklinkAudit demo={backendEnabled} />
      <CenteredFooter />
    </AppShell>
  );
}
