"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Donut } from "@/components/ui/charts";
import { sampleBrands } from "./AiSampleFrame";
import { AiRefreshIcon, ColorCheck, InsightBanner, QuestionCircle, SampleCard, SectionLabel, TrophyIcon, YouTag } from "./bits";
import { bpInsights, comparisons, drivers, heatScale, opportunities, sentiment, shareOfVoice, sovBubbles } from "./data";

const Arrow = () => <span className="ml-[3px]">→</span>;

function DarkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex h-7 items-center rounded-[6px] bg-[#1b1e1a] px-[9px] text-[14px] leading-5 font-medium text-white hover:bg-[#2b2e38]">
      {children}
    </Link>
  );
}

function Insights() {
  return (
    <SampleCard title="Insights" info={false}>
      <div className="px-5 pt-[19px] pb-[25px]">
        <p className="text-[14px] leading-5 text-rk-muted">AI-generated strategy based on the latest data update.</p>
        <ul className="mt-[22px] flex flex-col gap-[24px]">
          {bpInsights.map((it) => (
            <li key={it.title} className="relative pl-5">
              <span className="absolute top-[5px] left-0 h-[10px] w-[10px] rounded-full bg-[#7867da]" />
              <div className="text-[16px] leading-5 font-semibold text-rk-text">{it.title}</div>
              <p className="mt-[5px] text-[14px] leading-5 text-rk-text">{it.text}</p>
              <Link href={it.link.href} className="mt-[4px] inline-block text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
                {it.link.label} <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SampleCard>
  );
}

function BubbleChart() {
  const brands = ["Ac lens", "Warby parker", "Zenni optical", "Glassesusa", "Eyebuydirect"];
  const [on, setOn] = useState<Record<string, boolean>>({ Other: false });
  const W = 1063;
  const xScale = (v: number) => 95 + (v - 2) * 63.07;
  const yScale = (v: number) => 20 + (100 - v) * 10.4;
  return (
    <SampleCard title="Share of Voice vs. Sentiment">
      <InsightBanner title="Strong sentiment, lower reach">10% share vs AC Lens 15%; sentiment stays strong at 89%. Grow visibility while protecting sentiment.</InsightBanner>
      <div className="flex items-center gap-[17px] px-5 pt-[22px] text-[14px] leading-5 text-rk-text">
        {[...brands, "Other"].map((n) => {
          const b = sampleBrands.find((x) => x.name === n);
          const checked = on[n] ?? true;
          return (
            <label key={n} className="flex cursor-pointer items-center gap-2">
              <ColorCheck color={b?.color ?? "#d6d8d7"} checked={checked} label={n} onClick={() => setOn((s) => ({ ...s, [n]: !checked }))} />
              <span className={b?.you ? "font-semibold" : ""}>{n}</span>
              {b?.you && <YouTag />}
            </label>
          );
        })}
      </div>
      <div className="relative mt-[5px] h-[380px]">
        <svg width={W} height={380} className="absolute inset-0 overflow-visible">
          {[100, 95, 90, 85, 80, 75].map((t) => (
            <g key={t}>
              <line x1={80} x2={1032} y1={yScale(t)} y2={yScale(t)} stroke="#e0e2e1" strokeWidth={1} />
              <text x={62} y={yScale(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
                {t}
              </text>
            </g>
          ))}
          <line x1={80} x2={1032} y1={311} y2={311} stroke="#d6d8d7" strokeWidth={1} />
          {[2, 4, 6, 8, 10, 12, 14, 16].map((t) => (
            <text key={t} x={xScale(t)} y={332} textAnchor="middle" fontSize={12} fill="#6a6c6a">
              {t}
            </text>
          ))}
          <text x={556} y={360} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Share of Voice (%)
          </text>
          <text transform={`translate(33 ${yScale(87.6)}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Sentiment Score (%)
          </text>
          {sovBubbles
            .filter((b) => on[b.name] ?? true)
            .map((b) => (
              <g key={b.name}>
                <circle cx={xScale(b.x)} cy={yScale(b.y)} r={b.r} fill={b.color} fillOpacity={0.5} />
                <path d={`M${xScale(b.x) - 3} ${yScale(b.y)}h6M${xScale(b.x)} ${yScale(b.y) - 3}v6`} stroke={b.color} strokeWidth={1.2} />
              </g>
            ))}
        </svg>
      </div>
    </SampleCard>
  );
}

function OverallSentiment() {
  return (
    <SampleCard title="Overall Sentiment">
      <InsightBanner title="Sentiment is strong">89% favorable, 11% general. Protect momentum and amplify winning themes.</InsightBanner>
      <div className="px-5 pt-[29px] pb-5">
        <div className="flex items-center gap-[37px] pl-[8px]">
          <Donut size={164} thickness={31} gap={1.5} segments={sentiment.map((s) => ({ value: s.value, color: s.color }))} />
          <div className="flex flex-col gap-2 text-[14px] leading-5 text-rk-text">
            {sentiment.map((s) => (
              <div key={s.label} className="flex items-center">
                <span className="mr-[7px] h-3 w-3 rounded-full" style={{ background: s.color }} />
                <span className="w-[82px] text-rk-text-2">{s.label}</span>
                <span className="w-[38px] text-rk-text-2">{s.value}%</span>
                <span className={s.up ? "text-rk-success" : "text-rk-danger"}>
                  {s.up ? "↑" : "↓"} {s.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[28px]">
          <DarkButton href={`${routes.ai.perception}?pid=9`}>
            Learn more in Perception <Arrow />
          </DarkButton>
        </div>
      </div>
    </SampleCard>
  );
}

function ShareOfVoice() {
  const [on, setOn] = useState<Record<string, boolean>>({ Other: false });
  const segs = shareOfVoice.filter((s) => (on[s.name] ?? true) && s.color).map((s) => ({ value: s.value, color: s.color }));
  return (
    <SampleCard title="Share of Voice">
      <InsightBanner title="We’re behind">10% share vs AC Lens 15%. Boost visibility to close the 5-point gap.</InsightBanner>
      <div className="px-5 pt-[28px] pb-5">
        <div className="flex items-start gap-[37px] pl-[8px]">
          <Donut size={164} thickness={31} gap={1.5} segments={segs} />
          <div className="mt-[3px] flex flex-col gap-2 text-[14px] leading-5 text-rk-text">
            {shareOfVoice.map((s) => {
              const checked = on[s.name] ?? true;
              return (
                <div key={s.name} className="flex items-center">
                  <ColorCheck color={s.color || "#d6d8d7"} checked={checked} label={s.name} onClick={() => setOn((o) => ({ ...o, [s.name]: !checked }))} />
                  <span className={`ml-2 flex w-[152px] items-center gap-[6px] ${s.you ? "font-semibold" : "text-rk-text-2"}`}>
                    {s.name}
                    {s.you && <YouTag />}
                  </span>
                  <span className="w-[31px] text-right text-rk-text-2">{s.value}%</span>
                  <span className={`ml-[7px] ${s.delta === "up" ? "text-rk-success" : s.delta === "down" ? "text-rk-danger" : "text-rk-muted"}`}>
                    {s.delta === "up" ? "↑" : s.delta === "down" ? "↓" : s.delta}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-[27px]">
          <DarkButton href={`${routes.ai.narrativeDrivers}?pid=9`}>
            Learn more in Narrative Drivers <Arrow />
          </DarkButton>
        </div>
      </div>
    </SampleCard>
  );
}

function heat(v: number | null) {
  if (v == null || v === 0) return heatScale[0];
  return heatScale.find((h) => v >= h.min && v <= h.max) ?? heatScale[heatScale.length - 1];
}

function HeatCell({ v, leader, className = "" }: { v: number | null; leader?: boolean; className?: string }) {
  const h = heat(v);
  return (
    <div className={`relative flex h-11 items-center justify-center rounded-[4px] text-[14px] ${className}`} style={{ background: h.bg, color: h.fg }}>
      {v ?? ""}
      {leader && (
        <span className="absolute -top-[2px] -right-[3px] flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <TrophyIcon size={17} />
        </span>
      )}
    </div>
  );
}

function DriverIcons({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-[11px] ${className}`}>
      <button type="button" aria-label="What is this driver" className="text-[#8b8d8c] hover:text-rk-text">
        <QuestionCircle />
      </button>
      <button type="button" aria-label="Explore driver" className="hover:opacity-80">
        <AiRefreshIcon />
      </button>
    </span>
  );
}

function DriversTable() {
  return (
    <SampleCard
      title="Key Business Drivers by Frequency"
      head={<p className="mt-[10px] mb-[1px] text-[14px] leading-5 text-rk-muted">Shows how many times a driver was attributed to each brand</p>}
    >
      <InsightBanner title="Lead with strengths">61 mentions in online conversion, 31 in purpose-led loyalty. Defend these strengths; close the affordability gap.</InsightBanner>
      <div className="px-5 pb-5">
        <div className="flex items-end justify-end gap-[4px] pt-[13px] text-[14px] leading-5 text-rk-muted">
          <span className="mr-[14px] flex items-center gap-[6px] self-start">
            <TrophyIcon size={16} />
            Leader
          </span>
          {heatScale.map((h) => (
            <span key={h.label} className="flex w-12 flex-col items-center gap-[2px]">
              {h.label}
              <span className="h-4 w-12" style={{ background: h.bg }} />
            </span>
          ))}
        </div>
        <div className="sticky top-[72px] z-10 -mx-5 mt-[20px] grid grid-cols-[218px_repeat(5,128px)_75px_1fr] gap-x-[4px] bg-white px-5 pb-[16px] text-[12px] leading-4 text-rk-muted">
          <span className="pt-[8px]">Business Drivers</span>
          {sampleBrands.map((b) => (
            <span key={b.name} className={`flex items-center justify-center gap-[6px] pt-[8px] ${b.you ? "font-semibold text-rk-text" : "text-rk-text-2"}`}>
              <span className="h-[10px] w-[10px] rounded-full" style={{ background: b.color }} />
              {b.name}
            </span>
          ))}
          <span className="text-right">
            Total
            <br />
            Mentions
          </span>
          <span className="text-right">
            Mentioned
            <br />
            Brands
          </span>
        </div>
        <div className="flex flex-col gap-[4px]">
          {drivers.map((d) => {
            const max = Math.max(...d.values.map((v) => v ?? 0));
            return (
              <div key={d.name} className="grid grid-cols-[218px_repeat(5,128px)_75px_1fr] items-center gap-x-[4px]">
                <div className="flex items-center">
                  <span className="w-[148px] text-[14px] leading-5 text-rk-text">{d.name}</span>
                  <DriverIcons className="ml-[5px]" />
                </div>
                {d.values.map((v, i) => (
                  <HeatCell key={i} v={v} leader={v != null && v === max} />
                ))}
                <span className="text-right text-[14px] text-rk-text">{d.total}</span>
                <span className="text-right text-[14px] text-rk-text">{d.brands}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SampleCard>
  );
}

function Delta({ d }: { d: string }) {
  if (d === "0") return <span className="text-[12px] text-rk-muted">0</span>;
  return <span className="text-[12px] text-rk-danger">↓ {d}</span>;
}

function BigValue({ v, d, lead }: { v: number; d: string; lead: boolean }) {
  return (
    <span className="relative inline-flex items-baseline gap-[5px]">
      <span className="text-[24px] leading-7 font-semibold text-rk-text">{v}%</span>
      {lead && (
        <span className="absolute -top-[14px] left-[44px]">
          <TrophyIcon size={16} />
        </span>
      )}
      <Delta d={d} />
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="inline-block h-[10px] w-[10px] rounded-full" style={{ background: color }} />;
}

function Comparison({ c }: { c: (typeof comparisons)[number] }) {
  const them = sampleBrands[c.idx];
  const us = sampleBrands[0];
  return (
    <section className="rounded-lg bg-white shadow-card">
      <div className="flex items-center gap-[6px] border-b border-rk-border px-5 pt-[10px] pb-[9px] text-[16px] leading-5 font-semibold">
        <Dot color={them.color} />
        {them.name}
        <span className="font-normal text-rk-text-2">vs</span>
        <Dot color={us.color} />
        {us.name}
      </div>
      <InsightBanner title={c.title}>{c.text}</InsightBanner>
      <div className="px-5 pt-[26px] pb-5">
        <div className="grid grid-cols-[1fr_253px_254px] gap-x-[4px] text-[14px] leading-5">
          <span className="font-semibold">Key Metrics</span>
          {[them, us].map((b) => (
            <span key={b.name} className={`flex items-center justify-center gap-[6px] ${b.you ? "font-semibold" : "text-rk-text-2"}`}>
              <Dot color={b.color} />
              {b.name}
            </span>
          ))}
          <span className="mt-[24px] text-rk-text">Share of Voice</span>
          <span className="mt-[20px] text-center">
            <BigValue v={c.sov.them} d={c.sov.themDelta} lead={c.sov.them > c.sov.us} />
          </span>
          <span className="mt-[20px] text-center">
            <BigValue v={c.sov.us} d={c.sov.usDelta} lead={c.sov.us > c.sov.them} />
          </span>
          <span className="mt-[25px] text-rk-text">Favorable Sentiment</span>
          <span className="mt-[21px] text-center">
            <BigValue v={c.fav.them} d={c.fav.themDelta} lead={c.fav.them > c.fav.us} />
          </span>
          <span className="mt-[21px] text-center">
            <BigValue v={c.fav.us} d={c.fav.usDelta} lead={c.fav.us > c.fav.them} />
          </span>
        </div>
        <div className="mt-[20px] flex items-center gap-4 text-[14px] leading-5">
          <span className="font-semibold">Business Drivers by Frequency</span>
          <a href="#how-it-works" className="dotted-underline text-rk-muted hover:text-rk-text">
            How it works
          </a>
        </div>
        <div className="mt-[11px] flex flex-col gap-[4px]">
          {drivers.map((d) => {
            const a = d.values[c.idx];
            const b = d.values[0];
            return (
              <div key={d.name} className="grid grid-cols-[1fr_253px_254px] items-center gap-x-[4px]">
                <div className="flex items-center justify-between pr-[20px]">
                  <span className="text-[14px] text-rk-text">{d.name}</span>
                  <DriverIcons />
                </div>
                <HeatCell v={a} leader={(a ?? 0) > (b ?? 0)} />
                <HeatCell v={b} leader={(b ?? 0) > (a ?? 0)} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const tfTone = {
  short: "bg-[#c9f6e6] text-[#007c65]",
  medium: "bg-[#ffe8cc] text-[#b54400]",
  urgent: "bg-[#ffd7da] text-[#d1002f]",
};

function Opportunities() {
  return (
    <SampleCard title="AI Strategic Opportunities">
      <div className="px-5 pt-[19px] pb-5">
        <p className="text-[14px] leading-5 text-rk-muted">Based on the LLM’s output about your brand from the latest update.</p>
        <div className="mt-[19px] flex flex-col gap-[17px]">
          {opportunities.map((o) => (
            <article key={o.title} className="rounded-lg bg-[#f3f5f5]">
              <div className="border-b border-rk-border px-3 pt-[2px] pb-[15px]">
                <div className="flex justify-end">
                  <span className={`rounded-[9px] px-[9px] text-[12px] leading-[18px] ${tfTone[o.tf]}`}>{o.tf} timeframe</span>
                </div>
                <h3 className="mt-[4px] text-[14px] leading-5 font-semibold text-rk-text">{o.title}</h3>
                <p className="mt-[17px] text-[14px] leading-5 text-rk-text">{o.text}</p>
              </div>
              <div className="px-3 pt-[16px] pb-[28px]">
                <h4 className="text-[12px] leading-4 font-semibold text-rk-text">Recommendations:</h4>
                <ul className="mt-[8px] flex flex-col gap-[8px]">
                  {o.recs.map((r) => (
                    <li key={r} className="relative pl-[17px] text-[12px] leading-4 text-rk-text">
                      <span className="absolute top-[7px] left-[4px] h-[3px] w-[3px] rounded-full bg-rk-text-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SampleCard>
  );
}

export function BrandPerformanceSample() {
  return (
    <div className="flex flex-col pb-[126px]">
      <Insights />
      <div className="mt-6">
        <BubbleChart />
      </div>
      <div className="mt-6">
        <OverallSentiment />
      </div>
      <div className="mt-6">
        <ShareOfVoice />
      </div>
      <SectionLabel className="mt-[24px]">Key Business Drivers</SectionLabel>
      <div className="mt-[24px]">
        <DriversTable />
      </div>
      <SectionLabel className="mt-[24px]">Your Brand vs. Competitors</SectionLabel>
      <div className="mt-[24px] flex flex-col gap-6">
        {comparisons.map((c) => (
          <Comparison key={c.idx} c={c} />
        ))}
      </div>
      <SectionLabel className="mt-[24px]">Strategy Recommendations</SectionLabel>
      <div className="mt-[24px]">
        <Opportunities />
      </div>
    </div>
  );
}
