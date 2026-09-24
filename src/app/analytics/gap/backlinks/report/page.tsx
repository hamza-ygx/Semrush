import { GapShell } from "@/features/gaps/common";
import { BacklinkGap } from "@/features/gaps/BacklinkGap";

export default async function BacklinkGapPage({ searchParams }: { searchParams: Promise<{ q?: string; compareWith?: string; ba_ct?: string }> }) {
  const { q, compareWith, ba_ct } = await searchParams;
  const competitors = (compareWith || "jbekonomi.com").split(",").map((d) => d.split(":")[0]);
  return (
    <GapShell search={{ kind: "goto" }}>
      <BacklinkGap q={q || "rkjh.se"} competitors={competitors} chartsOpen={ba_ct === "1"} />
    </GapShell>
  );
}
