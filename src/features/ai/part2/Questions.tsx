"use client";

import { useState } from "react";
import { intents, questionsInsights, questionsOpportunities, topics, treemap, type IntentKey, type Topic } from "./data";
import { InsightsCard, ReportCard, SectionLabel, StrategyCard } from "./ui";

const intentBy = Object.fromEntries(intents.map((it, i) => [it.key, { ...it, order: i }])) as Record<IntentKey, (typeof intents)[number] & { order: number }>;

function Ring({ segments, size, thickness }: { segments: { value: number; color: string }[]; size: number; thickness: number }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const lens = segments.map((s) => (s.value / total) * c);
  const offs = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden>
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={thickness}
          strokeDasharray={`${Math.max(lens[i] - 1, 0)} ${c}`}
          strokeDashoffset={-offs[i]}
        />
      ))}
    </svg>
  );
}

function Legend({ rows }: { rows: { label: string; color: string; value: number }[] }) {
  return (
    <div className="grid grid-cols-[auto_auto] content-start gap-x-[20px] gap-y-[7.8px] self-center text-[14px] leading-5 text-rk-text">
      {rows.map((r, i) => (
        <div key={i} className="contents">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: r.color }} />
            {r.label}
          </span>
          <span className="text-right">{r.value}%</span>
        </div>
      ))}
    </div>
  );
}

function TopicTreemap() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="overflow-hidden rounded-[4px]" data-testid="treemap">
      {treemap.rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ height: row.h }}>
          {row.cells.map((cell) => {
            const t = topics[cell.topic];
            return (
              <a
                key={cell.topic}
                href={`#topic-${cell.topic}`}
                onMouseEnter={() => setHover(cell.topic)}
                onMouseLeave={() => setHover(null)}
                className="flex min-w-0 items-center justify-center overflow-hidden px-1 text-center text-[14px] leading-5 text-white"
                style={{ flexGrow: cell.w, flexBasis: 0, background: t.color, opacity: hover != null && hover !== cell.topic ? 0.85 : 1 }}
              >
                <span className="line-clamp-5 break-words">{cell.w < 100 ? t.short.replace(/^(\S+) (\S+)/, "$1 $2") : t.short}</span>
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function IntentCard() {
  return (
    <ReportCard title="Query Intent Distribution" testid="intent-distribution">
      <div className="flex px-5 pt-5 pb-5">
        <div className="mt-[7px] flex w-[178px] shrink-0 justify-center self-start">
          <Ring segments={intents.map((i) => ({ value: i.share, color: i.color }))} size={166} thickness={30} />
        </div>
        <div className="ml-[26px] w-[651px]">
          <div className="grid grid-cols-[1fr_auto] gap-y-[7.8px] text-[14px] leading-5 text-rk-text">
            {intents.map((r) => (
              <div key={r.key} className="contents">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: r.color }} />
                  {r.label}
                </span>
                <span className="text-right">{r.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ReportCard>
  );
}

function IntentByTopic() {
  return (
    <ReportCard title="Intent by Topic" testid="intent-by-topic">
      <div className="px-5 pt-[21px] pb-[22px]">
        {topics.map((t, i) => {
          const segs = [...t.mix].sort((a, b) => intentBy[a[0]].order - intentBy[b[0]].order);
          const total = segs.reduce((a, s) => a + s[1], 0);
          return (
            <div key={i} className={i ? "mt-[14px]" : ""}>
              <div className="text-[14px] leading-5 text-rk-text">{t.short}</div>
              <div className="mt-[2px] flex h-5 gap-px overflow-hidden rounded-[3px]">
                {segs.map(([k, v]) => (
                  <span key={k} title={`${intentBy[k].label}: ${v}%`} style={{ width: `${(v / total) * 100}%`, background: intentBy[k].color }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ReportCard>
  );
}

function TopicBlock({ t, i }: { t: Topic; i: number }) {
  const groups = Object.entries(t.questions) as [IntentKey, [string, string]][];
  return (
    <div id={`topic-${i}`} data-testid={`topic-${i}`} className={i ? "mt-[26px]" : ""}>
      <h3 className="text-[20px] leading-7 text-rk-text">{t.name}</h3>
      <div className="mt-[14px] rounded-lg bg-rk-bg px-3 pt-[11px] pb-[13px]">
        <div className="flex">
          <div className="my-[9px] ml-2 shrink-0 self-start">
            <Ring segments={t.mix.map(([k, v]) => ({ value: v, color: intentBy[k].color }))} size={134} thickness={24} />
          </div>
          <div className="ml-8 flex">
            <Legend rows={t.mix.map(([k, v]) => ({ label: intentBy[k].label, color: intentBy[k].color, value: v }))} />
          </div>
        </div>
        <div className="mt-[29px]">
          {groups.map(([k, qs]) => (
            <div key={k} className="mb-6">
              <div className="text-[14px] leading-5 font-semibold text-rk-text">{intentBy[k].label}</div>
              <div className="mt-[5px] text-[14px] leading-5 text-rk-muted">
                {qs.map((q) => (
                  <div key={q}>{q}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Questions() {
  return (
    <div className="pb-[126px]">
      <InsightsCard items={questionsInsights} />
      <ReportCard title="Topic Distribution" testid="topic-distribution">
        <div className="p-5">
          <TopicTreemap />
        </div>
      </ReportCard>
      <SectionLabel id="current-analysis">Current Questions Analysis</SectionLabel>
      <IntentCard />
      <IntentByTopic />
      <SectionLabel id="topic-analysis">Topic Analysis &amp; Patterns</SectionLabel>
      <ReportCard title="Query Topics" testid="query-topics">
        <div className="px-5 pt-[19px] pb-5">
          {topics.map((t, i) => (
            <TopicBlock key={i} t={t} i={i} />
          ))}
        </div>
      </ReportCard>
      <SectionLabel id="strategy-label">Strategy Recommendations</SectionLabel>
      <StrategyCard items={questionsOpportunities} />
    </div>
  );
}
