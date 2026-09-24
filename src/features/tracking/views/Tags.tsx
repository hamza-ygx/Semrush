import { TrackingPage } from "../TrackingPage";
import { TagsOverview } from "../illustrations";

export function TagsView() {
  return (
    <TrackingPage tab="tags">
      <div className="flex gap-0 px-8 pt-[13px] pb-[183px] pl-[30px]">
        <TagsOverview />
        <div className="pt-[2px]">
          <h2 className="text-[20px] leading-7 font-medium text-rk-text">Add your first tag</h2>
          <p className="mt-[5px] text-[14px] leading-5 text-rk-text">Tags will help you track the performance of any keyword groups.</p>
          <div className="mt-[13px] flex items-center gap-6">
            <button type="button" className="h-10 rounded-md bg-[#009f81] px-[13px] text-[16px] font-medium text-white hover:bg-[#007c65]">
              Tag keywords
            </button>
            <button type="button" className="text-[16px] text-rk-link hover:text-rk-link-hover">
              How do tags work?
            </button>
          </div>
        </div>
      </div>
    </TrackingPage>
  );
}
