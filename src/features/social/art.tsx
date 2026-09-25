import type { ReactNode } from "react";

const K = "#1b1e1a";
const SKIN = "#bcd9fa";
const BAND = "#c7e0fc";

function Person({ x, children }: { x: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} 0)`} stroke={K} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round">
      {children}
    </g>
  );
}

export function PeopleArt() {
  return (
    <svg viewBox="0 0 990 200" width={990} height={200} className="block">
      <path d="M150 200 C 250 150 330 140 420 150 C 520 160 560 110 650 105 C 740 100 800 130 870 150 L 990 150 L 990 200Z" fill={BAND} />
      <path d="M60 200 C 120 170 190 170 250 180 L 250 200Z" fill={BAND} />
      <Person x={0}>
        <path d="M2 200 C 4 150 20 128 60 120 L 110 118 C 128 130 132 160 130 200Z" fill="#fff" />
        <path d="M60 122 L 70 200 M96 120 L 96 200" />
        <path d="M40 160 L 40 200 L 64 200 L 60 150Z" fill={K} />
        <ellipse cx="75" cy="78" rx="24" ry="28" fill={SKIN} />
        <path d="M50 70 C 50 40 95 38 100 64 C 90 56 70 60 62 72 L 58 88 C 52 84 50 78 50 70Z" fill={K} />
        <circle cx="72" cy="80" r="6" fill="#fff" />
        <circle cx="72" cy="80" r="3" fill={K} />
        <path d="M58 96 C 50 110 58 122 70 118 L 74 96" fill={SKIN} />
        <path d="M108 62 C 118 52 134 58 132 74 C 130 90 120 96 112 100" fill={SKIN} />
        <circle cx="88" cy="40" r="14" fill="#e8f1fd" strokeWidth={1.2} />
        <circle cx="106" cy="36" r="12" fill="#e8f1fd" strokeWidth={1.2} />
        <circle cx="120" cy="40" r="11" fill="#e8f1fd" strokeWidth={1.2} />
      </Person>
      <Person x={120}>
        <path d="M0 200 C 20 160 60 150 110 156 C 150 160 180 170 200 140 L 212 70 L 238 72 L 232 150 C 220 190 180 200 150 200Z" fill="#fff" />
        <ellipse cx="84" cy="90" rx="30" ry="34" fill={SKIN} />
        <path d="M50 88 C 40 60 60 40 94 46 C 118 52 118 72 110 78 C 96 66 76 64 62 76 C 58 86 56 96 50 104 C 44 98 42 92 50 88Z" fill={K} />
        <path d="M76 104 C 84 112 96 112 102 102" fill="#fff" />
        <path d="M200 70 C 196 40 214 30 224 40 L 240 60 C 244 76 236 84 226 84Z" fill={SKIN} />
        <path d="M204 44 L 244 0 L 236 58Z M244 0 L 216 46" fill="#dbeafc" />
      </Person>
      <Person x={338}>
        <path d="M0 200 C 0 150 20 128 50 124 L 90 124 C 108 136 112 170 110 200Z" fill="#fff" />
        <ellipse cx="62" cy="86" rx="24" ry="28" fill={SKIN} />
        <path d="M36 80 C 30 50 56 34 80 44 C 96 52 96 70 88 74 C 78 64 60 62 46 74 C 44 84 40 96 30 104 C 20 100 26 88 36 80Z" fill={K} />
        <path d="M20 90 C 10 96 6 110 14 118 C 22 110 26 100 30 96Z" fill={K} />
        <rect x="52" y="150" width="54" height="36" rx="6" fill={K} />
        <circle cx="79" cy="168" r="11" fill="#fff" />
        <circle cx="79" cy="168" r="6" fill={K} />
        <path d="M44 160 C 40 176 48 190 60 186 M110 160 C 116 176 108 190 96 186" fill={SKIN} />
      </Person>
      <Person x={500}>
        <path d="M22 200 L 44 100 L 66 200 M44 100 L 44 200" fill="none" />
        <rect x="26" y="86" width="36" height="14" rx="3" fill={K} />
        <path d="M0 94 L 26 94" />
      </Person>
      <Person x={580}>
        <path d="M10 200 C 14 150 30 126 70 120 L 110 120 C 150 130 160 160 160 200Z" fill="#fff" />
        <ellipse cx="96" cy="76" rx="24" ry="28" fill={SKIN} />
        <path d="M66 40 C 60 20 120 14 130 34 C 124 46 110 50 100 50 L 72 54 C 66 50 64 46 66 40Z" fill="#fff" />
        <path d="M70 54 L 118 50 L 120 60 L 72 62Z" fill={K} />
        <circle cx="120" cy="140" r="3" fill={K} stroke="none" />
        <circle cx="120" cy="152" r="3" fill={K} stroke="none" />
        <path d="M18 160 C 30 150 50 144 76 150 C 90 160 90 180 80 196 L 20 196Z" fill={K} />
        <path d="M24 150 L 38 128 L 50 146" fill="none" />
        <circle cx="38" cy="126" r="3" fill="#fff" />
        <path d="M30 100 C 26 86 34 80 40 90" fill="none" strokeWidth={1.2} />
      </Person>
      <Person x={790}>
        <path d="M20 40 L 26 16 L 36 18 L 32 40" fill={BAND} />
        <rect x="10" y="40" width="110" height="160" fill="#fff" />
        <path d="M20 180 L 50 130 L 70 160 L 90 140 L 110 180" fill="none" />
        <path d="M84 200 C 90 150 110 124 146 120 L 170 124 C 180 150 180 180 176 200Z" fill="#fff" />
        <path d="M146 124 L 150 200 L 176 200 L 170 124Z" fill={K} />
        <ellipse cx="150" cy="80" rx="22" ry="27" fill={SKIN} />
        <path d="M126 70 C 124 40 164 34 174 54 C 182 70 190 90 176 104 C 168 90 168 76 160 66 C 150 62 136 68 128 80Z" fill={K} />
        <path d="M36 72 C 50 66 70 64 100 70 C 112 72 120 80 126 90" fill="none" />
        <ellipse cx="36" cy="72" rx="10" ry="8" fill={K} />
        <ellipse cx="130" cy="180" rx="40" ry="10" fill={K} />
      </Person>
    </svg>
  );
}

function Net({ c, children }: { c: string; children: ReactNode }) {
  return (
    <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: c }}>
      {children}
    </span>
  );
}

export function AudienceArt() {
  const rows = [
    { n: "My Company", b: [118, 16, 118], v: "1,438 K", d: "+0.2%", up: true },
    { n: "Competitor 1", b: [100, 6, 50], v: "1,196 K", d: "−0.3%", up: false },
    { n: "Competitor 2", b: [8, 30, 30], v: "465 K", d: "+2.1%", up: true },
    { n: "Competitor 3", b: [14, 0, 14], v: "240 K", d: "−1.1%", up: false },
  ];
  return (
    <div className="relative w-[407px]">
      <svg viewBox="0 0 200 200" width={200} height={200} className="absolute top-[-40px] left-[110px]">
        <path d="M40 30 C 80 0 150 10 170 60 C 190 110 150 160 100 170 C 50 180 10 140 20 90Z" fill="#fde6ec" />
      </svg>
      <div className="relative rounded-lg bg-white shadow-[0_4px_20px_rgba(25,27,35,0.12)]">
        <div className="flex h-[38px] items-center border-b border-[#edefef] px-[15px] text-[14px] text-rk-text">
          <span className="border-b-2 border-[#1d6ff2] pb-[5px] pt-[7px]">Audience</span>
          <span className="ml-4 pt-[2px]">Activity</span>
          <span className="ml-4 pt-[2px]">Engagement</span>
          <span className="ml-auto flex gap-[12px]">
            <Net c="#1877f2">f</Net>
            <Net c="#c13584">◎</Net>
            <Net c="#e60023">P</Net>
            <span className="flex h-[13px] w-[18px] items-center justify-center self-center rounded-[4px] bg-[#ff0000] text-[7px] text-white">▶</span>
          </span>
        </div>
        <div className="space-y-[12px] px-[15px] pt-[13px] pb-[14px]">
          {rows.map((r, i) => (
            <div key={r.n} className="flex h-[18px] items-center text-[14px]">
              <span className={`w-[98px] text-rk-text ${i === 0 ? "font-semibold" : ""}`}>{r.n}</span>
              <span className="flex h-[12px] w-[158px] overflow-hidden">
                <i className="rounded-l-full bg-[#1d73e8]" style={{ width: r.b[0] / 1.6 }} />
                <i className="bg-[#f25ad7]" style={{ width: r.b[1] / 1.6 }} />
                <i className="rounded-r-full bg-[#e8112d]" style={{ width: r.b[2] / 1.6 }} />
              </span>
              <span className="ml-auto font-semibold text-rk-text">{r.v}</span>
              <span className={`ml-[12px] w-[48px] text-right ${r.up ? "text-[#009f81]" : "text-[#d1002f]"}`}>{r.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const posts: { t: string; l: string; c: string; net: string; badge?: [string, string, string] }[][] = [
  [
    { t: "10:00 AM", l: "New product launch!", c: "#bfe3f8", net: "#c13584", badge: ["♥", "241", "#f0364b"] },
    { t: "5:00 PM", l: "Sale ends soon", c: "#d9c6fb", net: "#1877f2", badge: ["👍", "53", "#1d73e8"] },
    { t: "9:00 PM", l: "Giveaway results", c: "#fbd46a", net: "#e60023", badge: ["👍", "241", "#1d73e8"] },
  ],
  [
    { t: "10:00 AM", l: "Check out our new blog post", c: "#c7f37a", net: "#1877f2" },
    { t: "5:00 PM", l: "Happy holidays!", c: "#45d6a0", net: "#0a66c2" },
    { t: "9:00 PM", l: "Check out the reviews", c: "#f86d86", net: "#c13584" },
  ],
];

export function CalendarArt() {
  return (
    <div className="relative flex h-[275px] w-[408px] gap-2">
      {["Monday", "Tuesday"].map((d, di) => (
        <div key={d} className="w-[200px] rounded-[6px] bg-[#f0f1f5] px-[7px] pt-[10px]">
          <div className="pl-[1px] text-[16px] leading-5 font-semibold text-rk-text">{d}</div>
          <div className="mt-[9px] space-y-[7px]">
            {posts[di].map((p, pi) => (
              <div
                key={p.t}
                className={`flex h-[71px] overflow-hidden rounded-[5px] bg-white shadow-[0_1px_3px_rgba(25,27,35,0.08)] ${di === 1 && pi === 0 ? "relative -top-[8px] -left-[12px] w-[186px] -rotate-[4deg] shadow-[0_6px_16px_rgba(25,27,35,0.15)]" : ""}`}
              >
                <div className="flex-1 px-[8px] pt-[8px]">
                  <div className="flex items-center gap-[4px] text-[13px] text-rk-text">
                    <span className="h-[14px] w-[14px] rounded-full bg-[#f47c3c]" />
                    <span className="h-[14px] w-[14px] rounded-full" style={{ background: p.net }} />
                    {p.t}
                  </div>
                  <div className={`mt-[4px] text-[12px] leading-4 ${di ? "text-rk-text" : "text-[#8a8c96]"}`}>{p.l}</div>
                </div>
                <div className="relative w-[70px] shrink-0" style={{ background: p.c }}>
                  {di === 0 && <span className="absolute top-0 right-0 flex h-[22px] w-[22px] items-center justify-center bg-[#0e8a6b] text-[11px] text-white">✓</span>}
                  {p.badge && (
                    <span className="absolute right-[4px] bottom-[4px] flex h-[20px] items-center gap-[3px] rounded-[4px] px-[4px] text-[12px] text-white" style={{ background: p.badge[2] }}>
                      {p.badge[0]} {p.badge[1]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EngagementArt() {
  const bars = [30, 26, 28, 26, 22, 24, 28, 20, 18, 36];
  return (
    <div className="relative h-[260px] w-[407px] translate-y-[31px]">
      <div className="absolute top-[-36px] left-[176px] h-[230px] w-[230px] rounded-full bg-[#d8f8e8]" />
      <div className="absolute top-0 left-0 h-[220px] w-[297px] rounded-lg bg-white px-[15px] pt-[14px] shadow-[0_4px_20px_rgba(25,27,35,0.12)]">
        <div className="text-[14px] font-semibold text-rk-text">Daily Engagement</div>
        {[
          ["Reactions", "8,725", "+0.2%", true],
          ["Shares", "683", "+2.7%", true],
          ["Comments", "155", "−4.3%", false],
        ].map(([l, v, d, up]) => (
          <div key={l as string} className="mt-[8px] flex items-center gap-3">
            <span className="h-[30px] w-[30px] rounded-full bg-[#f0f1f5]" />
            <div className="leading-4">
              <div className="text-[12px] text-[#6a6c6a]">{l}</div>
              <div className="text-[14px] font-semibold text-rk-text">
                {v} <span className={`text-[11px] font-normal ${up ? "text-[#009f81]" : "text-[#d1002f]"}`}>{d}</span>
              </div>
            </div>
            <svg viewBox="0 0 120 14" width={120} height={14} className="ml-auto">
              <path d="M0 12 L15 4 L30 12 L45 12 L60 4 L75 12 L90 4 L105 4 L120 12 L120 14 L0 14Z" fill="#e1f0fd" stroke="#5bb0f5" strokeWidth={1.4} />
            </svg>
          </div>
        ))}
      </div>
      <div className="absolute top-[52px] left-[183px] h-[190px] w-[196px] rounded-lg bg-white px-[15px] pt-[14px] shadow-[0_4px_20px_rgba(25,27,35,0.14)]">
        <div className="text-[14px] font-semibold text-rk-text">Daily Reach</div>
        <div className="mt-[8px] flex gap-4 text-[12px] text-rk-text">
          <span className="flex items-center gap-[5px]">
            <i className="h-[14px] w-[14px] rounded-[3px] bg-[#2d9cf0]" />
            Organic
          </span>
          <span className="flex items-center gap-[5px]">
            <i className="h-[14px] w-[14px] rounded-[3px] bg-[#45d6a0]" />
            Paid
          </span>
        </div>
        <div className="mt-[12px] flex h-[100px] items-end gap-[4px]">
          {bars.map((h, i) => (
            <div key={i} className="flex w-[13px] flex-col">
              <i className="bg-[#2d9cf0]" style={{ height: 6 + (i % 3) * 3 }} />
              <i className="bg-[#45d6a0]" style={{ height: h * 2 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InfluencersArt() {
  return (
    <div className="relative h-[240px] w-[407px] rounded-lg bg-white p-4 shadow-[0_4px_20px_rgba(25,27,35,0.12)]">
      <div className="text-[14px] font-semibold text-rk-text">Top influencers</div>
      {[
        ["Travel creator", "YouTube", "1.2M", "#ff0000"],
        ["Food blogger", "Instagram", "845K", "#c13584"],
        ["Tech reviewer", "TikTok", "2.4M", "#1b1e1a"],
        ["Gaming streamer", "Twitch", "512K", "#9146ff"],
      ].map(([n, p, f, c]) => (
        <div key={n} className="mt-3 flex items-center gap-3 text-[13px]">
          <span className="h-8 w-8 rounded-full bg-[#dfe7f5]" />
          <div className="flex-1 leading-4">
            <div className="font-semibold text-rk-text">{n}</div>
            <div style={{ color: c }}>{p}</div>
          </div>
          <span className="font-semibold text-rk-text">{f}</span>
        </div>
      ))}
    </div>
  );
}

export function MentionsChartArt() {
  return (
    <div className="relative h-[200px] w-[190px] rounded-lg bg-white px-[13px] pt-[14px] shadow-[0_4px_20px_rgba(25,27,35,0.12)]">
      <div className="text-[12px] font-semibold text-rk-text">Brand Mentions</div>
      <div className="mt-[14px] flex gap-[8px] text-[9px] text-[#484a49]">
        {[
          ["Total", "#2d9cf0"],
          ["Positive", "#45d6a0"],
          ["Negative", "#ff642d"],
        ].map(([l, c]) => (
          <span key={l} className="flex items-center gap-[4px]">
            <i className="h-[9px] w-[9px] rounded-[2px]" style={{ background: c }} />
            {l}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 150 100" width={160} height={110} className="mt-[8px] text-[8px]">
        {[10, 37, 64, 90].map((y) => (
          <line key={y} x1="22" x2="150" y1={y} y2={y} stroke="#eef0f3" />
        ))}
        <text x="2" y="13" fill="#a9abaa">30K</text>
        <text x="2" y="40" fill="#a9abaa">20K</text>
        <text x="2" y="67" fill="#a9abaa">10K</text>
        <text x="10" y="93" fill="#a9abaa">0</text>
        <path d="M24 30 L34 22 L44 28 L54 22 L64 22 L74 28 L82 20 L92 28 L104 28 L114 28 L124 22 L134 28 L150 18" fill="none" stroke="#2d9cf0" strokeWidth={1.6} />
        <path d="M24 68 L34 58 L44 68 L54 50 L64 64 L74 48 L84 60 L94 44 L104 44 L114 52 L124 40 L134 36 L150 30" fill="none" stroke="#45d6a0" strokeWidth={1.6} />
        <path d="M24 86 L34 80 L44 84 L54 78 L64 80 L74 76 L84 80 L94 76 L104 76 L114 80 L124 82 L134 80 L150 80" fill="none" stroke="#ff642d" strokeWidth={1.6} />
      </svg>
      <div className="absolute bottom-[14px] left-[40px] flex w-[140px] justify-between text-[8px] text-[#a9abaa]">
        <span>March 1</span>
        <span>April 1</span>
      </div>
    </div>
  );
}

export function PortraitArt() {
  return (
    <svg viewBox="0 0 273 357" width={273} height={357} className="rounded-lg">
      <defs>
        <linearGradient id="pa-bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2a1a" />
          <stop offset="0.5" stopColor="#5e4527" />
          <stop offset="1" stopColor="#86673a" />
        </linearGradient>
      </defs>
      <rect width="273" height="357" fill="url(#pa-bg)" />
      <path d="M232 20c20 10 34 40 30 80-10-20-26-30-36-30z" fill="#4b5a2e" opacity={0.6} />
      <path d="M120 60c0-40 30-58 62-56 36 2 58 28 56 70-2 40 0 90-8 120l-30-10c6-30 10-70 4-96-10-20-40-24-58-6-12 24-10 70-8 110l-30 4c4-40 12-90 12-136z" fill="#120b07" />
      <ellipse cx="181" cy="96" rx="38" ry="52" fill="#f3c8a4" />
      <path d="M143 88c4-40 30-54 50-50 24 6 30 30 26 52-6-20-20-32-40-30-16 2-28 14-36 28z" fill="#120b07" />
      <circle cx="163" cy="97" r="13" fill="none" stroke="#b5532f" strokeWidth={3.5} />
      <circle cx="201" cy="97" r="13" fill="none" stroke="#b5532f" strokeWidth={3.5} />
      <path d="M176 96h12" stroke="#b5532f" strokeWidth={3.5} />
      <path d="M166 124c8 12 26 12 32 0-10 5-22 5-32 0z" fill="#fff" />
      <path d="M40 357c6-90 50-150 110-176 40-8 90 4 123 30v146z" fill="#8fd0f4" />
      <path d="M60 357c10-60 30-100 70-130 10 40 0 90-20 130z" fill="#45aee2" />
      <path d="M0 250c20-6 44 0 62 14 10 18 8 50-6 72-20 6-40 0-56-10z" fill="#f2c9a6" />
      <path d="M50 300l60-20 30 77H70z" fill="#d6dde0" />
      <path d="M56 305l50-17 24 60" fill="none" stroke="#9aa3a8" strokeWidth={2} />
    </svg>
  );
}
