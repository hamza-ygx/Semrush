import type { Snap } from "../context";
import { ChevronsLeft, GearIcon } from "@/components/ui/icons";
import { CompetitionMap } from "../CompetitionMap";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { Segmented, Select, SearchInput } from "../controls";
import { SortIcon } from "../icons";
import { ExtLink, Info, Panel } from "../ui";
import { competitors } from "../data";
import { serpOptions, volumeOptions } from "./Overview";

const diffCls = (d: string) => (d.startsWith("-") ? "text-rk-danger" : "text-rk-success");

const cols = [
  { label: "Visibility", w: 169, sorted: true },
  { label: "Diff", w: 66.4 },
  { label: "Est. Traffic", w: 76.6 },
  { label: "Diff", w: 59 },
  { label: "Keywords", w: 72 },
  { label: "Avg. Pos.", w: 109 },
];

function CompetitorsTable({ total }: { total: string }) {
  return (
    <Panel title="Competitors" count={`1-10 (${total})`} className="mt-4" headerClassName="h-[41px]" divider={false}>
      <div className="flex h-[40px] border-y border-[#edefef] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <span className="w-[44px]" />
        <span className="flex flex-1 items-center pl-[10px]">Domain</span>
        {cols.map((c, i) => (
          <span key={i} style={{ width: c.w }} className={`flex items-center justify-end gap-[6px] pr-[7px] ${c.sorted ? "bg-[#e9ebeb]" : ""}`}>
            {c.label}
            {c.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
          </span>
        ))}
        <span className="flex w-[46px] items-center pl-[9.5px] text-[#8b8d8c]">
          <GearIcon />
        </span>
      </div>
      {competitors.map((c, i) => (
          <div key={c.domain} className="flex h-[75.5px] border-b border-[#edefef] pt-[14px] text-[14px] leading-5 text-rk-text last:border-b-0">
            <span className="w-[44px] pr-[7px] text-right">{i + 1}.</span>
            <span className="flex-1 pl-[10px]">
              <ExtLink href={`https://${c.domain}`}>{c.domain}</ExtLink>
            </span>
            <span className="flex w-[169px] justify-end gap-[17.4px] pr-[7.4px]">
              {c.visibility}
              <span className="mt-[7px] h-[7px] w-[80px] overflow-hidden rounded-full bg-[#e0e2e1]">
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
            <span className="w-[46px] pl-[9.5px] text-[#8b8d8c]">
              <button type="button" aria-label="Settings" className="hover:text-rk-text">
                <GearIcon />
              </button>
            </span>
          </div>
      ))}
      <div className="flex h-[66px] items-center gap-[8px] border-t border-[#edefef] px-5 pb-[4px] text-[14px] text-rk-text">
        <button type="button" disabled className="flex h-7 w-[28px] items-center justify-center rounded-md border border-[#e0e2e1] text-[#d6d8d7]">
          <ChevronsLeft />
        </button>
        <button type="button" disabled className="h-7 rounded-md border border-[#e0e2e1] px-[8px] text-[#d6d8d7]">
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

export function CompetitorsDiscoveryView(snap: Snap) {
  return (
    <TrackingPage tab="competitorsDiscovery" {...snap}>
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
        <CompetitorsTable total={snap.end === "20260925" ? "2,936" : "2,901"} />
      </div>
    </TrackingPage>
  );
}
