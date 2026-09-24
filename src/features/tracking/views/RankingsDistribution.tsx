import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Segmented, Select, SearchInput } from "../controls";
import { DomainTable, type DomainCol } from "../DomainTable";
import { serpOptions, volumeOptions } from "./Overview";

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

export function RankingsDistributionView() {
  return (
    <TrackingPage tab="rankingsDistribution">
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
          <DomainTable title="Rankings Overview" count="1-1 (1)" cols={overviewCols} />
          <DomainTable title="Rankings in TOP 3" cols={topCols(3, 152.8)} />
          <DomainTable title="Rankings in TOP 10" cols={topCols(10, 158)} />
          <DomainTable title="Rankings in TOP 20" cols={topCols(20, 160)} />
          <DomainTable title="Rankings in TOP 100" cols={topCols(100, 166)} />
        </div>
      </div>
    </TrackingPage>
  );
}
