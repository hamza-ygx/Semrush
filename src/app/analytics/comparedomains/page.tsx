import { GapShell } from "@/features/gaps/common";
import { CompareDomainsLanding } from "@/features/gaps/CompareDomainsLanding";
import { CompareDomainsReport } from "@/features/gaps/CompareDomainsReport";
import { loadCompareDomains } from "@/features/gaps/load";

export default async function CompareDomainsPage({ searchParams }: { searchParams: Promise<{ q?: string; compareWith?: string }> }) {
  const { q, compareWith } = await searchParams;
  const competitors = compareWith ? compareWith.split(",").map((d) => d.split(":")[0]) : [];
  const { live, demo } = compareWith ? await loadCompareDomains(q?.split(",")[0] || "rkjh.se", competitors) : { live: null, demo: false };
  return (
    <GapShell search={compareWith || q ? { kind: "analyze", value: q?.split(",")[0] || "rkjh.se", scope: true } : { kind: "goto" }}>
      {compareWith ? <CompareDomainsReport competitors={competitors} live={live} demo={demo} /> : <CompareDomainsLanding q={q} />}
    </GapShell>
  );
}
