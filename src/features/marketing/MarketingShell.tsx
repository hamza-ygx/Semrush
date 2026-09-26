import type { ReactNode } from "react";
import { HelpButtonAndPanel } from "@/components/shell/HelpPanel";
import { SiteHeader } from "./SiteHeader";
import { WideFooter } from "./WideFooter";

export function MarketingShell({ children, help, header = "app" }: { children: ReactNode; help?: boolean; header?: "app" | "blog" | "none" }) {
  return (
    <div className="flex min-h-screen min-w-[1100px] flex-col bg-white text-[#171a17]">
      <style>{`html,body{background:#fff}`}</style>
      {header !== "none" && <SiteHeader variant={header} />}
      <main className="flex-1">{children}</main>
      <WideFooter />
      {help && <HelpButtonAndPanel variant="chat" />}
    </div>
  );
}
