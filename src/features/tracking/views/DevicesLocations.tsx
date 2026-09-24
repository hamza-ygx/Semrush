import { PlusIcon } from "@/components/ui/icons";
import { TrackingPage } from "../TrackingPage";
import { LineChartCard, PositionsCard } from "../illustrations";

export function DevicesLocationsView() {
  return (
    <TrackingPage tab="devicesLocations">
      <div className="flex flex-col items-center px-8 pt-[26px] text-center">
        <h2 className="text-[24px] leading-8 font-medium text-rk-text">Try the Multitargeting feature in the Position Tracking tool</h2>
        <p className="mt-[14px] text-[16px] leading-6 text-rk-text">Track your domain rankings in multiple locations and languages, and on multiple devices.</p>
        <div className="mt-[36px] flex gap-[55px]">
          <div className="flex w-[240px] flex-col items-center">
            <LineChartCard width={170} height={120} />
            <p className="mt-[20px] text-[16px] leading-6 text-rk-text">Track the dynamics of the most essential metrics</p>
          </div>
          <div className="flex w-[200px] flex-col items-center">
            <PositionsCard width={170} height={120} />
            <p className="mt-[20px] text-[16px] leading-6 text-rk-text">Compare your positions</p>
          </div>
        </div>
        <button type="button" className="mt-[39px] flex h-10 items-center gap-2 rounded-md bg-rk-btn-dark px-4 text-[16px] font-medium text-white hover:bg-[#2b2e38]">
          <PlusIcon width={18} height={18} />
          Add new target
        </button>
      </div>
    </TrackingPage>
  );
}
