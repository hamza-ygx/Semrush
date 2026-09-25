import type { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";
import { ArrowUp, CloseIcon, PlusIcon } from "@/components/ui/icons";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { Checkbox, DomainChip, Segmented } from "../controls";
import { CopyIcon, ExternalLinkIcon, SparkleIcon } from "../icons";
import { EmptyTable, WorldMapCard } from "../illustrations";
import { DarkButton, GrayButton, Info, Panel } from "../ui";
import { days, project, serpFeatureBars, trackedKeywords } from "../data";
import { SerpFeatureIcon } from "../serpIcons";
import { CompetitorGrowth, SummaryPeriod } from "../period";

function PotentialSpark() {
  return (
    <svg width={130} height={37} viewBox="0 0 130 37" className="block overflow-visible">
      <defs>
        <linearGradient id="pt-pot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7b8ff" />
          <stop offset="1" stopColor="#efeaff" />
        </linearGradient>
      </defs>
      <path d="M78 36 L130 1 L130 36 Z" fill="url(#pt-pot)" opacity={0.85} />
      <path d="M0 36 H78" stroke="#5c5fd6" strokeWidth={2} />
      <path d="M78 36 L130 1" stroke="#7d6be0" strokeWidth={1.6} strokeDasharray="2.5 2.5" />
    </svg>
  );
}

function MetricBlock({ label, value, sub, delta, grey, first, sparkLeft }: { label: string; value: string; sub: string; delta: ReactNode; grey?: boolean; first?: boolean; sparkLeft: number }) {
  const o = first ? -6 : 0;
  return (
    <div className={`relative ${first ? "h-[107px]" : "h-[113px] border-t-2 border-[#e7e8e8]"}`}>
      <div style={{ top: 23 + o }} className="absolute left-0 flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
        {label}
        <Info />
      </div>
      <div style={{ top: 55 + o }} className="absolute left-0 flex items-baseline gap-[6px]">
        <span className={`text-[24px] leading-8 font-semibold ${grey ? "text-[#a9abaa]" : "text-rk-number"}`}>{value}</span>
        <span className="text-[12px] text-rk-muted">{sub}</span>
      </div>
      <div style={{ top: 21 + o }} className="absolute -right-[1px] flex items-center gap-[4px]">
        <span className="flex items-center text-[12px] text-[#8a3fcf]">{delta}</span>
        <button type="button" className="h-[21px] rounded-full bg-[#f3d4ff] px-[8px] text-[13px] leading-[21px] text-[#8a3fcf] hover:bg-[#ebc0fb]">
          See potential
        </button>
      </div>
      <span style={{ top: 51 + o }} className="absolute right-[2px] h-[5px] w-[5px] rounded-full bg-[#b57bf2]" />
      <div className="absolute" style={{ left: sparkLeft, top: 50 + o }}>
        <PotentialSpark />
      </div>
    </div>
  );
}

function SummaryCard() {
  return (
    <Panel
      title="Summary"
      info={false}
      headerClassName="h-[45px]"
      right={
        <GrayButton>
          <CopyIcon />
          Copy all
        </GrayButton>
      }
    >
      <div className="pt-[24px] pr-5 pl-6 text-[14px] leading-5 text-rk-text">
        <p>
          Traffic performance of <b className="font-semibold">{project.domain}</b>{" "}
          <ExternalLinkIcon className="-mt-[3px] inline text-[#a9abaa]" /> for the Sweden (Google) • Swedish (Desktop) target was stable between <SummaryPeriod />.
        </p>
        <ul className="mt-[12px] flex flex-col gap-[8px]">
          <li className="relative pl-[23px]">
            <SparkleIcon className="absolute top-[1px] -left-[2px]" width={17} height={17} />
            The keywords you are tracking have high growth potential. Creating quality content focused on them can bring you more visits and increase traffic.{" "}
            <Link href={routes.tracking.overview} className="text-rk-link hover:text-rk-link-hover">
              View report
            </Link>
          </li>
          <li className="relative pl-[23px]">
            <span className="absolute top-[8px] left-[3px] h-[5px] w-[5px] rounded-full bg-rk-muted" />
            You have a potential competitor verksamt.se. Their Visibility has grown by <CompetitorGrowth />.{" "}
            <Link href={routes.tracking.competitorsDiscovery} className="text-rk-link hover:text-rk-link-hover">
              View report
            </Link>
          </li>
        </ul>
      </div>
    </Panel>
  );
}

const rdLegend = [
  { label: "# 1-3", color: "#ffb400" },
  { label: "# 4-10", color: "#5c5fd6" },
  { label: "# 11-20", color: "#8e92ec" },
  { label: "# 21-100", color: "#c9d3ff" },
];

function RankingsDistributionCard() {
  const y = (v: number) => 111.5 + (4 - v) * 83;
  return (
    <Panel title="Rankings Distribution" className="h-[490px]">
      <div className="relative">
        <div className="flex items-center gap-[15px] px-5 pt-[20px] text-[14px] leading-5">
          {rdLegend.map((l) => (
            <Checkbox key={l.label} checked color={l.color} label={l.label} size={16} className="!gap-[4px]" />
          ))}
          <Checkbox label="Out of top 100" size={16} className="!gap-[4px]" />
        </div>
        <svg width="100%" height={430} className="absolute top-0 left-0 overflow-visible" style={{ top: 0 }}>
          {[4, 3, 2, 1, 0].map((v) => (
            <g key={v}>
              <line x1={87} x2={662} y1={y(v) - 40} y2={y(v) - 40} stroke="#e7e8e8" />
              <text x={74} y={y(v) - 36} textAnchor="end" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          <text transform={`translate(33 ${y(2) - 40}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Keywords
          </text>
          {days.map((d, i) => (
            <text key={d} x={122 + i * 72.5} y={426} textAnchor="middle" fontSize={12} fill="#6a6c6a">
              {d}
            </text>
          ))}
        </svg>
      </div>
    </Panel>
  );
}

function KeywordsBlock({ label, first }: { label: string; first?: boolean }) {
  return (
    <div className={`relative h-[84.6px] ${first ? "" : "border-t border-[#e0e2e1]"}`}>
      <div className="absolute top-[15px] left-0 text-[14px] leading-5 text-rk-text">{label}</div>
      <div className="absolute top-[35px] left-[1px] flex items-center gap-[9px]">
        <span className="h-[23px] w-[23px] rounded-full border-[3px] border-[#eeeff2]" />
        <span className="text-[24px] leading-8 font-semibold text-rk-number">0</span>
      </div>
      <div className="absolute top-[34px] left-[92px] text-[12px] leading-[17px] text-rk-text">
        New
        <div className="text-rk-muted">0</div>
      </div>
      <div className="absolute top-[34px] left-[130px] text-[12px] leading-[17px] text-rk-text">
        Lost
        <div className="text-rk-muted">0</div>
      </div>
      <div className="absolute top-[46px] right-[5px] left-[164px]">
        <div className="h-[12px] border-t border-[#5c5fd6] bg-[#e1e0f9]" />
        <span className="absolute -top-[4px] -right-[3px] h-[7px] w-[7px] rounded-full bg-[#a9abaa]" />
      </div>
    </div>
  );
}

function KeywordsCard() {
  return (
    <Panel title="Keywords" className="h-[490px]">
      <div className="px-5 pt-[3px]">
        <KeywordsBlock label="Top 3" first />
        <KeywordsBlock label="Top 10" />
        <KeywordsBlock label="Top 20" />
        <KeywordsBlock label="Top 100" />
        <div className="relative h-[84px] border-t border-[#e0e2e1]">
          <div className="absolute top-[15px] left-0 text-[14px] leading-5 text-rk-text">Improved vs. declined</div>
          <div className="absolute top-[36px] -left-[1px] flex items-center gap-[13px] text-[24px] leading-8 font-semibold text-[#a9abaa]">
            0
            <svg width={50} height={25} viewBox="0 0 50 25">
              <path d="M5 25a20 20 0 0 1 40 0" fill="none" stroke="#01a87c" strokeWidth={10} />
            </svg>
            0
          </div>
        </div>
      </div>
    </Panel>
  );
}

function BrandPresence() {
  return (
    <section className="h-[136px] overflow-hidden rounded-md border border-[#c9d6f8] bg-white">
      <div className="flex h-[44px] items-center gap-[12px] bg-[#ebf1ff] pr-[17px] pl-[23px]">
        <svg viewBox="0 0 20 20" width={18} height={18}>
          <circle cx="10" cy="10" r="9" fill="#f6ecff" />
          <path d="M6 13.5 10 5l4 8.5M7.5 10.5h5" fill="none" stroke="#8a3fcf" strokeWidth={1.6} strokeLinejoin="round" />
        </svg>
        <span className="text-[16px] leading-6 font-semibold text-rk-text">Brand Presence in AI Platforms</span>
        <span className="ml-[3px] flex items-center gap-[6px] border-l border-[#d6d8d7] pl-[9px] text-[14px] text-rk-muted">
          Domain: <span className="blur-[3px] select-none">rkjh.se</span>
        </span>
        <button type="button" aria-label="Close" className="ml-auto flex h-6 w-6 items-center justify-center rounded text-rk-text-2 hover:bg-[#d6e2ff]">
          <CloseIcon width={14} height={14} />
        </button>
      </div>
      <div className="flex px-[17px] pt-[20px]">
        <div className="w-[191px] border-r border-[#e0e2e1] pr-4">
          <div className="text-[14px] leading-5 text-rk-text">Market Share in ChatGPT</div>
          <DarkButton className="mt-[5px] h-[27px] !px-[8px]">
            Scan LLMs <ExternalLinkIcon width={15} height={15} />
          </DarkButton>
        </div>
        <div className="w-[201px] border-r border-[#e0e2e1] pl-[25px]">
          <div className="text-[14px] leading-5 text-rk-text">Areas for Improvement</div>
          <div className="mt-[5px] pl-[3px] text-[20px] leading-7 font-semibold text-rk-text">5</div>
        </div>
        <div className="pl-[24px]">
          <div className="text-[14px] leading-5 text-rk-text">Top Query Intent</div>
          <div className="mt-[5px] flex gap-[4px]">
            {["Research", "Comparison", "Purchase", "..."].map((p) => (
              <span key={p} className="flex h-[27px] items-center rounded-full bg-[#e6e7eb] px-[9px] text-[14px] text-rk-text-2">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TopKeywords() {
  return (
    <Panel title="Top Keywords" className="h-[427px]">
      <div className="px-5 pt-[30px]">
        <div className="flex border-b border-[#e0e2e1] pb-[6px] text-[12px] leading-4 text-rk-text">
                    <span className="w-[166px]">Keyword</span>
          <span className="flex-1">Pos.</span>
          <span className="w-[56px] text-right">Visibility</span>
        </div>
        {trackedKeywords.slice(0, 5).map((k) => (
          <div key={k.keyword} className="flex border-b border-[#e0e2e1] py-[8px] text-[14px] leading-5">
            <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(k.keyword)}&db=se`} className="w-[150px] pr-2 text-rk-link hover:text-rk-link-hover">
              {k.keyword}
            </Link>
            <span className="w-[16px]" />
            <span className="self-center pt-[2px] text-rk-text">- &nbsp;-</span>
            <span className="flex-1" />
            <span className="w-[56px] text-right text-rk-text">0%</span>
          </div>
        ))}
        <Link href={routes.tracking.overview} className="mt-[22px] inline-flex h-7 items-center rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
          View all {project.keywords} keywords
        </Link>
      </div>
    </Panel>
  );
}

function NoDataCard({ title }: { title: string }) {
  return (
    <Panel title={title} className="h-[427px]">
      <div className="pt-[109px] text-center text-[14px] leading-5 text-rk-text-2">We have no data to show.</div>
    </Panel>
  );
}

function TagsCard() {
  return (
    <Panel title="Tags" className="h-[350px]">
      <div className="flex flex-col items-center pt-[37px] text-center">
        <EmptyTable size={80} />
        <div className="mt-[15px] text-[16px] leading-6 font-semibold text-rk-text-2">Add your first tag</div>
        <p className="mt-[2px] w-[300px] text-[14px] leading-[21px] text-rk-text-2">Tags will help you track the performance of any keyword groups.</p>
        <Link href={routes.tracking.tags} className="mt-[15px] flex h-7 items-center rounded-md bg-[#009f81] px-[9px] text-[14px] font-medium text-white hover:bg-[#007c65]">
          Tag keywords
        </Link>
      </div>
    </Panel>
  );
}

function MarketTraffic() {
  const xs = [180, 200, 220, 240, 260];
  const px = (v: number) => 179 + ((v - 180) / 20) * 77.75 - 32;
  const py = (v: number) => 2204 + ((v - 20) / 20) * 65.5 - 2089;
  return (
    <Panel title="Market Traffic vs Selected Domains Trends" className="h-[364px]">
      <div className="relative h-[323px]">
        <svg width={560} height={323} className="absolute top-0 left-0 overflow-visible">
          <line x1={80} x2={486} y1={259} y2={259} stroke="#d6d8d7" />
          {xs.map((v) => (
            <g key={v}>
              <line x1={px(v)} x2={px(v)} y1={37} y2={259} stroke="#e7e8e8" />
              <text x={px(v)} y={281} textAnchor="middle" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          {[20, 40, 60].map((v) => (
            <g key={v}>
              <line x1={80} x2={486} y1={py(v) - 40} y2={py(v) - 40} stroke="#e7e8e8" />
              <text x={63} y={py(v) - 36} textAnchor="end" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          <text transform={`translate(33 ${py(40) - 40}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Average Position
          </text>
          <text x={283} y={297} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Number of Keywords
          </text>
          <circle cx={px(180)} cy={py(60) - 40} r={49} fill="#5fe8c1" opacity={0.65} />
          <circle cx={px(250)} cy={py(25.7) - 40} r={49} fill="#8e92ec" opacity={0.7} />
        </svg>
        <div className="absolute top-[21px] left-[551px]">
          <div className="text-[16px] leading-6 font-semibold text-rk-text">We’ve found all your competitors on SERP</div>
          <p className="mt-[3px] w-[380px] text-[14px] leading-[21px] text-rk-text-2">Add domains to competitors list and track their positions with ease!</p>
          <div className="mt-[17px] flex gap-2">
            <DarkButton>Add competitors</DarkButton>
            <Link href={routes.tracking.competitorsDiscovery} className="flex h-7 items-center rounded-md border border-rk-border-strong bg-[#f0f1f1] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
              Find more competitors
            </Link>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function SerpFeaturesCard() {
  const y = (v: number) => 28 + (100 - v) * 1.864;
  const x = (i: number) => 145 - 32 + i * 38.6;
  return (
    <Panel title="SERP Features" className="h-[340px]">
      <div className="relative h-[300px]">
        <svg width="100%" height={300} className="absolute top-0 left-0 overflow-visible">
          {[100, 75, 50, 25, 0].map((v) => (
            <g key={v}>
              <line x1={85} x2={1022} y1={y(v)} y2={y(v)} stroke={v ? "#edefef" : "#d6d8d7"} />
              <text x={74} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          <text transform={`translate(29 ${y(50)}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Keywords
          </text>
          {serpFeatureBars.map((b, i) => (
            <g key={i}>
              {b.tracking > 0 && <rect x={x(i) - 8.5} y={y(b.tracking)} width={17} height={y(0) - y(b.tracking)} fill="#cddcfd" />}
              {b.notTracking > 0 && <rect x={x(i) - 8.5} y={y(b.notTracking)} width={17} height={y(0) - y(b.notTracking)} fill="#00c78f" />}
            </g>
          ))}
        </svg>
        {serpFeatureBars.map((_, i) => (
          <SerpFeatureIcon key={i} index={i} className="absolute top-[225px] text-[#8b8d8c]" style={{ left: x(i) - 8 }} />
        ))}
        <div className="absolute top-[257px] left-5 flex items-center gap-[15px] text-[14px] leading-5 text-rk-text">
          <Checkbox checked color="#5c5fd6" label={`${project.domain} ranks`} className="!gap-[4px]" />
          <Checkbox checked color="#cddcfd" label="Tracking domain presence" className="!gap-[4px]" />
          <Checkbox checked color="#00c78f" label="Not tracking domain presence" className="!gap-[4px]" />
        </div>
      </div>
    </Panel>
  );
}

function PagesCard() {
  return (
    <Panel title="Pages" className="h-[396px]">
      <div className="px-5 pt-[21px]">
        <Segmented items={["Top", "Improved", "Declined"] as const} value="Top" className="[&>button]:h-[27px] [&>button]:px-[8px] [&>button]:text-[14px]" />
        <div className="pt-[159px] text-center">
          <div className="text-[16px] leading-6 font-semibold text-rk-text-2">We have no data to show</div>
          <p className="mx-auto mt-[2px] w-[360px] text-[14px] leading-[20px] text-rk-text-2">Try selecting a different date or changing your filter settings.</p>
        </div>
      </div>
    </Panel>
  );
}

function VisibilityByLocations() {
  return (
    <Panel title="Visibility by Locations" className="h-[350px]">
      <div className="flex flex-col items-center pt-[37px] pr-[20px] text-center">
        <WorldMapCard size={80} />
        <div className="mt-[17px] text-[16px] leading-6 font-semibold text-rk-text-2">Multitargeting</div>
        <p className="mt-[2px] w-[360px] text-[14px] leading-[21px] text-rk-text-2">Track your domain rankings in multiple locations and languages, and on multiple devices.</p>
        <Link href={routes.tracking.devicesLocations} className="mt-[10px] flex h-[27px] items-center gap-[8px] rounded-md border border-rk-border-strong bg-[#f0f1f1] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
          <PlusIcon width={14} height={14} />
          Add new target
        </Link>
      </div>
    </Panel>
  );
}

export function CannibalizationHealthCard({
  header,
  x0 = 243,
  x1 = 1002,
  dataEnd = 1,
  buttons,
  className = "h-[331px]",
}: {
  header?: ReactNode;
  x0?: number;
  x1?: number;
  dataEnd?: number;
  buttons?: boolean;
  className?: string;
}) {
  const W = x1 - x0;
  const E = W * dataEnd;
  return (
    <Panel title="Cannibalization Health" headerClassName="h-[45px]" right={header} className={className}>
      <div className="relative h-[280px] px-5">
        <div className="flex pt-[20px]">
          <div className="border-r border-[#e0e2e1] pr-[23px]">
            <div className="text-[14px] leading-5 text-rk-text">Affected keywords</div>
            <div className="mt-[4px] flex items-baseline gap-[6px]">
              <span className="text-[24px] leading-8 font-semibold text-rk-text">0</span>
              <span className="text-[12px] text-rk-muted">/ 0</span>
            </div>
          </div>
          <div className="pl-[24px]">
            <div className="text-[14px] leading-5 text-rk-text">Cannibal pages</div>
            <div className="mt-[4px] flex items-baseline gap-[6px]">
              <span className="text-[24px] leading-8 font-semibold text-rk-text">0</span>
              <span className="text-[12px] text-rk-muted">/ 0</span>
            </div>
          </div>
        </div>
        <div className="absolute top-[117px] left-[31px]">
          <svg width={158} height={79} viewBox="0 0 158 79">
            <path d="M14 79a65 65 0 0 1 130 0" fill="none" stroke="#59e0af" strokeWidth={28} />
          </svg>
          <div className="absolute top-[42px] left-0 w-[158px] text-center">
            <span className="text-[20px] leading-6 font-semibold text-rk-text">100%</span> <span className="text-[12px] text-rk-muted">0%</span>
            <div className="-mt-[3px] text-[12px] leading-4 text-rk-text-2">high rate</div>
          </div>
        </div>
        <svg width={W + 40} height={100} className="absolute top-[140px] overflow-visible" style={{ left: x0 + 20 }}>
          <path d={`M0 9.5H${E}V52H0Z`} fill="#e1e0f9" />
          {dataEnd < 1 && <line x1={0} x2={W} y1={52} y2={52} stroke="#e0e2e1" />}
          <line x1={0} x2={E} y1={9.5} y2={9.5} stroke="#5c5fd6" strokeWidth={2} />
          <circle cx={0} cy={9.5} r={3} fill="#5c5fd6" />
          <circle cx={E} cy={9.5} r={3} fill="#5c5fd6" />
          <text x={-17} y={13.5} textAnchor="end" fontSize={12} fill="#6a6c6a">
            100
          </text>
          {days.map((d, i) => (
            <text key={d} x={(i * W) / 7} y={75} textAnchor="middle" fontSize={12} fill="#6a6c6a">
              {d}
            </text>
          ))}
        </svg>
        {buttons !== false && (
          <Link href={routes.tracking.cannibalization} className="absolute top-[236px] left-5 flex h-[29px] items-center rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
            View Cannibalization report
          </Link>
        )}
      </div>
    </Panel>
  );
}

export function LandscapeView({ begin, fresh }: { begin?: string; fresh?: boolean }) {
  return (
    <TrackingPage tab="landscape" begin={begin} fresh={fresh}>
      <div className="px-8 pt-[17px]">
        <FilterBar top={<DomainChip />} />
        <div className="mt-[15px] grid grid-cols-[425fr_621fr] gap-4">
          <section className="h-[331px] rounded-md border border-[#e5e6e6] bg-white px-5 shadow-[0_1px_2px_rgba(25,27,35,0.05)]">
            <MetricBlock first label="Visibility" value="0%" sub="0.00" delta="+0.57%" sparkLeft={145} />
            <MetricBlock label="Estimated Traffic" value="0" sub="0.00" grey delta="+1.38" sparkLeft={152} />
            <MetricBlock
              label="Average Position"
              value="100.00"
              sub="0"
              sparkLeft={152}
              delta={
                <>
                  <ArrowUp width={12} height={12} /> 19.72
                </>
              }
            />
          </section>
          <SummaryCard />
        </div>
        <div className="mt-4 grid grid-cols-[703fr_344fr] gap-4">
          <RankingsDistributionCard />
          <KeywordsCard />
        </div>
        <div className="mt-4">
          <BrandPresence />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <TopKeywords />
          <NoDataCard title="Positive Impact" />
          <NoDataCard title="Negative Impact" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <TagsCard />
          <MarketTraffic />
          <SerpFeaturesCard />
          <PagesCard />
          <VisibilityByLocations />
          <CannibalizationHealthCard x0={242.5} x1={1001.7} />
        </div>
      </div>
    </TrackingPage>
  );
}
