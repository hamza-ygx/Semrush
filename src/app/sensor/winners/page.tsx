import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { SensorWinners } from "@/features/seoextras/sensor/SensorTabs";

export default function SensorTabPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <SensorWinners />
      <CenteredFooter />
    </AppShell>
  );
}
