import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { RankPage } from "@/features/seoextras/rank/RankPage";

export default function RankRoutePage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <RankPage tab="rank" />
      <CenteredFooter />
    </AppShell>
  );
}
