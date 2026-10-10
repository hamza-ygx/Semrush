import { ThematicPage, Panel } from "./Thematic";
import { BarChart, Dot, IssuesCard, Ring } from "./ui";
import { C, jsCssFiles, jsCssSize, loadSpeed, performanceIssues, type IssueGroup } from "./data";
import type { SiteAuditHead } from "../load";
import type { Seg } from "../live";
import type { PerfLive, Tone } from "../psiLive";

export type PerformanceLive = { loadSpeed: Seg[]; avgLoad: { value: string; pages: number }; pages: number; counts: Record<string, number> };

const toneClass: Record<Tone, string> = { bad: "text-rk-danger", mid: "text-[#c9820a]", good: "text-rk-success", na: "text-rk-muted" };

function LabMetrics({ psi }: { psi: PerfLive }) {
  const cols = psi.strategies;
  return (
    <Panel title="Load Speed Metrics">
      <div className="px-5 pt-[12px] pb-[14px]">
        <p className="text-[14px] leading-5 text-rk-muted">
          Lighthouse lab data, median of {psi.pages} {psi.pages === 1 ? "page" : "pages"}
        </p>
        <div className="mt-[10px] grid h-8 items-center border-b border-[#dbdbdb] text-[12px] text-rk-text-2" style={{ gridTemplateColumns: `1fr repeat(${cols.length}, 84px)` }}>
          <span>Metric</span>
          {cols.map((s) => (
            <span key={s} className="text-right capitalize">
              {s}
            </span>
          ))}
        </div>
        {psi.metrics.map((m, i) => (
          <div
            key={m.label}
            className={`grid h-[36px] items-center text-[14px] ${i < psi.metrics.length - 1 ? "border-b border-rk-border" : ""}`}
            style={{ gridTemplateColumns: `1fr repeat(${cols.length}, 84px)` }}
          >
            <span className="min-w-0 truncate">{m.label}</span>
            {cols.map((s) => (
              <span key={s} className={`text-right whitespace-nowrap ${toneClass[m.cells[s]?.tone ?? "na"]}`}>
                {m.cells[s]?.text ?? "n/a"}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function issueGroups(psi: PerfLive | null | undefined): { groups: IssueGroup[]; extra?: Record<string, { note: string; value: string }> } {
  if (!psi) return { groups: performanceIssues };
  const of = (severity: "Warnings" | "Notices") => psi.opportunities.filter((o) => o.severity === severity).map((o) => o.title);
  const groups: IssueGroup[] = [performanceIssues[0], { severity: "Warnings", items: of("Warnings") }, { severity: "Notices", items: of("Notices") }];
  return {
    groups: groups.filter((g) => g.items.length),
    extra: Object.fromEntries(psi.opportunities.map((o) => [o.title, { note: o.savings, value: `${o.pages} ${o.pages === 1 ? "page" : "pages"}` }])),
  };
}

export function Performance({ head, demo, live, psi }: { head?: SiteAuditHead; demo?: boolean; live?: PerformanceLive | null; psi?: PerfLive | null }) {
  const speed: Seg[] = live?.loadSpeed ?? loadSpeed;
  const { groups, extra } = issueGroups(psi);
  return (
    <ThematicPage title="Site Performance" score={psi?.score ?? 89} head={head} demo={demo}>
      <div className="grid grid-cols-[400px_1fr] items-start gap-4">
        <div className="flex flex-col gap-4">
          <Panel title="Page (HTML) Load Speed">
            <div className="flex h-[220px] items-center gap-6 px-5">
              <Ring segments={speed} size={180} thickness={28} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">{live ? live.avgLoad.pages : 97}</span>
                <span className="text-[12px] leading-4 text-rk-muted">pages</span>
              </Ring>
              <div className="w-[106px] space-y-2 text-[14px] leading-5">
                {speed.map((s) => (
                  <div key={s.label} className="flex items-center">
                    <Dot color={s.color} className="mr-2" />
                    <span className="flex-1">{s.label}</span>
                    <span className={s.value ? "" : "text-rk-muted"}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
          <div className="rounded-md bg-white shadow-card">
            <div className="border-b border-rk-border px-5 pt-[9px] pb-[8px]">
              <h3 className="text-[16px] leading-6 font-semibold">Avg. Page (HTML) Load Speed</h3>
              <p className="mt-[7px] text-[14px] leading-5 text-rk-muted">of {live?.pages ?? 100} pages</p>
            </div>
            <div className="flex h-[68px] items-center px-5">
              <span className="w-[148px] text-[24px] leading-7 font-semibold">{live?.avgLoad.value ?? "1.88 sec"}</span>
              <svg width={208} height={40} className="block">
                <line x1={0} x2={208} y1={33} y2={33} stroke={C.blue} strokeWidth={1.5} opacity={0.7} />
                <circle cx={104} cy={13} r={3} fill={C.blue} />
              </svg>
            </div>
          </div>
          {psi ? (
            <LabMetrics psi={psi} />
          ) : (
            <>
              <Panel title="JavaScript and CSS Files">
                <div className="px-5 pt-[16px] pb-[17px]">
                  <BarChart data={jsCssFiles} width={360} height={138} max={60} ticks={[0, 30, 60]} left={55} top={8} bottom={44} barGap={3} tickGap={15} titleGap={43} xTitle="Amount" />
                </div>
              </Panel>
              <Panel title="JavaScript and CSS File Size">
                <div className="px-5 pt-[16px] pb-[17px]">
                  <BarChart data={jsCssSize} width={360} height={138} max={50} ticks={[0, 25, 50]} left={55} top={8} bottom={44} barGap={3} tickGap={15} titleGap={43} xTitle="Size (MB)" />
                </div>
              </Panel>
            </>
          )}
        </div>
        <IssuesCard title="Performance Issues" groups={groups} counts={live?.counts} extra={extra} />
      </div>
    </ThematicPage>
  );
}
