import Link from "next/link";
import { routes } from "@/config/routes";
import { project, type Metric } from "@/data/home";
import { KebabIcon, PlusIcon, RkjhFavicon, ShareUserIcon } from "./icons";

const metricHref: Record<string, string> = {
  "AI Visibility": routes.ai.overview,
  Mentions: routes.ai.overview,
  "Site Health": routes.siteAuditCampaign.overview,
  Visibility: routes.tracking.landscape,
  "Organic Traffic": routes.domainOverview,
  "Organic Keywords": routes.organic.positions,
  Backlinks: routes.backlinks,
};

const trendColor = {
  up: "text-[#007c65]",
  down: "text-[#d1002f]",
  neutral: "text-[#6c6e79]",
};

function Gauge() {
  return (
    <svg viewBox="0 0 34 20" width={34} height={20} className="ml-[10px]">
      <path d="M4 17a13 13 0 0 1 26 0" fill="none" stroke="#e0e1e9" strokeWidth={4} strokeLinecap="round" />
      <circle cx="4" cy="17" r="2.6" fill="#fdc23c" />
    </svg>
  );
}

function MetricCell({ label, value, sub, trend, gauge }: Metric) {
  return (
    <div className="px-3 pt-3 pb-[13px]">
      <div className="text-[14px] leading-5 text-[#191b23]">{label}</div>
      <div className="mt-2 mb-[2px] flex h-7 items-center">
        <Link href={metricHref[label] ?? routes.seoDashboard} className="text-[20px] leading-7 font-bold text-[#1f58d6] hover:text-[#123d9e]">
          {value}
        </Link>
        {gauge && <Gauge />}
      </div>
      {sub && (
        <div className={`text-[14px] leading-5 tracking-[0.02em] ${trendColor[trend ?? "neutral"]}`}>{sub}</div>
      )}
    </div>
  );
}

export function FoldersPanel() {
  return (
    <section className="mt-6 overflow-hidden rounded-lg bg-white shadow-card">
      <div className="flex h-[56px] items-center justify-between border-b border-[#e0e1e9] px-5">
        <h2 className="text-[16px] font-bold">Folders</h2>
        <div className="flex gap-2">
          <button className="flex h-7 items-center gap-2 rounded-md border border-[#c4c7cf] bg-white px-2 text-[14px] text-[#484a54] hover:bg-[#f4f5f9]">
            <ShareUserIcon />
            Share
          </button>
          <button className="flex h-7 items-center gap-2 rounded-md border border-[#c4c7cf] bg-white px-2 pr-[10px] text-[14px] text-[#484a54] hover:bg-[#f4f5f9]">
            <PlusIcon />
            Create Folder
          </button>
        </div>
      </div>

      <div className="bg-[#f9f9fb] p-5">
        <div className="rounded-lg bg-white shadow-card">
          <div className="flex h-11 items-center border-b border-[#e0e1e9] px-5">
            <RkjhFavicon />
            <Link href={routes.seoDashboard} className="ml-2 text-[16px] font-bold text-[#1f58d6] hover:text-[#123d9e]">
              {project.name}
            </Link>
            <span className="ml-3 text-[14px] text-[#484a54]">{project.domain}</span>
            <button aria-label="Project actions" className="ml-auto mr-1 flex h-6 w-6 items-center justify-center rounded text-[#484a54] hover:bg-[#f4f5f9]">
              <KebabIcon />
            </button>
          </div>
          <div className="grid grid-cols-7">
            {project.metrics.map((m) => (
              <MetricCell key={m.label} {...m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
