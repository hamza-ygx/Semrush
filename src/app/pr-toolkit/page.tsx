import { PrDashboard } from "@/features/aipr/Dashboard";
import { PrShell } from "@/features/aipr/PrShell";

export default async function Page({ searchParams }: { searchParams: Promise<{ domain?: string }> }) {
  const { domain } = await searchParams;
  return (
    <PrShell>
      <PrDashboard domain={domain} />
    </PrShell>
  );
}
