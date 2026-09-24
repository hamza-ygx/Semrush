import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter, WidePage } from "@/features/keywords/common";
import { KmtStart } from "@/features/keywords/kmt/Start";

export default function KeywordMagicStartPage() {
  return (
    <WidePage>
      <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
        <KmtStart />
        <CenteredFooter />
      </AppShell>
    </WidePage>
  );
}
