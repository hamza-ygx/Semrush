import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { SensorDeviations } from "@/features/seoextras/sensor/SensorTabs";

export default function SensorTabPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <SensorDeviations />
      <CenteredFooter />
    </AppShell>
  );
}
