import type { ReactNode } from "react";
import { agentLog, listingRows, reviewCards } from "./data";

export const GbpBadge = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3 3.5h18l1.5 5.5H1.5z" fill="#5b8def" />
    <path d="M7.5 3.5h3v5.5h-4zM13.5 3.5h3l1 5.5h-4z" fill="#8fb4f7" />
    <path d="M1.5 9h21v.8a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3z" fill="#3f73d9" />
    <path d="M3 12h18v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" fill="#4a7ee6" />
    <rect x="11" y="13.5" width="8.5" height="7" rx="1.2" fill="#fff" />
    <path d="M15.3 16.8h2.4a2.3 2.3 0 1 1-.7-1.9" fill="none" stroke="#4a7ee6" strokeWidth="1.1" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" width={20} height={20}>
    <path d="m3.5 10.5 4.5 4.5 8.5-9" fill="none" stroke="#12b886" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hourglass = () => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <path d="M6 2.5h12M6 21.5h12M7.5 2.5c0 5 9 6 9 9.5s-9 4.5-9 9.5M16.5 2.5c0 5-9 6-9 9.5s9 4.5 9 9.5" fill="none" stroke="#7b4ee4" strokeWidth={1.8} strokeLinecap="round" />
    <path d="M8.5 20.5c1-2.5 6-2.5 7 0z" fill="#b89af4" />
  </svg>
);

export function AgentMockup() {
  return (
    <div className="h-full overflow-hidden rounded-[16px] bg-white shadow-[0_4px_24px_rgba(24,27,40,0.08),0_0_1px_rgba(24,27,40,0.12)]">
      <div className="flex h-[83px] items-center border-b border-[#e6e7eb] pr-[41px] pl-[40px]">
        <GbpBadge />
        <span className="ml-4 flex-1 text-[24px] leading-8 font-semibold text-[#1c1c22]">GBP AI Agent</span>
        <span className="relative h-6 w-11 rounded-full bg-[#1a8cff]">
          <span className="absolute top-[3px] right-[3px] h-[18px] w-[18px] rounded-full bg-white" />
        </span>
      </div>
      <ul className="pt-[33px] pl-[40px]">
        <li className="flex h-[24px] items-center gap-[16px] text-[20px] text-[#1f1f24]">
          <Hourglass />
          Searching for keywords...
        </li>
        {agentLog.map((t, i) => (
          <li key={i} className="mt-[32px] flex h-[24px] items-center gap-[20px] pl-[2px] text-[20px] text-[#7b7c82]">
            <Check />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const dirIcon: Record<string, ReactNode> = {
  OpenAI: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path
        d="M12 2.8a4.6 4.6 0 0 1 7.6 4.6 4.6 4.6 0 0 1 0 9.2A4.6 4.6 0 0 1 12 21.2a4.6 4.6 0 0 1-7.6-4.6 4.6 4.6 0 0 1 0-9.2A4.6 4.6 0 0 1 12 2.8zM8.5 6v8.5l3.5 2M15.5 18v-8.5l-3.5-2M5 10.5l7.2-4.2 4 2.3M19 13.5l-7.2 4.2-4-2.3"
        fill="none"
        stroke="#111"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="12" fill="#1877f2" />
      <path d="M13.3 24v-8.4h2.8l.4-3.3h-3.2v-2c0-1 .3-1.6 1.6-1.6h1.7V5.8a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.1v3.3h2.8V24z" fill="#fff" />
    </svg>
  ),
  Siri: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <defs>
        <radialGradient id="siri-g" cx="0.45" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#f2f2ff" />
          <stop offset="0.35" stopColor="#6f8cff" />
          <stop offset="0.65" stopColor="#d44fd8" />
          <stop offset="1" stopColor="#101020" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#siri-g)" />
    </svg>
  ),
  Bing: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <path d="M6 2.5 9.5 3.7v12.6l4.7-2.7-2.3-1.1-1.4-3.6 8.6 3v4.5l-9.6 5.6L6 19.9z" fill="#1aa3e8" />
    </svg>
  ),
  Yelp: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <g fill="none" stroke="#e8606a" strokeWidth={1.4}>
        <path d="M12 4c1.8 0 2.5 1.5 2 3.5L12 11 10 7.5C9.5 5.5 10.2 4 12 4zM12 11l4-1.5c1.8-.4 3 .6 2.4 2.3s-2 1.9-3.5 1.1zM12 11l-4-1.5c-1.8-.4-3 .6-2.4 2.3s2 1.9 3.5 1.1zM12 11l2.4 3.2c1 1.5.6 3-1 3.4s-2.3-1-2.1-2.6zM12 11l-2.4 3.2c-1 1.5-.6 3 1 3.4" />
      </g>
    </svg>
  ),
  CitySearch: (
    <svg viewBox="0 0 24 24" width={24} height={24}>
      <circle cx="12" cy="12" r="11" fill="#61c5f2" />
      <circle cx="12" cy="12" r="5" fill="#fff" />
    </svg>
  ),
};

const Bars = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 26 16" width={26} height={16} className={className}>
    <rect x="0" y="9" width="7" height="7" rx="3" fill="#f26b2a" />
    <rect x="9" y="5" width="7" height="11" rx="2" fill="#f26b2a" />
    <rect x="18" y="0" width="7" height="16" rx="2" fill="#d6d7da" />
  </svg>
);

const StarSolid = ({ c = "#f5a623", s = 16 }: { c?: string; s?: number }) => (
  <svg viewBox="0 0 20 20" width={s} height={s}>
    <path d="m10 1.8 2.5 5.4 5.8.6-4.4 4 1.3 5.8L10 14.6l-5.2 3 1.3-5.8-4.4-4 5.8-.6z" fill={c} />
  </svg>
);
const StarLine = ({ s = 16 }: { s?: number }) => (
  <svg viewBox="0 0 20 20" width={s} height={s}>
    <path d="m10 1.8 2.5 5.4 5.8.6-4.4 4 1.3 5.8L10 14.6l-5.2 3 1.3-5.8-4.4-4 5.8-.6z" fill="none" stroke="#c9cad0" strokeWidth={1.2} />
  </svg>
);

export function ListingMockup() {
  return (
    <div className="relative h-full overflow-hidden rounded-[14px] bg-white shadow-[0_4px_24px_rgba(24,27,40,0.08),0_0_1px_rgba(24,27,40,0.12)]">
      <div className="flex items-center pt-[29px] pl-[22px] text-[18px] leading-6 font-semibold text-[#5f6068]">
        <svg viewBox="0 0 24 24" width={20} height={20} className="mr-[11px]">
          <path d="M12 21.5s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="#5f6068" strokeWidth={1.8} />
          <circle cx="12" cy="9.5" r="2.7" fill="none" stroke="#5f6068" strokeWidth={1.8} />
        </svg>
        John’s Roofing
      </div>
      <div className="mt-[22px] flex h-[62px]">
        <div className="w-[182px] border-r border-[#e1e2e6] pl-[22px]">
          <div className="text-[18px] leading-6 text-[#6d6e75]">Online presence</div>
          <div className="mt-[10px] flex items-center gap-[4px] text-[20px] leading-6 font-bold text-[#f26b2a]">
            <Bars />
            Medium
          </div>
        </div>
        <div className="w-[158px] border-r border-[#e1e2e6] pl-[22px]">
          <div className="text-[18px] leading-6 text-[#6d6e75]">Listings to fix</div>
          <div className="mt-[10px] text-[20px] leading-6 font-bold text-[#2a2a30]">
            64<span className="font-semibold text-[#8f9096]"> / 72</span>
          </div>
        </div>
        <div className="pl-[22px]">
          <div className="text-[18px] leading-6 text-[#6d6e75]">Rating</div>
          <div className="mt-[10px] flex items-center gap-[5px] text-[20px] leading-6 font-bold text-[#2a2a30]">
            4.5 <StarSolid c="#f59e0b" />
          </div>
        </div>
      </div>
      <div className="mt-[25px] flex h-[31px] items-start pl-[22px] text-[16px] leading-5 text-[#3a3b40]">
        <span className="w-[246px]">Directory</span>
        <span>Status</span>
      </div>
      <div className="[mask-image:linear-gradient(to_bottom,#000_55%,rgba(0,0,0,0.25)_85%,transparent)]">
        {listingRows.map((r) => (
          <div key={r.name} className="flex h-[58px] items-center border-t border-[#e6e7eb] pl-[26px] text-[18px] text-[#2a2a30]">
            <span className="flex w-6 justify-center">{dirIcon[r.name]}</span>
            <span className="ml-[13px] w-[203px]">{r.name}</span>
            {r.status === "ok" ? (
              <span className="flex h-[26px] items-center gap-[5px] rounded-full border border-[#b8ecc9] bg-[#dff8e8] px-[10px] text-[15px] font-medium text-[#12663a]">
                <svg viewBox="0 0 12 12" width={11} height={11}>
                  <path d="m2 6.5 2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
                </svg>
                Connected
              </span>
            ) : (
              <span className="flex h-[26px] items-center gap-[6px] rounded-full border border-[#fbd9e2] bg-[#fdeef2] px-[11px] text-[15px] font-medium text-[#d5184b]">
                <span className="text-[14px]">✕</span>Not Present
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const Sparkle = () => (
  <svg viewBox="0 0 24 24" width={20} height={20}>
    <path d="M9 7c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z" fill="#7c4dde" />
    <path d="M17 3c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z" fill="#9b73ee" />
  </svg>
);

export function ReviewMockup() {
  return (
    <div className="relative h-full overflow-hidden rounded-[16px] bg-white shadow-[0_4px_24px_rgba(24,27,40,0.08),0_0_1px_rgba(24,27,40,0.12)]">
      <div className="absolute top-[10px] left-[8px] h-[462px] w-[244px] rounded-[10px] bg-[#f3f4f8] pl-[24px]">
        <div className="pt-[23px] text-[24px] leading-[28px] font-semibold text-[#1f1f24]">
          Review
          <br />
          Generation
        </div>
        {[
          ["Sent emails", "540", "", 128],
          ["Clicks", "93", "17.2%", 236],
          ["Reviews", "41", "", 344],
        ].map(([l, v, p, top]) => (
          <div key={l as string} className="absolute left-[24px]" style={{ top: (top as number) - 10 }}>
            <div className="text-[20px] leading-6 text-[#76777d]">{l}</div>
            <div className="mt-[6px] flex items-baseline gap-[10px] text-[32px] leading-[38px] font-bold text-[#1a1a1f]">
              {v}
              {p && <span className="text-[20px] font-normal text-[#76777d]">{p}</span>}
            </div>
          </div>
        ))}
      </div>
      {reviewCards.map((r, i) => (
        <div key={r.name} className="absolute left-[282px] w-[400px]" style={{ top: 26 + i * 150 }}>
          <div className="flex items-center gap-2 text-[16px] leading-6 font-semibold text-[#6b6c72]">
            {r.name}
            <span className="flex gap-[3px]">
              {[0, 1, 2, 3, 4].map((k) => (k < r.stars ? <StarSolid key={k} c="#fbbd23" s={18} /> : <StarLine key={k} s={18} />))}
            </span>
          </div>
          <div className="mt-[8px] text-[16px] leading-6 whitespace-nowrap text-[#34353a]">{r.text}</div>
          <div className="mt-[13px] flex h-[46px] items-center gap-[10px] rounded-full border border-[#c9b8f7] bg-white pl-[26px] whitespace-nowrap shadow-[0_2px_10px_rgba(110,90,230,0.18)]">
            <Sparkle />
            <span className="text-[16px] text-[#34353a]">
              <b className="font-semibold text-[#1f1f24]">Replied by AI:</b> {r.reply}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InsightsMockup() {
  const spark = "M0 45 10 45 20 57 35 40 50 30 60 34 72 25 84 25 95 16 108 16 118 28 130 28 142 16 154 34 160 40 170 26 182 32 194 22 206 30 218 38 230 26 240 14 250 34 260 20 272 26 284 38 296 14 305 20 315 12";
  return (
    <div className="relative h-full rounded-[16px] bg-white shadow-[0_4px_24px_rgba(24,27,40,0.08),0_0_1px_rgba(24,27,40,0.12)]">
      <div className="pt-[25px] pl-[24px] text-[24px] leading-7 font-semibold text-[#6b6c72]">Insights</div>
      <div className="relative h-[132px] border-b border-[#e6e7eb]">
        <div className="absolute top-[18px] left-[24px] text-[20px] leading-6 text-[#a0a1a6]">Views</div>
        <div className="absolute top-[50px] left-[24px] flex items-baseline gap-[10px] text-[32px] leading-10 font-bold text-[#8a8b90]">
          25.3K <span className="text-[18px] font-normal text-[#7fcfa6]">+13%</span>
        </div>
        <svg viewBox="0 0 316 60" width={296} height={62} className="absolute top-[0px] left-[208px]">
          <path d={spark} fill="none" stroke="#7cc0f0" strokeWidth={2.5} strokeLinejoin="round" />
        </svg>
      </div>
      <div className="relative h-[109px] border-b border-[#e6e7eb]">
        <div className="absolute top-[12px] left-[24px] text-[20px] leading-6 text-[#c2c3c7]">Interactions</div>
        <div className="absolute top-[44px] left-[24px] text-[32px] leading-10 font-bold text-[#a8a9ad]">5.1K</div>
        <svg viewBox="0 0 40 10" width={30} height={10} className="absolute top-[22px] right-[22px]">
          <path d="M0 4h40" stroke="#7cc0f0" strokeWidth={2.5} />
        </svg>
      </div>
      <div className="relative h-[120px]">
        <div className="absolute top-[14px] left-[24px] text-[20px] leading-6 text-[#c2c3c7]">Average rating</div>
        <div className="absolute top-[48px] left-[24px] text-[28px] text-[#c9cacf]">★</div>
        <svg viewBox="0 0 40 20" width={30} height={16} className="absolute top-[38px] right-[22px]">
          <path d="M0 16 20 4 40 14" fill="none" stroke="#9fd2f5" strokeWidth={2.5} />
        </svg>
      </div>
      <div className="absolute top-[150px] left-[40px] h-[300px] w-[452px] origin-top-left rotate-[2.8deg] rounded-[16px] bg-white shadow-[0_6px_24px_rgba(24,27,40,0.14),0_0_1px_rgba(24,27,40,0.2)]">
        <div className="pt-[42px] pl-[45px] text-[22px] leading-7 font-semibold text-[#1c1c20]">Accept business name update?</div>
        <div className="mt-[22px] flex pl-[42px] text-[19px] leading-6 text-[#2a2a2f]">
          <span className="w-[72px] text-[#6d6e75]">Old</span>
          <span>
            John’s Roofing <s>Company</s>
          </span>
        </div>
        <div className="mt-[16px] flex pl-[42px] text-[19px] leading-6 text-[#2a2a2f]">
          <span className="w-[72px] text-[#6d6e75]">New</span>
          <span>John’s Roofing</span>
        </div>
        <div className="mt-[40px] flex gap-4 pl-[42px]">
          <span className="flex h-[40px] w-[174px] items-center justify-center gap-2 rounded-[6px] bg-[#eceef0] text-[16px] text-[#4a4b50]">✓ Accept</span>
          <span className="flex h-[40px] w-[174px] items-center justify-center gap-2 rounded-[6px] bg-[#eceef0] text-[16px] text-[#4a4b50]">✕ Reject</span>
        </div>
      </div>
    </div>
  );
}

const StoreIcon = ({ c }: { c: string }) => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <path d="M3.5 4.5h17l1 5a2.4 2.4 0 0 1-4.6 1 2.4 2.4 0 0 1-4.4 0 2.4 2.4 0 0 1-4.4 0 2.4 2.4 0 0 1-4.6-1zM4.5 11v8.5h15V11M8.5 4.5v4M12 4.5v4M15.5 4.5v4" fill="none" stroke={c} strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export function MapMini({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 228 256" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="228" height="256" fill="#eef0f1" />
      <g fill="#dfe1e4">
        {[
          [20, 20, 18, 12],
          [52, 40, 14, 10],
          [90, 24, 16, 12],
          [128, 50, 12, 14],
          [150, 88, 14, 10],
          [40, 100, 12, 12],
          [70, 130, 16, 12],
          [110, 150, 14, 10],
          [170, 30, 16, 12],
          [200, 110, 14, 10],
          [60, 190, 14, 12],
          [96, 70, 12, 12],
          [180, 170, 14, 12],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx={2} transform={`rotate(-30 ${x} ${y})`} />
        ))}
      </g>
      <g stroke="#fff" strokeWidth={3} fill="none">
        <path d="M0 60 228 -20M0 140 228 40M30 256 228 120M10 0l60 256M100 0l60 256" />
      </g>
      <path d="M0 110c20 10 30 60 40 100s20 50 20 60H0z" fill="#a8d8b0" />
      <path d="M228 90c-20 10-30 30-28 50s-30 30-60 40-40 30-50 60M150 256c10-30 40-50 70-60" fill="none" stroke="#5aa1ea" strokeWidth={6} strokeLinecap="round" />
      <path d="M200 60c-10 20-5 30 10 40" fill="none" stroke="#5aa1ea" strokeWidth={5} />
    </svg>
  );
}

const Dot = ({ n, tone, x, y, faded }: { n: number; tone: "r" | "g" | "y"; x: number; y: number; faded?: boolean }) => {
  const c = { r: ["#f87878", "#d63a3a"], g: ["#3fcf98", "#159a68"], y: ["#fbbf24", "#d19304"] }[tone];
  return (
    <span
      className="absolute flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] text-[18px] font-medium text-[#1b1b1f]"
      style={{ left: x - 17, top: y - 17, background: c[0], borderColor: c[1], opacity: faded ? 0.55 : 1 }}
    >
      {n}
    </span>
  );
};

export function MapRankMockup() {
  const rows = [
    { r: "2.6", n: "Roof Revivers", b: "Competitor" },
    { r: "5.8", n: "John’s Roofing", b: "You" },
    { r: "9.4", n: "The Roof Detective", b: "Competitor" },
    { r: "9.9", n: "Roof King", b: "Competitor" },
  ];
  return (
    <div className="relative h-full overflow-hidden rounded-[16px] bg-white shadow-[0_4px_24px_rgba(24,27,40,0.08),0_0_1px_rgba(24,27,40,0.12)]">
      <div className="flex h-[92px] border-b border-[#e6e7eb] px-[34px]">
        {[
          ["Your rankings", true],
          ["Competitor #1", false],
          ["Competitor #2", false],
        ].map(([l, a], i) => (
          <div key={l as string} className={`relative flex w-[134px] flex-col items-center pt-[22px] ${i ? "ml-[24px]" : ""}`}>
            {a ? (
              <svg viewBox="0 0 24 24" width={24} height={24}>
                <path d="M12 22s7.5-6.5 7.5-12.5a7.5 7.5 0 1 0-15 0C4.5 15.5 12 22 12 22z" fill="none" stroke="#4a1e8a" strokeWidth={1.8} />
                <path d="M9 11.5v-2l3-2.5 3 2.5v2z" fill="#4a1e8a" />
              </svg>
            ) : (
              <StoreIcon c="#6b6c72" />
            )}
            <span className={`mt-[7px] text-[18px] leading-6 ${a ? "text-[#4a1e8a]" : "text-[#2a2a30]"}`}>{l}</span>
            <span className={`absolute right-0 bottom-0 left-0 h-[3px] ${a ? "bg-[#4a1e8a]" : "bg-[#e3e3e6]"}`} />
          </div>
        ))}
      </div>
      <div className="mx-[24px] mt-[14px] flex h-[64px] items-center rounded-[10px] border border-[#e3e3e6] pr-[22px] pl-[20px]">
        <svg viewBox="0 0 24 24" width={22} height={22}>
          <path d="M12 21.5s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" fill="none" stroke="#1f1f24" strokeWidth={2} />
          <circle cx="12" cy="9.5" r="2.6" fill="none" stroke="#1f1f24" strokeWidth={2} />
        </svg>
        <span className="ml-[10px] flex-1 text-[18px] font-bold text-[#2a2a30]">John’s Roofing</span>
        <span className="text-[18px] leading-[26px] text-[#8b8c91]">
          Avg. Rank
          <span className="block text-[#1f1f24]">5.82</span>
        </span>
        <svg viewBox="0 0 66 30" width={66} height={30} className="-mt-[6px] ml-[6px]">
          <path d="M0 28 8 12 16 18 24 8 32 14 40 10 48 16 58 10 66 12V30H0z" fill="#d7ecfb" />
          <path d="M0 28 8 12 16 18 24 8 32 14 40 10 48 16 58 10 66 12" fill="none" stroke="#1a8cff" strokeWidth={2} />
        </svg>
      </div>
      <div className="relative mx-[24px] mt-[12px] flex h-[270px] overflow-hidden rounded-[10px] border border-[#e3e3e6]">
        <div className="w-[242px] shrink-0 [mask-image:linear-gradient(to_bottom,#000_62%,rgba(0,0,0,0.4)_85%,transparent_97%)]">
          {rows.map((r) => {
            const you = r.b === "You";
            return (
              <div key={r.n} className={`relative h-[78px] border-b border-[#e6e7eb] pt-[14px] pl-[16px] ${you ? "bg-[#e5f3fd]" : ""}`}>
                {you && <span className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#1a8cff]" />}
                <div className="flex items-center">
                  <span className="flex h-[24px] items-center rounded-full bg-[#eeeff1] px-[5px] text-[17px] text-[#76777d]">{r.r}</span>
                  <span className="ml-[8px] text-[18px] whitespace-nowrap text-[#1f1f24]">{r.n}</span>
                </div>
                <span className={`mt-[4px] ml-[46px] inline-flex h-[24px] items-center rounded-full px-[8px] text-[16px] ${you ? "bg-[#c8f0e0] text-[#0d6b4d]" : "bg-[#fde8dc] text-[#c4501b]"}`}>{r.b}</span>
              </div>
            );
          })}
        </div>
        <div className="relative flex-1">
          <MapMini className="absolute inset-0 h-full w-full" />
          {(
            [
              [15, "r", 36, 38],
              [3, "g", 114, 38],
              [6, "y", 191, 38],
              [12, "r", 36, 127],
              [1, "g", 114, 127],
              [4, "y", 191, 127],
              [14, "r", 36, 215, 1],
              [5, "y", 114, 215, 1],
              [9, "r", 191, 215, 1],
            ] as const
          ).map(([n, t, x, y, f]) => (
            <Dot key={`${x}-${y}`} n={n} tone={t} x={x} y={y} faded={!!f} />
          ))}
        </div>
      </div>
    </div>
  );
}
