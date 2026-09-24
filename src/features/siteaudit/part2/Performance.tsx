import { ThematicPage, Panel } from "./Thematic";
import { BarChart, Dot, IssuesCard, Ring } from "./ui";
import { C, jsCssFiles, jsCssSize, loadSpeed, performanceIssues } from "./data";

export function Performance() {
  return (
    <ThematicPage title="Site Performance" score={89}>
      <div className="grid grid-cols-[400px_1fr] items-start gap-4">
        <div className="flex flex-col gap-4">
          <Panel title="Page (HTML) Load Speed">
            <div className="flex h-[220px] items-center gap-6 px-5">
              <Ring segments={loadSpeed} size={180} thickness={28} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">97</span>
                <span className="text-[12px] leading-4 text-rk-muted">pages</span>
              </Ring>
              <div className="w-[106px] space-y-2 text-[14px] leading-5">
                {loadSpeed.map((s) => (
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
              <p className="mt-[7px] text-[14px] leading-5 text-rk-muted">of 100 pages</p>
            </div>
            <div className="flex h-[68px] items-center px-5">
              <span className="w-[148px] text-[24px] leading-7 font-semibold">1.88 sec</span>
              <svg width={208} height={40} className="block">
                <line x1={0} x2={208} y1={33} y2={33} stroke={C.blue} strokeWidth={1.5} opacity={0.7} />
                <circle cx={104} cy={13} r={3} fill={C.blue} />
              </svg>
            </div>
          </div>
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
        </div>
        <IssuesCard title="Performance Issues" groups={performanceIssues} />
      </div>
    </ThematicPage>
  );
}
