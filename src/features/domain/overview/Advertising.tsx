import { NothingFound, Widget } from "../ui";

export function AdvertisingResearch() {
  return (
    <>
      <h2 className="mt-[22px] text-[20px] leading-7 font-semibold">Advertising Research</h2>
      <div className="mt-[15px] grid grid-cols-2 gap-4">
        <Widget title="Top Paid Keywords" className="h-[353px]" bodyClassName="flex items-center justify-center">
          <NothingFound />
        </Widget>
        <Widget title="Paid Position Distribution" className="h-[353px]" bodyClassName="flex items-center justify-center">
          <NothingFound />
        </Widget>
        <Widget title="Main Paid Competitors" className="h-[353px]" bodyClassName="flex items-center justify-center pt-[91px]">
          <NothingFound kind="table" />
        </Widget>
        <Widget title="Competitive Positioning Map" className="h-[353px]" bodyClassName="flex items-center justify-center pt-[91px]">
          <NothingFound kind="chart" />
        </Widget>
      </div>
      <Widget title="Sample Text Ads" className="mt-4 h-[260px]" bodyClassName="flex items-center justify-center pt-[6px]">
        <NothingFound kind="search" />
      </Widget>
    </>
  );
}
