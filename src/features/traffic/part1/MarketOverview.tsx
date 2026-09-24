"use client";

import { useState, type ReactNode } from "react";
import { ExternalIcon, InfoIcon, RefreshIcon } from "@/components/ui/icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { routes } from "@/config/routes";
import { LockedArea, Skel } from "../Paywall";
import { TrafficFrame } from "../TrafficFrame";
import { Delta, ExportButton, OutlineButton, SampleCard } from "../ui";

const filters = ["geo" as const, "date" as const];

function HowTo() {
  return (
    <button type="button" className="text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
      How to use it
    </button>
  );
}

function I() {
  return <InfoIcon width={16} height={16} className="text-rk-faint" />;
}

function Metric({ label, children, first }: { label: string; children: ReactNode; first?: boolean }) {
  return (
    <div className={`${first ? "" : "border-l border-[#e0e1e5] pl-[24px]"} h-[56px] pr-[24px]`}>
      <div className="flex items-center gap-[6px] text-[16px] leading-5 text-rk-text">
        {label}
        <I />
      </div>
      <div className="mt-[3px] flex items-baseline gap-[4px] whitespace-nowrap">{children}</div>
    </div>
  );
}

function MarketSummary() {
  const players = [
    ["hm.com", "42.37%"],
    ["zara.com", "31.86%"],
    ["asos.com", "25.78%"],
  ];
  return (
    <SampleCard title="Market Summary" link={<HowTo />} extra={<ExportButton label="Export to PDF" />} bodyClassName="flex px-5 pt-[20px] pb-[21px]">
      <div className="w-[328px] shrink-0">
        <div className="flex items-center gap-[6px] text-[16px] leading-5 font-medium text-rk-text">
          Consolidation
          <I />
        </div>
        <p className="mt-[14px] text-[12px] leading-[15px] text-rk-muted">A moderately-low level of consolidation within the market.</p>
        <div className="relative mt-[15px] h-[14px]">
          <span className="absolute top-[6px] right-[4px] left-[4px] h-[3px] rounded bg-[#dcdde2]" />
          <span className="absolute top-[3px] left-[2px] h-[8px] w-[8px] rounded-full bg-[#c4c7cf]" />
          <span className="absolute top-[3px] right-[2px] h-[8px] w-[8px] rounded-full bg-[#c4c7cf]" />
          <span className="absolute top-0 left-[106px] h-[14px] w-[14px] rounded-full bg-[#5d62de]" />
        </div>
        <div className="mt-[3px] flex justify-between text-[12px] leading-4 text-rk-muted">
          <span>Low</span>
          <span>High</span>
        </div>
        <table className="mt-[14px] w-[328px] text-[14px] leading-5">
          <thead>
            <tr className="h-[37px] border-b border-[#e6e7ea] text-[12px] text-rk-text">
              <th className="pl-2 text-left font-normal">Key Players</th>
              <th className="pr-[9px] text-right font-normal">Market Share</th>
            </tr>
          </thead>
          <tbody>
            {players.map(([d, s]) => (
              <tr key={d} className="h-[37px] border-b border-[#eef0f2]">
                <td className="pl-2 text-rk-text">{d}</td>
                <td className="pr-[9px] text-right text-rk-link">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <OutlineButton className="mt-[16px]">View details</OutlineButton>
      </div>
      <span className="mx-[24px] w-px shrink-0 bg-[#e6e7ea]" />
      <div className="flex-1">
        <div className="flex">
          <Metric label="Domains" first>
            <span className="text-[28px] leading-8 font-bold text-rk-link">3</span>
            <span className="text-[12px] text-rk-muted">/3</span>
          </Metric>
          <Metric label="Market Traffic">
            <span className="text-[24px] leading-8 font-bold text-rk-text">202M</span>
            <span className="flex items-center text-[12px] text-[#d1002f]">
              <Delta up={false} className="h-[10px] w-[10px]" />
              2.69%
            </span>
          </Metric>
          <Metric label="Market Traffic Cost">
            <span className="text-[24px] leading-8 font-bold text-rk-text">$64.7M</span>
            <span className="flex items-center text-[12px] text-[#008a66]">
              <Delta up className="h-[10px] w-[10px]" />
              1.3%
            </span>
          </Metric>
        </div>
        <div className="mt-[20px] border-t border-[#e0e1e5] pt-[23px]">
          <div className="text-[16px] leading-5 font-medium text-rk-text">Market Size</div>
          <div className="mt-[15px] flex">
            <svg width={156} height={156} viewBox="0 0 156 156">
              <circle cx="78" cy="78" r="77.5" fill="#656adb" />
              <circle cx="78" cy="127" r="28" fill="#b0c0fd" stroke="#fff" strokeWidth={2} />
            </svg>
            <div className="ml-[24px] pt-[0px]">
              <div className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
                <span className="h-[10px] w-[10px] rounded-full bg-[#656adb]" />
                Total Addressable Market (TAM)
                <I />
              </div>
              <div className="mt-[4px] pl-4 text-[24px] leading-7 font-bold text-rk-text">1.3B</div>
              <div className="mt-[8px] flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
                <span className="h-[10px] w-[10px] rounded-full bg-[#b0c0fd]" />
                Serviceable Available Market (SAM)
                <I />
              </div>
              <div className="mt-[3px] flex items-baseline gap-[8px] pl-4">
                <span className="text-[24px] leading-7 font-bold text-rk-text">161.8M</span>
                <span className="text-[14px] text-rk-muted">12.7% of TAM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleCard>
  );
}

function AxisSelect({ value, options }: { value: string; options: string[] }) {
  const [v, setV] = useState(value);
  return (
    <Popover
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="flex h-[27px] w-[200px] items-center justify-between rounded-[6px] border border-[#d7d9de] bg-white pr-[8px] pl-[9px] text-[14px] text-rk-text">
          {v}
          <svg viewBox="0 0 16 16" width={16} height={16} className={open ? "rotate-180" : ""}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      panelClassName="w-[200px]"
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
          >
            {o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function GrowthQuadrant() {
  const q = "absolute flex w-1/2 justify-center text-[14px] leading-5 font-semibold text-rk-muted";
  const pts = [
    { name: "asos.com", color: "#6167e7", x: 40, y: 50 },
    { name: "zara.com", color: "#ffb500", x: 617, y: 384 },
    { name: "hm.com", color: "#bd87f9", x: 1150, y: 110 },
  ];
  return (
    <SampleCard title="Growth Quadrant" link={<HowTo />} extra={<ExportButton label="Export to PDF" />} bodyClassName="">
      <div className="flex items-center gap-[8px] px-5 pt-[20px] pb-[19px] text-[14px] text-rk-text">
        X-axis:
        <AxisSelect value="Total Traffic" options={["Total Traffic", "Direct", "Referral", "Organic Search", "Paid Search"]} />
        <span className="ml-[10px]">Y-axis:</span>
        <AxisSelect value="Total Traffic growth, %" options={["Total Traffic growth, %", "Market Share", "Bounce Rate"]} />
        <button type="button" className="ml-[8px] h-[27px] rounded-[6px] bg-rk-btn-dark px-[8px] text-[14px] font-medium text-white">
          Apply
        </button>
        <button type="button" className="ml-[8px] flex items-center gap-[8px] px-[4px] text-rk-muted hover:text-rk-text">
          <RefreshIcon width={16} height={16} />
          Reset
        </button>
      </div>
      <div className="relative h-[434px] overflow-hidden rounded-b-lg">
        <div className="absolute top-0 left-0 h-1/2 w-1/2 border-r border-b border-white bg-[#eceeee]" />
        <div className="absolute top-0 right-0 h-1/2 w-1/2 border-b border-white bg-[#fafafa]" />
        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 border-r border-white bg-[#fafafa]" />
        <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-[#eceeee]" />
        <span className={`${q} top-[8px] left-0`}>Game Changers</span>
        <span className={`${q} top-[8px] right-0`}>Leaders</span>
        <span className={`${q} bottom-[16px] left-0`}>Niche Players</span>
        <span className={`${q} right-0 bottom-[16px]`}>Established Players</span>
        <span className="absolute bottom-[48px] left-[8px] rotate-180 text-[12px] whitespace-nowrap text-rk-muted [writing-mode:vertical-rl]">Total Traffic growth, % →</span>
        <span className="absolute bottom-[6px] left-[48px] text-[12px] text-rk-muted">Total Traffic →</span>
        {pts.map((p) => (
          <span key={p.name} className="absolute flex items-center gap-[5px] text-[14px] text-rk-muted" style={{ left: p.x - 8, top: p.y - 8 }}>
            <span className="h-4 w-4 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
        ))}
      </div>
    </SampleCard>
  );
}

const players = [
  { d: "hm.com", share: "42.37%", visits: "85.6M", vd: ["0.56%", true], direct: "50.6M", dd: ["8.87%", false], ai: "214.2K", ad: ["87.47%", true], ref: "9.8M", rd: ["3.12%", true] },
  { d: "zara.com", share: "31.86%", visits: "64.3M", vd: ["12.51%", false], direct: "48.3M", dd: ["17.63%", false], ai: "67.8K", ad: ["7.77%", true], ref: "4.2M", rd: ["9.4%", true] },
  { d: "asos.com", share: "25.78%", visits: "52.1M", vd: ["6.4%", true], direct: "28.9M", dd: ["8.28%", false], ai: "209.1K", ad: ["164.59%", true], ref: "8.8M", rd: ["16.7%", true] },
] as const;

function Diff({ d }: { d: readonly [string, boolean] }) {
  return (
    <span className={`flex items-center ${d[1] ? "text-[#008a66]" : "text-[#d1002f]"}`}>
      <Delta up={d[1]} />
      {d[0]}
    </span>
  );
}

function MarketPlayers() {
  const dot = (c: string) => <span className="h-[10px] w-[10px] rounded-full" style={{ background: c }} />;
  return (
    <SampleCard
      title={
        <span>
          Market Players <span className="ml-[4px] font-normal text-rk-muted">1-3 (3)</span>
        </span>
      }
      bodyClassName=""
    >
      <div className="relative overflow-hidden rounded-b-lg">
        <table className="w-[1400px] table-fixed text-[14px] leading-5">
          <colgroup>
            <col className="w-[223px]" />
            <col className="w-[119px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col className="w-[139px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col />
          </colgroup>
          <thead>
            <tr className="h-[40px] border-b border-[#e6e7ea] text-[12px] text-rk-text">
              <th className="pl-3 text-left font-normal">Domain</th>
              <th className="bg-[#ececee] pr-[13px] text-right font-normal">
                <span className="flex items-center justify-end gap-[6px]">
                  Market Share
                  <svg viewBox="0 0 16 16" width={14} height={14}>
                    <path d="M2.5 4h11M4.5 8h7M6.5 12h3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                  </svg>
                </span>
              </th>
              <th className="pr-3 text-right font-normal">Visits</th>
              <th className="pl-3 text-left font-normal">Diff.</th>
              <th className="pr-3 text-right font-normal">
                <span className="flex items-center justify-end gap-[8px]">
                  {dot("#5d62de")}
                  Direct
                </span>
              </th>
              <th className="pl-3 text-left font-normal">Diff.</th>
              <th className="pr-3 text-right font-normal">
                <span className="flex items-center justify-end gap-[8px] whitespace-nowrap">
                  {dot("#bd87f9")}
                  AI Traffic
                </span>
              </th>
              <th className="pl-3 text-left font-normal">Diff.</th>
              <th className="pr-3 text-right font-normal">
                <span className="flex items-center justify-end gap-[8px]">
                  {dot("#2ee6b1")}
                  Referral
                </span>
              </th>
              <th className="pl-3 text-left font-normal">Diff.</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.d} className="h-[45px] border-b border-[#eef0f2] last:border-0">
                <td className="pl-3">
                  <span className="flex items-center gap-[6px] text-rk-text">
                    {p.d}
                    <ExternalIcon width={15} height={15} className="text-rk-faint" />
                  </span>
                </td>
                <td className={`pr-[13px] text-right text-rk-text ${p.d === "hm.com" ? "font-semibold" : "font-semibold"}`}>{p.share}</td>
                <td className="pr-3 text-right text-rk-text">{p.visits}</td>
                <td className="pl-3">
                  <Diff d={p.vd} />
                </td>
                <td className="pr-3 text-right text-rk-text">{p.direct}</td>
                <td className="pl-3">
                  <Diff d={p.dd} />
                </td>
                <td className="pr-3 text-right text-rk-text">{p.ai}</td>
                <td className="pl-3">
                  <Diff d={p.ad} />
                </td>
                <td className="pr-3 text-right text-rk-text">{p.ref}</td>
                <td className="pl-3">
                  <Diff d={p.rd} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="absolute top-[33px] left-[223px] h-[5px] w-[264px] rounded-full bg-[#c9cacf]" />
        <span className="absolute bottom-[3px] left-[223px] h-[5px] w-[264px] rounded-full bg-[#c9cacf]" />
      </div>
    </SampleCard>
  );
}

export function MarketOverviewSample() {
  return (
    <TrafficFrame title="Market Overview" filters={filters} chips="plain">
      <div className="mt-4 flex w-[1236px] flex-col gap-4">
        <MarketSummary />
        <GrowthQuadrant />
        <MarketPlayers />
      </div>
    </TrafficFrame>
  );
}

function GreyTitle({ children }: { children: ReactNode }) {
  return <div className="flex h-[43px] items-center gap-[8px] border-b border-[#f0f0f0] px-5 text-[16px] font-bold text-rk-text">{children}</div>;
}

export function MarketOverviewLocked() {
  return (
    <TrafficFrame title="Market Overview" filters={filters} chips="plain" locked bottomGap={116}>
      <div className="mt-[15px] w-[1236px]">
        <LockedArea charge="$335.33" sampleHref={routes.traffic.marketOverview}>
          <div className="flex flex-col gap-4">
            <section className="h-[401px] rounded-lg bg-white shadow-card">
              <GreyTitle>
                Market Summary <span className="font-normal text-rk-link">How to use it</span>
              </GreyTitle>
              <div className="flex px-5 pt-[20px]">
                <div className="w-[328px]">
                  <div className="text-[16px] font-medium text-rk-text">Consolidation ⓘ</div>
                  <Skel w={100} h={7} className="mt-[24px]" />
                  <div className="mt-[16px] h-[3px] w-[328px] rounded bg-[#c9cbd1]" />
                  <div className="mt-[8px] text-[12px] text-rk-muted">Low</div>
                  <div className="mt-[20px] flex h-[37px] items-center justify-between border-b border-[#e6e7ea] px-2 text-[12px] text-rk-muted">
                    <span>Key Players</span>
                    <span>Market Share</span>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex h-[37px] items-center justify-between border-b border-[#eef0f2] px-2">
                      <Skel w={148} h={7} />
                      <Skel w={148} h={7} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="h-[500px] rounded-lg bg-white shadow-card">
              <GreyTitle>
                Growth Quadrant <span className="font-normal text-rk-link">How to use it</span>
              </GreyTitle>
            </section>
            <section className="h-[220px] rounded-lg bg-white shadow-card">
              <GreyTitle>Market Players</GreyTitle>
            </section>
          </div>
        </LockedArea>
      </div>
    </TrafficFrame>
  );
}
