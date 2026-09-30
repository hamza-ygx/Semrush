"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { HeaderLink, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { useOutsideClose } from "@/components/ui/Popover";
import { Info } from "@/components/ui/primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { domain } from "./data";
import type { HeadLive } from "./live";
import { MegaphoneIcon } from "./ui";

const bt = routes.backlinksToolkit;

type BacklinksTab = "overview" | "backlinks" | "networkGraph" | "anchors" | "pages" | "outboundDomains" | "bulkAnalysis" | "competitors" | "refIps";

const fixed: { key: BacklinksTab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "backlinks", label: "Backlinks" },
  { key: "networkGraph", label: "Network Graph" },
  { key: "anchors", label: "Anchors" },
  { key: "pages", label: "Indexed Pages" },
  { key: "outboundDomains", label: "Outbound Domains" },
];

const extra: { key: BacklinksTab; label: string }[] = [
  { key: "bulkAnalysis", label: "Bulk Analysis" },
  { key: "competitors", label: "Competitors" },
  { key: "refIps", label: "Referring IPs" },
];

export const tabHref = (k: BacklinksTab) => `${bt[k]}?q=${domain}&searchType=domain`;

const dayParam = (iso: string) => iso.split("-").map(Number).join("-");

const newHref = (day = "2026-9-25") => `${tabHref("backlinks")}&ba_mt=new&ba_date=${encodeURIComponent(`["${day}","${day}"]`)}&sort_field=firsttime&sort_type=desc`;

const liveHref = newHref();

function MoreMenu({ items }: { items: { key: BacklinksTab; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative mb-[12px] self-end">
      <button type="button" aria-label="More reports" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-5 w-6 items-center justify-center text-rk-text">
        <svg viewBox="0 0 18 18" width={18} height={18}>
          <circle cx="3.5" cy="9" r="1.7" fill="currentColor" />
          <circle cx="9" cy="9" r="1.7" fill="currentColor" />
          <circle cx="14.5" cy="9" r="1.7" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[26px] left-[4px] z-50 w-[101px] rounded-md bg-white py-[4px] shadow-popover">
          {items.map((t) => (
            <Link key={t.key} href={tabHref(t.key)} onClick={() => setOpen(false)} className="block px-[8px] py-[6px] text-[14px] leading-5 whitespace-nowrap text-rk-text hover:bg-rk-bg">
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function LiveInfo() {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative ml-1 inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span data-testid="live-update-info" className="inline-flex">
        <Info />
      </span>
      {open && (
        <span className="absolute top-[18px] left-1/2 z-50 -ml-[117px] block w-[226px] pt-[10px]">
          <span className="block rounded-md bg-white px-3 pt-[10px] pb-[12px] text-[14px] leading-5 text-rk-text shadow-popover">
            {brand.name} is the fastest tool to find new links. New data appears in the tool within just 15 minutes of being found.
            <a href="#" onClick={(e) => e.preventDefault()} className="mt-[-1px] block text-rk-link hover:text-rk-link-hover">
              Learn more
            </a>
          </span>
        </span>
      )}
    </span>
  );
}

function BacklinkTabs({ active }: { active: BacklinksTab }) {
  const last = extra.find((t) => t.key === active) ?? extra[0];
  const tabs = [...fixed, last];
  return (
    <div className="-mx-8 flex items-end gap-[25px] border-b-2 border-[#c4c5cb] px-8">
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Link key={t.key} href={tabHref(t.key)} className={`relative -mb-[2px] pb-[10px] text-[16px] leading-6 whitespace-nowrap text-rk-text ${on ? "" : "hover:text-rk-link"}`}>
            {t.label}
            {on && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
          </Link>
        );
      })}
      <div className="-ml-[5px] flex">
        <MoreMenu items={extra.filter((t) => t.key !== last.key)} />
      </div>
    </div>
  );
}

export function BacklinksPage({
  tab,
  children,
  bodyClassName = "px-8 pt-4",
  head = null,
  demo = false,
  name,
}: {
  tab: BacklinksTab;
  children: ReactNode;
  bodyClassName?: string;
  head?: HeadLive | null;
  demo?: boolean;
  name?: string;
}) {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: name ?? domain, scope: true }} footer={false}>
      <PageHeader
        crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Backlink Analytics" }]}
        links={
          <div className="flex items-center gap-5">
            <HeaderLink icon={<MegaphoneIcon />}>Link building ideas</HeaderLink>
            <UserManual />
            <SendFeedback />
          </div>
        }
        title={<ReportTitle label="Backlinks" name={name} demo={demo} />}
        actions={<ExportPdf />}
        meta={
          <>
            <span className="flex items-center gap-1">
              Live Update:
              <Link href={head ? newHref(dayParam(head.day)) : liveHref} data-testid="live-update-link" className="text-rk-link hover:text-rk-link-hover">
                {head ? `${head.today} backlink${head.today === 1 ? "" : "s"}` : "2 backlinks"}
              </Link>
              found today
              <LiveInfo />
            </span>
            <span>Category: Accounting &amp; Auditing</span>
          </>
        }
        tabs={<BacklinkTabs active={tab} />}
        border={false}
      />
      <div className={bodyClassName}>{children}</div>
      <AnalyticsFooter gap={234} />
    </AppShell>
  );
}
