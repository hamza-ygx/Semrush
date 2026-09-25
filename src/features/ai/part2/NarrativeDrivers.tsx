"use client";

import { Fragment, useState } from "react";
import { Pagination } from "@/features/organic/ui";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import {
  brandColor,
  brandMetrics,
  brands,
  breakdownNote,
  citationDomains,
  citationsNote,
  diveTiles,
  narrativeInsights,
  narrativeOpportunities,
  questionRows,
  sovByPlatform,
  sovPlatformNote,
  trendTicks,
  type MetricTab,
  type PlatformCell,
  type QCell,
} from "./data";
import { Chevron, ScrollTable, SortIcon } from "./ScrollTable";
import {
  AiNotePanel,
  AnswersIcon,
  CheckBox,
  Dot,
  ExportButton,
  FilterSelect,
  InsightsCard,
  NoData,
  PlatformBars,
  PlatformLegend,
  RankRow,
  ReportCard,
  SectionLabel,
  SentimentPill,
  StrategyCard,
  TimeTabs,
  TrendArrow,
  TrendChart,
} from "./ui";

const you = (name: string) => brands.find((b) => b.name === name)?.you;

function SovPlatformCard() {
  const [enabled, setEnabled] = useState([true, true, true, false]);
  return (
    <ReportCard title="Share of Voice by Platform" testid="sov-platform">
      <AiNotePanel note={sovPlatformNote} />
      <div className="px-5 pt-5 pb-[23px]">
        <PlatformLegend enabled={enabled} setEnabled={setEnabled} />
        <PlatformBars
          rows={sovByPlatform.map((r) => ({ name: r.brand, color: brandColor[r.brand], you: you(r.brand), values: r.values }))}
          max={18}
          ticks={[0, 5, 10, 15]}
          enabled={enabled}
          other
        />
      </div>
    </ReportCard>
  );
}

function Change({ c }: { c: "up" | "down" | 0 }) {
  return c === 0 ? <span className="text-rk-muted">0</span> : <TrendArrow dir={c} />;
}

function MetricsCard() {
  const [tab, setTab] = useState<MetricTab>("sov");
  const m = brandMetrics[tab];
  const [shown, setShown] = useState<Record<string, boolean>>({ ...Object.fromEntries(brands.map((b) => [b.name, true])), Other: false });
  const top = Math.max(...m.ranking.map((r) => r.value));
  const fmt = (v: number) => (m.unit === "%" ? `${v}%` : tab === "position" ? String(v) : String(v));
  return (
    <section data-testid="brand-metrics" className="mt-6 rounded-lg bg-white shadow-card">
      <div className="flex gap-4 border-b border-[#f0f0f0] px-5 pt-[15px]" role="tablist">
        {(Object.keys(brandMetrics) as MetricTab[]).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className="relative pb-[8px] text-[16px] leading-6 text-rk-text hover:text-rk-link">
            {brandMetrics[k].label}
            {tab === k && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-[#8e92ec]" />}
          </button>
        ))}
      </div>
      <AiNotePanel note={m.note} />
      <div className="border-b border-[#f0f0f0] px-5 pt-[13px] pb-[15px]">
        {m.ranking.map((r) => (
          <RankRow
            key={r.brand}
            name={r.brand}
            color={brandColor[r.brand]}
            you={you(r.brand)}
            fill={tab === "position" ? (6 - r.value) / 6 : r.value / top}
            barColor={brandColor[r.brand]}
            pct={fmt(r.value)}
            right={
              <span className="pr-[5px] text-[14px]">
                <Change c={r.change} />
              </span>
            }
          />
        ))}
      </div>
      <div className="px-5 pt-5 pb-[23px]">
        <div className="flex flex-wrap gap-4">
          {m.ranking.map((r) => (
            <CheckBox key={r.brand} color={brandColor[r.brand]} on={shown[r.brand]} bold={you(r.brand)} you={you(r.brand)} label={r.brand} onClick={() => setShown((s) => ({ ...s, [r.brand]: !s[r.brand] }))} />
          ))}
          <CheckBox color="#a9abaa" on={shown.Other} label="Other" onClick={() => setShown((s) => ({ ...s, Other: !s.Other }))} />
        </div>
        <div className="mt-3">
          <TimeTabs />
        </div>
        <div className="mt-[2px]">
          <TrendChart
            lines={[
              ...m.ranking.filter((r) => shown[r.brand]).map((r) => ({ name: r.brand, color: brandColor[r.brand], data: m.trend[r.brand] })),
              ...(shown.Other ? [{ name: "Other", color: "#a9abaa", data: m.trend["Ac lens"].map((v) => v * 0.6) }] : []),
            ]}
            max={m.max}
            ticks={m.ticks}
            format={fmt}
            ticksX={trendTicks}
          />
        </div>
      </div>
    </section>
  );
}

function CitationsCard() {
  const [shown, setShown] = useState<Record<string, boolean>>(Object.fromEntries(citationDomains.map((d) => [d.domain, true])));
  return (
    <ReportCard title="Top Domains by Citations" testid="citations">
      <AiNotePanel note={citationsNote} />
      <div className="border-b border-[#f0f0f0] px-5 pt-[13px] pb-[15px]">
        {citationDomains.map((d) => (
          <RankRow
            key={d.domain}
            name={d.domain}
            color={d.color}
            you={d.you}
            fill={d.share / 100}
            barColor={d.color}
            pct={`${d.share}%`}
            nameW={512}
            barW={88}
            pctGap={18}
            right={
              <span className="flex items-center gap-[7px] pr-[21px]">
                <span className={d.you ? "font-semibold text-rk-text" : "text-rk-text"}>{d.value}</span>
                <TrendArrow dir={d.trend} />
              </span>
            }
          />
        ))}
      </div>
      <div className="px-5 pt-5 pb-[23px]">
        <div className="flex flex-wrap gap-4">
          {citationDomains.map((d) => (
            <CheckBox key={d.domain} color={d.color} on={shown[d.domain]} bold={d.you} you={d.you} label={d.domain} onClick={() => setShown((s) => ({ ...s, [d.domain]: !s[d.domain] }))} />
          ))}
        </div>
        <div className="mt-3">
          <TimeTabs />
        </div>
        <div className="mt-[2px]">
          <TrendChart
            lines={citationDomains.filter((d) => shown[d.domain]).map((d) => ({ name: d.domain, color: d.color, data: d.data }))}
            max={400}
            ticks={[0, 100, 200, 300, 400]}
            format={String}
            ticksX={trendTicks}
          />
        </div>
      </div>
    </ReportCard>
  );
}

function DiveTiles({ active, onChange }: { active: string; onChange: (k: string) => void }) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-[#e0e2e1] bg-white" data-testid="dive-tiles">
      {diveTiles.map((t, i) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`flex-1 px-[13px] pt-[16px] pb-[18px] text-left ${i ? "border-l border-[#e0e2e1]" : ""} ${on ? "bg-[#eaf0f8] shadow-[inset_0_0_0_1px_#a9bde4]" : "hover:bg-rk-bg"}`}
          >
            <div className="text-[16px] leading-6 text-rk-text">{t.title}</div>
            <div className="mt-[4px] text-[12px] leading-4 text-rk-muted">{t.text}</div>
          </button>
        );
      })}
    </div>
  );
}

const G = 257;

function PresCell({ cell }: { cell: QCell }) {
  if (!cell) return <div className="w-[257px]" />;
  const orange = "text-[#e0640f]";
  return (
    <div className="flex w-[257px] border-l border-[#ebebeb]">
      <div className="w-[111px] pt-[1px] pr-2 text-right">
        <div className={orange}>{cell.pres}</div>
        <div className="text-[12px] leading-4 text-rk-muted">{cell.avg === "-" ? "-" : `avg.pos. ${cell.avg}`}</div>
      </div>
      <div className="flex h-5 w-[146px] items-center gap-3 pl-2">
        {cell.sent == null ? (
          <span className="ml-[3px]">
            <NoData />
          </span>
        ) : (
          <>
            <SentimentPill value={cell.sent} />
            <Delta d={cell.delta} />
          </>
        )}
      </div>
    </div>
  );
}

function Delta({ d, pct = true }: { d: number | null; pct?: boolean }) {
  if (d == null) return <NoData />;
  if (d === 0) return <span className="text-rk-muted">0</span>;
  return (
    <span className={`flex items-center gap-[3px] text-[14px] ${d > 0 ? "text-[#009f81]" : "text-[#d1002f]"}`}>
      <span>{d > 0 ? "↑" : "↓"}</span>
      {Math.abs(d)}
      {pct ? "%" : ""}
    </span>
  );
}

function PlatformRowCell({ cell }: { cell: PlatformCell }) {
  return (
    <div className="flex h-[52px] w-[257px] items-center border-l border-[#ebebeb]">
      {cell ? (
        <>
          <div className="w-[51px] text-right">{cell.pos}</div>
          <div className="flex w-[52px] justify-end">
            {cell.change === "new" ? <span className="text-[#009f81]">new</span> : cell.change === 0 ? <span className="text-rk-muted">0</span> : <Delta d={cell.change} pct={false} />}
          </div>
          <div className="flex w-[154px] items-center gap-3 pl-4">
            <SentimentPill value={cell.sent} />
            <span className="text-rk-muted">{cell.delta}</span>
          </div>
        </>
      ) : (
        <>
          <div className="w-[82px] text-right">
            <NoData />
          </div>
          <div className="w-[76px] text-right">
            <NoData />
          </div>
        </>
      )}
    </div>
  );
}

const platformIcon = { "Google AI Mode": <GoogleIcon width={18} height={18} />, ChatGPT: <ChatGptIcon width={18} height={18} className="text-rk-text-2" />, Gemini: <GeminiIcon width={18} height={18} /> };

function BreakdownTable() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const W = 315 + G * 5;
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  const head = (
    <div className="border-b border-[#ebebeb] bg-[#f9f9f9] text-[12px] leading-4 text-rk-text">
      <div className="flex h-10">
        <div className="sticky left-0 flex w-[315px] items-center justify-between bg-[#f9f9f9] pr-[14px] pl-5">
          <span>Question</span>
          <span>Answer</span>
        </div>
        {brands.map((b) => (
          <div key={b.name} className={`flex w-[257px] items-center justify-center gap-[6px] border-l border-[#ebebeb] ${b.you ? "bg-[#e9ebeb] font-semibold" : ""}`}>
            <Dot color={b.color} size={12} />
            {b.name}
          </div>
        ))}
      </div>
      <div className="flex h-10">
        <div className="sticky left-0 w-[315px] bg-[#f9f9f9]" />
        {brands.map((b) => (
          <div key={b.name} className="flex w-[257px] border-l border-[#ebebeb]">
            <div className={`flex w-[111px] items-center justify-end gap-[6px] pr-[10px] ${b.you ? "bg-[#e9ebeb]" : ""}`}>
              Pres. (Pos.)
              {b.you && <SortIcon />}
            </div>
            <div className="flex items-center pl-[20px]">Sentiment</div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <ScrollTable header={head} width={W}>
      {questionRows.map((r, i) => {
        const isOpen = open.has(i) && !!r.platforms;
        const bg = isOpen ? "bg-[#f2f4f4]" : "bg-white";
        return (
          <Fragment key={r.q}>
            <div data-testid={`q-row-${i}`} className={`flex border-b border-[#ebebeb] text-[14px] leading-5 text-rk-text ${bg}`}>
              <div className={`sticky left-0 flex w-[315px] pt-3 pr-[72px] pb-3 pl-5 ${bg}`}>
                <button type="button" aria-label="Expand question" onClick={() => toggle(i)} className="mt-[2px] mr-[10px] h-4">
                  <Chevron open={isOpen} />
                </button>
                <span>{r.q}</span>
              </div>
              {r.cells.map((cell, k) => (
                <div key={k} className="pt-3">
                  <PresCell cell={cell} />
                </div>
              ))}
            </div>
            {isOpen &&
              r.platforms!.map((p) => (
                <div key={p.name} className="flex border-b border-[#ebebeb] bg-white text-[14px] leading-5 text-rk-text">
                  <div className="sticky left-0 flex h-[52px] w-[315px] items-center bg-white pr-[15px] pl-[45px]">
                    <span className="mr-2">{platformIcon[p.name]}</span>
                    <span className="flex-1">{p.name}</span>
                    <button type="button" aria-label={`View ${p.name} answer`} className="hover:opacity-70">
                      <AnswersIcon />
                    </button>
                  </div>
                  {p.cells.map((cell, k) => (
                    <PlatformRowCell key={k} cell={cell} />
                  ))}
                </div>
              ))}
          </Fragment>
        );
      })}
    </ScrollTable>
  );
}

function BreakdownCard() {
  return (
    <ReportCard title="Breakdown by Question" action={<ExportButton />} testid="breakdown">
      <AiNotePanel note={breakdownNote} />
      <div className="flex gap-2 px-5 pt-[21px] pb-[22px]">
        <FilterSelect label="Presence" options={["Present", "Not present"]} testid="filter-presence" />
        <FilterSelect label="Sentiment" options={["Positive", "Neutral", "Negative"]} />
        <FilterSelect label="Sentiment Changes" options={["Improved", "Declined", "No change"]} />
        <FilterSelect label="Competitors" options={brands.filter((b) => !b.you).map((b) => b.name)} />
      </div>
      <BreakdownTable />
      <div className="px-5 pt-3 pb-5">
        <Pagination pages={8} />
      </div>
    </ReportCard>
  );
}

export function NarrativeDrivers() {
  const [tile, setTile] = useState<string>(diveTiles[0].key);
  return (
    <div className="pb-[126px]">
      <InsightsCard items={narrativeInsights} />
      <SovPlatformCard />
      <MetricsCard />
      <CitationsCard />
      <SectionLabel id="dive-deeper">Dive Deeper</SectionLabel>
      <DiveTiles active={tile} onChange={setTile} />
      <BreakdownCard />
      <SectionLabel id="strategy-label">Strategy Recommendations</SectionLabel>
      <StrategyCard items={narrativeOpportunities} />
    </div>
  );
}
