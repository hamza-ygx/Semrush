import { MentionsChartArt, PortraitArt } from "./art";
import { mmFeatures } from "./data";

function Gauge() {
  return (
    <div className="flex h-[122px] w-[167px] flex-col items-center rounded-lg bg-white pt-[26px] shadow-[0_4px_20px_rgba(25,27,35,0.12)]">
      <svg viewBox="0 0 124 64" width={124} height={64}>
        <path d="M8 62 A54 54 0 0 1 97 21" fill="none" stroke="#45d6a0" strokeWidth={14} />
        <path d="M97 21 A54 54 0 0 1 116 62" fill="none" stroke="#ff642d" strokeWidth={14} />
      </svg>
      <div className="-mt-[34px] text-[16px] leading-5 font-bold text-[#1b1e1a]">100K</div>
      <div className="text-[9px] text-[#484a49]">Mentions</div>
    </div>
  );
}

function ListArt({ i }: { i: number }) {
  return (
    <div className="relative mt-[37px] h-[300px] w-[395px] rounded-lg bg-[#f3f5f8] p-5">
      {[0, 1, 2].map((r) => (
        <div key={r} className="mb-3 flex items-center gap-3 rounded-lg bg-white p-3 shadow-[0_1px_4px_rgba(25,27,35,0.08)]">
          <span className="h-9 w-9 rounded-full" style={{ background: ["#c9e3fb", "#d8f8e8", "#fde6ec"][(r + i) % 3] }} />
          <div className="flex-1 space-y-2">
            <div className="h-[7px] w-[70%] rounded-full bg-[#e1e3ea]" />
            <div className="h-[7px] w-[45%] rounded-full bg-[#edefef]" />
          </div>
          <span className={`rounded-full px-2 text-[11px] leading-5 ${r === 1 ? "bg-[#ffe1e1] text-[#d1002f]" : "bg-[#d4f5ea] text-[#007c65]"}`}>{r === 1 ? "Negative" : "Positive"}</span>
        </div>
      ))}
    </div>
  );
}

export function MonitoringLanding() {
  return (
    <div className="min-h-full bg-[#f3f5f8] px-8 pt-[33px] pb-[60px]">
      <section className="relative h-[461px] rounded-lg bg-white">
        <div className="absolute top-[51px] left-[48px] w-[400px]">
          <div className="text-[16px] leading-6 font-semibold text-[#b369f6]">Media Monitoring</div>
          <h1 className="mt-[8px] text-[44px] leading-[44px] font-semibold tracking-[-0.01em] text-[#2a2a2e]">
            Track brand
            <br />
            and industry
            <br />
            conversations
          </h1>
          <p className="mt-[20px] max-w-[375px] text-[16px] leading-6 text-[#1b1e1a]">Catch social media buzz, filter the noise, and act on what matters.</p>
          <button type="button" className="mt-[32px] h-[41px] rounded-md bg-[#009f81] px-[25px] text-[16px] font-medium text-white hover:bg-[#007c65]">
            Get free trial
          </button>
          <p className="mt-[15px] text-[12px] leading-4 text-[#7c7e86]">
            Media Monitoring is a part of the Social Toolkit.
            <br />
            Start your trial to access the full suite.
          </p>
        </div>
        <div className="absolute top-[52px] left-[633px]">
          <PortraitArt />
        </div>
        <div className="absolute top-[60px] left-[517px]">
          <MentionsChartArt />
        </div>
        <div className="absolute top-[306px] left-[826px]">
          <Gauge />
        </div>
      </section>
      <section className="mt-4 rounded-lg bg-white px-[52px] pt-[45px] pb-[60px]">
        <h2 className="text-center text-[24px] leading-8 font-medium text-[#1b1e1a]">Turn insights into opportunities</h2>
        <div className="mt-[94px] space-y-20">
          {mmFeatures.map((f, i) => (
            <div key={f.title} className={`flex items-start justify-between ${i % 2 ? "flex-row-reverse" : ""}`}>
              <div className="w-[440px]">
                <h3 className="text-[24px] leading-8 font-medium text-[#1b1e1a]">{f.title}</h3>
                <ul className="mt-4 space-y-2 text-[16px] leading-6 text-[#1b1e1a]">
                  {f.bullets.map((b) => (
                    <li key={b} className="relative pl-[18px]">
                      <span className="absolute top-[10px] left-[4px] h-[5px] w-[5px] rounded-full bg-[#1b1e1a]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <ListArt i={i} />
            </div>
          ))}
        </div>
      </section>
      <section className="mt-4 flex flex-col items-center rounded-lg bg-white px-[52px] py-[56px]">
        <h2 className="text-[24px] leading-8 font-medium text-[#1b1e1a]">Start tracking your brand today</h2>
        <button type="button" className="mt-6 h-10 rounded-md bg-[#009f81] px-[25px] text-[16px] font-medium text-white hover:bg-[#007c65]">
          Get free trial
        </button>
      </section>
    </div>
  );
}
