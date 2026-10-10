import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter, WidePage } from "@/features/keywords/common";
import { KeywordMagic } from "@/features/keywords/KeywordMagic";
import { kmtDataset } from "@/features/keywords/kmt/dataset";
import { kmtKeywords, pickMetrics } from "@/features/keywords/live";
import { loadKwMetrics } from "@/features/keywords/load";
import { backendEnabled } from "@/lib/auth/config";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function KeywordMagicPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q)?.trim() || "redovisning";
  const mode = one(sp.mode) === "1" ? "groups" : "topics";
  const type = one(sp.questions) === "true" ? "questions" : "all";
  const all = await loadKwMetrics();
  const keywords = kmtKeywords(kmtDataset(q));
  const metrics = all ? pickMetrics(all, keywords) : null;
  const real = !!metrics && Object.keys(metrics).length > 0;
  const full = real && Object.keys(metrics).length >= keywords.length;
  return (
    <WidePage>
      <AppShell section="seo" search={{ kind: "analyze", value: q }} footer={false}>
        <KeywordMagic key={`${q}-${mode}-${type}`} q={q} initialMode={mode} initialType={type} metrics={real ? metrics : null} demo={!!backendEnabled && !full} />
        <CenteredFooter />
      </AppShell>
    </WidePage>
  );
}
