import { AppShell } from "@/components/shell/AppShell";
import { FeedbackIcon } from "@/components/icons";
import { routes } from "@/config/routes";
import { DomainsMonitoring } from "./DomainsMonitoring";
import { FoldersPanel } from "./FoldersPanel";
import { ToolCards } from "./ToolCards";

export function HomePage() {
  return (
    <AppShell
      section="home"
      search={{
        kind: "analyze",
        value: "",
        placeholder: "Enter website or keyword",
        inputClassName: "w-[342px] xl:w-[480px] xl:text-[14px]",
        action: routes.domainOverview,
      }}
      footerPb={37}
    >
      <div className="px-8 pb-[98px] xl:pb-0">
        <ToolCards />
        <FoldersPanel />
        <DomainsMonitoring />
        <button
          type="button"
          className="mt-[22px] inline-flex items-center gap-[6px] text-[14px] leading-5 text-rk-text-2 hover:text-rk-text"
        >
          <FeedbackIcon />
          <span className="underline decoration-dashed decoration-1 underline-offset-[5px]">Send feedback</span>
        </button>
      </div>
    </AppShell>
  );
}
