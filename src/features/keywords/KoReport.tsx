"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { Card } from "@/components/ui/primitives";
import { LinkSelect } from "@/components/ui/Popover";
import { ChevronRight, DesktopIcon, FeedbackIcon, FlagSE, RefreshIcon } from "@/components/ui/icons";
import { CirclePlus, ExtIcon, KdDot, KwHeader, PinIcon, SparkleIcon, Chevron } from "./common";
import { koSummary, koVariations, serpRanges, serpRows } from "./data";
import { CountryFlag } from "./flags";

export function KoTabs({ active, q }: { active: "overview" | "bulk"; q: string }) {
  const qs = `?q=${encodeURIComponent(q)}&db=se`;
  const tabs = [
    { key: "overview", label: "Overview", href: `${routes.keywordOverview}${qs}` },
    { key: "bulk", label: "Bulk Analysis", href: `${routes.keywordOverviewBulk}${qs}` },
  ];
  return (
    <div className="flex gap-[17px]">
      {tabs.map((t) => (
        <Link key={t.key} href={t.href} className="relative pb-[10px] text-[16px] leading-6 font-medium whitespace-nowrap text-rk-text hover:text-rk-link">
          {t.label}
          {t.key === active && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
        </Link>
      ))}
    </div>
  );
}

export function KoHeader({ q, active }: { q: string; active: "overview" | "bulk" }) {
  return (
    <KwHeader
      tool="Keyword Overview"
      subject={
        <span className="flex items-center gap-2">
          {q}
          <CirclePlus className="text-rk-faint" />
        </span>
      }
      right={
        <Link href="#" className="flex items-center gap-[5px] hover:text-rk-link-hover">
          <FeedbackIcon />
          Send feedback
        </Link>
      }
      meta={
        <>
          <LinkSelect value="Sweden" options={["Sweden", "United States", "United Kingdom", "Germany"] as const} icon={<FlagSE width={16} height={12} />} />
          {active === "overview" && (
            <>
              <LinkSelect value="Desktop" options={["Desktop", "Mobile"] as const} icon={<DesktopIcon />} />
              <LinkSelect value="Sep 24, 2026" options={["Sep 24, 2026", "Aug 2026", "Jul 2026", "Jun 2026"] as const} />
            </>
          )}
          <LinkSelect value="USD" options={["USD", "EUR", "SEK"] as const} />
        </>
      }
      tabs={<KoTabs active={active} q={q} />}
    />
  );
}

export function DomainInput({ className = "w-[274px]" }: { className?: string }) {
  return (
    <label className={`flex h-7 items-center gap-2 rounded-md border border-[#d7c5fb] bg-white px-2 ${className}`}>
      <SparkleIcon />
      <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-rk-muted" />
    </label>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-[14px] leading-5 text-rk-text">{children}</div>;
}

function Big({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`text-[24px] leading-8 font-bold ${className}`}>{children}</div>;
}

function KdRing({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <svg width={42} height={42} viewBox="0 0 42 42" className="-rotate-90">
      <circle cx="21" cy="21" r={r} fill="none" stroke="#f2f2f3" strokeWidth={8} />
      <circle cx="21" cy="21" r={r} fill="none" stroke="#3ee1b4" strokeWidth={8} strokeDasharray={`${(value / 100) * c} ${c}`} />
    </svg>
  );
}

function TopCards() {
  const s = koSummary;
  const max = Math.max(...s.countries.map((c) => c.value));
  return (
    <div className="grid h-[293px] grid-cols-4 gap-4">
      <Card className="rounded-xl px-5 pt-5 pb-5">
        <Label>Volume</Label>
        <Big className="flex items-center gap-2">
          {s.volume}
          <FlagSE width={16} height={12} />
        </Big>
        <div className="mt-[19px] mb-[19px] border-t-2 border-[#eeeff1]" />
        <div className="text-[16px] leading-6">Keyword Difficulty</div>
        <div className="mt-1 flex items-center gap-3">
          <div>
            <Big>{s.kd}%</Big>
            <div className="text-[12px] leading-4 text-rk-text-2">{s.kdLabel}</div>
          </div>
          <KdRing value={s.kd} />
        </div>
        <p className="mt-4 text-[12px] leading-4 text-rk-muted">{s.kdText}</p>
      </Card>
      <Card className="rounded-xl px-5 pt-5 pb-5">
        <Label>Global Volume</Label>
        <Big>{s.globalVolume}</Big>
        <div className="mt-[10px] flex flex-col gap-2">
          {s.countries.map((c) => (
            <div key={c.code} className="flex h-5 items-center text-[14px]">
              <span className="flex w-[56px] items-center gap-[6px] text-rk-link">
                <CountryFlag code={c.code} />
                {c.code}
              </span>
              <div className="relative h-3 w-[131px] bg-[#e0e1e9]">
                <div className="absolute inset-y-0 left-0 bg-[#6167e6]" style={{ width: Math.max(2, (c.value / max) * 131) }} />
                {c.value / max < 0.1 && <div className="absolute inset-y-0 left-0 w-[2px] bg-[#b7bcf6]" />}
              </div>
              <span className={`ml-auto ${c.value === max ? "text-rk-text" : "text-rk-link"}`}>{c.value}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        <Card className="h-[92px] rounded-xl px-5 pt-5">
          <Label>Intent</Label>
          <span className="mt-[3px] inline-flex h-7 items-center rounded-full bg-[#ffdc7e] px-[10px] text-[14px] text-[#8c6408]">{s.intent}</span>
        </Card>
        <Card className="flex-1 rounded-xl px-5 pt-5">
          <Label>Trend</Label>
          <div className="relative mt-[14px] h-[110px] w-[242px] border-b border-[#e0e1e9]">
            <div className="absolute inset-x-0 top-0 border-t border-[#f0f0f3]" />
            <div className="absolute inset-x-0 top-[55px] border-t border-[#f0f0f3]" />
            <div className="absolute inset-0 flex items-end gap-[11px] pl-[13px]">
              {s.trend.map((v, i) => (
                <div key={i} className="w-[9px] bg-[#b0bff8]" style={{ height: v * 110 }} />
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card className="rounded-xl px-5 pt-5 pb-5">
        <Label>CPC</Label>
        <Big>{s.cpc}</Big>
        <div className="mt-[19px] mb-[19px] border-t-2 border-[#eeeff1]" />
        <Label>Competitive Density</Label>
        <Big>{s.competitiveDensity}</Big>
        <div className="mt-[19px] mb-[19px] border-t-2 border-[#eeeff1]" />
        <Label>PLA</Label>
        <Big className="text-rk-faint">{s.pla}</Big>
      </Card>
    </div>
  );
}

function NoData({ className = "" }: { className?: string }) {
  return <div className={`text-center text-[14px] text-rk-muted ${className}`}>We have no data to show.</div>;
}

function KeywordIdeas() {
  return (
    <Card className="mt-4 rounded-xl">
      <div className="flex h-11 items-center border-b border-[#eeeff1] px-5 text-[16px] font-bold">Keyword ideas</div>
      <div className="grid h-[341px] grid-cols-3 gap-x-[78px] px-5 pt-5">
        <div>
          <Label>Keyword Variations</Label>
          <div className="mt-[2px] flex items-baseline gap-1">
            <span className="text-[24px] leading-8 font-bold text-rk-number">1</span>
            <span className="text-[14px]">
              Total Volume: <b>880</b>
            </span>
          </div>
          <table className="-ml-5 mt-5 w-[calc(100%+38px)] text-[14px]">
            <thead>
              <tr className="h-8 border-b border-[#eeeff1] text-[13px] text-rk-text-2">
                <th className="pl-5 text-left font-normal">Keywords</th>
                <th className="w-[80px] pr-5 text-right font-normal">Volume</th>
                <th className="w-[62px] text-left font-normal">KD %</th>
              </tr>
            </thead>
            <tbody>
              {koVariations.map((v) => (
                <tr key={v.keyword} className="h-[35px] border-b border-[#eeeff1]">
                  <td className="pl-5">
                    <Link href={routes.keywordOverview} className="text-rk-link hover:text-rk-link-hover">
                      {v.keyword}
                    </Link>
                  </td>
                  <td className="pr-5 text-right">{v.volume}</td>
                  <td>
                    <span className="flex items-center gap-[6px]">
                      {v.kd}
                      <KdDot kd={v.kd} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href={routes.keywordMagic} className="mt-5 inline-flex h-7 items-center rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            View all 1 keywords
          </Link>
        </div>
        <div>
          <Label>Questions</Label>
          <Big className="text-rk-faint">n/a</Big>
          <NoData className="mt-[52px]" />
        </div>
        <div>
          <Label>Keyword Strategy</Label>
          <NoData className="mt-[84px]" />
        </div>
      </div>
    </Card>
  );
}

function TrendBanner() {
  return (
    <div className="relative mt-4 flex h-[86px] overflow-hidden rounded-xl border border-[#d6dcf5] bg-white">
      <div className="flex w-[425px] items-center bg-[#eef1fc] pl-5 text-[16px] font-bold">Want to know the next big trend in your industry?</div>
      <svg width={20} height={86} className="shrink-0" viewBox="0 0 20 86" preserveAspectRatio="none">
        <path d="M0 0h2l17 43L2 86H0z" fill="#eef1fc" />
      </svg>
      <div className="flex flex-col justify-center pl-[25px] text-[14px] leading-5">
        <span>Find it before your competitors do!</span>
        <a href="#" className="mt-1 flex items-center gap-[10px] font-semibold text-rk-text hover:text-rk-link">
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-link">
            <path d="M1.5 12 6 7.5l3 3L14 5.5M10 5.5h4v4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Exploding Topics
        </a>
      </div>
    </div>
  );
}

function SerpAnalysis() {
  const [mode, setMode] = useState<"Domain" | "URL">("URL");
  const [range, setRange] = useState("1-10");
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <Card className="mt-4 rounded-xl">
      <div className="flex h-11 items-center gap-2 border-b border-[#eeeff1] px-5">
        <span className="text-[16px] font-bold">SERP Analysis</span>
        <div className="flex">
          {(["Domain", "URL"] as const).map((m, i) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`-ml-px h-7 border px-2 text-[14px] first:ml-0 ${i === 0 ? "rounded-l-md" : "rounded-r-md"} ${
                mode === m ? "z-10 border-[#9ea6f5] bg-[#eef0fd]" : "border-rk-border bg-white hover:bg-rk-bg"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pt-[18px]">
        <div className="flex">
          <div className="border-r border-rk-border pr-6">
            <Label>Results</Label>
            <Big>107</Big>
          </div>
          <div className="pl-6">
            <Label>SERP Features</Label>
            <PinIcon className="mt-[6px] text-rk-muted" />
          </div>
        </div>
        <div className="mt-[14px] inline-flex">
          {serpRanges.map((rg, i) => (
            <button
              key={rg}
              type="button"
              onClick={() => setRange(rg)}
              className={`-ml-px h-7 border px-2 text-[14px] first:ml-0 ${i === 0 ? "rounded-l-md" : ""} ${i === serpRanges.length - 1 ? "rounded-r-md" : ""} ${
                range === rg ? "z-10 border-[#9ea6f5] bg-[#eef0fd]" : "border-rk-border bg-white hover:bg-rk-bg"
              }`}
            >
              {rg}
            </button>
          ))}
        </div>
      </div>
      <table className="mt-5 w-full text-[14px]">
        <thead>
          <tr className="h-[42px] border-b border-[#eeeff1] text-[13px] text-rk-text-2">
            <th className="w-[56px]" />
            <th className="text-left font-normal">URL</th>
            <th className="w-[100px] pr-[1px] text-right font-normal">Page AS</th>
            <th className="w-[100px] text-right font-normal">Ref. Domains</th>
            <th className="w-[100px] text-right font-normal">Backlinks</th>
            <th className="w-[100px] text-right font-normal">Search Traffic</th>
            <th className="w-[130px] pr-5 text-right font-normal">URL Keywords</th>
          </tr>
        </thead>
        <tbody>
          {serpRows.map((row, i) =>
            row.kind === "local" ? (
              <tr key={i} className="h-10 border-b border-[#eeeff1]">
                <td className="pl-[25px]">
                  <button type="button" aria-label="Expand" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} className="text-rk-text-2">
                    <ChevronRight className={open[i] ? "rotate-90" : ""} />
                  </button>
                </td>
                <td colSpan={6}>
                  <span className="flex items-center gap-[6px]">
                    <PinIcon className="text-rk-muted" />
                    Local pack
                  </span>
                </td>
              </tr>
            ) : (
              <tr key={i} className="h-[57px] border-b border-[#eeeff1] last:border-0">
                <td className="pr-[13px] text-right align-top pt-[9px]">{row.pos}</td>
                <td className="align-top pt-[9px] leading-5">
                  <a href={row.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#2359d6] hover:text-rk-link-hover">
                    {row.url}
                    <ExtIcon className="text-rk-muted" />
                  </a>
                  <Link href={routes.domainOverview} className="font-semibold text-[#2359d6] hover:text-rk-link-hover">
                    {row.domain}
                  </Link>
                </td>
                <td className="pt-[9px] text-right align-top">{row.pageAs}</td>
                <td className={`pt-[9px] text-right align-top ${row.refDomains ? "text-rk-link" : ""}`}>{row.refDomains}</td>
                <td className={`pt-[9px] text-right align-top ${row.backlinks ? "text-rk-link" : ""}`}>{row.backlinks}</td>
                <td className="pt-[9px] text-right align-top text-rk-link">{row.traffic}</td>
                <td className="pt-[9px] pr-5 text-right align-top text-rk-link">{row.urlKeywords}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </Card>
  );
}

function EmptyCard({ title }: { title: string }) {
  return (
    <Card className="rounded-xl">
      <div className="flex h-11 items-center border-b border-[#eeeff1] px-5 text-[16px] font-bold">{title}</div>
      <div className="flex h-[263px] items-center justify-center pb-3">
        <NoData />
      </div>
    </Card>
  );
}

export function KoReport({ q }: { q: string }) {
  return (
    <>
      <KoHeader q={q} active="overview" />
      <div className="px-8 pt-4">
        <div className="flex w-[1093px] items-center gap-2">
          <DomainInput />
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-muted">
            <PinIcon className="text-rk-text" />
            Select location
            <Chevron className="ml-[6px] text-rk-text" size={14} />
          </button>
          <button type="button" className="ml-auto flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <RefreshIcon />
            Update
            <span className="rounded-full bg-white px-[6px] text-[12px] leading-[18px] text-rk-text-2">0/1,000</span>
          </button>
        </div>
        <div className="mt-4">
          <TopCards />
        </div>
        <KeywordIdeas />
        <TrendBanner />
        <SerpAnalysis />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <EmptyCard title="PLA Copies" />
          <EmptyCard title="Ad Copies" />
        </div>
      </div>
    </>
  );
}
