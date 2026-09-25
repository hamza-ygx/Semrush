import { AppShell } from "@/components/shell/AppShell";
import { LandingFooter } from "@/features/ai/landing";
import { OverviewLanding } from "@/features/ai/OverviewLanding";
import { VisibilityOverview } from "@/features/ai/VisibilityOverview";

export default async function AiOverviewPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = Array.isArray(raw) ? raw[0] : raw;
  if (q)
    return (
      <AppShell section="ai" search={{ kind: "analyze", value: q, scope: true }} footer={false}>
        <VisibilityOverview domain={q} />
        <LandingFooter gap={34} />
      </AppShell>
    );
  return (
    <AppShell section="ai" footer={false}>
      <OverviewLanding />
    </AppShell>
  );
}
