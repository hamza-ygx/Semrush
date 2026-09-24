import { AppShell } from "@/components/shell/AppShell";
import { InfluencerAnalytics } from "@/features/social/Influencer";

export default function Page() {
  return (
    <AppShell section="social" search={{ kind: "none" }} help="none">
      <InfluencerAnalytics />
    </AppShell>
  );
}
