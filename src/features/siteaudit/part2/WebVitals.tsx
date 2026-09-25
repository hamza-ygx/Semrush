"use client";

import { Fragment, useState } from "react";
import { ChevronRight, ExternalIcon } from "@/components/ui/icons";
import { ThematicPage, SubCard } from "./Thematic";
import { Dot, InfoI, LearnMore, Ring } from "./ui";
import { C, vitalsMetrics, vitalsPages, vitalsStatus, type VitalsRow } from "./data";

const SortIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text-2">
    <path d="M2 4h12M2 8h8M2 12h4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

const LighthouseIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M6.5 3h3l1 11h-5z" fill="#f44b21" />
    <path d="M6.2 6.5h3.6M5.9 10h4.2" stroke="#fff" strokeWidth={1.3} />
    <path d="M7 1.5h2V3H7z" fill="#f44b21" />
  </svg>
);

const statusColor = { Poor: C.red, "To Improve": C.orange, Good: C.green };

function tone(kind: "lcp" | "tbt" | "cls", v: string) {
  const n = parseFloat(v);
  const bad = kind === "lcp" ? n > 4 : false;
  const mid = kind === "lcp" ? n > 2.5 : kind === "tbt" ? n > 300 : n > 0.1;
  return bad ? "text-rk-danger" : mid ? "text-[#c9820a]" : "text-rk-success";
}

function PageRow({ r }: { r: VitalsRow }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="grid h-[45px] grid-cols-[1fr_113px_84px_96px_108px] items-center border-b border-rk-border text-[14px]">
        <div className="flex items-center gap-[10px] pl-[20px]">
          <button type="button" aria-label={open ? "Collapse" : "Expand"} aria-expanded={open} onClick={() => setOpen(!open)} className="text-rk-text-2">
            <ChevronRight width={16} height={16} className={open ? "rotate-90" : ""} />
          </button>
          <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-[6px] text-rk-link hover:text-rk-link-hover">
            {r.url}
            <ExternalIcon className="text-rk-muted" />
          </a>
        </div>
        <div className="flex items-center gap-[5px] pl-3">
          <Dot color={statusColor[r.status]} />
          {r.status}
        </div>
        <div className={`text-right ${tone("lcp", r.lcp)}`}>{r.lcp}</div>
        <div className={`text-right ${tone("tbt", r.tbt)}`}>{r.tbt}</div>
        <div className={`pr-5 text-right ${tone("cls", r.cls)}`}>{r.cls}</div>
      </div>
      {open && (
        <div className="grid grid-cols-3 gap-6 border-b border-rk-border bg-[#f9f9fb] px-[46px] py-4 text-[14px]">
          {(["LCP", "TBT", "CLS"] as const).map((k) => (
            <div key={k}>
              <div className="font-semibold">{k}</div>
              <div className="text-rk-muted">{k === "LCP" ? r.lcp : k === "TBT" ? r.tbt : r.cls}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function StackedChart() {
  const left = 70;
  const top = 12;
  const H = 247;
  const W = 623;
  const y = (v: number) => top + H - (v / 10) * H;
  const x = left + W / 2 - 40;
  return (
    <svg width={700} height={295} className="block">
      {[0, 5, 10].map((t) => (
        <g key={t}>
          <line x1={left} x2={left + W} y1={y(t)} y2={y(t)} stroke="#e0e2e1" />
          <text x={left - 16} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {t}
          </text>
        </g>
      ))}
      <text transform={`translate(${left - 40} ${top + H / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
        Pages
      </text>
      <rect x={x} y={y(1)} width={80} height={y(0) - y(1)} fill={C.green} />
      <rect x={x} y={y(8)} width={80} height={y(1) - y(8)} fill={C.orange} />
      <rect x={x} y={y(10)} width={80} height={y(8) - y(10)} fill={C.red} />
      <text x={x + 40} y={y(0) + 29} textAnchor="middle" fontSize={12} fill="#6a6c6a">
        Jul 22
      </text>
    </svg>
  );
}

export function WebVitals() {
  return (
    <ThematicPage title="Core Web Vitals" score={10} info pdf>
      <div className="rounded-md bg-white pt-[19px] shadow-card">
        <div className="flex items-center gap-2 px-5 text-[14px] leading-5">
          <LighthouseIcon />
          <span className="-ml-[5px]">Powered by Lighthouse</span>
          <InfoI />
          <span className="mx-[2px] h-5 w-px bg-rk-border" />
          <span>Device emulated: Desktop</span>
          <InfoI />
          <span className="mx-[2px] h-5 w-px bg-rk-border" />
          <LearnMore>How to change to mobile</LearnMore>
        </div>
        <div className="mt-[20px] grid grid-cols-[280px_1fr] gap-6 px-5">
          <SubCard className="h-[401px] px-5 pt-[20px]">
            <h3 className="flex items-center gap-2 text-[20px] leading-7 font-medium">
              Page Status <InfoI />
            </h3>
            <div className="mt-[22px] flex">
              <Ring segments={vitalsStatus} size={180} thickness={30} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">10</span>
                <span className="text-[12px] leading-4 text-rk-muted">Pages</span>
              </Ring>
            </div>
            <div className="mt-[24px] space-y-2 text-[14px] leading-5">
              {vitalsStatus.map((s) => (
                <div key={s.label} className="flex items-center">
                  <Dot color={s.color} className="mr-2" />
                  <span className="w-[89px]">{s.label}</span>
                  <span className={s.value ? "" : "text-rk-muted"}>{s.value}</span>
                </div>
              ))}
            </div>
          </SubCard>
          <SubCard className="h-[401px] px-5 pt-[20px]">
            <h3 className="flex items-center gap-2 text-[20px] leading-7 font-medium">
              Historical Data <InfoI />
            </h3>
            <div className="mt-[9px] flex gap-4 text-[14px] leading-5">
              {vitalsStatus.map((s) => (
                <span key={s.label} className="flex items-center gap-1">
                  <Dot color={s.color} />
                  {s.label}
                </span>
              ))}
            </div>
            <div className="-ml-5 mt-[15px]">
              <StackedChart />
            </div>
          </SubCard>
        </div>
        <div className="mx-5 mt-[25px] rounded-md border border-[#ebebeb] px-5 pt-[20px] pb-[19px]">
          <h3 className="text-[20px] leading-7 font-medium">Metrics</h3>
          <p className="mt-[3px] text-[14px] leading-5 text-rk-muted">A breakdown of pages by their status for each of the Core Web Vitals metrics, plus optimization tips.</p>
          <div className="mt-[24px] grid grid-cols-3 gap-10">
            {vitalsMetrics.map((m) => (
              <div key={m.title}>
                <h4 className="flex items-center gap-2 text-[16px] leading-6 font-medium">
                  {m.title} <InfoI />
                </h4>
                <div className="mt-[15px] flex items-start gap-4">
                  <Ring segments={m.values.map((v, i) => ({ value: v, color: vitalsStatus[i].color }))} size={80} thickness={20} sep={false} />
                  <div className="w-[120px] space-y-2 text-[14px] leading-5">
                    {vitalsStatus.map((s, i) => (
                      <div key={s.label} className="flex items-center">
                        <Dot color={s.color} className="mr-2" />
                        <span className="flex-1">{s.label}</span>
                        <span className={m.values[i] ? "" : "text-rk-muted"}>{m.values[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-[17px] flex h-[36px] items-center border-b border-[#dbdbdb] px-2 text-[14px]">
                  <span className="flex-1">Top Improvements</span>
                  <span className="flex items-center gap-1">
                    Affected Pages <SortIcon />
                  </span>
                </div>
                {m.tips.length ? (
                  m.tips.map(([t, n]) => (
                    <div key={t} className="flex h-[36.5px] items-center border-b border-rk-border px-2 text-[14px]">
                      <LearnMore className="min-w-0 truncate text-left text-rk-text-2">{t}</LearnMore>
                      <span className="flex-1" />
                      <LearnMore className="ml-4 text-rk-text-2">{String(n)}</LearnMore>
                    </div>
                  ))
                ) : (
                  <p className="px-2 pt-[7px] text-[14px] leading-5 text-rk-text-2">{m.empty}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[41px] flex items-center gap-2 px-5">
          <h3 className="text-[20px] leading-7 font-medium">Analyzed Pages</h3>
          <InfoI />
          <button type="button" className="ml-[6px] flex h-[28px] items-center rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            Edit list
          </button>
        </div>
        <div className="mt-[15px] rounded-b-md">
          <div className="sticky top-0 z-10 grid h-10 grid-cols-[1fr_113px_84px_96px_108px] items-center border-b border-rk-border bg-[#f9f9f9] text-[12px] text-rk-text-2">
            <span className="pl-5">URL</span>
            <span className="flex h-full items-center gap-1 bg-[#ececec] pl-3">
              Status <SortIcon />
            </span>
            <span className="text-right">LCP</span>
            <span className="text-right">TBT</span>
            <span className="pr-5 text-right">CLS</span>
          </div>
          {vitalsPages.map((r) => (
            <Fragment key={r.url}>
              <PageRow r={r} />
            </Fragment>
          ))}
        </div>
      </div>
    </ThematicPage>
  );
}
