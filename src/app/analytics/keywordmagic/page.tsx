import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter, WidePage } from "@/features/keywords/common";
import { KeywordMagic } from "@/features/keywords/KeywordMagic";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function KeywordMagicPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q)?.trim() || "redovisning";
  const mode = one(sp.mode) === "1" ? "groups" : "topics";
  const type = one(sp.questions) === "true" ? "questions" : "all";
  return (
    <WidePage>
      <AppShell section="seo" search={{ kind: "analyze", value: q }} footer={false}>
        <KeywordMagic key={`${q}-${mode}-${type}`} q={q} initialMode={mode} initialType={type} />
        <CenteredFooter />
      </AppShell>
    </WidePage>
  );
}
