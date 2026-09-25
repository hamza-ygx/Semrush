import { PrDashboard } from "@/features/aipr/Dashboard";
import { PrShell } from "@/features/aipr/PrShell";

export default async function Page({ searchParams }: { searchParams: Promise<{ domain?: string | string[] }> }) {
  const raw = (await searchParams).domain;
  const domain = Array.isArray(raw) ? raw[0] : raw;
  return (
    <PrShell>
      <PrDashboard domain={domain} />
    </PrShell>
  );
}
