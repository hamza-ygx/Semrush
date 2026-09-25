"use client";

import { useState } from "react";
import { TrafficFrame, DomainDot } from "../TrafficFrame";
import { DomainLegend, DomainSwitch, ExportButton, OutlineButton, SampleCard, SegTabs } from "../ui";
import { SmallChevron } from "../icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ageData, ageGroups, doms, geoRows, sexData, uvData, uvMonths } from "./data";
import { Flag, GeoMap, SortIcon } from "./ui";

function AgeChart({ visible }: { visible: boolean[] }) {
  const y = (v: number) => 178 - v * 4.125;
  return (
    <svg width={820} height={205} className="block overflow-visible">
      {[0, 10, 20, 30, 40].map((t) => (
        <g key={t}>
          <line x1={60} x2={820} y1={y(t)} y2={y(t)} stroke={t ? "#eceef0" : "#d9dbe0"} />
          <text x={43} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {t}%
          </text>
        </g>
      ))}
      {ageGroups.map((g, i) => {
        const x0 = 88 + i * 124.8;
        return (
          <g key={g}>
            {ageData[i].map((v, j) =>
              visible[j] ? <rect key={j} x={x0 + j * 28} y={y(v)} width={25} height={178 - y(v)} rx={2} fill={doms[j].color} /> : null,
            )}
            <text x={x0 + 40} y={199} textAnchor="middle" fontSize={12} fill="#6a6c6a">
              {g}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function UvChart({ visible }: { visible: boolean[] }) {
  const y = (v: number) => 190 - v * 2.933;
  const x = (i: number) => 46 + i * 163;
  return (
    <svg width={1196} height={220} className="block overflow-visible">
      {[0, 20, 40, 60].map((t) => (
        <g key={t}>
          <line x1={46} x2={1196} y1={y(t)} y2={y(t)} stroke={t ? "#eceef0" : "#d9dbe0"} />
          <text x={30} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {t ? `${t}M` : 0}
          </text>
        </g>
      ))}
      {uvMonths.map((m, i) => (
        <text key={m} x={i === 0 ? x(i) : x(i)} y={212} textAnchor={i === 0 ? "start" : "middle"} fontSize={12} fill="#6a6c6a">
          {m}
        </text>
      ))}
      {uvData.map((d, j) => {
        if (!visible[j]) return null;
        const pts = d.map((v, i) => `${x(i)},${y(v)}`);
        return (
          <g key={j}>
            <polyline points={pts.slice(6).join(" ")} fill="none" stroke={doms[j].color} strokeOpacity={0.3} strokeWidth={2.5} />
            <polyline points={pts.slice(0, 7).join(" ")} fill="none" stroke={doms[j].color} strokeWidth={2.5} strokeLinejoin="round" />
            {d.slice(0, 7).map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={3.5} fill={doms[j].color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function Demographics() {
  const [ageVis, setAgeVis] = useState([true, true, true]);
  const [uvVis, setUvVis] = useState([true, true, true]);
  const toVis = (r: Record<string, boolean>) => doms.map((d) => r[d.name]);
  return (
    <TrafficFrame title="Demographics" filters={["geo", "date", "device"]}>
      <div className="flex flex-col gap-4 pt-[15px]">
        <SampleCard title="Audience" info extra={<ExportButton className="mr-[52px]" />} bodyClassName="flex px-5 pt-[21px] pb-[21px]">
          <div className="w-[820px] shrink-0">
            <h3 className="text-[14px] leading-5 font-semibold">Age</h3>
            <div className="mt-[18px]">
              <AgeChart visible={ageVis} />
            </div>
            <DomainLegend className="mt-[16px]" onChange={(r) => setAgeVis(toVis(r))} />
          </div>
          <div className="mr-[20px] ml-[21px] w-px shrink-0 bg-[#e0e2e1]" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] leading-5 font-semibold">Sex</h3>
              <div className="flex items-center gap-[14px] pr-[40px] text-[13px] text-rk-text-2">
                <span className="flex items-center gap-[4px]">
                  <DomainDot color="#6468de" size={10} />
                  <span className="text-rk-muted">♂</span> Male
                </span>
                <span className="flex items-center gap-[4px]">
                  <DomainDot color="#afc2fd" size={10} />
                  <span className="text-rk-muted">♀</span> Female
                </span>
              </div>
            </div>
            <div className="mt-[30px] flex flex-col gap-[12px]">
              {sexData.map((s, i) => (
                <div key={doms[i].name} className="flex h-5 items-center text-[13px]">
                  <DomainDot color={doms[i].color} size={10} className="mr-[6px]" />
                  <span className="w-[90px] text-rk-text-2">{doms[i].name}</span>
                  <span className="w-[56px] text-right text-rk-muted">{s.male}%</span>
                  <div className="ml-[8px] flex h-4 w-[106px] overflow-hidden">
                    <span className="h-full bg-[#6468de]" style={{ width: `${s.male}%` }} />
                    <span className="h-full flex-1 bg-[#afc2fd]" />
                  </div>
                  <span className="ml-auto text-rk-muted">{s.female}%</span>
                </div>
              ))}
            </div>
          </div>
        </SampleCard>

        <SampleCard title="Unique Visitors" info bodyClassName="px-5 pt-[21px] pb-[20px]">
          <div className="flex items-center justify-between">
            <SegTabs items={["Months", "Quarters"] as const} />
            <SegPeriod />
          </div>
          <div className="mt-[10px]">
            <UvChart visible={uvVis} />
          </div>
          <DomainLegend className="mt-[10px]" onChange={(r) => setUvVis(toVis(r))} />
        </SampleCard>

        <SampleCard title="Geo Distribution" bodyClassName="relative px-5 pt-[22px] pb-[20px]">
          <div className="flex items-center gap-4">
            <DomainSwitch />
            <SegTabs items={["Visits", "Unique Visitors"] as const} />
            <Popover
              trigger={({ toggle, open }) => (
                <OutlineButton onClick={toggle} className="bg-white">
                  By country
                  <SmallChevron width={14} height={14} className={open ? "rotate-180" : ""} />
                </OutlineButton>
              )}
              panelClassName="min-w-[140px]"
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
          <table className="mt-[17px] w-[588px] border-collapse text-[14px]">
            <thead>
              <tr className="h-[34px] border-b border-[#e0e2e1] text-[13px] text-rk-text-2">
                <th className="pl-[8px] text-left font-normal">Country</th>
                <th colSpan={2} className="pr-[8px] text-right font-normal">
                  <span className="inline-flex items-center gap-[4px]">
                    All devices <SortIcon className="text-rk-muted" width={14} height={14} />
                  </span>
                </th>
                <th className="w-[100px] pr-[8px] text-right font-normal">Desktop</th>
                <th className="w-[100px] pr-[8px] text-right font-normal">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {geoRows.map((r, i) => (
                <tr key={r.code} className="h-[37px] border-b border-[#e0e2e1]">
                  <td className="pl-[8px]">
                    <span className="flex items-center gap-[6px]">
                      <Flag code={r.code} />
                      {r.name}
                    </span>
                  </td>
                  <td className="w-[80px] pr-[8px] text-right text-rk-muted">{r.share}</td>
                  <td className={`w-[70px] pr-[8px] text-right ${i === 0 ? "font-bold" : ""}`}>{r.value}</td>
                  <td className="pr-[8px] text-right">{r.desktop}</td>
                  <td className="pr-[8px] text-right">{r.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <OutlineButton className="mt-[21px]">View details</OutlineButton>
          <GeoMap className="absolute top-[76px] left-[738px] h-[225px] w-[395px]" />
        </SampleCard>
      </div>
    </TrafficFrame>
  );
}

function SegPeriod() {
  const [p, setP] = useState("6M");
  return (
    <div className="flex items-center gap-4 pr-[13px] text-[14px]">
      {["6M", "12M", "24M", "All"].map((t) => (
        <button key={t} type="button" onClick={() => setP(t)} className={`relative pb-[2px] ${p === t ? "text-rk-text" : "text-rk-muted hover:text-rk-text"}`}>
          {t}
          {p === t && <span className="absolute right-0 -bottom-[3px] left-0 h-[2px] bg-[#8e92ec]" />}
        </button>
      ))}
    </div>
  );
}
