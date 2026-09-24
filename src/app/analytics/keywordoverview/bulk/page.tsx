import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter, WidePage } from "@/features/keywords/common";
import { KoBulk } from "@/features/keywords/KoBulk";
import { koKeyword } from "@/features/keywords/data";

export default async function KeywordOverviewBulkPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim() || koKeyword;
  return (
    <WidePage>
      <AppShell section="seo" search={{ kind: "analyze", value: q }} footer={false}>
        <KoBulk q={q} />
        <CenteredFooter className="pt-[152px] pb-[25px]" />
      </AppShell>
    </WidePage>
  );
}
