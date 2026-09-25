"use client";

import { useState } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { TrafficFrame, sampleDomains } from "../TrafficFrame";
import { ExportButton, SampleCard, SegTabs } from "../ui";
import { TrendLines } from "./charts";
import { businessRows, businessShare, countryRows, countryShareByMap, geoTrend, greyBusiness, greyCountries, months, regionRows, usStateRows, type GeoRow } from "./data";
import { Flag } from "./flags";
import { usStates, worldBusiness, worldCountries, worldOutline, worldSubregions } from "./geo";
import { MetricTable, Pagination, ShareCell } from "./table";
import { CardTitle, InfoMark } from "./ui";

type Kind = "usa" | "countries" | "business" | "regions";

const fills = ["#dcdede", "#d7e3fe", "#bfcdfd", "#a9b6f6", "#6f73dc"];
const legendDots = ["#dcdddc", "#cadeff", "#a9beff", "#93a1ff", "#5c5add"];
const legendLabels = ["0%", "< 10%", "10% - 40%", "40% - 70%", "> 70%"];

const cls = (share: number | undefined) => (share == null || share <= 0 ? 0 : share < 10 ? 1 : share < 40 ? 2 : share < 70 ? 3 : 4);

const cfg: Record<Kind, { title: string; rows: GeoRow[]; first: string; card: string; trend: keyof typeof geoTrend; pages?: number; total: number }> = {
  usa: { title: "USA", rows: usStateRows, first: "State", card: "Traffic by State", trend: "usa", total: 51 },
  countries: { title: "Countries", rows: countryRows, first: "Country", card: "Traffic by Country", trend: "countries", pages: 4, total: 193 },
  business: { title: "Business Regions", rows: businessRows, first: "Region", card: "Traffic by Business Regions", trend: "business", total: 4 },
  regions: { title: "Geographical Regions", rows: regionRows, first: "Region", card: "Traffic by Geographical Regions", trend: "regions", total: 22 },
};

const W_S = 0.8796;
const W_TX = 532.7 - 500 * W_S - 32;
const W_TY = 641 - 500 * W_S - 280;

function WorldPaths({ kind }: { kind: Kind }) {
  if (kind === "countries") {
    return (
      <>
        {worldCountries.map((c) => (
          <path key={c.name} d={c.d} fill={fills[greyCountries.includes(c.name) ? 0 : Math.max(1, cls(countryShareByMap[c.name] ?? 1))]} />
        ))}
      </>
    );
  }
  if (kind === "business") {
    return (
      <>
        {worldBusiness.map((c) => (
          <path key={c.name} d={c.d} fill={fills[cls(businessShare[c.name])]} />
        ))}
        {worldCountries
          .filter((c) => greyBusiness.includes(c.name))
          .map((c) => (
            <path key={c.name} d={c.d} fill={fills[0]} />
          ))}
      </>
    );
  }
  const share = Object.fromEntries(regionRows.map((r) => [r.name, r.share]));
  return (
    <>
      {worldSubregions.map((c) => (
        <path key={c.name} d={c.d} fill={fills[Math.max(1, cls(share[c.name]))]} />
      ))}
    </>
  );
}

function MapCard({ kind }: { kind: Kind }) {
  const [metric, setMetric] = useState<"Visits" | "Unique Visitors">("Visits");
  const [hover, setHover] = useState<string | null>(null);
  const caShare = Object.fromEntries(usStateRows.map((r) => [r.name, r.share]));
  return (
    <SampleCard
      title={<CardTitle info>Traffic Map</CardTitle>}
      className="relative"
      extra={
        <div className="flex items-center gap-[23px]">
          <button type="button" aria-label="Full screen" className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#d8dad9] bg-[#f9fafa] text-rk-text-2 hover:bg-rk-hover">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <ExportButton />
        </div>
      }
      bodyClassName="px-5 pt-[21px] pb-0"
    >
      <SegTabs items={["Visits", "Unique Visitors"] as const} onChange={setMetric} />
      <div className="h-[425px]" data-metric={metric} />
      <svg width={1236} height={517} className="pointer-events-none absolute top-0 left-0 overflow-visible">
        {kind === "usa" ? (
          <g transform={`translate(${291.8 - 32} ${417.6 - 280}) scale(0.5655)`} className="pointer-events-auto">
            {usStates.map((s) => (
              <path
                key={s.name}
                d={s.d}
                fill={hover === s.name ? "#a9b6f6" : fills[Math.max(1, cls(caShare[s.name]))]}
                stroke="#fff"
                strokeWidth={1.4}
                onMouseEnter={() => setHover(s.name)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </g>
        ) : (
          <g transform={`translate(${W_TX} ${W_TY}) scale(${W_S})`} className="pointer-events-auto">
            <clipPath id={`clip-${kind}`}>
              <path d={worldOutline} />
            </clipPath>
            <g clipPath={`url(#clip-${kind})`} stroke="#fff" strokeWidth={0.9} strokeLinejoin="round">
              <WorldPaths kind={kind} />
            </g>
          </g>
        )}
      </svg>
      <div className="absolute top-[141px] left-[906px] flex flex-col gap-[20px]">
        {legendLabels.map((l, i) => (
          <div key={l} className="flex h-5 items-center gap-[6px] text-[14px] leading-5 text-rk-text">
            <span className="h-[10px] w-[10px] rounded-full" style={{ background: legendDots[i] }} />
            {l}
          </div>
        ))}
      </div>
    </SampleCard>
  );
}

function TrendCard({ kind }: { kind: Kind }) {
  const t = geoTrend[cfg[kind].trend];
  const [off, setOff] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const [metric, setMetric] = useState<"Visits" | "Unique Visitors">("Visits");
  const scale = metric === "Visits" ? 1 : 0.46;
  const series = t.series.filter((s) => !off[s.name]).map((s) => ({ ...s, data: s.data.map((v) => v * scale) }));
  return (
    <SampleCard title="Traffic Trend" bodyClassName="px-5 pt-5 pb-[31px]">
      <div className="flex items-center gap-4">
        <div ref={ref} className="relative">
          <button type="button" onClick={() => setOpen((o) => !o)} className="flex h-7 items-center gap-[14px] rounded-[6px] border border-[#d8dad9] bg-white pr-[7px] pl-[8px] text-[14px] leading-5 text-rk-text">
            {t.series.map((s) => (
              <span key={s.name} className={`flex items-center gap-[8px] ${off[s.name] ? "opacity-40" : ""}`}>
                <span className="h-[10px] w-[10px] rounded-full" style={{ background: s.color }} />
                {s.name}
              </span>
            ))}
            <svg viewBox="0 0 16 16" width={16} height={16} className={`-ml-[9px] ${open ? "rotate-180" : ""}`}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="#1b1e1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-[32px] left-0 z-40 min-w-[220px] rounded-md bg-white py-1 shadow-popover">
              {t.series.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setOff((o) => ({ ...o, [s.name]: !o[s.name] }))}
                  className="flex w-full items-center gap-[8px] px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border text-white" style={off[s.name] ? { borderColor: "#d6d8d7" } : { background: s.color, borderColor: s.color }}>
                    {!off[s.name] && (
                      <svg viewBox="0 0 16 16" width={14} height={14}>
                        <path d="m4.5 8.3 2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <SegTabs items={["Visits", "Unique Visitors"] as const} onChange={setMetric} />
      </div>
      <div className="mt-[17px]">
        <TrendLines series={series} width={1196} plotH={213} ticks={t.ticks} labels={months} />
      </div>
    </SampleCard>
  );
}

export function GeoReport({ kind }: { kind: Kind }) {
  const c = cfg[kind];
  const withFlags = kind === "countries";
  return (
    <TrafficFrame title={c.title} filters={["date", "granularity", "device"]} chips="select" domains={sampleDomains}>
      <div className="-mt-[2px] flex flex-col gap-4">
        <MapCard kind={kind} />
        <TrendCard kind={kind} />
        <section className="overflow-clip rounded-lg bg-white shadow-card">
          <div className="flex h-[44px] items-center gap-[8px] border-b border-[#f0f0f0] px-5">
            <h2 className="text-[16px] leading-6 font-bold text-rk-text">{c.card}</h2>
            <span className="-ml-[4px] text-[16px] leading-6 text-[#8b8d96]">
              1-{c.total <= 51 ? c.total : 50} ({c.total})
            </span>
            <InfoMark />
          </div>
          <MetricTable
            first={{ label: c.first, width: 200 }}
            cols={[
              { label: "Traffic Share", width: 176, sorted: true, pl: 12, pr: 13 },
              { label: "Visits", width: 120 },
              { label: "Unique Visitors", width: 120 },
              { label: "Desktop", width: 120 },
              { label: "Mobile", width: 120 },
              { label: "Pages / Visit", width: 120 },
              { label: "Avg. Visit Duration", width: 166 },
              { label: "Bounce Rate", width: 120 },
            ]}
            thumb={[200, 815]}
            rows={c.rows.map((r) => ({
              key: r.name,
              first: withFlags && r.code ? (
                <span className="flex items-center gap-[6px]">
                  <Flag code={r.code} />
                  {r.name}
                </span>
              ) : (
                r.name
              ),
              cells: [
                <ShareCell key="s" pct={r.share} label={r.share < 0.01 ? "< 0.01%" : `${r.share}%`} />,
                r.visits,
                r.uv,
                `${r.desktop}%`,
                `${+(100 - r.desktop).toFixed(2)}%`,
                r.ppv,
                r.dur,
                r.bounce,
              ],
            }))}
            footer={
              c.pages ? (
                <div className="px-4 pt-[17px] pb-[21px]">
                  <Pagination pages={c.pages} />
                </div>
              ) : (
                <div className="h-[20px]" />
              )
            }
          />
        </section>
      </div>
    </TrafficFrame>
  );
}
