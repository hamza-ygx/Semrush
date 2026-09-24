import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/keywords/common";
import { OnPageSeoChecker } from "@/features/seoextras/OnPageSeoChecker";

export default function OnPageSeoCheckerPage() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <OnPageSeoChecker />
      <CenteredFooter className="pt-[232px] pb-[37px]" />
    </AppShell>
  );
}
