"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { TrafficFrame } from "../TrafficFrame";
import { DomainLegend, ExportButton, SampleCard, SegTabs } from "../ui";
import { doms, series } from "./data";
import { fmtM } from "./ui";

const DAYS = 87;
const SOLID = 51;
const start = Date.UTC(2026, 7, 1);
const dayLabel = (i: number) => new Date(start + i * 864e5).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

type S = { data: number[]; sparse?: boolean };

function DailyChart({
  width,
  plotH,
  ticks,
  lines,
  labelIdx,
  visible,
  labelW = 26,
  right = 0,
}: {
  width: number;
  plotH: number;
  ticks: number[];
  lines: S[];
  labelIdx: number[];
  visible: boolean[];
  labelW?: number;
  right?: number;
}) {
  const top = 6;
  const x0 = labelW + 13;
  const max = ticks[ticks.length - 1];
  const x = (i: number) => x0 + (i / (DAYS - 1)) * (width - right - x0);
  const y = (v: number) => top + plotH - (Math.min(v, max * 1.02) / max) * plotH;
  const pts = (d: number[], from: number, to: number) =>
    d
      .slice(from, to)
      .map((v, k) => `${x(from + k).toFixed(1)},${y(v).toFixed(1)}`)
      .join(" ");
  return (
    <svg width={width} height={top + plotH + 26} className="block overflow-visible">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x0} x2={width - right} y1={y(t)} y2={y(t)} stroke={t ? "#eceef0" : "#d9dbe0"} />
          <text x={labelW} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {fmtM(t)}
          </text>
        </g>
      ))}
      {labelIdx.map((i, k) => (
        <text key={i} x={x(i)} y={top + plotH + 22} textAnchor={k === 0 ? "start" : i >= DAYS - 2 ? "end" : "middle"} fontSize={12} fill="#6a6c6a">
          {dayLabel(i)}
        </text>
      ))}
      {lines.map((s, j) =>
        visible[j] ? (
          <g key={j} stroke={doms[j].color} fill="none" strokeWidth={2.2} strokeLinejoin="round">
            <polyline points={pts(s.data, SOLID - 1, DAYS)} strokeOpacity={0.3} />
            {s.sparse ? (
              <>
                <polyline points={pts(s.data, 0, SOLID)} strokeDasharray="2 4" strokeOpacity={0.4} />
                {s.data.slice(0, SOLID).map((v, i) => (i % 8 === 0 ? <circle key={i} cx={x(i)} cy={y(v)} r={3} fill={doms[j].color} stroke="none" /> : null))}
              </>
            ) : (
              <polyline points={pts(s.data, 0, SOLID)} />
            )}
          </g>
        ) : null,
      )}
    </svg>
  );
}

type Card = { key: string; title: string; ticks: number[]; href?: string; lines: S[]; labelW: number; labels?: number[] };

const lblA = [0, 16, 30, 43, 57, 71, 85];
const lblB = [0, 15, 29, 43, 56, 69, 85];

const mk = (seed: number, levels: [number, number, number], noise: [number, number, number], o: { spikes?: number; amp?: number; fore?: number[] } = {}) =>
  levels.map((b, j) => {
    const d = series(seed + j * 7, DAYS, b, noise[j], { spikes: o.spikes, spikeAmp: o.amp ? o.amp * (j === 0 ? 0.4 : 1) : undefined, weekly: noise[j] * 0.3 });
    const f = o.fore?.[j] ?? 1;
    return { data: d.map((v, i) => (i >= SOLID ? b * f + (v - b) * 0.35 : v)) };
  });

const cards: Card[] = [
  { key: "direct", title: "Direct", ticks: [0, 1e6, 2e6, 3e6], labelW: 22, lines: mk(11, [1.6e6, 0.95e6, 1.7e6], [0.12e6, 0.07e6, 0.18e6], { fore: [1.15, 1.1, 1.3] }) },
  { key: "referral", title: "Referral", href: routes.traffic.referral, ticks: [0, 5e5, 1e6], labelW: 34, labels: lblA, lines: mk(21, [1.6e5, 2.6e5, 2.8e5], [0.5e5, 0.8e5, 0.9e5], { spikes: 0.12, amp: 3.5e5, fore: [1.1, 1.0, 1.1] }) },
  { key: "ai", title: "AI Traffic", href: routes.traffic.aiTraffic, ticks: [0, 1e4, 2e4, 3e4], labelW: 26, labels: lblB, lines: mk(31, [2.5e3, 4e3, 5e3], [1.5e3, 2.5e3, 3e3], { spikes: 0.1, amp: 1.4e4 }) },
  { key: "aimode", title: "Google AI Mode", href: routes.traffic.aiTraffic, ticks: [0, 5e3, 1e4, 1.5e4], labelW: 26, labels: [0, 15, 29, 42, 55, 68, 85], lines: mk(41, [600, 900, 1200], [400, 600, 800], { spikes: 0.05, amp: 7e3 }) },
  { key: "organic", title: "Organic Search", href: routes.traffic.organicSearch, ticks: [0, 5e5, 1e6], labelW: 38, labels: [0, 16, 30, 43, 57, 85], lines: mk(51, [3.6e5, 2.2e5, 6.2e5], [0.4e5, 0.3e5, 0.7e5], { fore: [1.05, 1.1, 1.18] }) },
  { key: "social", title: "Organic Social", href: routes.traffic.organicSocial, ticks: [0, 5e4, 1e5, 1.5e5, 2e5], labelW: 34, labels: lblA, lines: mk(61, [2e4, 5e4, 6e4], [1e4, 2.5e4, 3e4], { spikes: 0.14, amp: 8e4, fore: [0.9, 0.9, 1.3] }) },
  { key: "paid", title: "Paid Search", href: routes.traffic.paidSearch, ticks: [0, 1e5, 2e5, 3e5], labelW: 34, lines: mk(71, [2e4, 1.6e5, 1.2e4], [1e4, 4e4, 8e3], { spikes: 0.08, amp: 6e4 }) },
  { key: "paidsocial", title: "Paid Social", href: routes.traffic.paidSocial, ticks: [0, 5e3, 1e4, 1.5e4], labelW: 26, lines: mk(81, [300, 1500, 500], [200, 1200, 300], { spikes: 0.06, amp: 7e3 }) },
  { key: "email", title: "Email", href: routes.traffic.email, ticks: [0, 2e4, 4e4, 6e4, 8e4], labelW: 26, labels: lblB, lines: mk(91, [1.8e4, 3.2e4, 2.9e4], [1e4, 1.8e4, 1.3e4], { spikes: 0.08, amp: 2.5e4 }) },
  {
    key: "display",
    title: "Display Ads",
    href: routes.traffic.displayAds,
    ticks: [0, 2e4, 4e4, 6e4],
    labelW: 26,
    labels: lblB,
    lines: mk(101, [6e3, 2.6e4, 2.2e4], [5e3, 1.4e4, 1.3e4], { spikes: 0.08, amp: 2e4 }).map((l, j) => (j === 0 ? { ...l, sparse: true } : l)),
  },
];

const small = [0, 15, 28, 41, 54, 67, 85];
const channels = ["Direct", "Referral", "AI Traffic", "Organic Search", "Paid Search", "Organic Social", "Paid Social", "Email", "Display Ads"] as const;
const channelKey: Record<(typeof channels)[number], string> = {
  Direct: "direct",
  Referral: "referral",
  "AI Traffic": "ai",
  "Organic Search": "organic",
  "Paid Search": "paid",
  "Organic Social": "social",
  "Paid Social": "paidsocial",
  Email: "email",
  "Display Ads": "display",
};
const metrics = ["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"] as const;
const bigLabels = [0, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85];

const totalLines = mk(3, [2.3e6, 1.7e6, 2.8e6], [0.15e6, 0.15e6, 0.22e6], { spikes: 0.04, amp: 0.5e6, fore: [1.1, 1.08, 1.22] });

function useVis() {
  const [v, setV] = useState([true, true, true]);
  return [v, (r: Record<string, boolean>) => setV(doms.map((d) => r[d.name]))] as const;
}

function SmallCard({ c }: { c: Card }) {
  const [vis, setVis] = useVis();
  return (
    <SampleCard title={c.title} extra={<ExportButton />} bodyClassName="flex h-[329px] flex-col px-5 pt-[18px] pb-[21px]" className="h-full">
      <div data-testid={`dt-${c.key}`}>
        <DailyChart width={570} plotH={176} ticks={c.ticks} lines={c.lines} labelIdx={c.labels ?? small} visible={vis} labelW={c.labelW} right={10} />
      </div>
      <DomainLegend className="mt-[15px]" onChange={setVis} />
      {c.href && (
        <Link
          href={c.href}
          className="mt-auto inline-flex h-7 items-center self-start rounded-[6px] border border-[#d8dad9] bg-[#f9fafa] px-[8px] text-[14px] leading-5 whitespace-nowrap text-rk-text-2 hover:bg-rk-hover"
        >
          View dashboard
        </Link>
      )}
    </SampleCard>
  );
}

export function DailyTrends() {
  const [visA, setVisA] = useVis();
  const [visB, setVisB] = useVis();
  const [channel, setChannel] = useState<(typeof channels)[number]>("Direct");
  const [metric, setMetric] = useState<(typeof metrics)[number]>("Visits");
  const ch = cards.find((c) => c.key === channelKey[channel])!;
  const scale = metric === "Visits" ? 1 : metric === "Unique Visitors" ? 0.55 : 1;
  const mt = metric === "Visits" || metric === "Unique Visitors" ? totalLines.map((l) => ({ data: l.data.map((v) => v * scale) })) : totalLines;
  const chMax = ch.ticks[ch.ticks.length - 1];
  const chTicks = ch.key === "direct" ? [0, 1e6, 2e6, 3e6] : [0, chMax / 3, (2 * chMax) / 3, chMax];
  return (
    <TrafficFrame
      title="Daily Trends"
      filters={["geo", "date", { key: "granularity", value: "Daily", options: ["Daily", "Weekly"] }, "device"]}
    >
      <div className="flex flex-col gap-4">
        <SampleCard title="Traffic Trend" bodyClassName="px-5 pt-[21px] pb-[20px]">
          <SegTabs items={metrics} onChange={setMetric} />
          <div className="mt-[17px]">
            <DailyChart width={1196} plotH={208} ticks={[0, 2e6, 4e6, 6e6]} lines={mt} labelIdx={bigLabels} visible={visA} labelW={24} />
          </div>
          <DomainLegend className="mt-[15px]" onChange={setVisA} />
        </SampleCard>

        <SampleCard title="Traffic Channel Trend" bodyClassName="px-5 pt-[21px] pb-[20px]">
          <SegTabs items={channels} onChange={setChannel} />
          <div className="mt-[17px]" data-testid="dt-channel">
            <DailyChart width={1196} plotH={153} ticks={chTicks} lines={ch.lines} labelIdx={bigLabels} visible={visB} labelW={24} />
          </div>
          <DomainLegend className="mt-[15px]" onChange={setVisB} />
        </SampleCard>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((c) => (
            <SmallCard key={c.key} c={c} />
          ))}
        </div>
      </div>
    </TrafficFrame>
  );
}
