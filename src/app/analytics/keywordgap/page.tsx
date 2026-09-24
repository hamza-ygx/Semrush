import { GapShell } from "@/features/gaps/common";
import { KeywordGapLanding } from "@/features/gaps/KeywordGapLanding";
import { KeywordGapReport } from "@/features/gaps/KeywordGapReport";

export default async function KeywordGapPage({ searchParams }: { searchParams: Promise<{ q?: string; compareWith?: string }> }) {
  const { q, compareWith } = await searchParams;
  return (
    <GapShell search={{ kind: "goto" }}>
      {compareWith ? (
        <KeywordGapReport q={q || "rkjh.se"} competitors={compareWith.split(",").map((d) => d.split(":")[0])} />
      ) : (
        <KeywordGapLanding />
      )}
    </GapShell>
  );
}
