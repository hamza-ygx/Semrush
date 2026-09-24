"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChatGptIcon, CheckIcon, ChevronDown, CloseIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { bots, crawledStatus, overviewIssues, thematic, type Bot } from "./data";
import { ArrowRightIcon, BotIcon, ErrorBolt, ExtIcon, NoticeIcon, AiTag, useToggle } from "./ui";

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
    <div className="flex items-center gap-[6px] text-[16px] leading-6 font-semibold text-rk-text">
      {children}
      <Info className="text-[#a9abb6]" />
      {extra}
    </div>
  );
}

const dashedCls = "text-[14px] text-rk-muted underline decoration-[#a9abb6] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text";
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
  const [v, setV] = useState("Top-10% websites");
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-[14px] text-rk-text">
        <svg viewBox="0 0 12 10" width={12} height={10}>
          <path d="M0 0h12L6 10z" fill="#d1002f" />
        </svg>
        {v}
        <ChevronDown width={14} height={14} strokeWidth={2} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[200px] rounded-md bg-white py-1 shadow-popover">
          {["Top-10% websites", "Top-50% websites"].map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
              className={`block w-full px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg ${o === v ? "bg-[#e9f7ff]" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HealthCard() {
  const total = crawledStatus.reduce((a, s) => a + s.n, 0);
  return (
    <div className="flex h-[277px] rounded-lg bg-white shadow-card">
      <div className="w-[280px] border-r border-rk-border px-5 pt-[11px]">
        <CardTitle>Site Health</CardTitle>
        <div className="mt-[30px]">
          <SegGauge value={82} marker={92} color="#6167e6">
            <span className="text-[24px] leading-7 font-bold text-rk-text">82%</span>
            <span className="text-[12px] leading-4 text-rk-muted">no changes</span>
          </SegGauge>
        </div>
        <div className="mt-[24px] flex items-center justify-between text-[14px]">
          <span className="flex items-center gap-[6px]">
            <span className="h-3 w-3 rounded-full bg-rk-accent" />
            Your site
          </span>
          82%
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
              100
            </Link>
            <span className="text-[13px] whitespace-nowrap text-rk-muted">no changes</span>
          </span>
          <div className="flex h-[15px] w-[121px] gap-px overflow-hidden">
            {crawledStatus.map((s) => (s.n ? <div key={s.label} style={{ width: `${(s.n / total) * 100}%`, background: s.color }} /> : null))}
          </div>
        </div>
        <div className="mt-[6px] w-[155px]">
          {crawledStatus.map((s) => (
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

function AiCard() {
  const [more, setMore] = useState(false);
  const list = more ? bots : bots.slice(0, 4);
  return (
    <div className="flex min-h-[277px] rounded-lg bg-white shadow-card">
      <div className="flex w-[280px] flex-col border-r border-rk-border px-5 pt-[11px] pb-[20px]">
        <CardTitle extra={<span className="rounded-full bg-[#f26b1d] px-[5px] text-[11px] leading-[15px] font-semibold text-white">beta</span>}>AI Search Health</CardTitle>
        <div className="mt-[30px]">
          <SegGauge value={91} marker={80} color="#3ae0b2">
            <span className="text-[24px] leading-7 font-bold text-[#009f81]">91%</span>
            <span className="text-[12px] leading-4 text-rk-muted">no changes</span>
          </SegGauge>
        </div>
        <div className="mt-[23px] rounded-md bg-[#f4f5f9] px-3 py-[6px] text-[13px] leading-[19px] text-rk-text">Website is better optimized for AI search engines</div>
        <div className="mt-auto flex items-center justify-between">
          <Dashed>How it works</Dashed>
          <Link href={c.issues} className="text-[14px] text-rk-link hover:text-rk-link-hover">
            42 issues
          </Link>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-[11px] pb-[20px]">
        <CardTitle>Blocked from AI Search</CardTitle>
        <div className="mt-[12px] text-[14px] text-rk-muted">Pages crawled: 100</div>
        <div className="mt-[15px]">
          {list.map((b) => (
            <div key={b} className="flex h-[28.4px] items-center justify-between text-[14px]">
              <span className="flex items-center gap-[4px]">
                {botIcon(b)}
                {b}
              </span>
              <span className="flex items-center gap-[6px] text-[#007c65]">
                <CheckIcon width={14} height={14} strokeWidth={2} />
                All good
              </span>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setMore(!more)} className="mt-[4px] self-start text-[14px] text-rk-muted underline decoration-[#a9abb6] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text">
          {more ? "Show less" : "Show more"}
        </button>
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
      <div className="absolute top-[1px] right-[21px] left-[26px] h-px bg-[#eceef2]" />
      <div className="absolute top-[34px] right-[21px] left-[26px] h-px bg-[#d9dbe1]" />
    </div>
  );
}

function CountsCard() {
  return (
    <div className="h-[310px] w-[374px] shrink-0 rounded-lg bg-white px-5 pt-[20px] shadow-card">
      <CardTitle>Errors</CardTitle>
      <Link href={c.issues} className="mt-[7px] block text-[24px] leading-8 font-bold text-rk-danger">
        16
      </Link>
      <MiniChart />
      <div className="mt-[27px]">
        <CardTitle>Warnings</CardTitle>
      </div>
      <Link href={c.issues} className="mt-[7px] block text-[24px] leading-8 font-bold text-rk-warning">
        1,099
      </Link>
      <MiniChart />
    </div>
  );
}

function IssuesCard() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="rounded-lg bg-white shadow-card">
        {overviewIssues.map((i, k) => (
          <div key={i.text} className={`flex h-[53px] items-center pr-[31px] pl-5 text-[14px] ${k ? "border-t border-rk-border" : ""}`}>
            <span className="w-[23px] shrink-0">{i.sev === "error" ? <ErrorBolt /> : <NoticeIcon />}</span>
            <span className="text-rk-text">{i.text}</span>
            {i.ai && <AiTag className="ml-2" />}
            <Link href={c.issueDetail(i.id)} className="ml-auto text-rk-link hover:text-rk-link-hover">
              {i.pages}
            </Link>
            <span className="ml-[118px]">
              <Dashed href={c.issues}>How to fix</Dashed>
            </span>
          </div>
        ))}
      </div>
      <Link href={c.issues} className="mt-4 flex h-[30px] items-center justify-center gap-2 rounded-md border border-rk-border bg-[#eceef2] text-[14px] text-rk-text-2 hover:bg-rk-hover">
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
      <circle cx="12" cy="12" r={r} fill="none" stroke="#eceef2" strokeWidth={4} />
      <circle cx="12" cy="12" r={r} fill="none" stroke="#6167e6" strokeWidth={4} strokeDasharray={`${((v / 100) * C).toFixed(2)} ${C.toFixed(2)}`} />
    </svg>
  );
}

const tileBtn = "inline-flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover";

function Thematic() {
  return (
    <div className="mt-4 rounded-lg bg-white px-5 pt-[7px] pb-[20px] shadow-card">
      <h2 className="text-[16px] leading-[24px] font-semibold">Thematic Reports</h2>
      <div className="mt-[16px] grid grid-cols-4 gap-x-4 gap-y-[17px]">
        {thematic.map((t) => (
          <div key={t.key} className="h-[137px] rounded-lg border border-rk-border px-5 pt-[19px]">
            <div className="flex items-center gap-2 text-[14px] leading-5">
              {t.label}
              {t.key === "robots" && <Info className="text-[#a9abb6]" />}
            </div>
            {"v" in t ? (
              <>
                <div className="mt-[2px] flex h-8 items-center gap-[7px]">
                  <Ring v={t.v} />
                  <span className="text-[24px] font-bold text-rk-number">{t.v}%</span>
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

function BrandPresence() {
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
        <span className="h-4 w-px bg-[#c4c7cf]" />
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
          <div>Areas for Improvement</div>
          <div className="mt-[4px] pl-[2px] text-[20px] leading-7 font-bold">5</div>
        </div>
        <div className="h-[54px] w-px bg-rk-border" />
        <div className="px-6">
          <div>Top Query Intent</div>
          <div className="mt-[7px] flex gap-[4px]">
            {["Research", "Comparison", "Purchase", "..."].map((q) => (
              <span key={q} className="flex h-[26px] items-center rounded-full bg-[#e6e7ec] px-2 text-[14px] text-rk-text-2">
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Overview() {
  return (
    <div className="px-8 pt-4 pb-[149px]">
      <div className="grid grid-cols-2 gap-4">
        <HealthCard />
        <AiCard />
      </div>
      <div className="mt-[17px] flex gap-4">
        <CountsCard />
        <IssuesCard />
      </div>
      <Thematic />
      <BrandPresence />
    </div>
  );
}
