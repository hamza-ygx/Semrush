"use client";

import { useState } from "react";
import { TrafficFrame } from "../TrafficFrame";
import { SourcesFlow, TrafficLineChart, TrendingCards, WordCloud } from "../charts";
import { DomainLegend, DomainSwitch, ExportButton, OutlineButton, SampleCard, SegTabs } from "../ui";
import { organicSearch, paidSearch, referral, type ChannelChart } from "./channelData";

const configs = { referral, organicSearch, paidSearch };

function HelpCircle() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-muted">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M6.2 6.3a1.9 1.9 0 0 1 3.7.4c0 1.2-1.9 1.5-1.9 2.6M8 11.2v.1" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
    </svg>
  );
}

function TrendCard({ title, chart, width, tabs, half, exportBtn }: { title: string; chart: ChannelChart; width: number; tabs?: string[]; half?: boolean; exportBtn?: boolean }) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  return (
    <SampleCard title={title} extra={exportBtn ? <ExportButton /> : undefined} className={half ? "w-[610px]" : "w-[1236px]"} bodyClassName={`px-5 ${tabs ? "pt-[20px] pb-[24px]" : "pt-[16px] pb-[21px]"}`}>
      {tabs && <SegTabs items={tabs} className="mb-[15px]" />}
      <TrafficLineChart
        width={width}
        series={chart.series}
        ticks={chart.ticks}
        plotHeight={chart.plotHeight}
        labelEvery={half ? 2 : 1}
        plotLeft={half ? (chart.ticks.some((t) => t % 1e6 !== 0) ? 50 : chart.ticks[chart.ticks.length - 1] >= 1e7 ? 44 : 42) : undefined}
        hidden={Object.fromEntries(Object.entries(hidden).map(([k, v]) => [k, !v]))}
      />
      <DomainLegend className={tabs ? "mt-[8px]" : "mt-[10px]"} onChange={(v) => setHidden(v)} />
    </SampleCard>
  );
}

export function ChannelReport({ kind }: { kind: keyof typeof configs }) {
  const cfg = configs[kind];
  const half = !!cfg.keywords;
  return (
    <TrafficFrame title={cfg.title}>
      <div className="flex w-[1236px] flex-col gap-4">
        <TrendCard title="Traffic Trend" chart={cfg.trend} width={1196} tabs={cfg.tabs} />
        <div className="flex gap-4">
          <TrendCard title="Desktop Trend" chart={cfg.desktop} width={570} tabs={cfg.tabs} half exportBtn />
          <TrendCard title="Mobile Trend" chart={cfg.mobile} width={570} tabs={cfg.tabs} half exportBtn />
        </div>
        <SampleCard title="Top Growing Pages" info bodyClassName="px-5 pt-[21px] pb-[21px]">
          <div className="flex items-center gap-[20px]">
            {cfg.tabs && <SegTabs items={cfg.tabs} />}
            <DomainSwitch />
          </div>
          <div className="mt-[21px]">
            <TrendingCards pages={cfg.growing} />
          </div>
          <OutlineButton className="mt-[21px]">View details</OutlineButton>
        </SampleCard>
        <div className="flex items-stretch gap-4">
          <SampleCard
            title="Top Sources"
            info
            extra={cfg.sourcesExport ? <ExportButton /> : undefined}
            className={half ? "w-[610px]" : "w-[1236px]"}
            bodyClassName="px-5 pt-[20px] pb-[20px]"
          >
            {cfg.sourcesNote && (
              <div className="mb-[25px] flex items-center gap-[8px] text-[14px] leading-5 text-rk-muted">
                <HelpCircle />
                {cfg.sourcesNote}
              </div>
            )}
            <DomainSwitch />
            <div className="mt-[20px]">
              <SourcesFlow sources={cfg.sources} target="zara.com" width={half ? 570 : 1196} labelRight={half ? 159 : 231} boxX={half ? 450 : 1004} />
            </div>
            <OutlineButton className="mt-[20px]">View details</OutlineButton>
          </SampleCard>
          {cfg.keywords && (
            <SampleCard title="Top Keywords" className="w-[610px]" bodyClassName="px-5 pt-[20px] pb-[20px]">
              <div className="mb-[25px] flex items-center gap-[8px] text-[14px] leading-5 text-rk-muted">
                <HelpCircle />
                {cfg.keywords.note}
              </div>
              <DomainSwitch />
              <div className="mt-[20px]">
                <WordCloud words={cfg.keywords.words} height={230} />
              </div>
            </SampleCard>
          )}
        </div>
      </div>
    </TrafficFrame>
  );
}
