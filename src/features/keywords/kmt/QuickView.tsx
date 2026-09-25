"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import { useOutsideClose } from "@/components/ui/Popover";
import { ExtIcon, KdDot } from "../common";
import type { KwRow } from "../data";
import { ItalicInfo } from "./ui";
import { kdInfo, sfLabels, type SfKind } from "./data";
import { quickViewFor } from "./dataset";
import { DbFlag } from "./flags";
import { sfGlyph } from "./Table";

const koHref = (k: string) => `${routes.keywordOverview}?q=${encodeURIComponent(k)}&db=se`;

const intentBadge: Record<string, string> = {
  Commercial: "bg-[#fcd96b] text-[#8a5a00]",
  Informational: "bg-[#c4d8fd] text-[#2b53b8]",
  Navigational: "bg-[#e7d3fb] text-[#8a3fcf]",
  Transactional: "bg-[#9ef2c9] text-[#00785f]",
};

const Globe = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#8f929c]">
    <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M4 4.6c1.4.4 2.3 1.5 2 2.8-.2 1 .8 1.4.8 2.5M9.6 1.7c-.4 1.1.2 2 1.3 2.2 1 .2 1.6 1 1 2.2M10.4 10c.8.2 1.7.7 2.3 1.4" fill="none" stroke="currentColor" strokeWidth={1.2} />
  </svg>
);

function Glyph({ kind, className = "" }: { kind: SfKind; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-label={sfLabels[kind]} className={`shrink-0 text-[#9a9ca5] ${className}`}>
      {sfGlyph[kind]}
    </svg>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg bg-white shadow-[0_0_0_1px_rgba(25,27,35,0.04),0_1px_4px_rgba(25,27,35,0.06)] ${className}`}>{children}</div>;
}

function ListCard({ title, items }: { title: string; items: { keyword: string; volume: string }[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex h-[30px] items-center justify-between border-b border-rk-border px-3 text-[13px] leading-5">
        <span className="flex items-center gap-[6px] font-semibold text-rk-text">
          {title}
          <ItalicInfo className="text-rk-faint" />
        </span>
        <span className="text-rk-text-2">Volume</span>
      </div>
      {items.map((it) => (
        <div key={it.keyword} className="flex items-start justify-between gap-4 border-b border-rk-border py-2 pr-3 pl-2 text-[14px] leading-5 last:border-b-0">
          <Link href={koHref(it.keyword)} className="min-w-0 text-rk-link hover:underline">
            {it.keyword}
          </Link>
          <span className="w-[40px] shrink-0 text-right text-rk-text">{it.volume}</span>
        </div>
      ))}
    </Card>
  );
}

export function QuickView({ row, onClose }: { row: KwRow; onClose: () => void }) {
  const d = quickViewFor(row);
  const ref = useOutsideClose<HTMLDivElement>(true, onClose);
  const max = Math.max(...d.trend, 1);
  const label = "text-[14px] leading-5 font-semibold text-rk-text";
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={`${row.keyword} quick view`}
      style={{ right: -73 }}
      className="fixed top-[91px] bottom-4 z-[60] flex w-[578px] flex-col overflow-hidden rounded-lg bg-[#f9f9f9] shadow-popover"
    >
      <div className="flex h-10 shrink-0 items-center justify-between bg-rk-btn-dark px-3">
        <span className="text-[16px] leading-6 font-semibold text-white">{row.keyword}</span>
        <span className="flex items-center gap-[17px]">
          <Link href={koHref(row.keyword)} className="text-[14px] text-[#8fb0ff] hover:underline">
            Need more info?
          </Link>
          <button type="button" aria-label="Close" onClick={onClose} className="text-white/70 hover:text-white">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          </button>
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto border-t border-[#dbdddd] p-3" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-2 gap-3">
          <Card className="px-3 pt-3 pb-3 text-[14px] leading-5">
            <div className="flex items-center gap-1">
              <Globe />
              <span className="flex-1 text-rk-text">Global Volume</span>
              <span className="text-rk-text">{d.global}</span>
            </div>
            <div className="mt-2 flex flex-col gap-2 border-t border-rk-border pt-2">
              {d.countries.map((c, i) => (
                <div key={c.code} className={`flex items-center gap-1 ${i === 0 ? "font-semibold" : ""}`}>
                  <DbFlag code={c.code} />
                  <span className="flex-1 text-rk-text">{c.name}</span>
                  <span className="text-rk-text">{c.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="px-3 pt-3 pb-3 text-[14px] leading-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className={label}>KD</span>
                <span className="flex items-center gap-[6px] pr-3 text-rk-text">
                  <KdDot kd={d.kd} size={12} />
                  {kdInfo(d.kd).name}
                  <span className="text-rk-text-2">{d.kd}%</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={label}>SF</span>
                <span className="flex items-center gap-1 pr-[10px]">
                  {(row.sfList ?? []).slice(0, 4).map((f) => (
                    <Glyph key={f} kind={f} />
                  ))}
                  {!row.sfList && <span className="text-rk-text">{row.sf ?? "n/a"}</span>}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={label}>Intent</span>
                <span className={`rounded-full px-2 text-[12px] leading-4 ${intentBadge[d.intent] ?? "text-rk-muted"}`}>{d.intent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={label}>CPC</span>
                <span className="text-rk-text">${d.cpc}</span>
              </div>
              <div className={label}>Trend</div>
            </div>
            <div className="mt-[7px] ml-[10px] flex h-[26px] w-[226px] items-end justify-between border-b border-[#eceef1]">
              {d.trend.map((v, i) => (
                <span key={i} className="w-2 bg-[#b1bdfa]" style={{ height: Math.max(2, (v / max) * 24) }} />
              ))}
            </div>
          </Card>
          <ListCard title="Questions" items={d.questions} />
          <ListCard title="Related" items={d.related} />
        </div>
        <Card className="mt-3 overflow-hidden">
          <div className="flex h-[32px] items-center border-b border-rk-border pl-3 text-[13px] leading-5">
            <span className="flex-1 font-semibold text-rk-text">
              SERP Analysis <span className="font-normal text-rk-muted">({d.serpTotal})</span>
            </span>
            <span className="w-[80px] text-right text-rk-text-2">Page AS</span>
            <span className="w-[94px] text-right text-rk-text-2">Ref. Domains</span>
            <span className="w-[90px] pl-[21px] text-rk-text-2">Keywords</span>
          </div>
          {d.serp.map((s, i) =>
            s.kind === "feature" ? (
              <div key={i} className="flex h-9 items-center gap-[4px] border-b border-rk-border pl-9 text-[14px] text-rk-text">
                <Glyph kind={s.feature} />
                {s.label}
              </div>
            ) : (
              <div key={i} className="flex items-start border-b border-rk-border py-2 pl-3 text-[14px] leading-5 last:border-b-0">
                <span className="w-[24px] shrink-0 pl-[2px] text-rk-text">{s.pos}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-[6px]">
                    <a href={`https://${s.url}`} target="_blank" rel="noreferrer" className="truncate font-semibold text-rk-link hover:underline">
                      {s.url}
                    </a>
                    <ExtIcon className="shrink-0 text-rk-faint" />
                  </span>
                  {s.features && (
                    <span className="mt-[2px] flex h-[18px] items-center">
                      {s.features.map((f) => (
                        <Glyph key={f} kind={f} />
                      ))}
                    </span>
                  )}
                </span>
                <span className="w-[80px] shrink-0 text-right text-rk-text">{s.pageAs}</span>
                <span className="w-[94px] shrink-0 text-right text-rk-text">{s.refDomains}</span>
                <span className="w-[90px] shrink-0 pl-[21px] text-rk-text">{s.keywords}</span>
              </div>
            ),
          )}
        </Card>
      </div>
    </div>
  );
}
