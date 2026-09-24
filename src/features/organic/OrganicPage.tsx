import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { OrganicHeader, type OrganicTab } from "./OrganicHeader";
import { SimpleFooter } from "./ui";

export function OrganicPage({
  tab,
  children,
  manual,
  pdf,
  date,
  currency,
}: {
  tab: OrganicTab;
  children: ReactNode;
  manual?: boolean;
  pdf?: boolean;
  date?: boolean;
  currency?: boolean;
}) {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: "rkjh.se", scope: true }} footer={false}>
      <div className="flex min-h-[calc(100vh-52px)] flex-col">
        <OrganicHeader tab={tab} manual={manual} pdf={pdf} date={date} currency={currency} />
        {children}
        <div className="mt-auto">
          <SimpleFooter />
        </div>
      </div>
    </AppShell>
  );
}
