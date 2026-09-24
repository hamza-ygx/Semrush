"use client";

import { useMemo, useState } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { SerpIcon } from "@/features/organic/serpIcons";
import { overviewScores, sensorFaq, serpFeatures, volatility } from "../data";
import { LOW, Legend, NORMAL, HIGH, VERY_HIGH, VolatilityChart, bandColor } from "./charts";
import { CategoryList, SensorCard, SensorControls, SensorFaq, SensorShell } from "./SensorShell";

const bandLabel = (v: number) => (v < 2 ? ["Low range", "Calm day in the SERPs."] : v < 5 ? ["Normal range", "Another ordinary day."] : v < 8 ? ["High range", "Rankings are shifting."] : ["Very high range", "Significant SERP changes."]);

export const scaleSeries = (base: (number | null)[], factor: number) => base.map((v) => (v == null ? null : Math.min(9.8, Math.round(v * factor * 100) / 100)));

function FeatureIcon({ name }: { name: string }) {
  if (name === "dash")
    return (
      <svg viewBox="0 0 16 16" width={16} height={16}>
        <path d="M3 8h10" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    );
  if (name === "starO")
    return (
      <svg viewBox="0 0 16 16" width={16} height={16}>
        <path d="m8 1.8 1.9 4 4.3.5-3.2 3 .9 4.3L8 11.5l-3.9 2.1.9-4.3-3.2-3 4.3-.5z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    );
  return <SerpIcon name={name} />;
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  return (
    <Popover
      align="right"
      className="ml-auto"
      panelClassName="w-[180px]"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={() => {
            setCopied(false);
            toggle();
          }}
          className="flex h-7 items-center gap-[7px] rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-[#dfe1e1]"
        >
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M9.5 3 14 7l-4.5 4M14 7H8c-3 0-5 2-5.5 5.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
      )}
    >
      {(close) => (
        <MenuItem
          onClick={() => {
            try {
              void navigator.clipboard?.writeText(window.location.href);
            } catch {}
            setCopied(true);
            setTimeout(close, 600);
          }}
        >
          {copied ? "Link copied" : "Copy link"}
        </MenuItem>
      )}
    </Popover>
  );
}

function CompareWith() {
  const [cmp, setCmp] = useState<string | null>(null);
  return (
    <Popover
      className="ml-4"
      panelClassName="max-h-[320px] w-[240px] overflow-y-auto"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-[14px] text-rk-link hover:text-rk-link-hover">
          {cmp ? `Compare with ${cmp}` : "Compare with..."}
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) =>
        overviewScores.slice(1).map(([c]) => (
          <MenuItem
            key={c}
            active={c === cmp}
            onClick={() => {
              setCmp(c);
              close();
            }}
          >
            {c}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

export function SensorOverview() {
  const [cat, setCat] = useState("All categories");
  const score = overviewScores.find(([c]) => c === cat)![1];
  const series = useMemo(() => (cat === "All categories" ? volatility : scaleSeries(volatility, score / 2.2)), [cat, score]);
  const [range, note] = bandLabel(score);
  const color = bandColor(score) === NORMAL ? "#00ae2a" : bandColor(score);
  const half = Math.ceil(serpFeatures.length / 2);
  return (
    <SensorShell tab="overview">
      <div className="flex gap-6 px-8 pt-[23px]">
        <div>
          <CategoryList items={overviewScores} selected={cat} onSelect={setCat} render={(v) => <span className="text-[14px] font-semibold" style={{ color: v < 2 ? "#5d62dc" : "#12a33c" }}>{v.toFixed(1)}</span>} />
        </div>
        <div className="w-[779px] shrink-0">
          <SensorControls
            extra={
              <>
                <CompareWith />
                <ShareButton />
              </>
            }
          />
          <div className="mt-4 h-[80px] rounded-md border border-[#d3dbef] bg-[#ebf0fe] px-4 pt-[17px] text-[14px] leading-[21px] text-rk-text">
            Shifts in baseline SERP volatility across markets were recalculated on September 18th.
            <br />
            The improved formula may have changed the scores.
          </div>
          <SensorCard className="relative mt-[17px] h-[445px]">
            <div className="flex h-[71px] items-start justify-between border-b border-[#f0f0f0] pt-[10px] pr-5 pl-5">
              <div>
                <h2 className="text-[16px] leading-5 font-semibold text-rk-text">SERP volatility for the last 30 days</h2>
                <div className="mt-[9px] text-[14px] leading-5 text-rk-muted">{cat}</div>
              </div>
              <div className="flex items-end gap-[17px]">
                <div className="mb-[9px]">
                  <div className="text-[16px] leading-5 font-semibold" style={{ color }}>
                    {range}
                  </div>
                  <div className="text-[12px] leading-4 text-rk-muted">{note}</div>
                </div>
                <div className="-mt-[2px] flex items-end">
                  <span className="text-[48px] leading-[52px] font-semibold tracking-[-0.5px]" style={{ color }}>
                    {score.toFixed(1)}
                  </span>
                  <span className="mb-[6px] text-[12px] leading-4" style={{ color }}>
                    /10
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-[22px] ml-[21px]">
              <Legend
                items={[
                  { color: LOW, label: "Low" },
                  { color: NORMAL, label: "Normal" },
                  { color: HIGH, label: "High" },
                  { color: VERY_HIGH, label: "Very High" },
                ]}
              />
            </div>
            <VolatilityChart data={series} />
          </SensorCard>
          <SensorCard className="mt-[17px] pb-[15px]">
            <div className="h-[67px] border-b border-rk-border px-5 pt-[9px]">
              <h2 className="text-[16px] leading-5 font-semibold text-rk-text">SERP Features Occurrence</h2>
              <div className="mt-[9px] text-[14px] leading-5 text-rk-muted">Percentage of SERPs where this feature appears in top 20 results</div>
            </div>
            <div className="flex pt-[16px]">
              {[serpFeatures.slice(0, half), serpFeatures.slice(half)].map((col, ci) => (
                <div key={ci} className={ci === 0 ? "w-[406px]" : "w-[373px]"}>
                  {col.map(([icon, label, pct, delta]) => (
                    <div key={label} className="flex h-[41px] items-center pl-[27px] text-[13px]">
                      <span className="flex w-[25px] text-[#484a54]">
                        <FeatureIcon name={icon} />
                      </span>
                      <span className="w-[187px] text-rk-text">{label}</span>
                      <span className="w-[52px] text-right font-semibold text-rk-text">{pct}</span>
                      <span className={`w-[54px] text-right ${delta === "0" ? "text-rk-text-2" : delta.startsWith("+") ? "text-[#1b8a63]" : "text-[#d1002f]"}`}>{delta}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SensorCard>
          <div className="mt-[17px]">
            <SensorFaq items={sensorFaq} />
          </div>
        </div>
      </div>
    </SensorShell>
  );
}
