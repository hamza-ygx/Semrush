import { AppShell } from "@/components/shell/AppShell";
import { OverviewLanding } from "@/features/ai/OverviewLanding";
import { VisibilityOverview } from "@/features/ai/VisibilityOverview";

export default async function AiOverviewPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  if (q)
    return (
      <AppShell section="ai" search={{ kind: "analyze", value: q, scope: true }}>
        <VisibilityOverview domain={q} />
      </AppShell>
    );
  return (
    <AppShell section="ai" footer={false}>
      <OverviewLanding />
    </AppShell>
  );
}
