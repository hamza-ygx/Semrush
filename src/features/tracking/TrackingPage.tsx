import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { TrackingHeader } from "./TrackingHeader";
import { TrackingFooter } from "./TrackingFooter";
import type { TrackingTab } from "./data";

export function TrackingPage({ tab, children }: { tab: TrackingTab; children: ReactNode }) {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TrackingHeader tab={tab} />
      {children}
      <TrackingFooter />
    </AppShell>
  );
}
