import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter, WidePage } from "@/features/keywords/common";
import { KoLanding } from "@/features/keywords/KoLanding";
import { KoReport } from "@/features/keywords/KoReport";
import { koSummary } from "@/features/keywords/data";
import { buildKoLive } from "@/features/keywords/live";
import { loadKwMetrics } from "@/features/keywords/load";
import { backendEnabled } from "@/lib/auth/config";

export default async function KeywordOverviewPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  if (!q)
    return (
      <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
        <KoLanding />
        <CenteredFooter className="pt-[152px] pb-[25px]" />
      </AppShell>
    );
  const metrics = await loadKwMetrics();
  const live = buildKoLive(q, metrics, koSummary);
  return (
    <WidePage>
      <AppShell section="seo" search={{ kind: "analyze", value: q }} footer={false}>
        <KoReport q={q} live={live} demo={!!backendEnabled && !live} />
        <CenteredFooter className="pt-[152px] pb-[25px]" />
      </AppShell>
    </WidePage>
  );
}
