import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";

export function PrShell({ children }: { children: ReactNode }) {
  return (
    <AppShell section="aipr" search={{ kind: "none" }} help="chat-dark">
      {children}
    </AppShell>
  );
}
