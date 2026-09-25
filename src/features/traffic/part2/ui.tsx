"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ExternalIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { sampleDomains, type TrafficDomain } from "../TrafficFrame";
import { DomainLegend, DomainSwitch, ExportButton, SampleCard } from "../ui";
import { Sankey, TrendLines } from "./charts";
import { months, type GrowingPage, type SourceRow, type Triple } from "./data";

function extUrl(u: string) {
  return `https://${u.includes("...") ? u.split("/")[0] : u}`;
}

const viewDetails =
  "mt-[21px] inline-flex h-7 items-center rounded-[6px] border border-[#d8dad9] bg-[#f9fafa] px-[8px] text-[14px] leading-5 whitespace-nowrap text-rk-text-2 hover:bg-rk-hover";

export function InfoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 7 12" width={7} height={12} aria-hidden className={`-ml-[1px] shrink-0 translate-y-[1px] text-[#989aa4] ${className}`}>
      <circle cx={3.4} cy={1.2} r={1.2} fill="currentColor" />
      <path d="M1.2 4.6h2.3v4.6c0 .9.5 1.3 1.3 1.3h1.4" fill="none" stroke="currentColor" strokeWidth={1.4} />
    </svg>
  );
}

export function CardTitle({ children, info = false }: { children: ReactNode; info?: boolean }) {
  return (
    <span className="flex items-center gap-[9px]">
      {children}
      {info && <InfoMark className="font-normal" />}
    </span>
  );
}

export function TrendCard({
  title,
  data,
  ticks,
  width,
  labelEvery = 1,
  exportBtn = false,
  domains = sampleDomains,
  className = "",
}: {
  title: string;
  data: Triple;
  ticks: number[];
  width: number;
  labelEvery?: number;
  exportBtn?: boolean;
  domains?: TrafficDomain[];
  className?: string;
}) {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const keys = ["zara", "asos", "hm"] as const;
  const series = keys
    .map((k, i) => ({ name: domains[i].name, color: domains[i].color, data: data[k] }))
    .filter((s) => on[s.name] !== false);
  return (
    <SampleCard title={title} className={className} extra={exportBtn ? <ExportButton /> : undefined} bodyClassName="px-5 pt-[18px] pb-[19px]">
      <TrendLines series={series} width={width} ticks={ticks} labels={months} labelEvery={labelEvery} />
      <DomainLegend domains={domains} className="mt-[16px]" onChange={setOn} />
    </SampleCard>
  );
}

function PageCard({ p, color }: { p: GrowingPage; color: string }) {
  return (
    <div className="h-[144px] w-[250px] shrink-0 rounded-[6px] border border-[#d8dad9] bg-white px-[16px] pt-[16px]">
      <div className="flex h-[18px] items-center gap-[6px] text-[13px] leading-[18px]">
        {p.kind === "Spiked" ? (
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#00735d]">
            <path d="m1.5 6 4 4 3-3 5.5-5M9.5 2h4.5v4.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#00735d]">
            <path d="M8 14V2.5M3.5 7 8 2.5 12.5 7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="font-semibold text-rk-text">{p.kind}</span>
        <span className="text-[12px] font-medium text-[#009f81]">{p.pct}</span>
      </div>
      <a
        href={extUrl(p.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-[9px] inline-flex h-7 max-w-full items-center gap-[7px] rounded-full bg-[#e8e9ea] px-[9px] text-[14px] leading-5 whitespace-nowrap text-[#6a6c6a]"
      >
        <span>{p.url}</span>
        <ExternalIcon width={16} height={16} className="shrink-0" />
      </a>
      <div className="mt-[4px] flex items-baseline gap-[6px]">
        <span className="text-[24px] leading-[32px] font-semibold text-rk-text">{p.value}</span>
        <span className="text-[12px] text-[#009f81]">↑</span>
      </div>
      <svg width={218} height={22} className="mt-[3px] block">
        <path d="M0 21L218 1V22H0Z" fill="#e0e0f8" />
        <path d="M0 21L218 1" stroke={color} strokeWidth={1} fill="none" />
      </svg>
    </div>
  );
}

function EmptyFound({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 24 24" width={24} height={24} className="text-[#6a6c6a]">
        <path d="M20 10V5H4v14h7" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" />
        <circle cx="15.5" cy="15" r="3.5" fill="none" stroke="currentColor" strokeWidth={1.7} />
        <path d="m18 17.6 2.5 2.4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
      <div className="mt-[9px] text-[16px] leading-6 font-semibold text-[#6a6c6a]">Nothing found</div>
      <div className="mt-[5px] text-[14px] leading-5 text-[#6a6c6a]">
        Try changing filters or check your{" "}
        <Link href={routes.traffic.topPages} className="text-rk-link hover:underline">
          Top Pages overview
        </Link>
      </div>
    </div>
  );
}

export function GrowingPagesCard({ pages, domains = sampleDomains }: { pages: Record<string, GrowingPage[]>; domains?: TrafficDomain[] }) {
  const [cur, setCur] = useState(domains[0].name);
  const list = pages[cur] ?? [];
  const color = domains.find((d) => d.name === cur)?.color ?? "#6167e6";
  return (
    <SampleCard title={<CardTitle info>Top Growing Pages</CardTitle>} bodyClassName="px-5 pt-5 pb-[21px]">
      <DomainSwitch domains={domains} onChange={setCur} />
      {list.length ? (
        <div className="mt-[21px] flex gap-4 overflow-hidden">
          {list.map((p) => (
            <PageCard key={p.url} p={p} color={color} />
          ))}
        </div>
      ) : (
        <EmptyFound className="mt-[52px] mb-[31px]" />
      )}
      <div>
        <Link href={routes.traffic.topPages} className={viewDetails}>
          View details
        </Link>
      </div>
    </SampleCard>
  );
}

export function TopSourcesCard({ sources, domains = sampleDomains }: { sources: Record<string, SourceRow[]>; domains?: TrafficDomain[] }) {
  const [cur, setCur] = useState(domains[0].name);
  return (
    <SampleCard title={<CardTitle info>Top Sources</CardTitle>} bodyClassName="px-5 pt-5 pb-[20px]">
      <DomainSwitch domains={domains} onChange={setCur} />
      <div className="mt-[20px] overflow-hidden">
        <Sankey sources={sources[cur] ?? []} target={cur} />
      </div>
      <div>
        <Link href={routes.traffic.sourcesDestinations} className={viewDetails}>
          View details
        </Link>
      </div>
    </SampleCard>
  );
}
