"use client";

import { useMemo, useState } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { SerpIcon } from "@/features/organic/serpIcons";
import { overviewScores, sensorFaq, serpFeatures, volatility } from "../data";
import { LOW, Legend, NORMAL, HIGH, VERY_HIGH, VolatilityChart, bandColor } from "./charts";
import { CategoryList, Chevron, SensorCard, SensorControls, SensorFaq, SensorShell, sensorScroll } from "./SensorShell";

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

const XLogo = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 1.5h4l3 4.2 3.6-4.2h1.6L9.3 6.6l5.2 7.9h-4L7.3 9.9l-4 4.6H1.7l4.9-5.7zm2.3 1.1 7.4 10.8h1.3L5.2 2.6z" fill="currentColor" />
  </svg>
);

const FbLogo = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="8" r="7.5" fill="currentColor" />
    <path d="M9 15.5V10h1.8l.3-2.2H9V6.5c0-.6.2-1 1.1-1h1.1V3.6c-.2 0-.9-.1-1.6-.1-1.6 0-2.7 1-2.7 2.8v1.5H5.1V10h1.8v5.5z" fill="#fff" />
  </svg>
);

const EmbedIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M4.5 4 1 8l3.5 4M11.5 4 15 8l-3.5 4M9.5 2.5l-3 11" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ShareButton() {
  const share = (url: string) => window.open(url, "_blank", "noopener");
  const items = [
    { label: "Tweet", icon: <XLogo />, run: () => share(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`) },
    { label: "Facebook", icon: <FbLogo />, run: () => share(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`) },
    { label: "Embed widget", icon: <EmbedIcon />, run: () => void navigator.clipboard?.writeText(`<iframe src="${window.location.href}" width="600" height="400"></iframe>`).catch(() => {}) },
  ];
  return (
    <Popover
      align="right"
      offset={6}
      className="ml-auto"
      panelClassName="w-[135px] !pt-[3px] !pb-[3px]"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid="sensor-share"
          onClick={toggle}
          className={`flex h-7 items-center gap-[7px] rounded-md border border-[#d6d8d8] px-2 text-[14px] text-rk-text-2 hover:bg-[#dfe1e1] ${open ? "bg-[#e0e2e3]" : "bg-[#e9ebeb]"}`}
        >
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M9.5 3 14 7l-4.5 4M14 7H8c-3 0-5 2-5.5 5.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
      )}
    >
      {(close) =>
        items.map((it) => (
          <button
            key={it.label}
            type="button"
            onClick={() => {
              it.run();
              close();
            }}
            className="flex h-8 w-full items-center gap-[7px] px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg"
          >
            <span className="flex w-4 text-rk-text">{it.icon}</span>
            {it.label}
          </button>
        ))
      }
    </Popover>
  );
}

function CompareToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button type="button" data-testid="sensor-compare" aria-expanded={open} onClick={onToggle} className="group ml-4 flex items-center gap-[6px] text-[14px] text-rk-link hover:text-rk-link-hover">
      <span className="underline-offset-[3px] group-hover:underline">Compare with...</span>
      <Chevron />
    </button>
  );
}

const cmpBtn = "flex h-7 items-center gap-2 rounded-md border bg-white pr-2 pl-2 text-[14px] outline-none";

function CompareSelect({ label, options, width }: { label: string; options: string[]; width?: string }) {
  const [v, setV] = useState<string | null>(null);
  return (
    <Popover
      offset={6}
      panelClassName={`min-w-full max-h-[246px] ${sensorScroll} ${width ?? ""}`}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-compare={label}
          onClick={toggle}
          className={`${cmpBtn} ${open ? "border-[#a5a3ad]" : "border-[#d3d5d8] hover:border-[#a5a3ad] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_#a9aee0]"} ${v ? "text-rk-text" : "text-[#8e9099]"}`}
        >
          {v ?? label}
          <span className="text-rk-text">
            <Chevron size={16} />
          </span>
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <MenuItem
            key={o}
            active={o === v}
            onClick={() => {
              setV(o);
              close();
            }}
            className="whitespace-nowrap"
          >
            {o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function CategorySelect({ current }: { current: string }) {
  const [v, setV] = useState<string | null>(null);
  return (
    <Popover
      offset={4}
      panelClassName={`w-[180px] max-h-[246px] !pt-[4px] ${sensorScroll}`}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-compare="Category"
          onClick={toggle}
          className={`${cmpBtn} ${open ? "border-[#a5a3ad]" : "border-[#d3d5d8] hover:border-[#a5a3ad] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_#a9aee0]"} ${v ? "text-rk-text" : "text-[#8e9099]"}`}
        >
          <span className="max-w-[140px] truncate">{v ?? "Category"}</span>
          <span className="text-rk-text">
            <Chevron size={16} />
          </span>
        </button>
      )}
    >
      {(close) =>
        overviewScores.map(([c]) =>
          c === current ? (
            <div key={c} className="flex h-8 items-center gap-2 px-2 text-[14px] whitespace-nowrap text-[#b9b9c0]">
              {c}
              <span className="rounded-full bg-[#efecfc] px-2 text-[12px] leading-5 text-[#b8aef0]">Current</span>
            </div>
          ) : (
            <button
              key={c}
              type="button"
              onClick={() => {
                setV(c);
                close();
              }}
              className={`flex h-8 w-full items-center px-2 text-left text-[14px] whitespace-nowrap text-rk-text hover:bg-rk-bg ${c === v ? "bg-[#e9f7ff]" : ""}`}
            >
              {c}
            </button>
          ),
        )
      }
    </Popover>
  );
}

function CompareBar({ current }: { current: string }) {
  return (
    <SensorCard className="mt-[16px] flex h-[69px] items-start gap-2 px-5 pt-5">
      <CompareSelect label="Device" options={["Desktop", "Mobile"]} />
      <CompareSelect label="Database" options={["United States", "United Kingdom", "Germany", "Italy", "Spain", "France", "Australia"]} width="w-[180px]" />
      <CategorySelect current={current} />
      <CompareSelect label="SERP Feature" options={serpFeatures.map((f) => f[1])} width="w-[220px]" />
      <CompareSelect label="Project" options={["rkjh.se"]} />
    </SensorCard>
  );
}

export function SensorOverview() {
  const [cat, setCat] = useState("All categories");
  const [compare, setCompare] = useState(false);
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
                <CompareToggle open={compare} onToggle={() => setCompare((c) => !c)} />
                <ShareButton />
              </>
            }
          />
          {compare && <CompareBar current={cat} />}
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
