import { GapShell } from "@/features/gaps/common";
import { CompareDomainsLanding } from "@/features/gaps/CompareDomainsLanding";
import { CompareDomainsReport } from "@/features/gaps/CompareDomainsReport";

export default async function CompareDomainsPage({ searchParams }: { searchParams: Promise<{ q?: string; compareWith?: string }> }) {
  const { q, compareWith } = await searchParams;
  return (
    <GapShell search={compareWith || q ? { kind: "analyze", value: q?.split(",")[0] || "rkjh.se", scope: true } : { kind: "goto" }}>
      {compareWith ? <CompareDomainsReport competitors={compareWith.split(",").map((d) => d.split(":")[0])} /> : <CompareDomainsLanding q={q} />}
    </GapShell>
  );
}
