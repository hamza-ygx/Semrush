"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { CloseIcon, ChevronDown } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { BubbleMap, GoogleG, StackedBars } from "./charts";
import {
  bubbles,
  competitorsTop,
  googleUpdates,
  intents,
  keywordsSpark,
  metricChanges,
  type MetricChange,
  linkingFeatures,
  monthLabels,
  notLinkingFeatures,
  overviewNotes,
  overviewTrend,
  overviewTrendLabels,
  redFlags,
  serpTrend,
  serpTrendColors,
  summary,
  topChanges,
  topKeywords,
  topPages,
  trafficSpark,
  trendColors,
  trendLegend,
  type SerpFeature,
  type TrendKey,
} from "./data";
import { SerpIcon } from "./serpIcons";
import { useOrganicLive, useOrganicQ } from "./context";
import { CardTitle, DarkButton, ExtLink, HoverTip, KeywordLink, LegendCheck, NotesMenu, PinIcon, Segmented, SortIcon, TimeRange, domainHref } from "./ui";

const Q = "?db=se&q=rkjh.se&searchType=domain";

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg bg-white shadow-card ${className}`}>{children}</div>;
}

export function Delta({ v }: { v: string }) {
  return <span className={`ml-1 text-[12px] ${v.startsWith("-") ? "text-rk-danger" : "text-rk-muted"}`}>{v}</span>;
}

function ChangeTip({ tip, delta }: { tip: MetricChange; delta: string }) {
  const row = "flex h-6 items-center justify-between gap-[13px]";
  const live = useOrganicLive();
  return (
    <span className="block text-left">
      <span className={row}>
        Current ({live?.months.current ?? "September 2026"})<b className="font-semibold">{tip.current}</b>
      </span>
      <span className={row}>
        Previous ({live?.months.previous ?? "August 2026"})<b className="font-semibold">{tip.previous}</b>
      </span>
      <span className="my-[2px] block border-t border-rk-border" />
      <span className={row}>
        Difference
        <b className={`font-semibold ${delta.startsWith("-") ? "text-rk-danger" : ""}`}>
          {tip.diff}&nbsp; ({delta.replace("-", "")})
        </b>
      </span>
    </span>
  );
}

function MetricBlock({ id, label, value, delta, tip, children, className = "", onClick }: { id: string; label: string; value: string; delta: string; tip: MetricChange; children?: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={`shrink-0 whitespace-nowrap ${className}`}>
      <div className="text-[14px] leading-5 text-rk-text">{label}</div>
      <div className="mt-[2px] flex items-baseline">
        {onClick ? (
          <button type="button" onClick={onClick} className="text-[24px] leading-8 font-bold text-rk-text">
            {value}
          </button>
        ) : (
          <span className="text-[24px] leading-8 font-bold text-rk-text">{value}</span>
        )}
        <HoverTip label={<ChangeTip tip={tip} delta={delta} />} className="[&>[role=tooltip]]:!bottom-[calc(100%+8px)] [&>[role=tooltip]]:!ml-[3px] [&>[role=tooltip]]:!pt-[10px] [&>[role=tooltip]]:!pb-[10px] [&>[role=tooltip]]:!pr-3 [&>[role=tooltip]]:!pl-[13px]">
          <span data-testid={`metric-delta-${id}`} className="cursor-default">
            <Delta v={delta} />
          </span>
        </HoverTip>
      </div>
      {children}
    </div>
  );
}

export function KwSpark({ className = "mt-[3px]" }: { className?: string }) {
  const max = Math.max(...keywordsSpark);
  return (
    <div className={`flex h-[19px] w-[160px] items-end gap-px ${className}`}>
      {keywordsSpark.map((v, i) => (
        <div key={i} className="flex-1" style={{ height: `${(v / max) * 100}%`, background: i === keywordsSpark.length - 1 ? "#6d72e0" : "#b3c1f8" }} />
      ))}
    </div>
  );
}

export function TrafficSpark({ className = "mt-[3px]", data }: { className?: string; data?: number[] }) {
  const w = 158;
  const h = 19;
  const values = data && data.length > 1 ? data : trafficSpark;
  const max = Math.max(...values) || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * (w - 4), h - 1 - (v / max) * (h - 5)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={w} height={h} className={`block overflow-visible ${className}`}>
      <path d={`${d}L${lx} ${h}L0 ${h}Z`} fill="#e3e5fb" />
      <path d={d} fill="none" stroke="#6167e6" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={3} fill="#6167e6" />
    </svg>
  );
}

const Sep = () => <div className="mx-6 mt-[19px] h-[76px] w-px shrink-0 bg-rk-border" />;

function TrendTip({ title, values, keys, colors = trendColors }: { title: string; values: number[]; keys: TrendKey[]; colors?: Record<TrendKey, string> }) {
  return (
    <div className="px-3 pt-3 pb-3 text-[12px] leading-[18px] text-rk-text">
      <div className="leading-4 text-rk-muted">{title}</div>
      <div className="mt-2">
        {trendLegend.map((l) => (
          <div key={l.key} className="flex items-center">
            <span className="mr-[9px] h-2 w-2 rounded-full" style={{ background: colors[l.key] }} />
            {l.label}
            <b className="ml-auto font-semibold">{values[keys.indexOf(l.key)]}</b>
          </div>
        ))}
      </div>
      <div className="mt-2 flex border-t border-rk-border pt-[7px]">
        Total
        <b className="ml-auto font-semibold">{values.reduce((a, b) => a + b, 0)}</b>
      </div>
    </div>
  );
}

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthOf = (i: number, n: number) => {
  const m = 2026 * 12 + 8 - (n - 1 - i);
  return `${MONTH_NAMES[m % 12]} ${Math.floor(m / 12)}`;
};

function TrendLegend({ keys, on, toggle, colors = trendColors }: { keys: { key: TrendKey; label: string }[]; on: Record<string, boolean>; toggle: (k: TrendKey) => void; colors?: Record<TrendKey, string> }) {
  return (
    <div className="flex items-center gap-4">
      {keys.map((k) => (
        <LegendCheck key={k.key} color={colors[k.key]} label={k.label} checked={on[k.key]} onChange={() => toggle(k.key)} />
      ))}
    </div>
  );
}

export function useTrendChart({ data, labels, ticks, max, height, pad, notes, googles, flags, barRatio, highlightLast = true, inset = 0, tipTitle, testId, tipTop = 73, marker = true, palette, labelY }: {
  data: number[][];
  labels: string[];
  ticks: number[];
  max: number;
  height: number;
  pad: { top: number; right: number; bottom: number; left: number };
  notes?: { index: number; label: string }[];
  googles?: number[];
  flags?: number[];
  barRatio?: number;
  highlightLast?: boolean;
  inset?: number;
  tipTitle?: (i: number) => string;
  testId?: string;
  tipTop?: number;
  marker?: boolean;
  palette?: Partial<Record<TrendKey, string>>;
  labelY?: number;
}) {
  const colors: Record<TrendKey, string> = { ...trendColors, ...palette };
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(trendLegend.map((l) => [l.key, true])));
  const keys: TrendKey[] = ["top3", "4-10", "11-20", "21-50", "51-100", "serp"];
  const filtered = data.map((d) => d.map((v, i) => (on[keys[i]] ? v : 0)));
  return {
    legend: <TrendLegend colors={colors} keys={trendLegend} on={on} toggle={(k) => setOn((o) => ({ ...o, [k]: !o[k] }))} />,
    chart: (
      <StackedBars
        data={filtered}
        colors={keys.map((k) => colors[k])}
        labelY={labelY}
        height={height}
        max={max}
        ticks={ticks}
        labels={labels}
        pad={pad}
        barRatio={barRatio}
        highlightLast={highlightLast}
        tickX={-19}
        inset={inset}
        testId={testId}
        tip={tipTitle && { width: 180, top: tipTop, render: (i) => <TrendTip title={tipTitle(i)} values={filtered[i]} keys={keys} colors={colors} />, marker: marker ? (x, y) => <GoogleG x={x - 1} y={y} size={22} /> : undefined }}
        overlay={({ x, y }) => (
          <>
            {notes?.map((n) => (
              <g key={n.label}>
                <line x1={x(n.index)} x2={x(n.index)} y1={pad.top - 10} y2={y(0)} stroke="#a9abaa" strokeDasharray="3 3" />
                <text transform={`translate(${x(n.index) - 6} ${y(0) - 40}) rotate(-90)`} fontSize="12" fill="#6a6c6a">
                  {n.label}
                </text>
              </g>
            ))}
            {googles?.map((i) => <GoogleG key={i} x={x(i)} y={y(0)} size={11} />)}
            {flags?.map((i) => (
              <path key={i} d={`M${x(i) - 3} ${y(0) + 5}V${y(0) - 6}h8v7h-8`} fill="#f5222d" />
            ))}
          </>
        )}
      />
    ),
  };
}

function SummaryCard() {
  const t = useTrendChart({
    data: overviewTrend,
    labels: overviewTrend.map((_, i) => (i % 12 === 0 ? overviewTrendLabels[i / 12] : "")),
    ticks: [0, 200, 400],
    max: 500,
    height: 205,
    pad: { top: 10, right: 21, bottom: 36, left: 72 },
    notes: overviewNotes,
    googles: googleUpdates,
    flags: redFlags,
    barRatio: 0.55,
    tipTitle: (i) => monthOf(i, overviewTrend.length),
    testId: "trend-chart",
  });
  const [open, setOpen] = useState(true);
  const live = useOrganicLive();
  const sum = live ? { ...summary, ...live.summary } : summary;
  const tips = live ? { ...metricChanges, ...live.tips } : metricChanges;
  return (
    <Card>
      <div className={`relative flex h-[115px] px-5 pt-[19px] ${open ? "border-b border-rk-border" : ""}`}>
        <MetricBlock id="keywords" label="Keywords" {...sum.keywords} tip={tips.keywords} className="w-[161px]" onClick={() => setOpen(true)}>
          <KwSpark />
        </MetricBlock>
        <Sep />
        <MetricBlock id="traffic" label="Traffic" {...sum.traffic} tip={tips.traffic} className="w-[160px]">
          <TrafficSpark data={live?.trafficSpark} />
        </MetricBlock>
        <Sep />
        <MetricBlock id="cost" label="Traffic Cost" value={sum.cost.value} delta={sum.cost.delta} tip={tips.cost} className="w-[131px]" />
        <Sep />
        <MetricBlock id="branded" label="Branded Traffic" value={sum.branded.value} delta={sum.branded.delta} tip={tips.branded} className="w-[103px]" />
        <Sep />
        <MetricBlock id="non-branded" label="Non-Branded Traffic" value={sum.nonBranded.value} delta={sum.nonBranded.delta} tip={tips.nonBranded} />
        {open && <span className="absolute -bottom-[6px] left-[94px] h-[11px] w-[11px] rotate-45 border-t border-l border-rk-border bg-white" />}
      </div>
      {open ? (
        <div className="px-5 pt-[19px] pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] leading-6 font-semibold">Organic Keywords Trend</h2>
            <button type="button" aria-label="Close" data-testid="trend-close" onClick={() => setOpen(false)} className="-mr-[2px] text-rk-muted hover:text-rk-text">
              <CloseIcon width={14} height={14} />
            </button>
          </div>
          <div className="mt-[21px] flex items-center justify-between">
            <div className="flex items-center">
              {t.legend}
              <span className="mx-4 h-7 w-px bg-rk-border" />
              <NotesMenu />
            </div>
            <TimeRange value="All time" />
          </div>
          <div className="-mx-5 mt-[18px]">{t.chart}</div>
        </div>
      ) : null}
    </Card>
  );
}

const th = "text-[12px] leading-4 font-normal text-rk-text";

type TopKw = { keyword: string; position: number | "local"; sf: number | null; volume: string; traffic: string };

function TopKeywordsCard() {
  const [tab, setTab] = useState<"All Positions" | "Organic" | "SERP Features">("All Positions");
  const live = useOrganicLive();
  const q = useOrganicQ();
  const list: TopKw[] = live ? live.rows.slice(0, 5).map((r) => ({ keyword: r.keyword, position: r.position, sf: r.sf, volume: r.volume, traffic: r.pct })) : topKeywords;
  return (
    <Card className="h-[416px]">
      <CardTitle>Top Keywords</CardTitle>
      <div className="px-5 pt-4">
        <Segmented options={["All Positions", "Organic", "SERP Features"] as const} value={tab} onChange={setTab} size="s" />
      </div>
      <table className="mt-[7px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[86px]" />
          <col className="w-[45px]" />
          <col className="w-[69px]" />
          <col className="w-[108px]" />
        </colgroup>
        <thead>
          <tr className="h-[31px] border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>Keyword</th>
            <th className={`${th} text-right`}>Position</th>
            <th className={`${th} text-right`}>SF</th>
            <th className={`${th} text-right`}>Volume</th>
            <th className={`${th} pr-5 text-right`}>
              <span className="inline-flex items-center gap-1">
                Traffic % <SortIcon className="text-rk-text-2" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {(tab === "SERP Features" ? list.filter((k) => k.position === "local") : tab === "Organic" ? list.filter((k) => k.position !== "local") : list).map((k, i) => (
            <tr key={i} className="border-b border-rk-border align-top">
              <td className="py-2 pl-5">
                <KeywordLink keyword={k.keyword} />
              </td>
              <td className="py-2 text-right">{k.position === "local" ? <PinIcon className="ml-auto text-rk-link" /> : k.position}</td>
              <td className="py-2 text-right">
                {k.sf == null ? (
                  "n/a"
                ) : (
                  <button type="button" className="text-rk-text-2 underline decoration-dashed decoration-1 underline-offset-[5px]">
                    {k.sf}
                  </button>
                )}
              </td>
              <td className="py-2 text-right">{k.volume}</td>
              <td className="py-2 pr-5 text-right">{k.traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-5">
        <DarkButton href={routes.organic.positions + q}>View all {live ? live.keywords.toLocaleString("en-US") : 134} keywords</DarkButton>
      </div>
    </Card>
  );
}

function IntentCard() {
  return (
    <Card className="h-[416px]">
      <CardTitle>Keywords by Intent</CardTitle>
      <div className="flex h-[15px] gap-[2px] px-5" style={{ marginTop: 21 }}>
        {intents.map((it, i) => (
          <div key={it.key} title={`${it.label} ${it.pct}`} className={`h-full ${i === intents.length - 1 ? "rounded-r-sm" : ""} ${i === 0 ? "rounded-l-sm" : ""}`} style={{ width: `${it.share}%`, background: it.color }} />
        ))}
      </div>
      <table className="mt-[16px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[103px]" />
          <col className="w-[101px]" />
          <col className="w-[108px]" />
        </colgroup>
        <thead>
          <tr className="h-[31px] border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>Intent</th>
            <th />
            <th className={`${th} text-right`}>Keywords</th>
            <th className={`${th} pr-5 text-right`}>Traffic</th>
          </tr>
        </thead>
        <tbody>
          {intents.map((it) => (
            <tr key={it.key} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-[6px]">
                  <span className="h-3 w-3 rounded-full" style={{ background: it.color }} />
                  {it.label}
                </span>
              </td>
              <td className="text-right">
                <Link href={routes.organic.positions + Q} className="text-rk-link hover:text-rk-link-hover">
                  {it.pct}
                </Link>
              </td>
              <td className="text-right">{it.keywords}</td>
              <td className="pr-5 text-right">{it.traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[20px]">
        <DarkButton href={routes.organic.positions + Q}>View full report</DarkButton>
      </div>
    </Card>
  );
}

function NothingFound() {
  return (
    <div className="flex flex-col items-center pt-[53px]">
      <svg width="78" height="78" viewBox="0 0 78 78">
        <path d="M37 1c5 0 7 3 11 3s7-1 10 2 2 6 5 9 7 5 8 9-2 7-1 11 5 7 3 11-6 5-8 8-1 8-5 10-7 0-11 2-6 6-11 6-7-3-11-4-8 1-11-2-2-6-5-9-8-4-9-8 2-7 1-11-4-8-2-12 6-4 8-8 1-8 5-10 7 0 11-2 5-5 10-5z" fill="#e0e2e1" />
        <g transform="rotate(-13 39 40)">
          <rect x="7.5" y="23" width="60" height="41" rx="3.5" fill="#fff" stroke="#6a6c6a" strokeWidth="1.3" />
          <rect x="10" y="19" width="60" height="41" rx="3.5" fill="#fff" stroke="#6a6c6a" strokeWidth="1.5" />
          <path d="M13.5 19h53a3.5 3.5 0 0 1 3.5 3.5V28H10v-5.5a3.5 3.5 0 0 1 3.5-3.5z" fill="#6a6c6a" />
          <circle cx="15" cy="23.5" r="1.6" fill="#fff" />
          <circle cx="20" cy="23.5" r="1.6" fill="#fff" />
          <path d="M31 28v32M50 28v32M13 44h54" stroke="#6a6c6a" strokeWidth="1.2" />
        </g>
      </svg>
      <div className="mt-[13px] text-[16px] leading-6 font-semibold text-rk-muted">Nothing found</div>
      <div className="mt-[4px] text-[14px] text-rk-muted">Try changing your filters.</div>
    </div>
  );
}

function ChangesCard() {
  const [tab, setTab] = useState<"New" | "Lost" | "Improved" | "Declined">("New");
  const live = useOrganicLive();
  const q = useOrganicQ();
  const rows: readonly { keyword: string; previous: number | null; current: number | null; volume: string; traffic: string }[] = live?.moves ? live.moves.top[tab] : topChanges[tab];
  return (
    <Card className="h-[335px]">
      <CardTitle>Top Position Changes in Organic</CardTitle>
      <div className="px-5 pt-4">
        <Segmented options={["New", "Lost", "Improved", "Declined"] as const} value={tab} onChange={setTab} size="s" />
      </div>
      {rows.length ? (
        <>
          <table className="mt-[13px] w-full table-fixed text-[14px]">
            <colgroup>
              <col />
              <col className="w-[80px]" />
              <col className="w-[65px]" />
              <col className="w-[72px]" />
              <col className="w-[108px]" />
            </colgroup>
            <thead>
              <tr className="h-[31px] border-b border-rk-border">
                <th className={`${th} pl-5 text-left`}>Keyword</th>
                <th className={`${th} text-right`}>Previous</th>
                <th className={`${th} text-right`}>Current</th>
                <th className={`${th} text-right`}>Volume</th>
                <th className={`${th} pr-5 text-right`}>
                  <span className="inline-flex items-center gap-1">
                    Traffic % <SortIcon className="text-rk-text-2" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 3).map((r, i) => (
                <tr key={i} className="h-[37px] border-b border-rk-border">
                  <td className="pl-5">
                    <KeywordLink keyword={r.keyword} />
                  </td>
                  <td className="text-right text-[#a9abaa]">{r.previous ?? <span className="mr-6">·</span>}</td>
                  <td className="pr-[13px] text-right">{r.current ?? <span className="text-[#a9abaa]">·</span>}</td>
                  <td className="text-right">{r.volume}</td>
                  <td className="pr-5 text-right">{r.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length < 3 && <div className="pt-[26px] text-center text-[13px] text-rk-muted">No more results</div>}
          <div className="px-5 pt-[17px]">
            <DarkButton href={`${routes.organic.changes}?sortField=traffic&${q.slice(1)}`}>View keyword{rows.length > 1 ? "s" : ""}</DarkButton>
          </div>
        </>
      ) : (
        <NothingFound />
      )}
    </Card>
  );
}

function SerpChangesCard() {
  const [tab, setTab] = useState<"New" | "Lost">("New");
  return (
    <Card className="h-[335px]">
      <CardTitle>Top Position Changes in SERP Features</CardTitle>
      <div className="px-5 pt-4">
        <Segmented options={["New", "Lost"] as const} value={tab} onChange={setTab} size="s" />
      </div>
      <NothingFound />
    </Card>
  );
}

function BrandPresence() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="h-[137px] overflow-hidden rounded-lg border border-[#d4dafc] bg-white shadow-card">
      <div className="flex h-[43px] items-center justify-between bg-[#eaf0ff] pr-[19px] pl-[20px]">
        <div className="flex items-center">
          <span className="flex h-[23px] w-[23px] items-center justify-center rounded bg-[#f3e9ff] text-[#a35ee8]">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M8 1.5 12 5.5 8 9.5 4 5.5zM2.5 9.5 8 13l5.5-3.5M2.5 12.5 5 11" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
            </svg>
          </span>
          <span className="ml-[8px] text-[16px] leading-6 font-semibold text-rk-text">Brand Presence in AI Platforms</span>
          <span className="mx-[9px] h-5 w-px bg-[#d6d8d7]" />
          <span className="text-[14px] text-rk-muted">Domain:</span>
          <span className="ml-1 text-[14px] text-rk-muted blur-[4px] select-none">rkjh</span>
        </div>
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-rk-text-2 hover:text-rk-text">
          <CloseIcon width={14} height={14} />
        </button>
      </div>
      <div className="flex px-[17px] pt-[22px]">
        <div className="w-[167px] whitespace-nowrap">
          <div className="text-[14px] leading-5 text-rk-text">Market Share in ChatGPT</div>
          <button type="button" className="mt-[6px] flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
            Scan LLMs
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M9.5 2.5h4v4M13.3 2.7 8 8M11.5 9.5v3.2c0 .5-.3.8-.8.8H3.3c-.5 0-.8-.3-.8-.8V5.3c0-.5.3-.8.8-.8h3.2" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <span className="mx-6 h-[55px] w-px bg-rk-border" />
        <div className="w-[152px] whitespace-nowrap">
          <div className="text-[14px] leading-5 text-rk-text">Areas for Improvement</div>
          <div className="mt-[7px] text-[24px] leading-7 font-bold">5</div>
        </div>
        <span className="mx-6 h-[55px] w-px bg-rk-border" />
        <div>
          <div className="text-[14px] leading-5 text-rk-text">Top Query Intent</div>
          <div className="mt-[6px] flex gap-[4px]">
            {["Research", "Comparison", "Purchase", "..."].map((p) => (
              <span key={p} className="flex h-[27px] items-center rounded-full bg-[#ececee] px-[9px] text-[14px] text-rk-muted">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SerpTrendCard() {
  const [on, setOn] = useState({ imagePack: true, paa: true, localPack: true });
  const data = serpTrend.map(([a, b, c]) => [on.imagePack ? a : 0, on.paa ? b : 0, on.localPack ? c : 0]);
  return (
    <Card className="h-[387px]">
      <CardTitle>SERP Features Trend</CardTitle>
      <div className="flex items-center justify-between px-5 pt-[21px]">
        <div className="flex items-center gap-4">
          <LegendCheck color={serpTrendColors.imagePack} label="Image pack" checked={on.imagePack} onChange={() => setOn((o) => ({ ...o, imagePack: !o.imagePack }))} />
          <LegendCheck color={serpTrendColors.paa} label="People also ask" checked={on.paa} onChange={() => setOn((o) => ({ ...o, paa: !o.paa }))} />
          <LegendCheck color={serpTrendColors.localPack} label="Local pack" checked={on.localPack} onChange={() => setOn((o) => ({ ...o, localPack: !o.localPack }))} />
          <Popover
            panelClassName="w-[220px]"
            trigger={({ toggle, open }) => (
              <button type="button" onClick={toggle} className="flex h-7 items-center gap-[3px] rounded-md border border-rk-border-strong bg-white px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-bg">
                Other: 1 selected
                <ChevronDown className={`text-rk-text ${open ? "rotate-180" : ""}`} />
              </button>
            )}
          >
            {(close) =>
              ["Local pack", "Sitelinks", "Reviews", "Video", "AI Overview"].map((o) => (
                <MenuItem key={o} onClick={close}>
                  {o}
                </MenuItem>
              ))
            }
          </Popover>
        </div>
        <TimeRange value="1M" />
      </div>
      <div className="mt-[12px]">
        <StackedBars
          data={data}
          colors={[serpTrendColors.imagePack, serpTrendColors.paa, serpTrendColors.localPack]}
          height={214}
          max={8}
          ticks={[0, 2, 4, 6, 8]}
          labels={monthLabels}
          pad={{ top: 10, right: 21, bottom: 29, left: 74 }}
          barRatio={0.6}
          highlightLast
          tickX={-16}
          inset={13}
        />
      </div>
      <div className="px-5 pt-[20px]">
        <DarkButton href={routes.organic.positions + Q}>View keyword</DarkButton>
      </div>
    </Card>
  );
}

function FeatureGrid({ items, linked }: { items: SerpFeature[]; linked: boolean }) {
  return (
    <div className="grid grid-cols-6 gap-y-[17px]">
      {items.map((f) => {
        const on = f.count > 0;
        return (
          <div key={f.name} className={`flex items-center gap-[9px] ${on ? "" : "opacity-40"}`}>
            <span className={`flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-md bg-[#f5f6f6] ${linked ? "text-rk-link" : "text-[#6a6c6a]"}`}>
              <SerpIcon name={f.icon} size={18} />
            </span>
            <span className="min-w-0 text-[12px] leading-[16.5px]">
              {on ? (
                <Link href={routes.organic.positions + Q} className="block truncate text-rk-link hover:text-rk-link-hover">
                  {f.name}
                </Link>
              ) : (
                <span className="block truncate text-rk-link">{f.name}</span>
              )}
              <span className={`block ${f.count === 1 ? "text-rk-text-2" : "text-rk-muted"}`}>
                {f.count} keyword{f.count === 1 ? "" : "s"}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SerpFeaturesCard() {
  return (
    <Card className="h-[892px]">
      <CardTitle>SERP Features</CardTitle>
      <div className="pt-[18px] pr-1 pl-5">
        <h3 className="text-[14px] leading-6 font-semibold">Linking to domain</h3>
        <div className="mt-[13px]">
          <FeatureGrid items={linkingFeatures} linked />
        </div>
        <h3 className="mt-[23px] text-[14px] leading-6 font-semibold">Not linking to domain</h3>
        <div className="mt-[13px]">
          <FeatureGrid items={notLinkingFeatures} linked={false} />
        </div>
      </div>
    </Card>
  );
}

function TopPagesCard() {
  const live = useOrganicLive();
  const q = useOrganicQ();
  const pages: { url: string; short?: string; traffic: string; keywords: number }[] = live ? live.pages.slice(0, 5).map((p) => ({ url: p.url, traffic: p.pct, keywords: p.keywords })) : topPages;
  return (
    <Card className="h-[344px]">
      <CardTitle>Top Pages</CardTitle>
      <table className="mt-[21px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[108px]" />
          <col className="w-[128px]" />
        </colgroup>
        <thead>
          <tr className="h-[31px] border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>URL</th>
            <th className={`${th} text-right`}>
              <span className="inline-flex items-center gap-1">
                Traffic % <SortIcon className="text-rk-text-2" />
              </span>
            </th>
            <th className={`${th} pr-5 text-right`}>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.url} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={`${routes.organic.positions}${q}&url=${encodeURIComponent(p.url)}`} className="truncate text-rk-link hover:text-rk-link-hover">
                    {p.short ?? p.url}
                  </Link>
                  <ExtLink href={p.url} />
                </span>
              </td>
              <td className="text-right">{p.traffic}</td>
              <td className="pr-5 text-right">{p.keywords}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[17px]">
        <DarkButton href={routes.topPages + q}>View all {live ? live.pageCount : 45} pages</DarkButton>
      </div>
    </Card>
  );
}

function TopSubdomainsCard() {
  const live = useOrganicLive();
  const q = useOrganicQ();
  const subs = live ? live.subdomains.slice(0, 5) : [{ host: "rkjh.se", pct: "100.00", keywords: 134 }];
  return (
    <Card className="h-[344px]">
      <CardTitle>Top Subdomains</CardTitle>
      <table className="mt-[21px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[108px]" />
          <col className="w-[128px]" />
        </colgroup>
        <thead>
          <tr className="h-[31px] border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>Subdomain</th>
            <th className={`${th} text-right`}>
              <span className="inline-flex items-center gap-1">
                Traffic % <SortIcon className="text-rk-text-2" />
              </span>
            </th>
            <th className={`${th} pr-5 text-right`}>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((s) => (
            <tr key={s.host} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={routes.organic.positions + q} className="text-rk-link hover:text-rk-link-hover">
                    {s.host}
                  </Link>
                  <ExtLink href={s.host} />
                </span>
              </td>
              <td className="text-right">{s.pct}</td>
              <td className="pr-5 text-right">{s.keywords}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[17px]">
        <DarkButton href={routes.organic.subdomains + q}>View subdomain{subs.length > 1 ? "s" : ""}</DarkButton>
      </div>
    </Card>
  );
}

function CompetitorsCard() {
  return (
    <Card className="h-[351px]">
      <CardTitle>Main Organic Competitors</CardTitle>
      <table className="mt-[21px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[86px]" />
          <col className="w-[149px]" />
        </colgroup>
        <thead>
          <tr className="h-[31px] border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>Domain</th>
            <th className={`${th} text-right`}>
              <span className="block truncate">Common Keywords</span>
            </th>
            <th className={`${th} pr-5 text-right`}>
              <span className="inline-flex items-center gap-1">
                Com. Level <SortIcon className="text-rk-text-2" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {competitorsTop.map((c) => (
            <tr key={c.domain} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={domainHref(c.domain)} className="text-rk-link hover:text-rk-link-hover">
                    {c.domain}
                  </Link>
                  <ExtLink href={c.domain} />
                </span>
              </td>
              <td className="pr-[1px] text-right">
                <Link href={`${routes.keywordGap}?db=se&q=rkjh.se&compareWith=${c.domain}`} className="hover:text-rk-link">
                  {c.common}
                </Link>
              </td>
              <td className="pr-5">
                <span className="flex items-center justify-end gap-[9px]">
                  <span className="h-[7px] w-[77px] rounded-full bg-[#edefef]">
                    <span className="block h-full rounded-full bg-[#6167e6]" style={{ width: `${c.level}%` }} />
                  </span>
                  <span className="w-[27px] text-right text-[13px] text-rk-text-2">{c.level}%</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[17px]">
        <DarkButton href={routes.organic.competitors + Q}>View all 249 competitors</DarkButton>
      </div>
    </Card>
  );
}

export function BubbleLegend({ className = "", gap = 18 }: { className?: string; gap?: number }) {
  return (
    <div className={`flex flex-wrap gap-y-[9px] text-[14px] ${className}`} style={{ columnGap: gap }}>
      {bubbles.map((b) => (
        <Link key={b.domain} href={domainHref(b.domain)} className="flex items-center gap-[6px] hover:text-rk-link">
          <span className="h-3 w-3 rounded-full" style={{ background: b.color }} />
          {b.domain}
        </Link>
      ))}
    </div>
  );
}

function MapCard() {
  return (
    <Card className="h-[351px]">
      <CardTitle>Competitive Positioning Map</CardTitle>
      <BubbleLegend className="px-5 pt-[20px] pr-8" />
      <div className="mt-[22px]">
        <BubbleMap items={bubbles} height={201} pad={{ top: 42, right: 18, bottom: 47, left: 99 }} xMax={145} yMax={400} tickGap={14} labelGap={63} />
      </div>
    </Card>
  );
}

export function OverviewView() {
  return (
    <div className="flex flex-col gap-4 px-8 pt-4">
      <SummaryCard />
      <div className="grid grid-cols-2 gap-4">
        <TopKeywordsCard />
        <IntentCard />
        <ChangesCard />
        <SerpChangesCard />
      </div>
      <BrandPresence />
      <SerpTrendCard />
      <SerpFeaturesCard />
      <div className="grid grid-cols-2 gap-4">
        <TopPagesCard />
        <TopSubdomainsCard />
        <CompetitorsCard />
        <MapCard />
      </div>
    </div>
  );
}
