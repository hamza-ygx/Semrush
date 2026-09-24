import { GapShell } from "@/features/gaps/common";
import { CompareDomainsLanding } from "@/features/gaps/CompareDomainsLanding";
import { CompareDomainsReport } from "@/features/gaps/CompareDomainsReport";

export default async function CompareDomainsPage({ searchParams }: { searchParams: Promise<{ compareWith?: string }> }) {
  const { compareWith } = await searchParams;
  return (
    <GapShell search={{ kind: "analyze", value: "rkjh.se", scope: true }}>
      {compareWith ? <CompareDomainsReport competitors={compareWith.split(",").map((d) => d.split(":")[0])} /> : <CompareDomainsLanding />}
    </GapShell>
  );
}
