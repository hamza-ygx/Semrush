import { AppShell } from "@/components/shell/AppShell";
import { SocialDashboard } from "@/features/social/SocialDashboard";

export default function Page() {
  return (
    <AppShell section="social" search={{ kind: "none" }} enterprise={false} help="question">
      <SocialDashboard />
    </AppShell>
  );
}
