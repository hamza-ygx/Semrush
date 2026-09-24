"use client";

import { Fragment, useState } from "react";
import { ExternalIcon } from "@/components/ui/icons";
import { DomainDot, TrafficFrame } from "../TrafficFrame";
import { Delta, DomainLegend, DomainSwitch, SampleCard, SegTabs } from "../ui";
import { TrendLines, fmtAxis } from "./charts";
import {
  channelBars,
  channelNames,
  countryByGroup,
  countryCols,
  journeySources,
  months,
  pageGroupDomains,
  pageGroupGrowing,
  pageGroupMetrics,
  pageGroupSummary,
  pageGroupTrend,
} from "./data";
import { Flag } from "./flags";
import { CardTitle } from "./ui";

const domains = pageGroupDomains;
const sumCols: [string, number][] = [
  ["Visits", 108],
  ["Unique Visitors", 153],
  ["Purchase Conversion", 188],
  ["Pages / Visit", 138],
  ["Avg. Visit Duration", 171],
  ["Bounce Rate", 138],
];

function SummaryTable() {
  return (
    <section className="overflow-clip rounded-lg bg-white shadow-card">
      <div className="flex h-[33px] items-center border-b border-[#e5e5e5] text-[12px] leading-4 text-rk-text-2">
        <div className="w-[320px] shrink-0 pl-[20px]">Target</div>
        {sumCols.map(([l, w]) => (
          <div key={l} className="shrink-0 text-right" style={{ width: w }}>
            {l}
          </div>
        ))}
      </div>
      {pageGroupSummary.map((r, i) => (
        <div key={domains[i].name} className="flex h-[37px] items-center border-b border-[#f1f1f1] text-[14px] leading-5 text-rk-text last:border-b-0">
          <div className="flex w-[320px] shrink-0 items-center gap-[9px] pl-[9px]">
            <DomainDot color={domains[i].color} />
            {domains[i].name}
          </div>
          {r.cells.map(([v, up], j) => (
            <div key={j} className="flex shrink-0 items-center justify-end gap-[11px] pr-[7px]" style={{ width: sumCols[j][1] }}>
              {v}
              <Delta up={up} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

const fmts = {
  pct: (v: number) => (v === 0 ? "0" : `${v}%`),
  num: (v: number) => `${v}`,
  time: (v: number) => (v === 0 ? "0" : `${String(Math.floor(v / 60)).padStart(2, "0")}:00`),
};

function TrendByGroup() {
  const [metric, setMetric] = useState<(typeof pageGroupMetrics)[number]>("Visits");
  const [on, setOn] = useState<Record<string, boolean>>({});
  const t = pageGroupTrend[metric];
  const keys = ["zara", "asos", "hm"] as const;
  const series = keys.map((k, i) => ({ name: domains[i].name, color: domains[i].color, data: t.data[k] })).filter((s) => on[s.name] !== false);
  return (
    <SampleCard title="Trend by Page Group" bodyClassName="px-5 pt-[15px] pb-[20px]">
      <SegTabs items={pageGroupMetrics} onChange={setMetric} />
      <div className="mt-[22px]">
        <TrendLines series={series} width={1196} plotH={221} ticks={t.ticks} labels={months.slice(0, 6)} fadeLast={false} format={t.fmt ? fmts[t.fmt] : fmtAxis} />
      </div>
      <DomainLegend domains={domains} className="mt-[16px]" onChange={setOn} />
    </SampleCard>
  );
}

function GrowingGroupPages() {
  const [cur, setCur] = useState(domains[0].name);
  return (
    <SampleCard title="Top Growing Pages" bodyClassName="px-5 pt-[21px] pb-[20px]">
      <DomainSwitch domains={domains} onChange={setCur} />
      <div className="mt-[21px] flex gap-4 overflow-hidden">
        {pageGroupGrowing[cur].map((p) => (
          <div key={p.url} className="h-[113px] w-[250px] shrink-0 rounded-[6px] border border-[#d7d9de] bg-white px-[16px] pt-[15px]">
            <div className="text-[24px] leading-[30px] font-semibold text-rk-text">{p.pct}</div>
            <div className="mt-[1px] text-[14px] leading-5 text-rk-text-2">
              {p.a} <span className="text-[#8b8d96]">vs.</span> {p.b}
            </div>
            <div className="mt-[14px] flex items-center justify-between text-[14px] leading-5 text-rk-text-2">
              <span className="truncate">{p.url}</span>
              <a href={`https://${p.url.split("/")[0]}`} target="_blank" rel="noopener noreferrer" aria-label="Open page" className="ml-2 text-[#a9abb6] hover:text-rk-link">
                <ExternalIcon width={16} height={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SampleCard>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="inline-block text-[#9a4ff0]">
      <path d="M6.5 3.5 7.6 7l3.4 1.1-3.4 1.1-1.1 3.4-1.1-3.4L2 8.1 5.4 7ZM12.2 1l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" fill="currentColor" />
    </svg>
  );
}

function ChannelsChart() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const W = 1196;
  const top = 8;
  const H = 251;
  const max = 400e3;
  const left = 106;
  const band = 108.4;
  const y = (v: number) => top + H - (v / max) * H;
  return (
    <SampleCard title="Traffic Channels" bodyClassName="px-5 pt-[35px] pb-[20px]">
      <div className="relative">
        <svg width={W} height={top + H + 29} className="block overflow-visible">
          <text x={0} y={0} transform={`translate(19 ${top + H / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6c6e79">
            Visits
          </text>
          {[0, 100e3, 200e3, 300e3, 400e3].map((t) => (
            <Fragment key={t}>
              <line x1={98} x2={W} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#d9dadd" : "#f0f0f1"} />
              <text x={84} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
                {fmtAxis(t)}
              </text>
            </Fragment>
          ))}
          {channelBars.map((vals, i) => {
            const cx = left + band * i + band / 2;
            return (
              <g key={channelNames[i]}>
                {vals.map((v, j) =>
                  v > 0 && on[domains[j].name] !== false ? (
                    <rect key={j} x={cx - 36 + j * 25} y={Math.min(y(v), top + H - 2)} width={22} height={Math.max(2, (v / max) * H)} rx={1} fill={domains[j].color} />
                  ) : null,
                )}
              </g>
            );
          })}
        </svg>
        {channelNames.map((n, i) => {
          const cx = left + band * i + band / 2;
          const ai = n === "AI Traffic" || n === "Google AI Mode";
          return (
            <div key={n} className="absolute flex w-[108px] items-center justify-center gap-[4px] text-[12px] leading-4 text-[#6c6e79]" style={{ left: cx - 54, top: top + H + 12 }}>
              <span className="max-w-[88px] truncate whitespace-nowrap">{n === "Google AI Mode" ? "Google AI Mo..." : n}</span>
              {ai && <Sparkle />}
            </div>
          );
        })}
      </div>
      <DomainLegend domains={domains} className="mt-[15px]" onChange={setOn} />
    </SampleCard>
  );
}

function Journey() {
  const [cur, setCur] = useState(domains[0].name);
  const [channel, setChannel] = useState("All Traffic Channels");
  const [open, setOpen] = useState(false);
  const rows0 = journeySources[cur];
  const gap = 8;
  const total = rows0.reduce((a, r) => a + r.h, 0) + gap * (rows0.length - 1);
  const barX = 148;
  const flowEnd = 782;
  const boxX = 804;
  const boxW = 231;
  const boxTop = 219;
  const boxH = 55;
  const thick = rows0.map((r) => Math.max(8, parseFloat(r.pct) * 2.085));
  const sum = thick.reduce((a, v) => a + v, 0);
  const rows: ((typeof rows0)[number] & { y: number; ty: number; th: number; fy: number; fh: number })[] = [];
  for (let i = 0, yy = 0, ty = boxTop + 3; i < rows0.length; i++) {
    const r = rows0[i];
    const th = (thick[i] / sum) * (boxH - 6);
    const f = Math.min(r.h, thick[i]);
    rows.push({ ...r, y: yy, ty, th, fy: yy + (r.h - f) / 2, fh: f });
    yy += r.h + gap;
    ty += th;
  }
  const outs = [
    { y: 0, h: 150 },
    { y: 160, h: 50 },
    { y: 220, h: 40 },
    { y: 270, h: 40 },
    { y: 320, h: 40 },
  ];
  const outPaths: string[] = [];
  for (let i = 0, oty = boxTop + 3; i < outs.length; i++) {
    const o = outs[i];
    const th = (o.h / 460) * (boxH - 6);
    outPaths.push(`M1072 ${oty}C1134 ${oty} 1134 ${o.y} 1196 ${o.y}L1196 ${o.y + o.h}C1134 ${o.y + o.h} 1134 ${oty + th} 1072 ${oty + th}Z`);
    oty += th;
  }
  const mid = (barX + 4 + flowEnd) / 2;
  return (
    <SampleCard title={<CardTitle info>Traffic Journey</CardTitle>} bodyClassName="px-5 pt-5 pb-[24px]">
      <DomainSwitch domains={domains} onChange={setCur} />
      <div className="relative mt-[21px] h-[27px]">
        <div className="absolute top-[3px] right-[1057px] text-right">
          <div className="text-[14px] leading-5 font-semibold text-rk-text">Top Sources</div>
          <div className="text-[12px] leading-4 text-[#6c6e79]">Out of 38</div>
        </div>
        <div className="absolute left-[156px]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-7 items-center gap-[8px] rounded-[6px] border border-[#d7d9de] bg-white pr-[7px] pl-[8px] text-[14px] leading-5 text-rk-text"
          >
            {channel}
            <svg viewBox="0 0 16 16" width={16} height={16} className={open ? "rotate-180" : ""}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="#191b23" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-[32px] left-0 z-40 min-w-[200px] rounded-md bg-white py-1 shadow-popover">
              {["All Traffic Channels", ...channelNames].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setChannel(c);
                    setOpen(false);
                  }}
                  className={`block w-full px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg ${c === channel ? "bg-[#e9f7ff]" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative mt-[36px] overflow-hidden" style={{ height: total }}>
        <svg width={1196} height={total} className="absolute inset-0 block">
          {rows.map((r) => (
            <path
              key={r.label}
              d={`M${barX + 4} ${r.fy}C${mid} ${r.fy} ${mid} ${r.ty} ${flowEnd} ${r.ty}L${flowEnd} ${r.ty + r.th}C${mid} ${r.ty + r.th} ${mid} ${r.fy + r.fh} ${barX + 4} ${r.fy + r.fh}Z`}
              fill="#e0e0f8"
            />
          ))}
          {outPaths.map((d) => (
            <path key={d} d={d} fill="#e0e0f8" />
          ))}
          {rows.map((r) => (
            <rect key={r.label} x={barX} y={r.y} width={4} height={r.h} fill="#6167e6" />
          ))}
          <path d={`M${boxX - 19} ${boxTop + boxH / 2}h13m-5-5 5 5-5 5`} fill="none" stroke="#6167e6" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${boxX + boxW + 14} ${boxTop + boxH / 2}h13m-5-5 5 5-5 5`} fill="none" stroke="#484a54" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {rows.map((r) => (
          <div key={r.label} className="absolute text-right" style={{ top: r.y + 1, right: 1196 - 139 }}>
            <div className="text-[14px] leading-5 whitespace-nowrap text-rk-text">{r.label}</div>
            <div className="mt-[3px] flex items-center justify-end gap-[7px] text-[14px] leading-5">
              <Delta up={r.up} />
              <span className="font-semibold text-rk-text">{r.pct}</span>
            </div>
          </div>
        ))}
        <div className="absolute flex items-center justify-center rounded-[4px] bg-[#6167e6] text-[14px] text-white" style={{ left: boxX, top: boxTop, width: boxW, height: boxH }}>
          Women jeans
        </div>
      </div>
    </SampleCard>
  );
}

function ByCountry() {
  const [metric, setMetric] = useState<"Visits" | "Unique Visitors">("Visits");
  return (
    <SampleCard title="Traffic by Country" bodyClassName="px-5 pt-5 pb-[21px]">
      <SegTabs items={["Visits", "Unique Visitors"] as const} onChange={setMetric} />
      <div className="mt-[18px] overflow-hidden">
        <div className="flex h-[35px] items-center border-b border-[#e5e5e5] text-[12px] leading-4 text-rk-text-2">
          <div className="w-[282px] shrink-0" />
          {countryCols.map((c) => (
            <div key={c.code} className="flex shrink-0 items-center justify-end gap-[6px]" style={{ width: c.width }}>
              <Flag code={c.code} />
              {c.name}
            </div>
          ))}
        </div>
        {countryByGroup.map((g, i) => {
          const vals = metric === "Visits" ? g.visits : g.uv;
          const maxIdx = vals.reduce((m, v, j, a) => (parseAbbr(v[1]) > parseAbbr(a[m][1]) ? j : m), 0);
          return (
            <div key={domains[i].name} className="flex h-[37px] items-center border-b border-[#f1f1f1] text-[14px] leading-5">
              <div className="flex w-[282px] shrink-0 items-center gap-[9px] pl-[9px] text-rk-text">
                <DomainDot color={domains[i].color} />
                {domains[i].name}
              </div>
              {countryCols.map((c, j) => (
                <div key={c.code} className="flex shrink-0 items-center justify-end" style={{ width: c.width }}>
                  <span className="text-[#6c6e79]">{vals[j][0]}</span>
                  <span className={`w-[76px] text-right ${j === maxIdx ? "font-semibold text-rk-text" : vals[j][1] === "n/a" ? "text-[#6c6e79]" : "text-rk-text"}`}>{vals[j][1]}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </SampleCard>
  );
}

function parseAbbr(s: string) {
  const n = parseFloat(s);
  if (Number.isNaN(n)) return -1;
  return s.endsWith("M") ? n * 1e6 : s.endsWith("K") ? n * 1e3 : n;
}

export function PageGroups() {
  return (
    <TrafficFrame
      title="Page Groups"
      domains={pageGroupDomains}
      titleExtra={<span className="-ml-[7px] flex h-4 items-center rounded-full bg-[#ff7a1a] px-[5px] text-[11px] leading-none font-semibold text-white">beta</span>}
    >
      <div className="flex flex-col gap-4">
        <SummaryTable />
        <TrendByGroup />
        <GrowingGroupPages />
        <ChannelsChart />
        <Journey />
        <ByCountry />
      </div>
      <div className="h-[38px]" />
    </TrafficFrame>
  );
}
