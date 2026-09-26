import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { TrackingHeader } from "./TrackingHeader";
import { TrackingFooter } from "./TrackingFooter";
import { TrackingProvider, type Snap } from "./context";
import type { TrackingTab } from "./data";

export function TrackingPage({ tab, children, ...snap }: Snap & { tab: TrackingTab; children: ReactNode }) {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TrackingProvider {...snap}>
        <TrackingHeader tab={tab} />
        {children}
      </TrackingProvider>
      <TrackingFooter />
    </AppShell>
  );
}
