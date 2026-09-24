import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { TrackingHeader } from "./TrackingHeader";
import { TrackingFooter } from "./TrackingFooter";
import { TrackingProvider } from "./context";
import type { TrackingTab } from "./data";

export function TrackingPage({ tab, begin, fresh, children }: { tab: TrackingTab; begin?: string; fresh?: boolean; children: ReactNode }) {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <TrackingProvider begin={begin} fresh={fresh}>
        <TrackingHeader tab={tab} />
        {children}
      </TrackingProvider>
      <TrackingFooter />
    </AppShell>
  );
}
