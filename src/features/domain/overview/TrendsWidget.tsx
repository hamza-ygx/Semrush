"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { aiCountries, googleCountries, googleMarkers, keywordLegend, serpDistribution } from "../data";
import { kwLow, kwMid, kwTop, trafficDaily } from "../series";
import { Plot, VBW, areaUnder, linePath, pts, smoothPath, stepPath, Stroke } from "../charts";
import { Check, Dot, Flag, GoogleG, Seg } from "../ui";
import { ExportDropdown, NotesMenu } from "./menus";

const SPAN_DAYS = 730;
const END = Date.UTC(2026, 8, 23);
const DAY = 86400000;
const MONDAY_OFFSET = (new Date(END).getUTCDay() + 6) % 7;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ranges = ["1M", "6M", "1Y", "2Y", "All time"] as const;
type Range = (typeof ranges)[number];
const rangeDays: Record<Range, number> = { "1M": 30, "6M": 182, "1Y": 365, "2Y": 730, "All time": 730 };

function slice(data: number[], days: number) {
  const n = Math.max(2, Math.round((data.length * days) / SPAN_DAYS));
  return data.slice(data.length - n);
}

function monthly(data: number[]) {
  const per = data.length / 24;
  return Array.from({ length: 24 }, (_, i) => {
    const s = data.slice(Math.round(i * per), Math.round((i + 1) * per));
    return s.reduce((a, b) => a + b, 0) / Math.max(s.length, 1);
  });
}

function xLabels(days: number) {
  const start = END - days * DAY;
  const out: { at: number; label: string }[] = [];
  const step = days > 400 ? 3 : days > 100 ? 1 : 0;
  if (step === 0) {
    for (let t = start + 3 * DAY; t < END; t += 7 * DAY) {
      const d = new Date(t);
      out.push({ at: (t - start) / (days * DAY), label: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}` });
    }
    return out;
  }
  const d0 = new Date(start);
  for (let y = d0.getUTCFullYear(), m = d0.getUTCMonth() + 1; ; m++) {
    if (m > 11) {
      m = 0;
      y++;
    }
    const t = Date.UTC(y, m, 1);
    if (t >= END) break;
    if (m % step === 0) out.push({ at: (t - start) / (days * DAY), label: `${MONTHS[m]} ${y}` });
  }
  return out.filter((l) => l.at > 0.06 && l.at < 0.97);
}

function dateAt(f: number, days: number) {
  const d = new Date(END - Math.round((1 - f) * days) * DAY);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const at = (data: number[], f: number) => data[Math.round(f * (data.length - 1))] ?? 0;

type HoverProps = { hover: number | null; onHover: (f: number | null) => void };

function isoDay(f: number, days: number) {
  return new Date(END - Math.round((1 - f) * days) * DAY).toISOString().slice(0, 10);
}

function HoverArea({ testId, rightW, days, onHover, onY, children }: { testId: string; rightW: number; days?: number; onHover: (f: number | null) => void; onY?: (y: number) => void; children: ReactNode }) {
  return (
    <div
      data-testid={testId}
      className="relative"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const f = (e.clientX - r.left) / (r.width - rightW);
        onY?.(e.clientY - r.top);
        onHover(f >= 0 && f <= 1 ? f : null);
      }}
      onMouseLeave={() => onHover(null)}
    >
      {children}
      {days && (
        <div className="absolute top-0 left-0 h-[33px] overflow-hidden" style={{ right: rightW }}>
          {Array.from({ length: Math.floor(days / 7) + 1 }, (_, w) => {
            const i = days - MONDAY_OFFSET - 7 * w;
            return <span key={i} data-day={isoDay(i / days, days)} className="absolute inset-y-0" style={{ left: `${((i - 3.5) / days) * 100}%`, width: `${700 / days}%` }} />;
          })}
        </div>
      )}
    </div>
  );
}

function TipRow({ color, label, value }: { color: string; label: string; value: ReactNode }) {
  return (
    <div className="flex h-5 items-center text-[12px]">
      <Dot color={color} size={8} />
      <span className="ml-2 flex-1 text-rk-text-2">{label}</span>
      <b className="ml-3 font-semibold">{value}</b>
    </div>
  );
}

function Crosshair({ f, dots }: { f: number; dots: { y: number; color: string }[] }) {
  return (
    <>
      <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#d5d7de]" style={{ left: `${f * 100}%` }} />
      {dots.map((d, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
          style={{ left: `${f * 100}%`, top: d.y, background: d.color }}
        />
      ))}
    </>
  );
}

function IncompleteBand({ h }: { h: number }) {
  return (
    <g>
      <rect x={VBW * 0.986} y={0} width={VBW * 0.014} height={h} fill="#e9ecee" />
      <path d={`M${VBW * 0.986} 0V${h}`} stroke="#d5d9dc" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function TrafficChart({ range, gran, hover, onHover }: { range: Range; gran: "Days" | "Months" } & HoverProps) {
  const [on, setOn] = useState({ organic: true, paid: true, branded: true });
  const [y, setY] = useState(28);
  const H = 83;
  const days = rangeDays[range];
  const raw = slice(trafficDaily, days);
  const data = gran === "Months" && days > 300 ? monthly(raw) : raw;
  const max = 125;
  const p = pts(data, max, H);
  const zero = pts([0, 0], max, H);
  return (
    <div>
      <h3 className="text-[16px] leading-6 font-bold">Traffic</h3>
      <div className="mt-[14px] flex items-center gap-4">
        <Check color="#6167e6" label="Organic Traffic" checked={on.organic} onToggle={() => setOn({ ...on, organic: !on.organic })} />
        <Check color="#3ed4a4" label="Paid Traffic" checked={on.paid} onToggle={() => setOn({ ...on, paid: !on.paid })} />
        <Check color="#c28bf5" label="Branded Traffic" checked={on.branded} onToggle={() => setOn({ ...on, branded: !on.branded })} />
        <span className="-ml-[3px] h-7 w-px bg-rk-border" />
        <span className="-ml-[2px] flex h-5 items-center">
          <NotesMenu />
        </span>
      </div>
      <HoverArea testId="traffic-chart" rightW={70} days={days} onHover={onHover} onY={setY}>
      <Plot
        className="mt-[27px]"
        height={H}
        ticks={[0, 1 / 3, 2 / 3, 1]}
        right={["0", "42", "83", "125"]}
        rightW={70}
        gap={14}
        bottomH={26}
        xGap={10}
        x={xLabels(days)}
        overlay={
          hover != null && (
            <>
              <Crosshair
                f={hover}
                dots={[
                  ...(on.paid ? [{ y: H, color: "#3ed4a4" }] : []),
                  ...(on.branded ? [{ y: H, color: "#c28bf5" }] : []),
                  ...(on.organic ? [{ y: H - (at(data, hover) / max) * H, color: "#6167e6" }] : []),
                ]}
              />
              <div className="pointer-events-none absolute z-20 w-[170px] rounded-md bg-white pt-[9px] pr-3 pb-[9px] pl-[11px] shadow-popover" style={{ left: `calc(${hover * 100}% + 10px)`, top: y - 58 }}>
                <div className="mb-[3px] text-[12px] leading-5 text-rk-muted">{dateAt(hover, days)}</div>
                <TipRow color="#6167e6" label="Organic Traffic" value={Math.round(at(data, hover))} />
                <TipRow color="#3ed4a4" label="Paid Traffic" value={0} />
                <TipRow color="#c28bf5" label="Branded Traffic" value={0} />
              </div>
            </>
          )
        }
      >
        <IncompleteBand h={H} />
        {on.paid && <Stroke d={linePath(zero)} color="#3ed4a4" width={3} />}
        {on.organic && <Stroke d={gran === "Months" && days > 300 ? smoothPath(p) : stepPath(p)} color="#6167e6" width={2.5} />}
        {on.branded && <Stroke d={linePath(zero)} color="#c28bf5" width={3} />}
      </Plot>
      </HoverArea>
    </div>
  );
}

function KeywordsChart({ range, hover, onHover }: { range: Range } & HoverProps) {
  const [kind, setKind] = useState<"Organic" | "Paid">("Organic");
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(keywordLegend.map((l) => [l.label, true])));
  const H = 167;
  const max = 383;
  const days = rangeDays[range];
  const paid = kind === "Paid";
  const top = slice(kwTop, days).map((v) => (paid ? 0 : v));
  const mid = slice(kwMid, days).map((v) => (paid ? 0 : v));
  const low = slice(kwLow, days).map((v) => (paid ? 0 : v));
  const serp = top.map((_, i) => (paid ? 0 : 1.5 + ((i * 7) % 5) * 0.2));
  const series: Record<string, number[]> = {
    "Top 3": top.map((v) => v + (paid ? 0 : 3)),
    "4-10": top,
    "11-20": top.map((v) => Math.max(0, v - 4)),
    "21-50": mid,
    "51-100": low,
    "AI Overviews": top.map(() => 0),
    "Other SERP Features": serp,
  };
  const P = (a: number[]) => pts(a, max, H);
  const topP = P(series["Top 3"]);
  const lowP = P(low);
  return (
    <div>
      <h3 className="text-[16px] leading-6 font-bold">Keywords</h3>
      <Seg items={["Organic", "Paid"] as const} value={kind} onChange={setKind} className="mt-[13px]" itemClassName="px-[8px]" />
      <div className="mt-[18px] flex flex-wrap items-center gap-x-[15px] gap-y-2">
        {keywordLegend.map((l) => (
          <Check key={l.label} color={l.color} label={l.label} checked={on[l.label]} onToggle={() => setOn({ ...on, [l.label]: !on[l.label] })} />
        ))}
      </div>
      <HoverArea testId="keywords-chart" rightW={70} onHover={onHover}>
      <Plot
        className="mt-[27px]"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        right={["0", "96", "192", "287", "383"]}
        rightW={70}
        gap={14}
        bottomH={27}
        xGap={10}
        x={xLabels(days)}
        overlay={
          <>
            {range === "2Y" || range === "All time"
              ? googleMarkers.map((m) => <GoogleG key={m} className="absolute -bottom-[6px] -translate-x-1/2" width={12} height={12} style={{ left: `${m * 100}%` }} />)
              : null}
            {hover != null && <KeywordsTip f={hover} days={days} series={series} on={on} H={H} max={max} />}
          </>
        }
      >
        <path d={areaUnder(topP, linePath(topP), H)} fill="#e9edfd" opacity={0.85} />
        <path d={areaUnder(lowP, linePath(lowP), H)} fill="#eef2ff" />
        <IncompleteBand h={H} />
        {["51-100", "21-50", "11-20", "4-10", "Top 3"].map((k) => {
          const l = keywordLegend.find((x) => x.label === k)!;
          return on[k] ? <Stroke key={k} d={linePath(P(series[k]))} color={l.color} width={k === "Top 3" ? 1.5 : 2.2} /> : null;
        })}
        {on["AI Overviews"] && <Stroke d={linePath(P(series["AI Overviews"]))} color="#f06ae6" width={2} />}
        {on["Other SERP Features"] && <Stroke d={linePath(P(serp))} color="#5dd66a" width={2.5} />}
      </Plot>
      </HoverArea>
    </div>
  );
}

function KeywordsTip({ f, days, series, on, H, max }: { f: number; days: number; series: Record<string, number[]>; on: Record<string, boolean>; H: number; max: number }) {
  const v = (k: string) => at(series[k], f);
  const bands: Record<string, number> = {
    "Top 3": v("Top 3") - v("4-10"),
    "4-10": v("4-10") - v("11-20"),
    "11-20": v("11-20") - v("21-50"),
    "21-50": v("21-50") - v("51-100"),
    "51-100": v("51-100"),
    "AI Overviews": v("AI Overviews"),
    "Other SERP Features": v("Other SERP Features"),
  };
  const vals = Object.fromEntries(Object.entries(bands).map(([k, n]) => [k, Math.max(0, Math.round(n))]));
  const total = Object.values(vals).reduce((a, b) => a + b, 0);
  const lines = ["Top 3", "4-10", "11-20", "21-50", "51-100"].filter((k) => on[k]);
  return (
    <>
      <Crosshair f={f} dots={lines.map((k) => ({ y: H - (v(k) / max) * H, color: keywordLegend.find((l) => l.label === k)!.color }))} />
      <div className="pointer-events-none absolute -top-[56px] z-20 w-[218px] rounded-md bg-white pt-[10px] pr-[12px] pb-[8px] pl-[12px] shadow-popover" style={{ left: `calc(${f * 100}% - 226px)` }}>
        <div className="mb-[4px] text-[12px] leading-5 text-rk-muted">{dateAt(f, days)}</div>
        {keywordLegend.map((l) => (
          <TipRow key={l.label} color={l.color} label={l.label} value={vals[l.label]} />
        ))}
        <div className="mt-[6px] flex h-[31px] items-center border-t border-rk-border pt-[2px] text-[12px]">
          <span className="flex-1 text-rk-text-2">Total</span>
          <b className="font-semibold">{total}</b>
        </div>
      </div>
    </>
  );
}

function SerpDonut() {
  const r = 32;
  const c = 2 * Math.PI * r;
  const lens = serpDistribution.map((s) => (s.value / 100) * c);
  const offs = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <svg viewBox="0 0 76 76" width={76} height={76} className="-rotate-90">
      <circle cx="38" cy="38" r={r} fill="none" stroke="#e0e1e9" strokeWidth={11} />
      {serpDistribution.map((s, i) => (
        <circle key={s.label} cx="38" cy="38" r={r} fill="none" stroke={s.color} strokeWidth={11} strokeDasharray={`${Math.max(lens[i] - 0.4, 0)} ${c}`} strokeDashoffset={-offs[i]} />
      ))}
    </svg>
  );
}

function AiDistribution() {
  return (
    <>
      <h3 className="px-5 text-[16px] leading-6 font-bold">Distribution by Country</h3>
      <table className="mt-[11px] w-full text-[14px] leading-5">
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Countries</th>
            <th className="w-[90px] text-right font-normal">Visibility</th>
            <th className="w-[76px] pr-[9px] text-right font-normal">Mentions</th>
          </tr>
        </thead>
        <tbody>
          {aiCountries.map((c) => (
            <tr key={c.name} className={`h-[37px] border-b border-rk-border last:border-0 ${c.name === "SE" ? "bg-rk-bg" : ""}`}>
              <td className="pl-5">
                <span className="flex items-center gap-[10px]">
                  {c.flag && <Flag code={c.flag} />}
                  {c.name}
                </span>
              </td>
              <td className="text-right">{c.visibility}</td>
              <td className="pr-[9px] text-right">
                <Link href={routes.organic.overview} className="text-rk-link">
                  {c.mentions}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function GoogleDistribution() {
  return (
    <>
      <h3 className="px-5 text-[16px] leading-6 font-bold">Distribution by Country</h3>
      <table className="mt-[11px] w-full text-[14px] leading-5">
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Countries</th>
            <th className="w-[80px] text-right font-normal">Traffic</th>
            <th className="w-[99px] pr-[9px] text-right font-normal">Keywords</th>
          </tr>
        </thead>
        <tbody>
          {googleCountries.map((c) => {
            const db = c.name !== "Worldwide" && c.name !== "Other";
            const cell = db ? "text-rk-link" : "";
            return (
              <tr key={c.name} className={`h-[37px] border-b border-rk-border last:border-0 ${c.name === "SE" ? "bg-rk-bg" : ""}`}>
                <td className="pl-5">
                  <span className="flex items-center">
                    <span className="flex w-[86px] items-center gap-[10px]">
                      {c.flag && <Flag code={c.flag} />}
                      {c.name}
                    </span>
                    <span className="relative h-2 w-[44px] overflow-hidden rounded-full bg-[#f0f0f2]">
                      {c.bar > 0 && <span className="absolute inset-y-0 left-0 rounded-full bg-[#6167e6]" style={{ width: `${Math.max(c.bar * 100, 3)}%` }} />}
                    </span>
                  </span>
                </td>
                <td className={`text-right ${cell}`}>{db ? <Link href={routes.organic.overview}>{c.traffic}</Link> : c.traffic}</td>
                <td className={`pr-[9px] text-right ${cell}`}>{db ? <Link href={routes.organic.positions}>{c.keywords}</Link> : c.keywords}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export function TrendsWidget() {
  const [source, setSource] = useState<"AI Search" | "Google Search">("AI Search");
  const [range, setRange] = useState<Range>("2Y");
  const [gran, setGran] = useState<"Days" | "Months">("Days");
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section className="mt-4 flex h-[631px] rounded-lg bg-white shadow-card">
      <div className="w-[344px] shrink-0 pt-5">
        <div className="px-5">
          <Seg items={["AI Search", "Google Search"] as const} value={source} onChange={setSource} itemClassName="px-[8px]" />
        </div>
        <div className="mt-[20px]">{source === "AI Search" ? <AiDistribution /> : <GoogleDistribution />}</div>
        <h3 className="mt-[17px] px-5 text-[16px] leading-6 font-bold">Top Cited Sources</h3>
        <div className={`flex items-center justify-center pb-[18px] pl-[19px] text-[14px] text-rk-muted ${source === "AI Search" ? "h-[173px]" : "h-[136px]"}`}>We have no data to show.</div>
        <h3 className="px-5 text-[16px] leading-6 font-bold">Google SERP Positions Distribution</h3>
        <div className="mt-[16px] flex items-center pl-5">
          <SerpDonut />
          <div className="ml-[21px] flex-1">
            {serpDistribution.map((s) => (
              <div key={s.label} className="flex h-7 items-center text-[14px] leading-5">
                <Dot color={s.color} size={12} />
                <span className="ml-[6px] flex-1">{s.label}</span>
                <Link href={routes.organic.positions} className="text-rk-link">
                  {s.value}%
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 pt-5 pr-5 pl-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-[17px] pt-[3px]">
            {ranges.map((r) => (
              <button key={r} type="button" onClick={() => setRange(r)} className="relative pb-[4px] text-[14px] leading-5 text-rk-text hover:text-rk-link">
                {r}
                {r === range && <span className="absolute right-0 -bottom-[3px] left-0 h-[3px] rounded-sm bg-rk-tab" />}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Seg items={["Days", "Months"] as const} value={gran} onChange={setGran} itemClassName="px-[8px]" />
            <ExportDropdown />
          </div>
        </div>
        <div className="mt-[21px]">
          <TrafficChart range={range} gran={gran} hover={hover} onHover={setHover} />
        </div>
        <div className="mt-[21px]">
          <KeywordsChart range={range} hover={hover} onHover={setHover} />
        </div>
      </div>
    </section>
  );
}
