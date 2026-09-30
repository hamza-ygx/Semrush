import { GapShell } from "@/features/gaps/common";
import { KeywordGapLanding } from "@/features/gaps/KeywordGapLanding";
import { KeywordGapReport } from "@/features/gaps/KeywordGapReport";
import { loadKeywordGap } from "@/features/gaps/load";

export default async function KeywordGapPage({ searchParams }: { searchParams: Promise<{ q?: string; compareWith?: string }> }) {
  const { q, compareWith } = await searchParams;
  const you = q || "rkjh.se";
  const competitors = compareWith ? compareWith.split(",").map((d) => d.split(":")[0]) : [];
  const { live, demo } = compareWith ? await loadKeywordGap(you, competitors) : { live: null, demo: false };
  return (
    <GapShell search={{ kind: "goto" }}>
      {compareWith ? (
        <KeywordGapReport q={you} competitors={competitors} live={live} demo={demo} />
      ) : (
        <KeywordGapLanding />
      )}
    </GapShell>
  );
}
