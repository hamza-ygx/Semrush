import type { Snap } from "../context";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Segmented, Select, SearchInput } from "../controls";
import { DomainTable, type DomainCol } from "../DomainTable";
import { serpOptions, volumeOptions } from "./Overview";
import { fmtPct, signed, signedInt, type TrackingLive } from "../live";
import type { ReactNode } from "react";

const diffCls = (v: number) => (v > 0 ? "text-rk-success" : v < 0 ? "text-rk-danger" : "");
const d = (v: number, text: string): ReactNode => (v ? <span className={diffCls(v)}>{text}</span> : "0");

function withValues(cs: DomainCol[], values: ReactNode[], fill: number): DomainCol[] {
  return cs.map((c, i) => ({ ...c, value: values[i], fill: c.bar ? fill : undefined }));
}

function liveOverview(cs: DomainCol[], l: TrackingLive) {
  const b = l.buckets;
  return withValues(
    cs,
    [fmtPct(l.vis), d(l.vis - l.prevVis, signed(l.vis - l.prevVis)), String(l.traffic), d(l.traffic - l.prevTraffic, signedInt(l.traffic - l.prevTraffic)), String(b[3].now), String(b[10].now), String(b[20].now), String(b[100].now)],
    l.vis > 0 ? 100 : 0,
  );
}

function liveTop(cs: DomainCol[], l: TrackingLive, n: 3 | 10 | 20 | 100) {
  const b = l.buckets[n];
  return withValues(cs, [String(b.now), d(b.now - b.prev, signedInt(b.now - b.prev)), String(b.gained), String(b.improved), String(b.lost), String(b.declined)], b.now > 0 ? 100 : 0);
}

const overviewCols: DomainCol[] = [
  { label: "Visibility", w: 120.6, sorted: true, bar: true },
  { label: "Diff", w: 50.6 },
  { label: "Est. Traffic", w: 77 },
  { label: "Diff", w: 49.7 },
  { label: "Top 3", w: 50.3 },
  { label: "Top 10", w: 53 },
  { label: "Top 20", w: 55.5 },
  { label: "Top 100", w: 72.5 },
];

const topCols = (n: number, w: number): DomainCol[] => [
  { label: `# keywords in TOP ${n}`, w, sorted: true, bar: true },
  { label: "Diff", w: 51.5 },
  { label: "New", w: 50 },
  { label: "Improved", w: 69 },
  { label: "Lost", w: 50 },
  { label: "Declined", w: 77 },
];

function AddDomain() {
  return <Select label="Add domain" className="w-[120px]" options={["verksamt.se", "www.skatteverket.se", "www.fortnox.se", "www.bokio.se"]} />;
}

export function RankingsDistributionView(snap: Snap) {
  const { live } = snap;
  return (
    <TrackingPage tab="rankingsDistribution" {...snap}>
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={
            <>
              <DomainChip />
              <AddDomain />
              <AddDomain />
              <AddDomain />
              <AddDomain />
            </>
          }
          filters={
            <>
              <SearchInput placeholder="Filter by keyword" width={187} />
              <Select label="SERP Features" options={serpOptions} className="w-[138px]" />
              <Select label="Tags" options={["No tags"]} className="w-[73px]" />
              <Select label="Volume" options={volumeOptions} className="w-[91px]" />
              <Segmented items={["All competitors", "Domains in input fields"] as const} value="All competitors" className="ml-2" />
            </>
          }
        />
        <div className="mt-[15px] flex flex-col gap-4">
          <DomainTable title="Rankings Overview" count="1-1 (1)" cols={live ? liveOverview(overviewCols, live) : overviewCols} />
          <DomainTable title="Rankings in TOP 3" cols={live ? liveTop(topCols(3, 152.8), live, 3) : topCols(3, 152.8)} />
          <DomainTable title="Rankings in TOP 10" cols={live ? liveTop(topCols(10, 158), live, 10) : topCols(10, 158)} />
          <DomainTable title="Rankings in TOP 20" cols={live ? liveTop(topCols(20, 160), live, 20) : topCols(20, 160)} />
          <DomainTable title="Rankings in TOP 100" cols={live ? liveTop(topCols(100, 166), live, 100) : topCols(100, 166)} />
        </div>
      </div>
    </TrackingPage>
  );
}
