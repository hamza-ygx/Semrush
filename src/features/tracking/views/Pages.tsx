import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Segmented, Select, SearchInput } from "../controls";
import { SortIcon } from "../icons";
import { NothingFound, Panel } from "../ui";
import { intentOptions, volumeOptions } from "./Overview";

const groups = [
  { label: "Keywords count", w: 115.4, sub: true, sorted: true },
  { label: "Intent Rates", w: 112, sub: false },
  { label: "Estimated Traffic", w: 114.5, sub: true },
  { label: "Average position", w: 114.5, sub: true },
  { label: "Total volume", w: 131, sub: true },
];

function PagesTable() {
  return (
    <Panel title="Pages" count="0 (0)" headerClassName="h-[41px]" divider={false} className="mt-[15px] h-[379px]">
      <div className="flex h-[82px] border-y border-[#edefef] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <div className="flex-1 pt-[12px] pl-[52px]">URL</div>
        {groups.map((g, gi) => (
          <div key={g.label} style={{ width: g.w }} className={`flex shrink-0 flex-col border-l border-[#edefef] ${g.sorted ? "bg-[#eceded]" : ""}`}>
            <div className="h-[41px] pt-[12px] text-center whitespace-nowrap">{g.label}</div>
            {g.sub && (
              <div className="flex h-[41px] items-center">
                <span className={`flex h-full flex-1 items-center justify-end gap-[4px] pr-[9px] ${g.sorted ? "bg-[#e3e5e5]" : ""}`}>
                  Sep 24 {g.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
                </span>
                <span className={`flex h-full items-center justify-end ${gi === groups.length - 1 ? "w-[48px] pr-[20px]" : "w-[36px] pr-[8px]"} ${g.sorted ? "bg-[#f7f8f9]" : ""}`}>Diff</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <NothingFound className="pt-[32px]" />
    </Panel>
  );
}

export function PagesView() {
  return (
    <TrackingPage tab="pages">
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={<DomainChip />}
          filters={
            <>
              <SearchInput placeholder="Filter by URL" width={187} />
              <Segmented
                items={["All URLs", "New", "Lost"] as const}
                value="All URLs"
                suffix={{ New: <span className="ml-[3px] text-rk-muted">0</span>, Lost: <span className="ml-[3px] text-rk-muted">0</span> }}
              />
              <Select label="Tags" options={["No tags"]} className="w-[72px]" />
              <Select label="Intent" options={intentOptions} className="w-[79px]" />
              <Select label="Volume" options={volumeOptions} className="w-[91px]" />
              <Select label="Advanced filters" options={["Include URL", "Exclude URL"]} className="w-[149px]" />
            </>
          }
        />
        <PagesTable />
      </div>
    </TrackingPage>
  );
}
