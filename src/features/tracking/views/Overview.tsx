import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Select, SearchInput } from "../controls";
import { OverviewChartCard } from "../OverviewChart";
import { RankingsTable } from "../RankingsTable";

export const topPositions = ["Top 3", "Top 10", "Top 20", "Top 100", "Improved", "Declined", "New", "Lost"];
export const serpOptions = ["Featured snippet", "Local pack", "Knowledge panel", "Image pack", "Video", "People also ask", "Reviews", "Sitelinks"];
export const volumeOptions = ["100,001+", "10,001-100,000", "1,001-10,000", "101-1,000", "11-100", "1-10"];
export const intentOptions = ["Informational", "Navigational", "Commercial", "Transactional"];
export const kdOptions = ["Very hard 85-100%", "Hard 70-84%", "Difficult 50-69%", "Possible 30-49%", "Easy 15-29%", "Very easy 0-14%"];

function AddDomain() {
  return <Select label="Add domain" className="w-[120px]" options={["verksamt.se", "www.skatteverket.se", "www.fortnox.se", "www.bokio.se"]} />;
}

export function OverviewView() {
  return (
    <TrackingPage tab="overview">
      <div className="px-8 pt-[17px]">
        <FilterBar
          maxWidth={[900, 850]}
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
              <Select label="Top positions & changes" options={topPositions} className="w-[203px]" />
              <Select label="SERP Features" options={serpOptions} className="w-[138px]" />
              <Select label="Tags" options={["No tags"]} className="w-[72px]" />
              <Select label="Intent" options={intentOptions} className="w-[78px]" />
              <Select label="Volume" options={volumeOptions} className="w-[90px]" />
              <Select label="KD %" options={kdOptions} className="w-[79px]" />
              <Select label="Advanced filters" options={["Include keywords", "Exclude keywords", "URL"]} className="w-[149px]" />
            </>
          }
        />
        <OverviewChartCard />
        <RankingsTable />
      </div>
    </TrackingPage>
  );
}
