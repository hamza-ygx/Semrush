"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { aiCountries, googleMarkers, keywordLegend, serpDistribution } from "../data";
import { kwLow, kwMid, kwTop, trafficDaily } from "../series";
import { Plot, VBW, areaUnder, linePath, pts, smoothPath, stepPath, Stroke } from "../charts";
import { Check, Dot, ExportButton, Flag, GoogleG, Seg } from "../ui";

const SPAN_DAYS = 730;
const END = Date.UTC(2026, 8, 23);
const DAY = 86400000;
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

function IncompleteBand({ h }: { h: number }) {
  return (
    <g>
      <rect x={VBW * 0.986} y={0} width={VBW * 0.014} height={h} fill="#e9ecee" />
      <path d={`M${VBW * 0.986} 0V${h}`} stroke="#d5d9dc" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </g>
  );
}

function TrafficChart({ range, gran }: { range: Range; gran: "Days" | "Months" }) {
  const [on, setOn] = useState({ organic: true, paid: true, branded: true });
  const H = 85;
  const days = rangeDays[range];
  const raw = slice(trafficDaily, days);
  const data = gran === "Months" && days > 300 ? monthly(raw) : raw;
  const max = 125;
  const p = pts(data, max, H);
  const zero = pts([0, 0], max, H);
  return (
    <div>
      <h3 className="text-[16px] leading-6 font-bold">Traffic</h3>
      <div className="mt-[19px] flex items-center gap-4">
        <Check color="#6167e6" label="Organic Traffic" checked={on.organic} onToggle={() => setOn({ ...on, organic: !on.organic })} />
        <Check color="#3ed4a4" label="Paid Traffic" checked={on.paid} onToggle={() => setOn({ ...on, paid: !on.paid })} />
        <Check color="#c28bf5" label="Branded Traffic" checked={on.branded} onToggle={() => setOn({ ...on, branded: !on.branded })} />
      </div>
      <Plot
        className="mt-[27px]"
        height={H}
        ticks={[0, 1 / 3, 2 / 3, 1]}
        right={["0", "42", "83", "125"]}
        rightW={70}
        gap={14}
        bottomH={27}
        x={xLabels(days)}
      >
        <IncompleteBand h={H} />
        {on.paid && <Stroke d={linePath(zero)} color="#3ed4a4" width={3} />}
        {on.organic && <Stroke d={gran === "Months" && days > 300 ? smoothPath(p) : stepPath(p)} color="#6167e6" width={2.5} />}
        {on.branded && <Stroke d={linePath(zero)} color="#c28bf5" width={3} />}
      </Plot>
    </div>
  );
}

function KeywordsChart({ range }: { range: Range }) {
  const [kind, setKind] = useState<"Organic" | "Paid">("Organic");
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(keywordLegend.map((l) => [l.label, true])));
  const H = 165;
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
      <Seg items={["Organic", "Paid"] as const} value={kind} onChange={setKind} className="mt-[12px]" itemClassName="px-[8px]" />
      <div className="mt-[19px] flex flex-wrap items-center gap-x-[15px] gap-y-2">
        {keywordLegend.map((l) => (
          <Check key={l.label} color={l.color} label={l.label} checked={on[l.label]} onToggle={() => setOn({ ...on, [l.label]: !on[l.label] })} />
        ))}
      </div>
      <Plot
        className="mt-[27px]"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        right={["0", "96", "192", "287", "383"]}
        rightW={70}
        gap={14}
        bottomH={27}
        x={xLabels(days)}
        overlay={
          range === "2Y" || range === "All time"
            ? googleMarkers.map((m) => <GoogleG key={m} className="absolute -bottom-[6px] -translate-x-1/2" width={12} height={12} style={{ left: `${m * 100}%` }} />)
            : null
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
    </div>
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
  const rows = [
    { name: "Worldwide", flag: null, share: "100%", traffic: "59" },
    { name: "SE", flag: "SE", share: "98%", traffic: "59" },
    { name: "IN", flag: "IN", share: "2%", traffic: "1" },
    { name: "US", flag: "US", share: "0%", traffic: "0" },
  ];
  return (
    <>
      <h3 className="px-5 text-[16px] leading-6 font-bold">Distribution by Country</h3>
      <table className="mt-[11px] w-full text-[14px] leading-5">
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Countries</th>
            <th className="w-[90px] text-right font-normal">Traffic Share</th>
            <th className="w-[76px] pr-[9px] text-right font-normal">Traffic</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.name} className={`h-[37px] border-b border-rk-border last:border-0 ${c.name === "SE" ? "bg-rk-bg" : ""}`}>
              <td className="pl-5">
                <span className="flex items-center gap-[10px]">
                  {c.flag && <Flag code={c.flag} />}
                  {c.name}
                </span>
              </td>
              <td className="text-right">{c.share}</td>
              <td className="pr-[9px] text-right text-rk-link">{c.traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function TrendsWidget() {
  const [source, setSource] = useState<"AI Search" | "Google Search">("AI Search");
  const [range, setRange] = useState<Range>("2Y");
  const [gran, setGran] = useState<"Days" | "Months">("Days");
  return (
    <section className="mt-4 flex h-[631px] rounded-lg bg-white shadow-card">
      <div className="w-[344px] shrink-0 pt-5">
        <div className="px-5">
          <Seg items={["AI Search", "Google Search"] as const} value={source} onChange={setSource} itemClassName="px-[8px]" />
        </div>
        <div className="mt-[20px]">{source === "AI Search" ? <AiDistribution /> : <GoogleDistribution />}</div>
        <h3 className="mt-[17px] px-5 text-[16px] leading-6 font-bold">Top Cited Sources</h3>
        <div className="flex h-[173px] items-center justify-center pb-[18px] pl-[19px] text-[14px] text-rk-muted">We have no data to show.</div>
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
            <ExportButton />
          </div>
        </div>
        <div className="mt-[21px]">
          <TrafficChart range={range} gran={gran} />
        </div>
        <div className="mt-[21px]">
          <KeywordsChart range={range} />
        </div>
      </div>
    </section>
  );
}
