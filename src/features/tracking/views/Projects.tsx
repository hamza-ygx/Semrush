import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { SendFeedback } from "@/components/shell/PageHeader";
import { TrackingCrumbs } from "../TrackingHeader";
import { routes } from "@/config/routes";
import { DesktopIcon, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { Segmented } from "../controls";
import { CalendarIcon, SortAscIcon } from "../icons";
import { TrackingFooter } from "../TrackingFooter";
import { project } from "../data";

const numCols = [
  { label: "Visibility", w: 132.1, value: "0", link: true },
  { label: "Diff", w: 72.9, value: "0", link: true },
  { label: "Improved keywords", w: 117.1, value: "0", link: true, trunc: true },
  { label: "Declined keywords", w: 117.3, value: "0", link: true, trunc: true },
  { label: "All keywords", w: 82, value: String(project.keywords), trunc: true },
];

export function ProjectsView() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <div className="px-8 pt-4 pb-[17px]">
        <div className="flex items-center justify-between">
          <TrackingCrumbs />
          <SendFeedback />
        </div>
        <h1 className="mt-[7px] text-[20px] leading-7 font-semibold">Position Tracking</h1>
      </div>
      <div className="px-8 pt-[5px]">
        <section className="h-[259px] rounded-md border border-[#e4e5ea] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)]">
          <div className="flex h-[68.5px] items-start px-5 pt-[20px]">
            <label className="relative flex h-7 w-[299.4px] items-center rounded-md border border-rk-border-strong bg-white">
              <SearchIcon width={16} height={16} className="absolute left-[9px] text-[#8a8e9b]" />
              <input placeholder="Project name or domain" className="h-full w-full rounded-md pr-2 pl-[32px] text-[14px] outline-none placeholder:text-[#8a8e9b]" />
            </label>
            <Segmented items={["All targets", "AI Search", "SEO"] as const} value="All targets" className="ml-[24.3px]" />
            <button type="button" className="ml-[24px] flex h-7 items-center gap-[9.5px] rounded-md border border-rk-border-strong bg-white px-[9px] text-[14px] whitespace-nowrap text-[#6c6e79]">
              <CalendarIcon className="text-[#8a8e9b]" />
              {project.periodLong}
            </button>
            <button type="button" className="ml-auto flex h-7 items-center gap-[9px] rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              <PlusIcon width={14} height={14} strokeWidth={2.2} />
              Create SEO project
            </button>
          </div>
          <div className="flex h-[40px] border-y border-[#eceef2] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
            <div className="flex w-[206.6px] items-center gap-[6px] bg-[#e9ebeb] pl-5">
              Project <SortAscIcon width={14} height={14} className="text-rk-muted" />
            </div>
            <div className="flex w-[217px] items-center pl-[13px]">Device &amp; Location</div>
            {numCols.map((c) => (
              <div key={c.label} style={{ width: c.w }} className={`flex items-center justify-end pr-[8px] ${c.trunc ? "pl-[16px]" : ""}`}>
                <span className="truncate">{c.label}</span>
              </div>
            ))}
            <div className="flex flex-1 items-center pl-[17.5px]">Updated</div>
          </div>
          <div className="flex h-[86px] border-b border-[#eceef2] pt-[12.6px] text-[14px] leading-5 text-rk-text">
            <div className="w-[206.6px] pl-5">
              <Link href={routes.tracking.landscape} className="font-semibold text-rk-link hover:text-rk-link-hover">
                {project.domain}
              </Link>
              <div className="text-rk-text-2">{project.domain}</div>
            </div>
            <div className="flex w-[217px] gap-[5px] pl-[10.5px]">
              <DesktopIcon width={17} height={17} className="mt-[1px] text-rk-text" />
              <div>
                <Link href={routes.tracking.devicesLocations} className="text-rk-link hover:text-rk-link-hover">
                  {project.location}
                </Link>
                <div className="text-rk-text-2">Google, Swedish</div>
                <div className="text-rk-text-2">{project.domain}</div>
              </div>
            </div>
            {numCols.map((c) => (
              <div key={c.label} style={{ width: c.w }} className="pr-[8px] text-right">
                {c.link ? (
                  <Link href={routes.tracking.overview} className="text-rk-link hover:text-rk-link-hover">
                    {c.value}
                  </Link>
                ) : (
                  c.value
                )}
              </div>
            ))}
            <div className="flex-1 pl-[17.5px]">{project.updated}</div>
          </div>
          <div className="flex h-[63px] items-center gap-[4px] px-5 pb-[5px] text-[14px] text-rk-text">
            Page:
            <input defaultValue="" placeholder="1" className="h-7 w-[67px] rounded-md border border-rk-border-strong px-[9px] outline-none placeholder:text-[#a9abb6] focus:border-[#006dca]" />
            <span className="ml-[5px]">of 1</span>
          </div>
        </section>
      </div>
      <TrackingFooter />
    </AppShell>
  );
}
