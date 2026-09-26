import { AppShell } from "@/components/shell/AppShell";
import { SendFeedback } from "@/components/shell/PageHeader";
import { TrackingCrumbs } from "../TrackingHeader";
import { TrackingFooter } from "../TrackingFooter";
import { ProjectsCard, type Target } from "../ProjectsCard";

export function ProjectsView({ target, begin, end, hours }: { target: Target; begin?: string; end?: string; hours?: number }) {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <div className="xl:min-h-[calc(100vh-362px)]">
        <div className="px-8 pt-4 pb-[17px]">
          <div className="flex items-center justify-between">
            <TrackingCrumbs />
            <SendFeedback />
          </div>
          <h1 className="mt-[7px] text-[20px] leading-7 font-semibold">Position Tracking</h1>
        </div>
        <div className="px-8 pt-[5px]">
          <ProjectsCard key={target} target={target} begin={begin} end={end} hours={hours} />
        </div>
      </div>
      <TrackingFooter />
    </AppShell>
  );
}
