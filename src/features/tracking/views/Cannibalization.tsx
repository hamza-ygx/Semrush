import type { Snap } from "../context";
import { PlusIcon, GearIcon } from "@/components/ui/icons";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Segmented, Select, SearchInput } from "../controls";
import { EyeIcon, NoteIcon, SortIcon } from "../icons";
import { LooksGood } from "../illustrations";
import { GrayButton, NothingFound, Panel } from "../ui";
import { CannibalizationHealthCard } from "./Landscape";

const cols = [
  { label: "Affected Keywords", w: 143, sorted: true },
  { label: "Avg. Pos.", w: 68.8 },
  { label: "Diff", w: 50.3 },
  { label: "Total Est. Traffic", w: 119.8 },
  { label: "Diff", w: 50.3 },
  { label: "Total volume", w: 87.6 },
];

function HealthActions() {
  return (
    <div className="flex items-center gap-[9px]">
      <span className="-mr-[2px] flex items-center gap-[6px] text-[14px] text-rk-text">
        <NoteIcon width={17} height={17} />
        Notes:
      </span>
      <GrayButton className="h-[27px] !gap-[8px] !bg-[#f5f6f6] !px-[8px]">
        <PlusIcon width={14} height={14} />
        Add
      </GrayButton>
      <GrayButton className="h-[27px] !bg-[#f5f6f6] !px-[8px]">View all</GrayButton>
      <GrayButton label="Show notes" className="h-[27px] w-[32px] justify-center !bg-[#f5f6f6] !px-0">
        <EyeIcon width={17} height={17} />
      </GrayButton>
      <GrayButton label="Settings" className="h-[27px] w-[33px] justify-center !bg-[#f5f6f6] !px-0">
        <GearIcon width={17} height={17} />
      </GrayButton>
    </div>
  );
}

export function CannibalizationView(snap: Snap) {
  return (
    <TrackingPage tab="cannibalization" {...snap}>
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={<DomainChip />}
          filters={
            <>
              <SearchInput placeholder="Filter by keyword" width={187} />
              <SearchInput placeholder="Filter by URL" width={187} />
              <Select label="Positions" options={["Top 3", "Top 10", "Top 20", "Top 100"]} className="w-[101px]" />
            </>
          }
        />
        <CannibalizationHealthCard header={<HealthActions />} x0={244} x1={1002} dataEnd={0.891} nine={snap.end === "20260925"} liveDays={snap.live?.days} buttons={false} className="mt-[15px] h-[282px]" />
        <Panel title="Cannibalization" count="0 (0)" info={false} demo={!!snap.live} className="mt-[15px] h-[428px]" headerClassName="h-[41px]">
          <div className="px-5 pt-[20px] pb-[20px]">
            <Segmented items={["Pages", "Keywords"] as const} value="Pages" />
          </div>
          <div className="flex h-[40px] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
            <div className="flex flex-1 items-center pl-[55.6px]">Cannibal Page</div>
            {cols.map((c, i) => (
              <div
                key={i}
                style={{ width: c.w }}
                className={`flex shrink-0 items-center justify-end gap-[6px] pr-[8px] whitespace-nowrap ${c.sorted ? "bg-[#e9ebeb]" : ""}`}
              >
                {c.label}
                {c.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
              </div>
            ))}
          </div>
          <NothingFound
            className="pt-[41px] [&>div:nth-child(2)]:mt-[11px]"
            icon={<LooksGood size={80} />}
            title="Looks good!"
            text={
              <>
                It seems that you don’t experience keyword
                <br />
                cannibalization.
              </>
            }
          />
        </Panel>
      </div>
    </TrackingPage>
  );
}
