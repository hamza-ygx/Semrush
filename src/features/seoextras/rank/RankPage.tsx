"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { Breadcrumbs } from "@/components/ui/primitives";
import { LinkSelect } from "@/components/ui/Popover";
import { BookIcon, ChevronsLeft, DesktopIcon, ExportIcon, FlagSE, FlagUK, FlagUS, MobileIcon } from "@/components/ui/icons";
import { ExtIcon } from "@/features/organic/ui";
import { NoHelpButton } from "../landing";
import { rankRows, wlRows, type WlCell } from "../data";

type RankTab = "rank" | "winners";

const flags: Record<string, ReactNode> = {
  Sweden: <FlagSE width={16} height={12} />,
  "United States": <FlagUS width={16} height={12} />,
  "United Kingdom": <FlagUK width={16} height={12} />,
};

const q = "?db=se";

function RankHeader({ tab }: { tab: RankTab }) {
  const tabs = [
    { key: "rank", label: "Rank", href: routes.rank + q },
    { key: "winners", label: "Winners & Losers", href: routes.rankWinnersLosers + q },
  ];
  return (
    <div className="border-b border-rk-border px-8 pt-4">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: "Home", href: routes.home },
            { label: "SEO", href: routes.seoDashboard },
            { label: "Domain Overview", href: `${routes.domainOverview}?q=rkjh.se&db=se&searchType=domain` },
            { label: `${brand.name} Rank` },
          ]}
        />
        <div className="flex items-center gap-[19px]">
          <HeaderLink icon={<BookIcon />}>User manual</HeaderLink>
          <SendFeedback />
        </div>
      </div>
      <h1 className="mt-[8px] text-[20px] leading-7 font-semibold text-rk-text">{brand.name} Rank</h1>
      <div className="mt-[8px] flex items-center gap-[23px] text-[14px] leading-5 text-rk-text-2">
        <span className="flex items-center gap-1">
          Database:
          <LinkSelect value="Sweden" options={["Sweden", "United States", "United Kingdom"] as const} renderOption={(v) => <span className="flex items-center gap-[5px]">{flags[v]}{v}</span>} />
        </span>
        <span className="flex items-center gap-1">
          Device:
          <LinkSelect
            value="Desktop"
            options={["Desktop", "Mobile"] as const}
            renderOption={(v) => (
              <span className="flex items-center gap-1">
                {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
                {v}
              </span>
            )}
          />
        </span>
        <span className="flex items-center gap-1">
          Date:
          <LinkSelect value="Sep 23, 2026" options={["Sep 23, 2026", "Sep 15, 2026", "Aug 15, 2026", "Jul 15, 2026", "Jun 15, 2026"] as const} />
        </span>
        <span className="flex items-center gap-1">
          Currency:
          <LinkSelect value="USD" options={["USD", "EUR", "SEK", "GBP"] as const} panelClassName="min-w-[100px]" />
        </span>
      </div>
      <nav className="mt-[31px] flex gap-4">
        {tabs.map((t) => (
          <Link key={t.key} href={t.href} className="relative pb-[9px] text-[16px] leading-6 whitespace-nowrap text-rk-text hover:text-rk-link">
            {t.label}
            {t.key === tab && <span className="absolute right-0 -bottom-px left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="flex h-[43px] items-center justify-between pr-5 pl-5">
      <h2 className="text-[16px] leading-5 text-rk-text">
        <b className="font-semibold">{title}</b> <span className="text-rk-muted">6,596,917</span>
      </h2>
      <button type="button" className="flex h-[26px] items-center gap-[7px] rounded-md border border-rk-border-strong bg-white px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-bg">
        <ExportIcon />
        Export
      </button>
    </div>
  );
}

function Pager() {
  const [p, setP] = useState(1);
  const total = 65970;
  const go = (n: number) => setP(Math.min(Math.max(1, n), total));
  const off = "border border-[#ebecf0] bg-[#f7f7f9] text-[#b9bbc4]";
  const on = "border border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg";
  return (
    <div className="flex h-[65px] items-center gap-2 pl-5 text-[14px]">
      <button type="button" aria-label="First page" disabled={p === 1} onClick={() => go(1)} className={`flex h-7 w-7 items-center justify-center rounded-md ${p === 1 ? off : on}`}>
        <ChevronsLeft />
      </button>
      <button type="button" disabled={p === 1} onClick={() => go(p - 1)} className={`h-7 rounded-md px-2 ${p === 1 ? off : on}`}>
        Prev
      </button>
      <button type="button" onClick={() => go(p + 1)} className="h-7 rounded-md bg-rk-btn-dark px-2 font-semibold text-white hover:bg-[#2b2e38]">
        Next
      </button>
      <span className="ml-[5px] text-rk-text">Page:</span>
      <input aria-label="Page" value={p} onChange={(e) => go(+e.target.value || 1)} className="-ml-[1px] h-7 w-[76px] rounded-md border border-rk-border-strong px-2 outline-none" />
      <span className="text-rk-text">
        of{" "}
        <button type="button" onClick={() => go(total)} className="text-rk-link hover:text-rk-link-hover">
          {total.toLocaleString("en-US")}
        </button>
      </span>
    </div>
  );
}

function DomainCell({ domain }: { domain: string }) {
  return (
    <span className="flex items-center gap-[2px]">
      <Link href={`${routes.domainOverview}?q=${domain}&db=se&searchType=domain`} className="max-w-[106px] truncate text-rk-link hover:text-rk-link-hover">
        {domain}
      </Link>
      <a href={`https://${domain}`} target="_blank" rel="noreferrer" aria-label={`Open ${domain}`} className="text-[#a9abaa] hover:text-rk-link">
        <ExtIcon />
      </a>
    </span>
  );
}

const rankCols = [
  { label: "SE Keywords", w: 125 },
  { label: "SE Traffic", w: 117 },
  { label: "Costs (USD)", w: 132 },
  { label: "Paid Keywords", w: 146 },
  { label: "Paid Traffic", w: 126 },
  { label: "Paid Traffic Price (USD)", w: 196 },
];

function RankTable() {
  return (
    <div className="mx-8 mt-[15px] rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.12)]">
      <CardTitle title={`${brand.name} Rank`} />
      <div className="sticky top-0 z-10 flex h-[41px] items-center border-y border-rk-border bg-[#f9f9f9] text-[12px] text-rk-text-2">
        <span className="w-[62px] pr-[1px] text-right">Rank</span>
        <span className="w-[151px] pl-[15px]">Domain</span>
        {rankCols.map((c) => (
          <span key={c.label} className="text-right" style={{ width: c.w }}>
            {c.label}
          </span>
        ))}
      </div>
      {rankRows.map((r) => (
        <div key={r.rank} className="flex h-[45px] items-center border-b border-rk-border text-[14px] text-rk-text">
          <span className="w-[62px] text-right">{r.rank}</span>
          <span className="w-[151px] pl-[15px]">
            <DomainCell domain={r.domain} />
          </span>
          {[r.kw, r.traffic, r.cost, r.paidKw, r.paidTraffic, r.paidCost].map((v, i) => (
            <span key={i} className={`text-right ${i === 0 ? "-mt-[2px] text-rk-link" : ""}`} style={{ width: rankCols[i].w }}>
              {i === 0 ? (
                <Link href={`${routes.organic.positions}?q=${r.domain}&db=se&searchType=domain`} className="hover:text-rk-link-hover">
                  {v}
                </Link>
              ) : (
                v
              )}
            </span>
          ))}
        </div>
      ))}
      <Pager />
    </div>
  );
}

const wlCols = ["SE Keywords", "SE Traffic", "Costs (USD)", "Paid Keywords", "Paid Traffic", "Paid Traffic Price (USD)"];
const dEnd = [71, 67, 77, 70, 56, 70];

function Delta({ c, i }: { c: WlCell; i: number }) {
  if (!c) return <span className="block w-[144px] text-center text-rk-muted">n/a</span>;
  const up = c.d.startsWith("+");
  return (
    <span className="flex w-[144px] items-center whitespace-nowrap">
      <span className={`shrink-0 text-right ${up ? "text-[#009f81]" : "text-[#d1002f]"}`} style={{ width: dEnd[i] }}>
        {up ? c.d : `-\u2009${c.d.slice(1)}`}
      </span>
      <span className="ml-[4px] text-rk-muted">{c.v}</span>
    </span>
  );
}

function WinnersTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [sx, setSx] = useState(0);
  const inner = 1180;
  const view = 1063;
  const thumb = (view / inner) * (view - 4);
  const onScroll = () => setSx(ref.current ? ref.current.scrollLeft : 0);
  return (
    <div className="mx-8 mt-[15px] overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.12)]">
      <CardTitle title="Winners & Losers" />
      <div className="relative">
        <div ref={ref} onScroll={onScroll} className="no-scrollbar overflow-x-auto">
          <div style={{ width: inner }}>
            <div className="flex h-[41px] items-center border-y border-rk-border bg-[#f9f9f9] text-[12px] text-rk-text-2">
              <span className="w-[62px] text-right">Pos.</span>
              <span className="w-[188px] pl-[16px]">Domain</span>
              <span className="w-[42px] text-right">Rank</span>
              {wlCols.map((c, i) => (
                <span key={c} className={`flex h-full w-[144px] items-center gap-[6px] pl-2 whitespace-nowrap ${i === 0 ? "bg-[#f0f0f0]" : ""} ${i === 0 ? "ml-[8px]" : ""}`}>
                  {c}
                  {i === 0 && (
                    <svg viewBox="0 0 16 16" width={16} height={16}>
                      <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
            {wlRows.map((r) => (
              <div key={r.pos} className="flex h-[45px] items-center border-b border-rk-border text-[14px] text-rk-text">
                <span className="w-[62px] text-right">{r.pos}</span>
                <span className="w-[188px] pl-[16px]">
                  <DomainCell domain={r.domain} />
                </span>
                <span className="w-[42px] text-right">{r.rank}</span>
                <span className="w-[8px]" />
                {r.cells.map((c, i) => (
                  <Delta key={i} c={c} i={i} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute top-[33px] left-0 h-[6px] rounded-full bg-[#d3d4d8]" style={{ width: thumb, transform: `translateX(${(sx / (inner - view)) * (view - thumb)}px)` }} />
      </div>
      <Pager />
    </div>
  );
}

export function RankPage({ tab }: { tab: RankTab }) {
  return (
    <div>
      <NoHelpButton />
      <RankHeader tab={tab} />
      {tab === "rank" ? <RankTable /> : <WinnersTable />}
    </div>
  );
}
