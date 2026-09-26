import type { Snap } from "../context";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { Checkbox, DomainChip, Select, SearchInput } from "../controls";
import { SortAscIcon } from "../icons";
import { Info } from "../ui";
import { volumeOptions } from "./Overview";
import { FeaturedTiles } from "../FeaturedTiles";

const card = "rounded-md border border-[#e5e6e6] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)]";

function Bar({ color, w }: { color: string; w: number }) {
  return <div style={{ width: w, background: color }} className="mt-[4px] h-[7px] rounded-full" />;
}

function SummaryCard() {
  return (
    <section className={`${card} relative h-[233px] w-[560px]`}>
      <div className="flex h-[63px] items-start border-b-2 border-[#edefef] px-5 pt-[8px]">
        <h2 className="flex items-center gap-[6px] text-[16px] leading-6 font-semibold text-rk-text">
          0 keywords with Featured snippets on SERP <Info className="ml-[1px]" />
        </h2>
      </div>
      <div className="absolute top-[92px] left-5 text-[12px] leading-4 text-rk-text">Keywords</div>
      <div className="absolute top-[92px] left-[271.7px] text-[12px] leading-4 text-rk-text">Visibility</div>
      <div className="absolute top-[92px] left-[420px] text-[12px] leading-4 text-rk-text">Est. traffic</div>
      <div className="absolute top-[116px] right-0 left-0 border-t border-[#e0e2e1]" />
      <div className="absolute top-[165px] right-0 left-0 border-t border-[#edefef]" />
      {[
        { label: "Already featured", top: 123.5, count: "text-[#009f81]", bar: "#d6d8d7", extra: false },
        { label: "Opportunities", top: 172, count: "text-[#5c5fd6]", bar: "#8e92ec", extra: true },
      ].map((r) => (
        <div key={r.label} className="absolute right-0 left-0 text-[14px] leading-5" style={{ top: r.top }}>
          <span className="absolute left-5 text-rk-text">{r.label}</span>
          <span className={`absolute left-[195.4px] font-semibold ${r.count}`}>0</span>
          <span className="absolute left-[221.4px] text-rk-muted">0%</span>
          <div className="absolute left-[271.7px] w-[132px]">
            <div className="flex justify-between">
              <span className="font-semibold text-rk-text">0.0%</span>
              {r.extra && <span className="text-rk-muted">+100.0%</span>}
            </div>
            <Bar color={r.bar} w={132} />
          </div>
          <div className="absolute left-[420px] w-[120px]">
            <div className="flex justify-between">
              <span className="font-semibold text-rk-text">0</span>
              {r.extra && <span className="text-rk-muted">+0.00</span>}
            </div>
            <Bar color={r.bar} w={120} />
          </div>
        </div>
      ))}
    </section>
  );
}

function TrendCard({ days }: { days: number }) {
  return (
    <section className={`${card} relative h-[233px] w-[415.6px]`}>
      <div className="h-[63px] border-b-2 border-[#edefef] px-5 pt-[8px]">
        <h2 className="flex items-center gap-[6px] text-[16px] leading-6 font-semibold text-rk-text">
          Featured snippets trend <Info className="ml-[1px]" />
        </h2>
        <div className="mt-[4px] text-[14px] leading-5 text-rk-muted">over last {days} days</div>
      </div>
      <div className="absolute top-[91px] left-5 flex items-center gap-[14px] text-[14px] text-rk-text">
        <Checkbox checked color="#3ddc9c" label="You ranked" className="!gap-[8px]" />
        <Checkbox checked color="#8e92ec" label="You didn’t rank" className="!gap-[8px]" />
      </div>
      <svg width={415} height={233} className="absolute top-0 left-0">
        {[123, 143, 163, 183].map((y) => (
          <line key={y} x1={20} x2={395.6} y1={y} y2={y} stroke="#e0e2e1" />
        ))}
        <line x1={20} x2={395.6} y1={203} y2={203} stroke="#8e92ec" strokeWidth={3} />
      </svg>
    </section>
  );
}

const headCols = [
  { label: "Volume", w: 85.9, sorted: true },
  { label: "Est. Traffic potential", w: 157.9 },
  { label: "You", w: 66 },
  { label: "Featured snippet URL", w: 251.5, grow: true },
];

function SnippetsTable() {
  return (
    <section className={`${card} mt-[16.5px] h-[350px]`}>
      <div className="flex h-[41px] items-center border-b-2 border-[#edefef] px-5">
        <h2 className="text-[16px] leading-6 font-semibold text-rk-text">Featured Snippets</h2>
      </div>
      <div className="px-5 pt-[18.7px]">
        <FeaturedTiles />
      </div>
      <div className="mt-[37px] flex h-[40px] border-y border-[#e0e2e1] bg-[#f5f6f6] text-[12px] text-rk-text">
        <div className="flex min-w-0 flex-[2_1_499.7px] items-center gap-[6px] pl-5">
          Keyword <SortAscIcon width={14} height={14} className="text-rk-muted" />
        </div>
        {headCols.map((c) => (
          <div key={c.label} style={{ flex: `${c.grow ? 1 : 0} 0 ${c.w}px` }} className={`flex items-center gap-[6px] border-l border-[#e0e2e1] pl-[12px] whitespace-nowrap ${c.sorted ? "bg-[#e4e5e5]" : ""}`}>
            {c.label} <SortAscIcon width={14} height={14} className="text-rk-muted" />
          </div>
        ))}
      </div>
      <div className="pt-[52px] text-center">
        <div className="text-[5px] leading-[8px] text-rk-muted">Sorry, nothing here.</div>
        <p className="mt-[16px] text-[14px] leading-[14px] text-[#8b8d8c]">
          You may try selecting another tab above the table or changing
          <br />
          filter by Tops near the domain field.
        </p>
      </div>
    </section>
  );
}

export function FeaturedSnippetsView(snap: Snap) {
  return (
    <TrackingPage tab="featuredSnippets" {...snap}>
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={<DomainChip />}
          filters={
            <>
              <SearchInput placeholder="Filter by keyword" width={187} />
              <Select label="All keywords" options={["All keywords", "Opportunities", "Already featured"]} className="w-[125px]" />
              <Select label="Tags" options={["No tags"]} className="w-[73px]" />
              <Select label="Volume" options={volumeOptions} className="w-[90px]" />
              <Select label="Advanced filters" options={["Include keywords", "Exclude keywords"]} className="w-[149px]" />
            </>
          }
        />
        <div className="mt-[15px] flex gap-3">
          <SummaryCard />
          <TrendCard days={snap.end === "20260925" ? 9 : 8} />
        </div>
        <SnippetsTable />
      </div>
    </TrackingPage>
  );
}
