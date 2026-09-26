import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { OrganicLiveProvider } from "./context";
import type { OrganicLive } from "./live";
import { OrganicHeader, type OrganicTab } from "./OrganicHeader";
import { SimpleFooter } from "./ui";

export function OrganicPage({
  tab,
  children,
  manual,
  pdf,
  date,
  currency,
  prev,
  live = null,
  demo = false,
}: {
  tab: OrganicTab;
  children: ReactNode;
  manual?: boolean;
  pdf?: boolean;
  date?: boolean;
  currency?: boolean;
  prev?: boolean;
  live?: OrganicLive | null;
  demo?: boolean;
}) {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: live?.domain ?? "rkjh.se", scope: true }} footer={false}>
      <OrganicLiveProvider live={live} demo={demo}>
        <div className="flex min-h-[calc(100vh-52px)] flex-col">
          <OrganicHeader tab={tab} manual={manual} pdf={pdf} date={date} currency={currency} prev={prev} />
          {children}
          <div className="mt-auto">
            <SimpleFooter />
          </div>
        </div>
      </OrganicLiveProvider>
    </AppShell>
  );
}
