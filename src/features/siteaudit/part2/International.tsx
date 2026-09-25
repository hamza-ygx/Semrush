import { ThematicPage, Panel } from "./Thematic";
import { Dot, IssuesCard, Ring } from "./ui";
import { hreflangIssues, hreflangUsage } from "./data";

const Confetti = () => (
  <svg viewBox="0 0 84 84" width={84} height={84}>
    <path d="M42 6c8 3 15 0 22 6s4 14 10 20-2 14-4 22-10 10-16 16-14 2-22 4-14-4-18-10-4-14-8-20 2-14 6-20 6-12 14-14 12-6 16-4z" fill="#e0e2e1" />
    <path d="M14 76 30 30l26 26z" fill="#fff" stroke="#6a6c6a" strokeWidth={2.2} strokeLinejoin="round" />
    <path d="M18 64l7 5M22 52l14 12M26 41l18 16" stroke="#6a6c6a" strokeWidth={4} strokeLinecap="round" />
    <path d="M40 34c-2-8 2-16 6-18 3-2 6 2 3 5s-6 1-4-6M52 38c4-8 12-10 16-6M58 44c6-2 12 0 14 6" fill="none" stroke="#6a6c6a" strokeWidth={2} strokeLinecap="round" />
    <path d="M60 12l3-6M70 20l6-3M50 8l1-5" stroke="#6a6c6a" strokeWidth={1.6} strokeLinecap="round" />
    <circle cx="66" cy="30" r="2" fill="#6a6c6a" />
    <circle cx="44" cy="12" r="1.6" fill="#6a6c6a" />
  </svg>
);

export function International() {
  return (
    <ThematicPage title="International SEO" score={90}>
      <div className="grid grid-cols-[248px_1fr] gap-4">
        <Panel title="Hreflang Implementation">
          <div className="flex justify-center pt-5">
            <Ring segments={hreflangUsage} size={180} thickness={30} sep={false}>
              <span className="text-[24px] leading-7 font-semibold">100</span>
              <span className="text-[12px] leading-4 text-rk-muted">pages</span>
            </Ring>
          </div>
          <div className="mt-[23px] space-y-2 px-5 pb-[19px] text-[14px] leading-5">
            {[
              ["With issues", "3%", hreflangUsage[0].color],
              ["Without issues", "0%", hreflangUsage[1].color],
              ["Without hreflang", "97%", hreflangUsage[2].color],
            ].map(([l, v, c]) => (
              <div key={l} className="flex items-center">
                <Dot color={c} className="mr-2" />
                <span className="flex-1">{l}</span>
                <span className={v === "0%" ? "text-rk-muted" : ""}>{v}</span>
              </div>
            ))}
          </div>
        </Panel>
        <IssuesCard title="Hreflang Issues" groups={hreflangIssues} />
      </div>
      <Panel title="Pages with missing hreflang attributes" className="mt-4 [&>div:first-child]:border-b-0">
        <div className="flex flex-col items-center pt-[36px] pb-[58px]">
          <Confetti />
          <p className="mt-[12px] text-[16px] leading-6 font-semibold text-rk-text-2">Great job!</p>
          <p className="mt-[2px] text-[14px] leading-5 text-rk-muted">Hreflang attributes are present on all pages of your site.</p>
        </div>
      </Panel>
    </ThematicPage>
  );
}
