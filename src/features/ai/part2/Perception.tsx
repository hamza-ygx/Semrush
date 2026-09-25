"use client";

import { Fragment, useState } from "react";
import { Pagination } from "@/features/organic/ui";
import {
  brandColor,
  brands,
  favorableNote,
  favorableRanking,
  favorableTrend,
  featureCategories,
  featureNote,
  featureRows,
  improvementAreas,
  mentionsByCategory,
  mentionsNote,
  perceptionByPlatform,
  perceptionInsights,
  perceptionOpportunities,
  perceptionPlatformNote,
  sentimentByCategory,
  sentimentNote,
  strengthFactors,
  trendTicks,
  type Driver,
} from "./data";
import { Chevron, ScrollTable, SortIcon } from "./ScrollTable";
import {
  AiNotePanel,
  AnswersIcon,
  BulbIcon,
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
  Segments,
  SentimentPill,
  ShieldIcon,
  StrategyCard,
  TimeTabs,
  TrendArrow,
  TrendChart,
} from "./ui";

const you = (name: string) => brands.find((b) => b.name === name)?.you;

function PlatformCard() {
  const [enabled, setEnabled] = useState([true, true, true, false]);
  return (
    <ReportCard title="Competitive Perception by Platform" testid="perception-platform">
      <AiNotePanel note={perceptionPlatformNote} />
      <div className="px-5 pt-5 pb-[23px]">
        <PlatformLegend enabled={enabled} setEnabled={setEnabled} />
        <PlatformBars
          rows={perceptionByPlatform.map((r) => ({ name: r.brand, color: brandColor[r.brand], you: you(r.brand), values: r.values }))}
          max={100}
          ticks={[0, 50, 100]}
          enabled={enabled}
        />
      </div>
    </ReportCard>
  );
}

function FavorableCard() {
  const [shown, setShown] = useState<Record<string, boolean>>(Object.fromEntries(favorableRanking.map((r) => [r.brand, true])));
  return (
    <ReportCard title="Favorable Sentiment" testid="favorable">
      <AiNotePanel note={favorableNote} />
      <div className="border-b border-[#f0f0f0] px-5 pt-[13px] pb-[15px]">
        {favorableRanking.map((r) => (
          <RankRow
            key={r.brand}
            name={r.brand}
            color={brandColor[r.brand]}
            you={you(r.brand)}
            fill={r.value / 100}
            barColor={r.value >= 92 ? "#008662" : "#06c89a"}
            pct={`${r.value}%`}
            right={
              <span className="pr-[1px]">
                <TrendArrow dir={r.trend} />
              </span>
            }
          />
        ))}
      </div>
      <div className="px-5 pt-5 pb-[20px]">
        <div className="flex flex-wrap gap-4">
          {favorableRanking.map((r) => (
            <CheckBox
              key={r.brand}
              color={brandColor[r.brand]}
              on={shown[r.brand]}
              bold={you(r.brand)}
              you={you(r.brand)}
              label={r.brand}
              onClick={() => setShown((s) => ({ ...s, [r.brand]: !s[r.brand] }))}
            />
          ))}
        </div>
        <div className="mt-3">
          <TimeTabs />
        </div>
        <div className="mt-[2px]">
          <TrendChart
            lines={favorableRanking.filter((r) => shown[r.brand]).map((r) => ({ name: r.brand, color: brandColor[r.brand], data: favorableTrend[r.brand] }))}
            max={100}
            ticks={[0, 20, 40, 60, 80, 100]}
            format={(v) => `${v}%`}
            ticksX={trendTicks}
          />
        </div>
      </div>
    </ReportCard>
  );
}

function DriverItem({ d, tone }: { d: Driver; tone: "good" | "bad" }) {
  return (
    <div className={`flex min-h-[52px] items-center rounded-lg py-3 pr-3 pl-3 ${tone === "good" ? "bg-[#defffa]" : "bg-[#fff8e2]"}`}>
      <p className="flex-1 pr-[20px] text-[14px] leading-5 text-rk-text">{d.text}</p>
      <button type="button" aria-label="View answers" className="mr-[17px] ml-[1px] hover:opacity-70">
        <AnswersIcon />
      </button>
      <Segments score={d.score} tone={tone} />
    </div>
  );
}

function DriversCard() {
  return (
    <ReportCard title="Key Sentiment Drivers" testid="drivers">
      <div className="px-5 pt-5 pb-5">
        <div className="flex items-center gap-2 text-[14px] leading-5 font-semibold text-rk-text">
          <ShieldIcon />
          Brand Strength Factors
        </div>
        <div className="mt-3 space-y-2">
          {strengthFactors.map((d) => (
            <DriverItem key={d.text} d={d} tone="good" />
          ))}
        </div>
        <div className="mt-[19px] flex items-center gap-2 text-[14px] leading-5 font-semibold text-rk-text">
          <BulbIcon />
          Areas for Improvement
        </div>
        <div className="mt-3 space-y-2" data-testid="improvement">
          {improvementAreas.map((d) => (
            <DriverItem key={d.text} d={d} tone="bad" />
          ))}
        </div>
      </div>
    </ReportCard>
  );
}

const sentimentScale = [
  { label: "0 mentions", color: "#e0e2e1", x: 84 },
  { label: "0% – 7%", color: "#ff6b70", x: 254 },
  { label: "8% – 39%", color: "#ffb26b", x: 418 },
  { label: "40% – 60%", color: "#fdda72", x: 611 },
  { label: "61% – 92%", color: "#00cb98", x: 775 },
  { label: "93% – 100%", color: "#008360", x: 938 },
];

const mentionScale = [
  { label: "0 mentions", color: "#ffffff", x: 84 },
  { label: "1 – 29", color: "#f0f5ff", x: 254 },
  { label: "30 – 54", color: "#cddcff", x: 418 },
  { label: "55 – 104", color: "#93a4f5", x: 611 },
  { label: "105 – 179", color: "#5c5bc4", x: 775 },
  { label: "180+", color: "#30296b", x: 938 },
];

function sentimentColor(v: number) {
  if (v >= 93) return ["#008360", "#fff"];
  if (v >= 61) return ["#00cb98", "#fff"];
  if (v >= 40) return ["#fdda72", "#484a49"];
  if (v >= 8) return ["#ffb26b", "#fff"];
  return ["#ff6b70", "#fff"];
}

function mentionColor(v: number) {
  if (v >= 180) return ["#30296b", "#fff"];
  if (v >= 105) return ["#5c5bc4", "#fff"];
  if (v >= 55) return ["#93a4f5", "#fff"];
  if (v >= 30) return ["#cddcff", "#6a6c6a"];
  return ["#f0f5ff", "#6a6c6a"];
}

function Heatmap({ values, color, scale }: { values: number[][]; color: (v: number) => string[]; scale: { label: string; color: string; x: number }[] }) {
  return (
    <div className="px-5 pt-[25px] pb-[22px]">
      <div className="grid grid-cols-[198px_repeat(5,1fr)] gap-x-1 gap-y-1">
        <div className="pb-[4px] text-[12px] leading-5 text-rk-muted">Category</div>
        {brands.map((b) => (
          <div key={b.name} className={`flex items-center justify-center gap-[6px] pb-[4px] text-[12px] leading-5 ${b.you ? "font-semibold text-rk-text" : "text-rk-text"}`}>
            <Dot color={b.color} size={10} />
            {b.name}
          </div>
        ))}
        {featureCategories.map((cat, i) => (
          <Fragment key={cat}>
            <div className="flex h-16 items-center justify-between pr-4 text-[14px] leading-5 text-rk-text">
              <span className="max-w-[160px]">{cat}</span>
              <button type="button" aria-label="View answers" className="hover:opacity-70">
                <AnswersIcon />
              </button>
            </div>
            {values[i].map((v, k) => {
              const [bg, fg] = color(v);
              return (
                <div key={k} className="flex h-16 items-center justify-center rounded-[4px] text-[14px]" style={{ background: bg, color: fg }}>
                  {v}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="relative mt-[21px] h-[34px]">
        {scale.map((s) => (
          <div key={s.label} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: s.x }}>
            <span className="text-[12px] leading-5 whitespace-nowrap text-rk-muted">{s.label}</span>
            <span className="mt-1 h-2 w-[96px] rounded-full border border-[#e0e2e1]" style={{ background: s.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureTable() {
  const [open, setOpen] = useState<number | null>(null);
  const W = 355 + 166 * 5 + 8;
  const head = (
    <div className="border-b border-[#ebebeb] bg-[#f9f9f9] text-[12px] leading-4 text-rk-text">
      <div className="flex h-10">
        <div className="sticky left-0 flex w-[250px] items-center bg-[#f9f9f9] pl-5">Broad Description</div>
        <div className="flex w-[73px] items-center justify-center pr-[1px]">Answers</div>
        {brands.map((b) => (
          <div key={b.name} className={`flex w-[166px] items-center justify-center gap-[6px] ${b.you ? "bg-[#ebebeb] font-semibold" : ""}`}>
            <Dot color={b.color} size={12} />
            {b.name}
          </div>
        ))}
      </div>
      <div className="flex h-10">
        <div className="w-[323px]" />
        {brands.map((b) => (
          <Fragment key={b.name}>
            <div className={`relative flex w-[78px] items-center justify-end pr-[10px] ${b.you ? "bg-[#ebebeb]" : ""}`}>
              {b.you ? (
                <>
                  <span className="w-[42px] overflow-hidden whitespace-nowrap">Mention</span>
                  <SortIcon />
                </>
              ) : (
                "Mention"
              )}
            </div>
            <div className="flex w-[88px] items-center pl-[10px]">Sentiment</div>
          </Fragment>
        ))}
      </div>
    </div>
  );
  return (
    <ScrollTable header={head} width={W}>
      {featureRows.map((r, i) => (
        <Fragment key={r.title}>
          <div className="flex border-b border-[#f0f0f0] text-[14px] leading-5 text-rk-text">
            <div className="sticky left-0 flex w-[250px] bg-white pt-[11px] pr-2 pb-[13px] pl-5">
              <button type="button" aria-label="Expand row" onClick={() => setOpen(open === i ? null : i)} className="mt-[2px] mr-[10px] h-4">
                <Chevron open={open === i} />
              </button>
              <div>
                <div>{r.title}</div>
                <div className="mt-[3px] text-[12px] leading-4 text-rk-muted">{r.category}</div>
              </div>
            </div>
            <div className="flex w-[73px] items-start justify-center gap-[10px] pt-[16px] pr-[3px] text-[16px] leading-5 text-rk-link">
              <AnswersIcon className="-mt-[1px]" />
              <span className="-mt-[2px]">{r.answers}</span>
            </div>
            {r.cells.map((cell, k) => (
              <Fragment key={k}>
                <div className="w-[78px] pt-[11px] pr-[7px] text-right">{cell ? cell[0] : <NoData />}</div>
                <div className="w-[88px] pt-[11px] pl-[14px]">{cell ? <SentimentPill value={cell[1]} /> : <span className="ml-[57px]"><NoData /></span>}</div>
              </Fragment>
            ))}
          </div>
          {open === i && (
            <div className="border-b border-[#f0f0f0] bg-[#f9f9f9] py-3 pr-5 pl-[78px] text-[12px] leading-4 text-rk-muted">
              Mentioned in {r.answers} AI answers across Google AI Mode, ChatGPT, and Gemini.
            </div>
          )}
        </Fragment>
      ))}
    </ScrollTable>
  );
}

function FeatureCard() {
  return (
    <ReportCard title="AI Feature Descriptions" subtitle="Show how many times a feature description was used for each brand" action={<ExportButton />} testid="features">
      <AiNotePanel note={featureNote} />
      <div className="flex gap-2 px-5 pt-[21px] pb-[22px]">
        <FilterSelect label="Category" options={featureCategories} testid="filter-category" />
        <FilterSelect label="Sentiment" options={["Positive", "Neutral", "Negative"]} />
        <FilterSelect label="Mentions" options={["1–10", "11–50", "51+"]} />
      </div>
      <FeatureTable />
      <div className="px-5 pt-5 pb-5">
        <Pagination pages={19} />
      </div>
    </ReportCard>
  );
}

export function Perception() {
  return (
    <div className="pb-[126px]">
      <InsightsCard items={perceptionInsights} />
      <PlatformCard />
      <SectionLabel id="see-perceived">See how your brand is perceived</SectionLabel>
      <FavorableCard />
      <SectionLabel id="uncover">Uncover what shapes your brand perception</SectionLabel>
      <DriversCard />
      <ReportCard title="Sentiment by Feature Category" subtitle="Percentage of favorable sentiment per brand in each category." testid="sentiment-category">
        <AiNotePanel note={sentimentNote} />
        <Heatmap values={sentimentByCategory} color={sentimentColor} scale={sentimentScale} />
      </ReportCard>
      <ReportCard title="Mentions by Feature Category" subtitle="The number times each brand was mentioned in each category." testid="mentions-category">
        <AiNotePanel note={mentionsNote} />
        <Heatmap values={mentionsByCategory} color={mentionColor} scale={mentionScale} />
      </ReportCard>
      <FeatureCard />
      <SectionLabel id="strategy-label">Strategy Recommendations</SectionLabel>
      <StrategyCard items={perceptionOpportunities} />
    </div>
  );
}
