"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ChatGptIcon, ExternalIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { routes } from "@/config/routes";
import { WorldMap } from "@/features/domain/WorldMap";
import { GroupedBars, TrafficLineChart, shortMonths } from "../charts";
import { LockedArea, Skel } from "../Paywall";
import { DomainDot, TrafficFrame } from "../TrafficFrame";
import { Delta, DomainLegend, DomainSwitch, OutlineButton, SampleCard, SegTabs } from "../ui";
import { Flag } from "./flags";
import {
  channelDist,
  channelTrend,
  channelTrendTicks,
  channels,
  geoRows,
  journeyDest,
  journeySources,
  summaryCols,
  summaryRows,
  topPagesData,
  topPagesTabs,
  trendTabs,
  visitsTip,
  visitsTrend,
} from "./taData";

const M = 1e6;

function SortIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} className="text-rk-muted">
      <path d="M2.5 4h11M4.5 8h7M6.5 12h3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function SummarySample() {
  return (
    <SampleCard title="Summary" bodyClassName="">
      <table className="w-[1228px] table-fixed text-[14px] leading-5">
        <colgroup>
          <col className="w-[226px]" />
          {summaryCols.map((c) => (
            <col key={c} className="w-[167px]" />
          ))}
        </colgroup>
        <thead>
          <tr className="h-[32px] border-b border-[#e6e7ea] text-[12px] text-rk-text">
            <th className="pl-5 text-left font-normal">Target</th>
            {summaryCols.map((c) => (
              <th key={c} className="text-right font-normal">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summaryRows.map((r, i) => (
            <tr key={r.name} className={`h-[37px] ${i < 2 ? "border-b border-[#eef0f2]" : ""}`}>
              <td className="pl-5">
                <span className="flex items-center gap-[10px] text-rk-text">
                  <DomainDot color={r.color} />
                  {r.name}
                </span>
              </td>
              {r.cells.map((c, j) => (
                <td key={j} className="text-right">
                  <span className={`inline-flex items-center gap-[4px] ${c.bold ? "font-semibold" : ""} text-rk-text`}>
                    {c.v}
                    <Delta up={c.up} />
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SampleCard>
  );
}

function TrendTip({ i, hidden, scale }: { i: number; hidden: Record<string, boolean>; scale: number }) {
  return (
    <div className="text-[12px] leading-4">
      <div className="text-[#8a8e9b]">{shortMonths[i]}</div>
      <div className="mt-[4px] grid grid-cols-[auto_auto_auto] items-center gap-x-[10px]">
        {visitsTrend.map((s, k) =>
          hidden[s.name] ? null : (
            <div key={s.name} className="contents">
              <span className="flex h-6 items-center gap-[7px] text-rk-text">
                <DomainDot color={s.color} size={8} />
                {s.name}
              </span>
              <span className="text-right font-bold text-rk-text">
                {scale === 1 ? visitsTip[i][k].value : `${+(parseFloat(visitsTip[i][k].value) * scale).toFixed(1)}M`}
              </span>
              <span className={`${visitsTip[i][k].delta >= 0 ? "text-[#007c65]" : "text-[#e0304a]"}`}>
                {visitsTip[i][k].delta >= 0 ? "\u2191" : "\u2193"}
                {Math.abs(visitsTip[i][k].delta).toFixed(2)}%
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function TrendCard() {
  const [tab, setTab] = useState<(typeof trendTabs)[number]>("Visits");
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const f: Record<string, number> = { Visits: 1, "Unique Visitors": 0.5, "Purchase Conversion": 1, "Pages / Visit": 1, "Avg. Visit Duration": 1, "Bounce Rate": 1 };
  const series = visitsTrend.map((s) => ({ ...s, data: s.data.map((v) => v * f[tab]) }));
  return (
    <SampleCard title="Traffic Trend" bodyClassName="px-5 pt-[22px] pb-[21px]">
      <SegTabs items={trendTabs} onChange={setTab} />
      <div className="mt-[16px]">
        <TrafficLineChart
          width={1196}
          plotLeft={50}
          plotHeight={208}
          ticks={tab === "Unique Visitors" ? [0, 25 * M, 50 * M] : [0, 50 * M, 100 * M]}
          series={series}
          hidden={hidden}
          hoverId="trend-hover"
          tooltip={(i) => <TrendTip i={i} hidden={hidden} scale={f[tab]} />}
        />
      </div>
      <DomainLegend className="mt-[10px]" onChange={(v) => setHidden(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, !x])))} />
    </SampleCard>
  );
}

function ChannelDistCard() {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const gw = (1196 - 76) / channels.length;
  return (
    <SampleCard title="Traffic Channel Distribution" bodyClassName="px-5 pt-[36px] pb-[21px]">
      <div className="relative">
        <GroupedBars width={1196} plotLeft={76} plotHeight={153} ticks={[0, 20 * M, 40 * M, 60 * M]} groups={channels.map((c) => c.label)} series={channelDist} hidden={hidden} labelColor="transparent" />
        {channels.map((c, i) => {
          const style = { left: 76 + gw * i, width: gw, top: 169 };
          return c.href ? (
            <Link key={c.label} href={c.href} className="absolute text-center text-[12px] leading-4 text-rk-link hover:underline" style={style}>
              {c.label}
            </Link>
          ) : (
            <span key={c.label} className="absolute text-center text-[12px] leading-4 text-rk-muted" style={style}>
              {c.label}
            </span>
          );
        })}
      </div>
      <DomainLegend className="mt-[17px]" onChange={(v) => setHidden(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, !x])))} />
    </SampleCard>
  );
}

function ChannelTrendCard() {
  const [tab, setTab] = useState("Direct");
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const key = channelTrend[tab] ? tab : "Referral";
  return (
    <SampleCard title="Traffic Channel Trend" bodyClassName="px-5 pt-[22px] pb-[21px]">
      <SegTabs items={channels.map((c) => c.label)} onChange={setTab} />
      <div className="mt-[16px]">
        <TrafficLineChart width={1196} plotLeft={46} plotHeight={152} ticks={channelTrendTicks[key]} series={channelTrend[key]} hidden={hidden} />
      </div>
      <DomainLegend className="mt-[10px]" onChange={(v) => setHidden(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, !x])))} />
    </SampleCard>
  );
}

type JRow = { name: string; pct: string; up: boolean; h: number; bw: number };

function JourneyColumn({ rows, side, x, bandTo }: { rows: JRow[]; side: "left" | "right"; x: number; bandTo: number }) {
  const pos = rows.map((r, i) => ({ ...r, y: rows.slice(0, i).reduce((acc, q) => acc + q.h + 8, 0) }));
  const total = rows.reduce((acc, q) => acc + Math.sqrt(q.bw), 0);
  const boxTop = 193;
  const span = 55;
  const starts = pos.map((_, i) => boxTop + pos.slice(0, i).reduce((acc, q) => acc + (span * Math.sqrt(q.bw)) / total, 0));
  return (
    <>
      <svg className="absolute top-0 left-0 overflow-visible" width={1} height={1}>
        {pos.map((r, i) => {
          const th = (span * Math.sqrt(r.bw)) / total;
          const a = starts[i];
          const y0 = r.y + (r.h - r.bw) / 2;
          const y1 = y0 + r.bw;
          const sx = side === "left" ? x + 4 : x;
          const ex = bandTo;
          const mx = (sx + ex) / 2;
          return <path key={r.name + r.y} d={`M${sx} ${y0}C${mx} ${y0} ${mx} ${a} ${ex} ${a}L${ex} ${a + th}C${mx} ${a + th} ${mx} ${y1} ${sx} ${y1}Z`} fill="#e3e3f8" />;
        })}
        {pos.map((r) => (
          <rect key={r.name + r.y + "b"} x={x} y={r.y} width={4} height={r.h} rx={1} fill="#6167e6" />
        ))}
      </svg>
      {pos.map((r) => (
        <div
          key={r.name + r.y + "l"}
          className={`absolute text-[14px] leading-5 whitespace-nowrap ${side === "left" ? "text-right" : "text-left"}`}
          style={side === "left" ? { right: `calc(100% - ${x - 9}px)`, top: r.y - 1 } : { left: x + 13, top: r.y - 1 }}
        >
          <div className="text-rk-text">{r.name}</div>
          <div className={`mt-[2px] flex items-center gap-[6px] font-semibold text-rk-text ${side === "left" ? "justify-end" : ""}`}>
            <Delta up={r.up} />
            {r.pct}
          </div>
        </div>
      ))}
    </>
  );
}

function ChannelSelect() {
  return (
    <Popover
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-[8px] rounded-[6px] border border-[#d7d9de] bg-white px-[8px] text-[14px] text-rk-text hover:bg-rk-bg">
          All Traffic Channels
          <svg viewBox="0 0 16 16" width={14} height={14} className={open ? "rotate-180" : ""}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      panelClassName="min-w-[200px]"
    >
      {(close) =>
        ["All Traffic Channels", ...channels.map((c) => c.label)].map((c) => (
          <MenuItem key={c} onClick={close} active={c === "All Traffic Channels"}>
            {c}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function JourneyCard() {
  return (
    <SampleCard title="Traffic Journey" info bodyClassName="px-5 pt-[21px] pb-[21px]">
      <DomainSwitch />
      <div className="relative -mr-5 mt-[20px] h-[66px] overflow-hidden">
        <div className="absolute top-[5px] right-[calc(100%-139px)] text-right">
          <div className="text-[14px] leading-5 font-bold text-rk-text">Top Sources</div>
          <div className="text-[12px] leading-4 text-rk-muted">Out of 2.5K</div>
        </div>
        <div className="absolute top-[1px] left-[156px]">
          <ChannelSelect />
        </div>
        <div className="absolute top-[5px] left-[1070px]">
          <div className="text-[14px] leading-5 font-bold text-rk-text">Top Destinations</div>
          <div className="text-[12px] leading-4 text-rk-muted">Out of 1.8K</div>
        </div>
      </div>
      <div className="relative -mr-5 h-[330px] overflow-hidden">
        <JourneyColumn rows={journeySources} side="left" x={148} bandTo={803} />
        <JourneyColumn rows={journeyDest} side="right" x={1180} bandTo={1055} />
        <svg viewBox="0 0 14 14" width={14} height={14} className="absolute top-[214px] left-[781px] text-[#6167e6]">
          <path d="M1.5 7h11M8.5 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute top-[193px] left-[804px] flex h-[55px] w-[231px] items-center justify-center rounded-[3px] bg-[#6167e6] text-[14px] text-white">zara.com</div>
        <svg viewBox="0 0 14 14" width={14} height={14} className="absolute top-[214px] left-[1048px] text-[#6c6e79]">
          <path d="M1.5 7h11M8.5 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <OutlineButton className="mt-[45px]">View all sources</OutlineButton>
    </SampleCard>
  );
}

function TopPagesCard() {
  const [tab, setTab] = useState<(typeof topPagesTabs)[number]>("Top Pages");
  const rows = topPagesData[tab];
  return (
    <SampleCard header={false} bodyClassName="">
      <div className="flex h-[43px] items-end border-b border-[#f0f0f0] px-5">
        <div className="flex border-b border-[#e0e1e9]">
          {topPagesTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative h-[39px] px-[15px] pb-0 text-[16px] leading-6 font-medium text-rk-text ${t === tab ? "font-semibold" : ""} first:pl-[13px] first:pr-[14px] last:pr-[4px] last:pl-[1px]`}
            >
              {t}
              {t === tab && <span className="absolute right-0 -bottom-px left-0 h-[3px] bg-[#8e92ec]" />}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 pt-[18px] pb-[21px]">
        <DomainSwitch />
        <table className="mt-[20px] w-[1196px] table-fixed text-[14px] leading-5">
          <colgroup>
            <col />
            <col className="w-[160px]" />
            <col className="w-[161px]" />
            <col className="w-[161px]" />
          </colgroup>
          <thead>
            <tr className="h-[32px] border-b border-[#e6e7ea] text-[12px] text-rk-text">
              <th className="pl-2 text-left font-normal">Page</th>
              <th className="font-normal">
                <span className="flex items-center justify-end gap-[6px]">
                  Traffic Share
                  <SortIcon />
                </span>
              </th>
              <th className="pr-[8px] text-right font-normal">Unique Pageviews</th>
              <th className="pr-[8px] text-right font-normal">Unique Visitors</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.page} className="h-[37px] border-b border-[#eef0f2]">
                <td className="pl-2">
                  <span className="flex items-center gap-[6px] text-rk-text">
                    {r.page}
                    <ExternalIcon width={15} height={15} className="text-rk-faint" />
                  </span>
                </td>
                <td className="pr-[18px] text-right text-rk-text">{r.share}</td>
                <td className={`pr-[8px] text-right text-rk-text ${r.bold ? "font-semibold" : ""}`}>{r.views}</td>
                <td className="pr-[8px] text-right text-rk-text">{r.visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <OutlineButton className="mt-[21px]">View details</OutlineButton>
      </div>
    </SampleCard>
  );
}

const miller = (lat: number) => 1.25 * Math.log(Math.tan(Math.PI / 4 + (0.4 * lat * Math.PI) / 180));
const proj = (lon: number, lat: number) => [((lon + 170) / 360) * 1000, ((miller(84) - miller(lat)) / (miller(84) - miller(-57))) * 570];
const poly = (pts: number[][]) =>
  pts
    .map(([lon, lat], i) => {
      const [x, y] = proj(lon, lat);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join("") + "Z";
const usa = [[-124, 48], [-95, 49], [-83, 46], [-70, 47], [-67, 44], [-70, 41], [-76, 35], [-81, 31], [-80, 26], [-82, 26], [-84, 30], [-90, 29], [-97, 27], [-100, 29], [-106, 31.5], [-111, 31.5], [-117, 32.5], [-124, 40]];
const alaska = [[-168, 66], [-162, 70], [-156, 71.5], [-141, 70], [-141, 60], [-148, 60], [-155, 58], [-162, 55], [-158, 59], [-165, 61]];
const spain = [[-9, 43], [-2, 43.5], [3, 42], [0, 39], [-2, 37], [-6, 36.5], [-9, 37], [-9, 43]];
const france = [[-4.5, 48.5], [2, 51], [8, 49], [7, 44], [3, 43], [-1.5, 43.5], [-1, 46], [-4.5, 48.5]];
const uk = [[-5, 50], [1.5, 51], [0, 53], [-3, 56], [-5, 58.5], [-6, 56], [-3, 54], [-5, 50]];
const germany = [[6, 51], [8, 54], [14, 54], [15, 51], [13, 48.5], [8, 47.5], [6, 49]];

function GeoMap() {
  return (
    <div className="relative h-[190px] w-[340px]">
      <WorldMap highlight="#dcdddf" secondary="#dcdddf" className="absolute inset-0 h-full w-full" />
      <svg viewBox="0 0 1000 570" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <path d={poly(usa) + poly(alaska)} fill="#b9c6fb" stroke="#fff" strokeWidth={1.2} />
        <path d={poly(spain) + poly(france) + poly(uk)} fill="#dce3fd" stroke="#fff" strokeWidth={1} />
        <path d={poly(germany)} fill="#e6ebfd" stroke="#fff" strokeWidth={1} />
      </svg>
    </div>
  );
}

function GeoCard() {
  return (
    <SampleCard title="Geo Distribution" bodyClassName="px-5 pt-[19px] pb-[20px]">
      <div className="flex items-center gap-[16px]">
        <DomainSwitch />
        <SegTabs items={["Visits", "Unique Visitors"]} />
        <Popover
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex h-7 items-center gap-[8px] rounded-[6px] border border-[#d7d9de] bg-white px-[8px] text-[14px] text-rk-text hover:bg-rk-bg">
              By country
              <svg viewBox="0 0 16 16" width={14} height={14}>
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          panelClassName="min-w-[160px]"
        >
          {(close) =>
            ["By country", "By region"].map((o) => (
              <MenuItem key={o} onClick={close} active={o === "By country"}>
                {o}
              </MenuItem>
            ))
          }
        </Popover>
      </div>
      <div className="flex">
        <div>
          <table className="mt-[20px] w-[588px] table-fixed text-[14px] leading-5">
            <colgroup>
              <col />
              <col className="w-[140px]" />
              <col className="w-[100px]" />
              <col className="w-[100px]" />
            </colgroup>
            <thead>
              <tr className="h-[34px] border-b border-[#e6e7ea] text-[12px] text-rk-text">
                <th className="pl-2 text-left font-normal">Country</th>
                <th className="font-normal">
                  <span className="flex items-center justify-end gap-[6px] pr-[9px] text-rk-muted">
                    All devices
                    <SortIcon />
                  </span>
                </th>
                <th className="pr-[8px] text-right font-normal text-rk-muted">Desktop</th>
                <th className="pr-[8px] text-right font-normal text-rk-muted">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {geoRows.map((r) => (
                <tr key={r.country} className="h-[37px] border-b border-[#eef0f2]">
                  <td className="pl-2">
                    <span className="flex items-center gap-[4px] text-rk-text">
                      <Flag code={r.flag} />
                      {r.country}
                    </span>
                  </td>
                  <td className="pr-[8px] text-right">
                    <span className="mr-[32px] text-rk-muted">{r.share}</span>
                    <span className={`inline-block w-[36px] ${r.bold ? "font-semibold" : ""} text-rk-text`}>{r.value}</span>
                  </td>
                  <td className="pr-[8px] text-right text-rk-text">{r.desktop}</td>
                  <td className="pr-[8px] text-right text-rk-text">{r.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <OutlineButton className="mt-[21px]">View details</OutlineButton>
        </div>
        <div className="mt-[22px] ml-[146px]">
          <GeoMap />
        </div>
      </div>
    </SampleCard>
  );
}

function Gauge() {
  return (
    <svg viewBox="0 0 40 24" width={36} height={22}>
      <path d="M4 21a16 16 0 0 1 32 0" fill="none" stroke="#e1e6fb" strokeWidth={5.5} strokeLinecap="round" />
      <path d="M4 21A16 16 0 0 1 31 9.5" fill="none" stroke="#a9b8f5" strokeWidth={5.5} strokeLinecap="round" />
    </svg>
  );
}

function BrandCard() {
  const mentions: { icon: ReactNode; label: string; v: string }[] = [
    { icon: <ChatGptIcon width={16} height={16} className="text-rk-muted" />, label: "ChatGPT", v: "109K" },
    { icon: <GoogleIcon width={16} height={16} />, label: "AI Overview", v: "34.1K" },
    { icon: <GoogleIcon width={16} height={16} />, label: "AI Mode", v: "99.6K" },
    { icon: <GeminiIcon width={16} height={16} />, label: "Gemini", v: "116K" },
  ];
  return (
    <section className="h-[203px] overflow-hidden rounded-lg border border-[#d4dafc] bg-white shadow-card">
      <div className="flex h-[45px] items-center bg-[#eef1fd] pl-[20px]">
        <span className="flex h-[23px] w-[23px] items-center justify-center rounded bg-[#f3e9ff] text-[#a35ee8]">
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M8 1.5 12 5.5 8 9.5 4 5.5zM2.5 9.5 8 13l5.5-3.5M2.5 12.5 5 11" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
          </svg>
        </span>
        <span className="ml-[9px] text-[16px] leading-6 font-semibold text-rk-text">Brand Presence in AI Platforms</span>
        <span className="mx-[8px] h-5 w-px bg-[#c4c7cf]" />
        <span className="text-[14px] text-rk-muted">Domain:</span>
        <span className="ml-1 text-[14px] text-rk-text">zara.com</span>
      </div>
      <div className="flex px-[16px] pt-[21px]">
        <div className="pr-[27px]">
          <div className="text-[14px] leading-5 text-rk-text-2">AI Visibility</div>
          <div className="mt-[4px] flex items-center gap-[7px] text-[32px] leading-10 font-bold text-[#5652cc]">
            60
            <Gauge />
          </div>
        </div>
        <span className="mt-[4px] h-[70px] w-px bg-rk-border" />
        <div className="pr-[24px] pl-[24px]">
          <div className="text-[14px] leading-5 text-rk-text-2">Missing topics</div>
          <div className="mt-[4px] text-[32px] leading-10 font-bold text-[#5652cc]">345K</div>
        </div>
        <span className="mt-[4px] h-[70px] w-px bg-rk-border" />
        <div className="pl-[24px]">
          <div className="text-[14px] leading-5 text-rk-text-2">Mentions</div>
          <div className="mt-[4px] flex gap-[24px]">
            {mentions.map((m) => (
              <div key={m.label}>
                <div className="flex items-center gap-[4px] text-[12px] leading-4 text-rk-text-2">
                  {m.icon}
                  {m.label}
                </div>
                <div className="mt-[6px] text-[16px] leading-5 font-bold text-[#5652cc]">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link
        href={routes.ai.overview}
        className="mt-[13px] ml-[16px] inline-flex h-7 items-center gap-[8px] rounded-[6px] bg-gradient-to-r from-[#a35ef4] to-[#6b6de2] px-[8px] text-[14px] font-semibold text-white hover:opacity-90"
      >
        Check AI Visibility
        <ExternalIcon width={15} height={15} />
      </Link>
    </section>
  );
}

export function TrafficAnalyticsSample() {
  return (
    <TrafficFrame title="Traffic Analytics" pdf>
      <div className="flex w-[1236px] flex-col gap-4">
        <SummarySample />
        <TrendCard />
        <ChannelDistCard />
        <ChannelTrendCard />
        <JourneyCard />
        <TopPagesCard />
        <GeoCard />
        <BrandCard />
      </div>
    </TrafficFrame>
  );
}

function GreyCard({ title, h, children, className = "" }: { title: ReactNode; h: number; children?: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg bg-white shadow-card ${className}`} style={{ height: h }}>
      <div className="flex h-[43px] items-center border-b border-[#f0f0f0] px-5 text-[16px] font-bold text-rk-text">{title}</div>
      <div className="px-5 pt-[21px]">{children}</div>
    </section>
  );
}

function SkelTable({ rows = 5, cols = [230, 120, 80, 80], width = 588 }: { rows?: number; cols?: number[]; width?: number }) {
  return (
    <div style={{ width }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex h-[37px] items-center justify-between border-b border-[#eef0f2] px-2">
          {cols.map((w, j) => (
            <Skel key={j} w={w} h={7} />
          ))}
        </div>
      ))}
    </div>
  );
}

function LockedSummary() {
  return (
    <SampleCard title="Summary" bodyClassName="px-5 pt-[21px] pb-[20px]">
      <div className="flex h-[83px]">
        {summaryCols.map((c, i) => (
          <div key={c} className={`${i ? "border-l border-[#e0e1e5] pl-[24px]" : ""} pr-[24px]`}>
            <div className="text-[14px] leading-5 text-rk-text">{c}</div>
            <div className="mt-[3px] text-[24px] leading-7 font-bold text-rk-muted">n/a</div>
          </div>
        ))}
      </div>
    </SampleCard>
  );
}

export function TrafficAnalyticsLocked() {
  return (
    <TrafficFrame title="Traffic Analytics" pdf locked bottomGap={116}>
      <div className="flex w-[1236px] flex-col gap-4">
        <LockedSummary />
        <LockedArea charge="$335.35" sampleHref={`${routes.traffic.overview}?sample=1`} top={42}>
          <div className="flex flex-col gap-4">
            <GreyCard title="Traffic Trend" h={364}>
              <div className="inline-flex h-7 rounded-[6px] border border-[#d7d9de] text-[14px] text-rk-muted">
                {["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"].map((t, i) => (
                  <span key={t} className={`flex items-center gap-[8px] px-[8px] ${i ? "border-l border-[#d7d9de]" : "bg-[#eef0ff]"}`}>
                    <DomainDot color={i ? "#c4c7cf" : "#8e92ec"} />
                    {t}
                  </span>
                ))}
              </div>
              <svg width={1196} height={220} className="mt-[20px]">
                <path d="M0 110 L180 60 L360 150 L540 70 L720 130 L900 50 L1080 120 L1196 90 L1196 220 L0 220Z" fill="#dfe1e6" />
              </svg>
            </GreyCard>
            <GreyCard title={<span className="flex items-center gap-[10px]"><span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#e9ecf5] text-[#8e92ec]">✦</span>Traffic Insights</span>} h={136}>
              <div className="flex flex-col gap-[10px] text-[14px] text-rk-muted">
                <span>• Comparing channels</span>
                <span>◌ Analyzing keywords</span>
              </div>
            </GreyCard>
            <GreyCard title="Traffic Channel Distribution" h={323}>
              <div className="mt-[130px] flex items-end gap-[16px] pl-[10px]">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className="w-[12px] bg-[#d7d9de]" style={{ height: [100, 80, 66, 90, 100, 80, 66, 90, 100][i % 9] }} />
                ))}
              </div>
            </GreyCard>
            <GreyCard title="Traffic Channel Trend" h={350}>
              <svg width={1196} height={220} className="mt-[40px]">
                <path d="M0 120 L200 90 L400 140 L600 80 L800 130 L1000 70 L1196 110 L1196 220 L0 220Z" fill="#dfe1e6" />
              </svg>
            </GreyCard>
            <GreyCard title="Top Pages" h={398}>
              <div className="h-7 w-[290px] rounded-[6px] border border-[#d7d9de]" />
              <div className="mt-[20px]">
                <SkelTable cols={[300, 160, 160, 160]} width={1196} />
              </div>
            </GreyCard>
            <GreyCard title="Geo Distribution" h={350}>
              <div className="flex items-center gap-[16px]">
                <div className="flex h-7 w-[162px] items-center rounded-[6px] border border-[#d7d9de] bg-[#eef0ff] px-[8px]">
                  <Skel w={64} h={7} />
                </div>
                <span className="flex h-7 items-center rounded-[6px] border border-[#d7d9de] px-[8px] text-[14px] text-rk-muted">By country ⌄</span>
              </div>
              <div className="mt-[20px] flex">
                <div>
                  <div className="flex h-[34px] items-center justify-between border-b border-[#e6e7ea] px-2 text-[12px] text-rk-muted">
                    <span>Country</span>
                    <span className="ml-auto w-[112px] text-right">All devices</span>
                    <span className="w-[100px] text-right">Desktop</span>
                    <span className="w-[100px] text-right">Mobile</span>
                  </div>
                  <SkelTable />
                </div>
                <div className="ml-[146px] opacity-60">
                  <WorldMap highlight="#dcdddf" secondary="#dcdddf" className="h-[190px] w-[340px]" />
                </div>
              </div>
            </GreyCard>
          </div>
        </LockedArea>
      </div>
    </TrafficFrame>
  );
}

