"use client";

import { TrafficFrame, DomainDot } from "../TrafficFrame";
import { ExportButton, SampleCard } from "../ui";
import { doms, education, educationLabels, employment, household, householdColors, householdLabels, income, incomeLabels, socioSummary } from "./data";
import { EmpIco } from "./ui";

function Stack({ values, colors, className = "" }: { values: number[]; colors: string[]; className?: string }) {
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <div className={`flex h-4 overflow-hidden ${className}`}>
      {values.map((v, i) => (
        <span key={i} title={`${v}%`} className="h-full" style={{ width: `${(v / total) * 100}%`, background: colors[i] }} />
      ))}
    </div>
  );
}

function DomainRows({ data, colors, barLeft }: { data: number[][]; colors: string[]; barLeft: number }) {
  return (
    <div className="flex flex-col gap-[20px]">
      {data.map((v, i) => (
        <div key={doms[i].name} className="flex h-4 items-center text-[14px]">
          <DomainDot color={doms[i].color} size={12} className="mr-[8px]" />
          <span className="shrink-0" style={{ width: barLeft - 20 }}>
            {doms[i].name}
          </span>
          <Stack values={v} colors={colors} className="flex-1" />
        </div>
      ))}
    </div>
  );
}

function Legend({ items, vertical = false }: { items: { label: string; color: string }[]; vertical?: boolean }) {
  return (
    <div className={`flex text-[14px] ${vertical ? "flex-col gap-[12px]" : "items-center gap-[12px]"}`}>
      {items.map((it) => (
        <span key={it.label} className="flex h-5 items-center gap-[8px]">
          <DomainDot color={it.color} size={12} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

const pair = "w-[170px] pr-0 text-right";
const share = "w-[84px] pl-[16px] text-left";

export function Socioeconomics() {
  return (
    <TrafficFrame title="Socioeconomics" filters={["date"]}>
      <div className="flex flex-col gap-4 pt-[15px]">
        <SampleCard title="Summary" info bodyClassName="pt-[19px]">
          <table className="ml-5 w-[1196px] border-collapse text-[14px]">
            <thead>
              <tr className="h-[34px] border-b border-[#e0e1e9] text-[12px] text-rk-text-2">
                <th className="w-[172px] text-left font-normal">Target</th>
                <th className={`${pair} font-normal`}>Household Size</th>
                <th className={`${share} font-normal`}>Share</th>
                <th className={`${pair} font-normal`}>Income Level</th>
                <th className={`${share} font-normal`}>Share</th>
                <th className={`${pair} font-normal`}>Employment Status</th>
                <th className={`${share} font-normal`}>Share</th>
                <th className={`${pair} font-normal`}>Education</th>
                <th className={`${share} font-normal`}>Share</th>
              </tr>
            </thead>
            <tbody>
              {socioSummary.map((r, i) => (
                <tr key={doms[i].name} className={`h-[37px] ${i < 2 ? "border-b border-[#e0e1e9]" : ""}`}>
                  <td>
                    <span className="flex items-center gap-[12px] pl-[4px]">
                      <DomainDot color={doms[i].color} size={12} />
                      {doms[i].name}
                    </span>
                  </td>
                  <td className={pair}>{r.hh}</td>
                  <td className={`${share} text-rk-muted`}>{r.hhShare}</td>
                  <td className={pair}>{r.income}</td>
                  <td className={`${share} text-rk-muted`}>{r.incomeShare}</td>
                  <td className={pair}>
                    <span className="inline-flex items-center gap-[4px]">
                      <EmpIco i="badge" />
                      {r.emp}
                    </span>
                  </td>
                  <td className={`${share} text-rk-muted`}>{r.empShare}</td>
                  <td className={pair}>{r.edu}</td>
                  <td className={`${share} text-rk-muted`}>{r.eduShare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SampleCard>

        <div className="grid grid-cols-2 gap-4">
          <SampleCard title="Household Size" extra={<ExportButton />} bodyClassName="px-5 pt-[31px] pb-[20px]">
            <DomainRows data={household} colors={householdColors} barLeft={100} />
            <div className="mt-[22px]">
              <Legend items={householdLabels.map((l, i) => ({ label: l, color: householdColors[i] }))} />
            </div>
          </SampleCard>
          <SampleCard title="Income Level" info extra={<ExportButton />} bodyClassName="px-5 pt-[31px] pb-[20px]">
            <DomainRows data={income} colors={incomeLabels.map((l) => l.color)} barLeft={99} />
            <div className="mt-[22px]">
              <Legend items={incomeLabels} />
            </div>
          </SampleCard>

          <SampleCard title="Employment Status" extra={<ExportButton />} bodyClassName="px-5 pt-[22px] pb-[20px]">
            <div className="flex flex-col gap-[20px]">
              {employment.map((e) => (
                <div key={e.label} className="flex h-4 items-center text-[14px]">
                  <span className="flex w-[157px] shrink-0 items-center gap-[6px]">
                    <EmpIco i={e.icon} yellow={e.yellow} />
                    {e.label}
                  </span>
                  <Stack values={e.v} colors={doms.map((d) => d.color)} className="flex-1" />
                </div>
              ))}
            </div>
            <div className="mt-[19px]">
              <Legend items={doms.map((d) => ({ label: d.name, color: d.color }))} />
            </div>
          </SampleCard>
          <SampleCard title="Education" extra={<ExportButton />} bodyClassName="px-5 pt-[31px] pb-[20px]">
            <DomainRows data={education} colors={educationLabels.map((l) => l.color)} barLeft={99} />
            <div className="mt-[30px]">
              <Legend items={educationLabels} vertical />
            </div>
          </SampleCard>
        </div>
      </div>
    </TrafficFrame>
  );
}
