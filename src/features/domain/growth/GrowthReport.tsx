"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { growthCharts, growthLabels, growthPositions, growthRow, growthSummary, topPositionChanges, trafficByCountry } from "../data";
import { Plot, VBW, areaUnder, linePath, pts, smoothPath, Stroke } from "../charts";
import { DarkButton, Dot, ExportButton, Flag, Seg, WorldIcon } from "../ui";
import { WorldMap } from "../WorldMap";

const A = "#a55ff2";
const B = "#6167e6";
const G = "#ffb200";

const xAt = (i: number) => 0.0683 + i * 0.173;

type ChartDef = {
  title: string;
  value: string;
  delta: string;
  kind: "line" | "bar";
  a: number[];
  b: number[];
  right: number[];
  left: string[];
  smooth: boolean;
};

const organicLeft = [
  ["183%", "712%", "1.2K%", "1.8K%", "2.3K%"],
  ["-52%", "-29%", "-6%", "17%", "40%"],
  ["311%", "2.4K%", "4.5K%", "6.7K%", "8.8K%"],
];

const organic: ChartDef[] = growthCharts.map((c, i) => ({ ...c, left: organicLeft[i], smooth: i < 2 }));

const zeros = [0, 0, 0, 0, 0, 0];
const paid: ChartDef[] = ["Paid Traffic", "Paid Keywords", "Paid Traffic Cost"].map((title) => ({
  title,
  value: "0",
  delta: "0%",
  kind: "line",
  a: zeros,
  b: zeros,
  right: [0, 1, 2, 3, 4],
  left: ["0%", "0%", "0%", "0%", "0%"],
  smooth: false,
}));

const backlinks: ChartDef[] = [
  { title: "Backlinks", value: "314", delta: "+4%", kind: "line", a: [288, 292, 295, 298, 300, 302], b: [304, 306, 308, 310, 312, 314], right: [0, 80, 160, 240, 320], left: ["3.6%", "4.1%", "4.6%", "5.1%", "5.6%"], smooth: true },
  { title: "Referring Domains", value: "198", delta: "+27.7%", kind: "line", a: [148, 150, 151, 152, 154, 155], b: [160, 166, 174, 182, 190, 198], right: [0, 50, 100, 150, 200], left: ["8.1%", "13%", "17.9%", "22.8%", "27.7%"], smooth: true },
];

function Badge({ delta }: { delta: string }) {
  const tone = delta.startsWith("+") ? "bg-[#c9f3e2] text-[#007c65]" : delta.startsWith("-") ? "bg-[#ffd7dc] text-[#d1002f]" : "bg-[#eceef1] text-rk-muted";
  return <span className={`ml-[8px] inline-flex h-[21px] items-center rounded-full px-[8px] text-[13px] ${tone}`}>{delta}</span>;
}

function GrowthChart({ c }: { c: ChartDef }) {
  const H = 136;
  const maxV = c.right[c.right.length - 1] || 1;
  const growth = c.a.map((a, i) => (a ? ((c.b[i] - a) / a) * 100 : 0));
  const gMin = Math.min(...growth);
  const gMax = Math.max(...growth);
  const toX = (i: number) => xAt(i) * VBW;
  const P = (d: number[], max: number, min = 0) => pts(d, max, H, 0, 1, min).map(([, y], i) => [toX(i), y] as [number, number]);
  const draw = c.smooth ? smoothPath : linePath;
  const gp = P(growth, gMax === gMin ? gMax + 1 : gMax, gMin);
  const bandL = xAt(5) - 0.036;
  return (
    <div>
      <h4 className="flex items-center text-[16px] leading-6 font-bold">
        {c.title}
        <span className="ml-[6px] font-normal text-rk-muted">{c.value}</span>
        <Badge delta={c.delta} />
      </h4>
      <Plot
        className="mt-[49px]"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        left={c.left}
        right={c.right.map((v) => String(v))}
        leftW={54}
        rightW={61}
        gap={16}
        xGap={10}
        bottomH={34}
        x={growthLabels.map((l, i) => ({ at: xAt(i), label: l }))}
        labelClass="text-[13px] leading-4 text-rk-muted"
        overlay={
          c.kind === "bar"
            ? c.a.flatMap((a, i) => [
                <span key={`a${i}`} className="absolute bottom-0 w-[10px] -translate-x-[16px]" style={{ left: `${xAt(i) * 100}%`, height: `${(a / maxV) * 100}%`, background: A }} />,
                <span key={`b${i}`} className="absolute bottom-0 w-[10px] translate-x-[5px]" style={{ left: `${xAt(i) * 100}%`, height: `${(c.b[i] / maxV) * 100}%`, background: B }} />,
              ])
            : null
        }
      >
        <rect x={bandL * VBW} width={0.072 * VBW} y={0} height={H} fill="#f0f1f2" />
        <path d={`M${toX(5)} 0V${H}`} stroke="#d5d9dc" vectorEffect="non-scaling-stroke" />
        <path d={areaUnder(gp, draw(gp), H)} fill="#fff0c8" opacity={0.9} />
        {c.kind === "line" && (
          <>
            <Stroke d={draw(P(c.a, maxV))} color={A} width={2.5} />
            <Stroke d={draw(P(c.b, maxV))} color={B} width={2.5} />
          </>
        )}
        <Stroke d={draw(gp)} color={G} width={2.5} />
      </Plot>
    </div>
  );
}

function SummaryTable() {
  const th = "h-8 text-[12px] font-normal text-rk-text-2";
  const cols = [`${brand.name} Rank`, "Org. Traffic", "Backlinks", "Ref. Domains", "Paid Traffic"];
  return (
    <section className="mt-[15px] overflow-hidden rounded-lg bg-white shadow-card">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className="border-b border-rk-border">
            <th className={`${th} pl-5 text-left`}>Period</th>
            {cols.map((c, i) => (
              <th key={c} className={`${th} text-right ${i === cols.length - 1 ? "w-[180px] pr-5" : "w-[160px]"}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {growthSummary.map((r) => (
            <tr key={r.period} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-[8px]">
                  <Dot color={r.color} />
                  {r.period}
                </span>
              </td>
              <td className="text-right">{r.rank}</td>
              <td className="text-right">{r.traffic}</td>
              <td className="text-right">{r.backlinks}</td>
              <td className="text-right">{r.refDomains}</td>
              <td className="pr-5 text-right">{r.paid}</td>
            </tr>
          ))}
          <tr className="h-[37px]">
            <td className="pl-5">Growth</td>
            <td className="text-right text-rk-success">{growthRow.rank}</td>
            <td className="text-right text-rk-success">{growthRow.traffic}</td>
            <td className="text-right text-rk-success">{growthRow.backlinks}</td>
            <td className="text-right text-rk-success">{growthRow.refDomains}</td>
            <td className="pr-5 text-right text-rk-muted">{growthRow.paid}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

function ChartsCard() {
  const [tab, setTab] = useState<"Organic" | "Paid" | "Backlinks">("Organic");
  const list = tab === "Organic" ? organic : tab === "Paid" ? paid : backlinks;
  return (
    <section className="mt-[17px] rounded-lg bg-white shadow-card">
      <header className="flex h-[44px] items-center justify-between border-b border-rk-border px-5">
        <Seg
          items={["Organic", "Paid", "Backlinks"] as const}
          value={tab}
          onChange={setTab}
          itemClassName="px-[8px]"
          render={(v) => (
            <>
              {v}
              {v === "Backlinks" && <WorldIcon className="text-[#a9abb6]" />}
            </>
          )}
        />
        <ExportButton />
      </header>
      <div className="px-5 pt-[20px] pb-[20px]">
        <div className="flex gap-[18px] text-[14px] leading-5">
          {[
            [A, "October – March"],
            [B, "April – September"],
            [G, "Growth"],
          ].map(([c, l]) => (
            <span key={l} className="flex items-center gap-[6px]">
              <Dot color={c} />
              {l}
            </span>
          ))}
        </div>
        <div className="mt-[20px] flex flex-col gap-[16px]">
          {list.map((c) => (
            <GrowthChart key={c.title} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCard() {
  const H = 139;
  const ticks = [0, 20, 40, 60, 80, 100, 120, 140];
  return (
    <section className="mt-[16px] grid h-[263px] grid-cols-[245px_246px_1fr] gap-x-[41px] rounded-lg bg-white px-5 pt-5 shadow-card">
      <div>
        <h4 className="text-[16px] leading-6 font-bold">Non-branded Traffic</h4>
        {[
          ["March", A, "7", "border-b border-rk-border pb-[23px]"],
          ["September", B, "59", "pt-[22px]"],
        ].map(([label, color, v, cls]) => (
          <div key={label} className={`${cls} ${label === "March" ? "mt-[18px]" : ""}`}>
            <div className="text-[14px] leading-5">{label}</div>
            <div className="mt-[8px] h-4" style={{ background: color }} />
            <div className="mt-[7px] grid grid-cols-[52px_1fr_52px] text-[13px] leading-4">
              <span>{v}</span>
              <span className="flex justify-between text-rk-muted">
                <span>100%</span>
                <span className="-mr-[0px]">100%</span>
              </span>
              <span className="text-right">{v}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-[16px] leading-6 font-bold">Top Positions Changes</h4>
        <div className="mt-[19px]">
          {topPositionChanges.map((r) => {
            const tone = r.delta.startsWith("+") ? "text-rk-success" : r.delta.startsWith("-") ? "text-rk-danger" : "text-rk-muted";
            const max = 10;
            const p = pts(r.data, max, 14);
            return (
              <div key={r.label} className="h-[60px]">
                <div className="flex justify-between text-[13px] leading-4">
                  <span>{r.label}</span>
                  <span>
                    {r.value} <span className={tone}>{r.delta}</span>
                  </span>
                </div>
                <svg viewBox={`0 0 ${VBW} 14`} preserveAspectRatio="none" className="mt-[4px] block h-[14px] w-full">
                  <path d={areaUnder(p, linePath(p), 14)} fill="#e7e8fb" />
                  <Stroke d={linePath(p)} color={B} width={1} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pr-[14px]">
          <h4 className="text-[16px] leading-6 font-bold">Positions Distribution</h4>
          <div className="flex gap-[18px] text-[14px]">
            <span className="flex items-center gap-[6px]">
              <Dot color={A} />
              March
            </span>
            <span className="flex items-center gap-[6px]">
              <Dot color={B} />
              September
            </span>
          </div>
        </div>
        <Plot
          className="mt-[29px]"
          height={H}
          ticks={ticks.map((t) => t / 140)}
          right={ticks.map(String)}
          rightW={54}
          gap={15}
          xGap={9}
          bottomH={20}
          x={growthPositions.map((g, i) => ({ at: 0.129 + i * 0.184, label: g.label }))}
          labelClass="text-[13px] leading-4 text-rk-muted"
          overlay={growthPositions.flatMap((g, i) => [
            <span key={`a${i}`} className="absolute bottom-0 w-[12px] -translate-x-[13px]" style={{ left: `${(0.129 + i * 0.184) * 100}%`, height: `${(g.a / 140) * 100}%`, background: A }} />,
            <span key={`b${i}`} className="absolute bottom-0 w-[12px] translate-x-[1px]" style={{ left: `${(0.129 + i * 0.184) * 100}%`, height: `${(g.b / 140) * 100}%`, background: B }} />,
          ])}
        />
      </div>
    </section>
  );
}

function CountryCard() {
  const [period, setPeriod] = useState<"March" | "September">("September");
  return (
    <section className="mt-[17px] h-[442px] rounded-lg bg-white shadow-card">
      <header className="flex h-[42px] items-center justify-between border-b border-rk-border px-5">
        <h3 className="text-[16px] leading-6 font-bold">Organic Traffic by Country</h3>
        <Seg
          items={["March", "September"] as const}
          value={period}
          onChange={setPeriod}
          render={(v) => (
            <>
              <Dot color={v === "March" ? A : B} />
              {v}
            </>
          )}
        />
      </header>
      <div className="flex">
        <div className="w-[521px] shrink-0 pt-[23px]">
          <table className="w-full table-fixed text-[14px] leading-5">
            <thead>
              <tr className="h-10 border-b border-rk-border text-[12px] text-rk-text-2">
                <th className="pl-5 text-left font-normal">Countries</th>
                <th className="w-[62px]" />
                <th className="w-[62px] text-right font-normal">March</th>
                <th className="w-[86px]" />
                <th className="w-[62px] text-right font-normal">September</th>
                <th className="w-[87px] pr-2 text-right font-normal">Diff</th>
              </tr>
            </thead>
            <tbody>
              {trafficByCountry.map((r) => (
                <tr key={r.country} className="h-[44.4px] border-b border-rk-border">
                  <td className="pl-5">
                    <span className="flex items-center gap-[6px]">
                      {r.flag && <Flag code={r.flag} />}
                      {r.country}
                    </span>
                  </td>
                  <td className="truncate text-right text-rk-muted">{r.aPct === "100%" ? "10..." : r.aPct}</td>
                  <td className="text-right">{r.a}</td>
                  <td className="text-right text-rk-muted">{r.bPct}</td>
                  <td className="text-right">{r.b}</td>
                  <td className={`pr-2 text-right ${r.diff.startsWith("+") ? "text-rk-success" : "text-rk-muted"}`}>{r.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-[23px] px-5">
            <DarkButton href={routes.organic.overview}>Show more</DarkButton>
          </div>
        </div>
        <div className="ml-[48px] pt-[29px]">
          <WorldMap className="h-[258px] w-[451px]" highlight={period === "September" ? B : A} secondary={period === "September" ? "#c3cbf7" : "#dcdddf"} />
        </div>
      </div>
    </section>
  );
}

export function GrowthReport() {
  return (
    <>
      <SummaryTable />
      <ChartsCard />
      <BottomCard />
      <CountryCard />
    </>
  );
}
