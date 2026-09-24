import { AppShell } from "@/components/shell/AppShell";
import { Dashboard } from "@/features/dashboard/Dashboard";

export default function SeoDashboard() {
  return (
    <AppShell section="seo">
      <Dashboard />
    </AppShell>
  );
}
