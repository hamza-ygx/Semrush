import { AppShell } from "@/components/shell/AppShell";
import { MonitoringLanding } from "@/features/social/MonitoringLanding";

export default function Page() {
  return (
    <AppShell section="social" search={{ kind: "goto" }}>
      <MonitoringLanding />
    </AppShell>
  );
}
