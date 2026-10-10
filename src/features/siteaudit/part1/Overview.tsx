"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChatGptIcon, CheckIcon, ChevronDown, CloseIcon, GeminiIcon, GoogleIcon, WarningIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { DemoTag } from "@/features/tracking/ui";
import type { OverviewLive } from "../live";
import { bots, crawledStatus, industries, overviewIssues, thematic, type Bot } from "./data";
import { dashedCls, FixPopover } from "./FixPopover";
import { ArrowRightIcon, BotIcon, ErrorBolt, ExtIcon, NoticeIcon, AiTag, thinScroll, useToggle } from "./ui";

const c = routes.siteAuditCampaign;

function SegGauge({ value, marker, color, children }: { value: number; marker: number; color: string; children: ReactNode }) {
  const R = 88.5;
  const T = 28.5;
  const r = R - T / 2;
  const cx = 89;
  const cy = 88.5;
  const pt = (p: number, rad: number) => {
    const a = Math.PI * (1 - p / 100);
    return [+(cx + rad * Math.cos(a)).toFixed(2), +(cy - rad * Math.sin(a)).toFixed(2)];
  };
  const arc = (from: number, to: number) => {
    const [x0, y0] = pt(from, r);
    const [x1, y1] = pt(to, r);
    return `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}`;
  };
  const cuts = [value, marker].sort((a, b) => a - b);
  const segs: [number, number, string][] = [
    [0, cuts[0], cuts[0] <= value ? color : "#dcdee3"],
    [cuts[0], cuts[1], cuts[1] <= value ? color : "#dcdee3"],
    [cuts[1], 100, "#dcdee3"],
  ];
  const sep = (p: number) => {
    const [x0, y0] = pt(p, R - T - 1);
    const [x1, y1] = pt(p, R + 1);
    return <path d={`M${x0} ${y0}L${x1} ${y1}`} stroke="#fff" strokeWidth={2} />;
  };
  const a = Math.PI * (1 - marker / 100);
  const [mx, my] = pt(marker, R - 3);
  const deg = +((-a * 180) / Math.PI + 90).toFixed(2);
  return (
    <div className="relative mx-auto h-[89px] w-[178px]">
      <svg width={178} height={89} className="overflow-visible">
        {segs.map(([f, t, col], i) => (t > f ? <path key={i} d={arc(f, t)} fill="none" stroke={col} strokeWidth={T} /> : null))}
        {sep(value)}
        {sep(marker)}
        <path d="M-6 -5 L6 -5 L0 5 Z" transform={`translate(${mx} ${my}) rotate(${deg})`} fill="#d1002f" />
      </svg>
      <div className="absolute inset-x-0 bottom-[2px] flex flex-col items-center">{children}</div>
    </div>
  );
}

function CardTitle({ children, extra }: { children: ReactNode; extra?: ReactNode }) {
  return (
    <div className="flex items-center gap-[6px] text-[16px] leading-6 font-bold text-rk-text">
      {children}
      <Info className="text-[#a9abaa]" />
      {extra}
    </div>
  );
}

const Dashed = ({ children, href }: { children: ReactNode; href?: string }) =>
  href ? (
    <Link href={href} className={dashedCls}>
      {children}
    </Link>
  ) : (
    <button type="button" className={dashedCls}>
      {children}
    </button>
  );

function TopBenchmark() {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState(industries[0][0]);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} data-testid="sa-benchmark" className="group flex items-center gap-[6px] text-[14px] text-rk-text">
        <svg viewBox="0 0 12 10" width={12} height={10}>
          <path d="M0 0h12L6 10z" fill="#d1002f" />
        </svg>
        <span className="group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[4px]">{v}</span>
        <ChevronDown width={14} height={14} strokeWidth={2} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-[16px] z-50 w-[219px] overflow-hidden rounded-md bg-white shadow-popover">
          <div className="border-b border-rk-border px-2 pt-[9px] pb-[10px] text-[14px] leading-5">
            <div className="font-semibold text-rk-text">Site industry:</div>
            <button type="button" onClick={() => setV(industries[0][0])} className="mt-3 text-rk-link hover:text-rk-link-hover">
              Reset
            </button>
          </div>
          <div className={`h-[240px] overflow-y-auto pt-[4px] ${thinScroll}`}>
            {industries.map(([o, n]) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setV(o);
                  setOpen(false);
                }}
                className={`relative flex h-8 w-full items-center justify-between pr-[4px] pl-2 text-left text-[14px] text-rk-text hover:bg-rk-bg ${
                  o === v ? "bg-[#e9effb] before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-rk-text" : ""
                }`}
              >
                <span className="truncate">{o}</span>
                <span className="text-rk-muted">{n}%</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HealthCard({ live }: { live?: OverviewLive | null }) {
  const status = live?.status ?? crawledStatus;
  const health = live?.health ?? 82;
  const total = status.reduce((a, s) => a + s.n, 0);
  return (
    <div className="flex h-[277px] rounded-lg bg-white shadow-card">
      <div className="w-1/2 shrink-0 border-r border-rk-border px-5 pt-[11px]">
        <CardTitle>Site Health</CardTitle>
        <div className="mt-[30px]">
          <SegGauge value={health} marker={92} color="#6167e6">
            <span className="text-[24px] leading-7 font-bold text-rk-text">{health}%</span>
            <span className="text-[12px] leading-4 text-rk-muted">no changes</span>
          </SegGauge>
        </div>
        <div className="mt-[24px] flex items-center justify-between text-[14px]">
          <span className="flex items-center gap-[6px]">
            <span className="h-3 w-3 rounded-full bg-rk-accent" />
            Your site
          </span>
          {health}%
        </div>
        <div className="mt-[7px] flex items-center justify-between text-[14px]">
          <TopBenchmark />
          92%
        </div>
      </div>
      <div className="flex-1 px-5 pt-[11px]">
        <CardTitle>Crawled Pages</CardTitle>
        <div className="mt-[11px] flex items-center justify-between">
          <span className="flex items-baseline gap-[6px]">
            <Link href={c.crawledPages} className="text-[20px] leading-8 font-bold text-rk-number">
              {live?.pages ?? 100}
            </Link>
            <span className="text-[12px] whitespace-nowrap text-rk-muted">no changes</span>
          </span>
          <div className="mr-[2px] ml-[15px] flex h-[15px] flex-1 gap-px overflow-hidden">
            {status.map((s) => (s.n ? <div key={s.label} style={{ width: `${(s.n / total) * 100}%`, background: s.color }} /> : null))}
          </div>
        </div>
        <div className="mt-[6px] w-[155px]">
          {status.map((s) => (
            <div key={s.label} className="flex h-[27.75px] items-center justify-between text-[14px]">
              <span className="flex items-center gap-[10px]">
                <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                {s.label}
              </span>
              {s.n ? (
                <Link href={c.crawledPages} className="text-rk-link hover:text-rk-link-hover">
                  {s.n}
                </Link>
              ) : (
                <span className="text-rk-muted">0</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function botIcon(b: Bot) {
  if (b.startsWith("ChatGPT") || b.startsWith("OAI")) return <ChatGptIcon className="text-rk-text" />;
  if (b === "Googlebot") return <GoogleIcon />;
  if (b === "Google-Extended") return <GeminiIcon />;
  return <BotIcon kind={b.startsWith("Perplexity") ? "perplexity" : "claude"} />;
}

function BotRow({ b }: { b: Bot }) {
  return (
    <div className="flex h-[27.75px] items-center justify-between text-[14px]">
      <span className="flex items-center gap-[4px] whitespace-nowrap">
        {botIcon(b)}
        {b}
      </span>
      <span className="flex items-center gap-[6px] text-[#007c65]">
        <CheckIcon width={14} height={14} strokeWidth={2} />
        <span className="hidden xl:inline">All good</span>
      </span>
    </div>
  );
}

function MoreBots() {
  const { open, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative mt-[3px] self-start">
      <button type="button" onClick={toggle} data-testid="sa-bots-more" className={dashedCls}>
        Show more
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] -left-[15px] z-50 w-[251px] rounded-md bg-white pt-[11px] pr-[16px] pb-[13px] pl-[18px] shadow-popover">
          {bots.slice(4).map((b) => (
            <BotRow key={b} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}

function HowItWorks() {
  const { open, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} data-testid="sa-ai-how" className={dashedCls}>
        How it works
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-[320px] rounded-md bg-white px-4 pt-[14px] pb-4 text-[14px] leading-5 text-rk-text shadow-popover">
          <div className="font-semibold">Improve your score:</div>
          <ul className="mt-[8px] space-y-[8px] pl-4">
            {["Review and fix AI search issues", "Check your robots.txt file for blocked AI search bots"].map((t) => (
              <li key={t} className="relative pl-[4px] before:absolute before:top-[8px] before:-left-[8px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-rk-muted">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-[7px]">A higher score means your content is more accessible, better structured, and more likely to be shown in AI search engines.</p>
          <div className="mt-[16px] font-semibold">How does it work with Site Health?</div>
          <p className="mt-[8px]">
            Maintaining Site Health is crucial for AI search engines, but AI SEO requires some additional strategies, including enhanced use of structured data, internal linking, and content optimized for how AI systems read and cite pages.
          </p>
        </div>
      )}
    </div>
  );
}

function AiCard({ pages = 100, demo = false }: { pages?: number; demo?: boolean }) {
  return (
    <div className="flex min-h-[277px] rounded-lg bg-white shadow-card">
      <div className="flex w-1/2 shrink-0 flex-col border-r border-rk-border px-5 pt-[11px] pb-[20px]">
        <CardTitle extra={<><span className="rounded-[6px] bg-[#e65a00] px-1 text-[10px] leading-[14px] font-medium text-white">beta</span>{demo && <DemoTag className="!ml-0" />}</>}>AI Search Health</CardTitle>
        <div className="mt-[30px]">
          <SegGauge value={91} marker={80} color="#3ae0b2">
            <span className="text-[24px] leading-7 font-bold text-[#009f81]">91%</span>
            <span className="text-[12px] leading-4 text-rk-muted">no changes</span>
          </SegGauge>
        </div>
        <div className="mt-[23px] rounded-md bg-[#f5f6f6] px-3 py-[8px] text-[12px] leading-4 text-rk-text">Website is better optimized for AI search engines</div>
        <div className="mt-auto flex items-center justify-between">
          <HowItWorks />
          <Link href={c.issues} className="text-[14px] text-rk-link hover:text-rk-link-hover">
            42 issues
          </Link>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-5 pt-[11px] pb-[20px]">
        <CardTitle extra={demo ? <DemoTag className="!ml-0" /> : undefined}>Blocked from AI Search</CardTitle>
        <div className="mt-[12px] text-[14px] text-rk-muted">Pages crawled: {pages}</div>
        <div className="mt-[16px]">
          {bots.slice(0, 4).map((b) => (
            <BotRow key={b} b={b} />
          ))}
        </div>
        <MoreBots />
        <div className="mt-auto pt-3">
          <Dashed>How to unblock pages</Dashed>
        </div>
      </div>
    </div>
  );
}

function MiniChart() {
  return (
    <div className="relative mt-[17px] ml-[2px] h-[45px] text-[12px] text-rk-muted">
      <span className="absolute top-[-8px] left-[2px]">1</span>
      <span className="absolute top-[26px] left-[2px]">0</span>
      <div className="absolute top-[1px] right-[21px] left-[26px] h-px bg-[#edefef]" />
      <div className="absolute top-[34px] right-[21px] left-[26px] h-px bg-[#d9dbe1]" />
    </div>
  );
}

function CountsCard({ live }: { live?: OverviewLive | null }) {
  return (
    <div className="h-[310px] w-[374px] shrink-0 rounded-lg bg-white px-5 pt-[20px] shadow-card">
      <CardTitle>Errors</CardTitle>
      <Link href={c.issues} className="mt-[7px] block text-[24px] leading-8 font-bold text-rk-danger">
        {live ? live.errors.toLocaleString("en-US") : "16"}
      </Link>
      <MiniChart />
      <div className="mt-[27px]">
        <CardTitle>Warnings</CardTitle>
      </div>
      <Link href={c.issues} className="mt-[7px] block text-[24px] leading-8 font-bold text-rk-warning">
        {live ? live.warnings.toLocaleString("en-US") : "1,099"}
      </Link>
      <MiniChart />
    </div>
  );
}

function IssuesCard({ live }: { live?: OverviewLive | null }) {
  const list: { sev: string; text: string; pages: string; id: number; ai?: boolean; fixInfo: { about: string; fix: string } }[] = live?.top ?? overviewIssues;
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="rounded-lg bg-white shadow-card">
        {list.map((i, k) => (
          <div key={i.text} className={`flex h-[53px] items-center pr-[31px] pl-5 text-[14px] ${k ? "border-t border-rk-border" : ""}`}>
            <span className="w-[23px] shrink-0">{i.sev === "error" ? <ErrorBolt /> : i.sev === "warning" ? <WarningIcon className="shrink-0" /> : <NoticeIcon />}</span>
            <span className="text-rk-text">{i.text}</span>
            {i.ai && <AiTag className="ml-2" />}
            <Link href={c.issueDetail(i.id)} className="ml-auto text-rk-link hover:text-rk-link-hover">
              {i.pages}
            </Link>
            <span className="ml-[98px]">
              <FixPopover issue={i.fixInfo} />
            </span>
          </div>
        ))}
      </div>
      <Link href={c.issues} className="mt-4 flex h-[30px] items-center justify-center gap-2 rounded-md border border-rk-border bg-[#edefef] text-[14px] text-rk-text-2 hover:bg-rk-hover">
        View all issues
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

function Ring({ v }: { v: number }) {
  const r = 9;
  const C = 2 * Math.PI * r;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className="shrink-0 -rotate-90">
      <circle cx="12" cy="12" r={r} fill="none" stroke="#edefef" strokeWidth={4} />
      <circle cx="12" cy="12" r={r} fill="none" stroke="#6167e6" strokeWidth={4} strokeDasharray={`${((v / 100) * C).toFixed(2)} ${C.toFixed(2)}`} />
    </svg>
  );
}

const tileBtn = "inline-flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover";

function Thematic({ scores }: { scores?: Record<string, number> }) {
  return (
    <div className="mt-4 rounded-lg bg-white px-5 pt-[7px] pb-[20px] shadow-card">
      <h2 className="text-[16px] leading-[24px] font-semibold">Thematic Reports</h2>
      <div className="mt-[16px] grid grid-cols-4 gap-x-4 gap-y-[17px]">
        {thematic.map((t) => (
          <div key={t.key} className="h-[137px] rounded-lg border border-rk-border px-5 pt-[19px]">
            <div className="flex items-center gap-2 text-[14px] leading-5">
              {t.label}
              {t.key === "robots" && <Info className="text-[#a9abaa]" />}
            </div>
            {"v" in t ? (
              <>
                <div className="mt-[2px] flex h-8 items-center gap-[7px]">
                  <Ring v={scores?.[t.key] ?? t.v} />
                  <span className="text-[24px] font-bold text-rk-number">{scores?.[t.key] ?? t.v}%</span>
                </div>
                <Link href={c[t.key]} className={`${tileBtn} mt-[13px]`}>
                  View details
                </Link>
              </>
            ) : (
              <>
                <div className="mt-[5px] text-[13px] text-rk-muted">No changes</div>
                <a href="https://www.rkjh.se/robots.txt" target="_blank" rel="noreferrer" className={`${tileBtn} mt-[23px]`}>
                  Open file
                  <ExtIcon />
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandPresence({ demo = false }: { demo?: boolean }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-[#c9d3f5] bg-white">
      <div className="flex h-[43px] items-center gap-2 bg-[#ebf0ff] pr-[20px] pl-4">
        <span className="flex h-6 w-6 items-center justify-center">
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M8 1.5 12.5 6 8 10.5 3.5 6z" fill="none" stroke="#a347ff" strokeWidth={1.4} strokeLinejoin="round" />
            <path d="M2.5 11.5c2 1.5 3.6 2 5.5 2s3.5-.5 5.5-2" fill="none" stroke="#a347ff" strokeWidth={1.4} strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[16px] font-semibold">Brand Presence in AI Platforms</span>
        <span className="h-4 w-px bg-[#d6d8d7]" />
        <span className="text-[14px] text-rk-muted">
          Domain: <span className="blur-[3px] select-none">rkjh</span>
        </span>
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="ml-auto text-rk-text-2 hover:text-rk-text">
          <CloseIcon width={14} height={14} strokeWidth={2} />
        </button>
      </div>
      <div className="flex h-[92px] items-start pt-[20px] pl-4 text-[14px]">
        <div className="pr-6">
          <div>Market Share in ChatGPT</div>
          <button type="button" className="mt-[7px] flex h-[26px] items-center gap-[6px] rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white">
            Scan LLMs
            <ExtIcon />
          </button>
        </div>
        <div className="h-[54px] w-px bg-rk-border" />
        <div className="px-6">
          <div>Areas for Improvement{demo && <DemoTag className="ml-2" />}</div>
          <div className="mt-[4px] pl-[2px] text-[20px] leading-7 font-bold">5</div>
        </div>
        <div className="h-[54px] w-px bg-rk-border" />
        <div className="px-6">
          <div>Top Query Intent</div>
          <div className="mt-[7px] flex gap-[4px]">
            {["Research", "Comparison", "Purchase", "..."].map((q) => (
              <span key={q} className="flex h-[26px] items-center rounded-full bg-[#e7e8e8] px-2 text-[14px] text-rk-text-2">
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Overview({ live, scores }: { live?: OverviewLive | null; scores?: Record<string, number> }) {
  return (
    <div className="px-8 pt-4 pb-[149px]">
      <div className="grid grid-cols-2 gap-4">
        <HealthCard live={live} />
        <AiCard pages={live?.pages} demo={!!live} />
      </div>
      <div className="mt-[17px] flex gap-4">
        <CountsCard live={live} />
        <IssuesCard live={live} />
      </div>
      <Thematic scores={scores ? { ...live?.scores, ...scores } : live?.scores} />
      <BrandPresence demo={!!live} />
    </div>
  );
}
