"use client";

import { useState, type ReactNode } from "react";
import { TrafficFrame, DomainDot } from "../TrafficFrame";
import { SampleCard } from "../ui";
import { DesktopIcon, MobileIcon } from "@/components/ui/icons";
import { behaviorSummary, deviceDesktop, doms, interestRows, socialRows } from "./data";
import { SocialIcon, SortIcon } from "./ui";

const how = (
  <a href="#" className="text-[14px] text-rk-link hover:underline">
    How to use it
  </a>
);

function Count({ title, n }: { title: string; n: number }) {
  return (
    <>
      {title} <span className="font-normal text-rk-muted">({n})</span>
    </>
  );
}

function ValueTable({ head, rows, tight = false }: { head: string; rows: { key: string; label: ReactNode; v: [string, string][] }[]; tight?: boolean }) {
  const [sort, setSort] = useState(-1);
  const parse = (s: string) => parseFloat(s);
  const sorted = sort < 0 ? rows : [...rows].sort((a, b) => parse(b.v[sort][0]) - parse(a.v[sort][0]));
  return (
    <table className="w-[1196px] border-collapse text-[14px]">
      <thead>
        <tr className="h-[32px] border-b border-[#e0e1e9] text-[12px] text-rk-text-2">
          <th className="pl-[8px] text-left font-normal">{head}</th>
          {doms.map((d, i) => (
            <th key={d.name} className="w-[140px] pr-[8px] text-right font-normal">
              <button type="button" onClick={() => setSort(i)} className="inline-flex items-center gap-[6px] hover:text-rk-text">
                <DomainDot color={d.color} size={12} className="mr-[2px]" />
                {d.name}
                <SortIcon width={14} height={14} className={sort === i ? "text-rk-text" : "text-rk-faint"} />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((r, ri) => (
          <tr key={r.key} className="h-[37px] border-b border-[#e0e1e9]">
            <td className="pl-[8px]">{r.label}</td>
            {r.v.map(([val, pct], i) => (
              <td key={i} className="pr-[8px] text-right">
                <span className={ri === 0 ? "font-bold" : ""}>{val}</span>
                <span className={`inline-block text-rk-muted ${tight ? "w-[61px] pl-[4px] text-left" : "w-[65px]"}`}>{pct}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Behavior() {
  return (
    <TrafficFrame title="Behavior" filters={["geo", "date", "device"]}>
      <div className="flex flex-col gap-4 pt-[15px]">
        <SampleCard title="Summary" bodyClassName="pt-[20px]">
          <table className="ml-5 w-[1206px] border-collapse text-[14px]">
            <thead>
              <tr className="h-[34px] border-b border-[#e0e1e9] text-[12px] text-rk-text-2">
                <th className="text-left font-normal">Categories</th>
                {doms.map((d) => (
                  <th key={d.name} className="w-[186px] text-right font-normal">
                    <span className="inline-flex items-center gap-[8px]">
                      <DomainDot color={d.color} size={12} />
                      {d.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {behaviorSummary.map((r, ri) => (
                <tr key={r.label} className={`h-[37px] ${ri < 2 ? "border-b border-[#e0e1e9]" : ""}`}>
                  <td>{r.label}</td>
                  {r.cells.map(([name, pct], i) => (
                    <td key={i} className="text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-[10px]">
                        {r.icon && <SocialIcon k="youtube" />}
                        {name}
                        <span className="text-rk-muted">{pct}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </SampleCard>

        <SampleCard title={<Count title="Social Media" n={9} />} link={how} bodyClassName="px-5 pt-[20px] pb-[20px]">
          <ValueTable
            head="Social Media"
            rows={socialRows.map((r) => ({
              key: r.key,
              v: r.v,
              label: (
                <span className="flex items-center gap-[8px]">
                  <SocialIcon k={r.key} />
                  {r.label}
                </span>
              ),
            }))}
          />
        </SampleCard>

        <SampleCard title={<Count title="Interests" n={6} />} link={how} bodyClassName="px-5 pt-[20px] pb-[20px]">
          <ValueTable tight head="Categories" rows={interestRows.map((r) => ({ key: r.label, label: r.label, v: r.v }))} />
        </SampleCard>

        <SampleCard title="Device" bodyClassName="px-5 pt-[30px] pb-[19px]">
          <div className="flex flex-col gap-[20px]">
            {deviceDesktop.map((v, i) => (
              <div key={doms[i].name} className="flex h-4 items-center text-[14px]">
                <DomainDot color={doms[i].color} size={12} className="mr-[8px]" />
                <span className="w-[80px] shrink-0">{doms[i].name}</span>
                <div className="flex h-4 flex-1">
                  <span title={`Desktop ${v}%`} className="h-full bg-[#6468de]" style={{ width: `${v}%` }} />
                  <span title={`Mobile ${(100 - v).toFixed(2)}%`} className="h-full flex-1 bg-[#afc2fd]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[30px] flex items-center gap-[12px] text-[14px]">
            <span className="flex items-center gap-[8px]">
              <DomainDot color="#6468de" size={12} />
              <DesktopIcon className="text-rk-muted" />
              Desktop
            </span>
            <span className="flex items-center gap-[8px]">
              <DomainDot color="#afc2fd" size={12} />
              <MobileIcon className="text-rk-muted" />
              Mobile
            </span>
          </div>
        </SampleCard>
      </div>
    </TrafficFrame>
  );
}
