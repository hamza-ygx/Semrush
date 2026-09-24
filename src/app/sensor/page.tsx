import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { SensorOverview } from "@/features/seoextras/sensor/SensorOverview";

export default function SensorPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <SensorOverview />
      <CenteredFooter />
    </AppShell>
  );
}
