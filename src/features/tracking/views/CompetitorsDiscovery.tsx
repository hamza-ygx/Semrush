import { ChevronsLeft, GearIcon } from "@/components/ui/icons";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { Checkbox, Segmented, Select, SearchInput } from "../controls";
import { SortIcon } from "../icons";
import { ExtLink, Info, Panel } from "../ui";
import { competitors } from "../data";
import { serpOptions, volumeOptions } from "./Overview";

const diffCls = (d: string) => (d.startsWith("-") ? "text-rk-danger" : "text-rk-success");

function CompetitionMap() {
  const x = (v: number) => 102.5 + (v - 10) * 10.19;
  const y = (v: number) => 177.8 + v * 1.222;
  return (
    <Panel title="Competition Map" className="relative h-[433px]" headerClassName="h-[42px]">
      <div className="absolute top-[67px] left-5">
        <Checkbox label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[8px]" />
      </div>
      <div className="absolute top-[62px] right-[19px] flex items-center gap-[9px]">
        <Info />
        <Segmented items={["Competitors", "Winners & Losers"] as const} value="Competitors" className="[&>button]:h-[27px]" />
      </div>
      <svg width={640} height={431} className="absolute top-0 left-0 overflow-visible">
        {[10, 20, 30, 40, 50, 60].map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={129} y2={348.8} stroke="#e6e7ec" />
            <text x={x(v)} y={370} textAnchor="middle" fontSize={12} fill="#6c6e79">
              {v}
            </text>
          </g>
        ))}
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line x1={80.8} x2={625} y1={y(v)} y2={y(v)} stroke="#e6e7ec" />
            <text x={63.5} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
              {v}
            </text>
          </g>
        ))}
        <line x1={80.8} x2={625} y1={348.8} y2={348.8} stroke="#c4c7cf" />
        <text x={352} y={387.5} textAnchor="middle" fontSize={12} fill="#6c6e79">
          Number of Keywords
        </text>
        <text transform="translate(33 239) rotate(-90)" textAnchor="middle" fontSize={12} fill="#6c6e79">
          Average Position
        </text>
        {competitors.map((c) => (
          <path key={c.domain} d={`M${x(c.x) - 4} ${y(c.y)}h8M${x(c.x)} ${y(c.y) - 4}v8`} stroke={c.color} strokeWidth={2} />
        ))}
      </svg>
      <div className="absolute top-[119px] left-[671px] w-[367px]">
        <div className="flex h-[27px] items-start border-b border-[#e0e1e9] pt-[3px] text-[12px] leading-4 text-rk-text">
          <span className="flex-1 pl-[8px]">Competitor</span>
          <span className="w-[137px] pl-[24px]">Visibility</span>
        </div>
        <div className="no-scrollbar relative h-[262px] overflow-y-auto">
          {competitors.map((c) => (
            <div key={c.domain} className="flex h-[37.3px] items-center border-b border-[#eceef2] text-[14px] text-rk-text">
              <span className="ml-[15.5px]">
                <Checkbox checked color={c.color} size={16} />
              </span>
              <span className="ml-[8px] flex-1">{c.domain}</span>
              <span className="w-[50px] text-right">{c.visNum}</span>
              <span className={`mr-[25px] w-[73px] pl-[17px] ${diffCls(c.legendDiff)}`}>{c.legendDiff}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-[34px] right-[5px] h-[173px] w-[4px] rounded-full bg-[#c4c7cf]" />
      </div>
    </Panel>
  );
}

const cols = [
  { label: "Visibility", w: 169, sorted: true },
  { label: "Diff", w: 66.4 },
  { label: "Est. Traffic", w: 76.6 },
  { label: "Diff", w: 59 },
  { label: "Keywords", w: 72 },
  { label: "Avg. Pos.", w: 109 },
];

function CompetitorsTable() {
  return (
    <Panel title="Competitors" count="1-10 (2,901)" className="mt-4" headerClassName="h-[41px]" divider={false}>
      <div className="flex h-[40px] border-y border-[#eceef2] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <span className="w-[44px]" />
        <span className="flex flex-1 items-center pl-[10px]">Domain</span>
        {cols.map((c, i) => (
          <span key={i} style={{ width: c.w }} className={`flex items-center justify-end gap-[6px] pr-[7px] ${c.sorted ? "bg-[#e9ebeb]" : ""}`}>
            {c.label}
            {c.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
          </span>
        ))}
        <span className="flex w-[46px] items-center pl-[9.5px] text-[#8a8e9b]">
          <GearIcon />
        </span>
      </div>
      {competitors.map((c, i) => (
          <div key={c.domain} className="flex h-[75.5px] border-b border-[#eceef2] pt-[14px] text-[14px] leading-5 text-rk-text last:border-b-0">
            <span className="w-[44px] pr-[7px] text-right">{i + 1}.</span>
            <span className="flex-1 pl-[10px]">
              <ExtLink href={`https://${c.domain}`}>{c.domain}</ExtLink>
            </span>
            <span className="flex w-[169px] justify-end gap-[17.4px] pr-[7.4px]">
              {c.visibility}
              <span className="mt-[7px] h-[7px] w-[80px] overflow-hidden rounded-full bg-[#e0e1e9]">
                <span className="block h-full rounded-full bg-[#5c5fd6]" style={{ width: `${Math.max(c.visNum, 9)}%` }} />
              </span>
            </span>
            <span className={`w-[66.4px] pr-[7px] text-right ${diffCls(c.visDiff)}`}>{c.visDiff}</span>
            <span className="w-[76.6px] pr-[7.2px] text-right">{c.traffic}</span>
            <span className={`w-[59px] pr-[7px] text-right ${diffCls(c.trafficDiff)}`}>{c.trafficDiff}</span>
            <span className="w-[72px] pr-[7px] text-right">{c.keywords}</span>
            <span className="w-[109px] pr-[8.6px] text-right">
              {c.avgPos} <span className="text-rk-muted">± {c.spread}</span>
            </span>
            <span className="w-[46px] pl-[9.5px] text-[#8a8e9b]">
              <button type="button" aria-label="Settings" className="hover:text-rk-text">
                <GearIcon />
              </button>
            </span>
          </div>
      ))}
      <div className="flex h-[66px] items-center gap-[8px] border-t border-[#eceef2] px-5 pb-[4px] text-[14px] text-rk-text">
        <button type="button" disabled className="flex h-7 w-[28px] items-center justify-center rounded-md border border-[#e0e1e9] text-[#c4c7cf]">
          <ChevronsLeft />
        </button>
        <button type="button" disabled className="h-7 rounded-md border border-[#e0e1e9] px-[8px] text-[#c4c7cf]">
          Prev
        </button>
        <button type="button" className="h-7 rounded-md bg-rk-btn-dark px-[8px] font-semibold text-white hover:bg-[#2b2e38]">
          Next
        </button>
        <span className="ml-[8px]">Page:</span>
        <input defaultValue="1" className="h-7 w-[68px] rounded-md border border-rk-border-strong px-[9px] outline-none focus:border-[#006dca]" />
        <span className="mr-[10px]">
          of{" "}
          <button type="button" className="text-rk-link">
            291
          </button>
        </span>
        <Select label="10" placeholder={false} options={["10", "20", "50", "100"]} className="w-[51px]" />
      </div>
    </Panel>
  );
}

export function CompetitorsDiscoveryView() {
  return (
    <TrackingPage tab="competitorsDiscovery">
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={
            <>
              <span className="-mr-[2px] flex items-center gap-[5px] text-[12px] text-rk-text">
                Depth <Info />
              </span>
              <Segmented items={["Top 100", "Top 50", "Top 20", "Top 10", "Top 5", "Top 3"] as const} value="Top 100" />
            </>
          }
          filters={
            <>
              <SearchInput placeholder="Filter by keyword" width={187} />
              <Select label="SERP Features" options={serpOptions} className="w-[138px]" />
              <Select label="Tags" options={["No tags"]} className="w-[73px]" />
              <Select label="Volume" options={volumeOptions} className="w-[91px]" />
              <Select label="Ignored domains" options={["No ignored domains"]} className="w-[151px]" />
              <Select label="Advanced filters" options={["Include keywords", "Exclude keywords"]} className="w-[150px]" />
            </>
          }
        />
        <div className="mt-[15px]">
          <CompetitionMap />
        </div>
        <CompetitorsTable />
      </div>
    </TrackingPage>
  );
}
