import type { ReactNode } from "react";

export function StepArt({ n }: { n: number }) {
  const blob = <path d="M8 14c6-10 30-12 44-6s14 22 8 34-24 18-38 14S2 24 8 14z" fill="#a974f5" />;
  const ink = { fill: "none", stroke: "#1b0e33", strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const parts: ReactNode[] = [
    <g key="0">
      {blob}
      <rect x="6" y="18" width="42" height="28" rx="3" {...ink} fill="#e8dcff" />
      <path d="M11 26h14M11 32h10M11 38h16" {...ink} />
      <circle cx="40" cy="30" r="10" {...ink} fill="#c9b0ff" />
      <path d="m47 37 10 10" {...ink} strokeWidth={4} />
    </g>,
    <g key="1">
      {blob}
      <rect x="12" y="10" width="40" height="30" rx="3" {...ink} fill="#e8dcff" />
      <circle cx="24" cy="22" r="5" {...ink} fill="#c9b0ff" />
      <path d="M33 19h13M33 25h10M18 33h28" {...ink} />
      <path d="M20 44c6 8 20 10 30 2l4 4" {...ink} strokeWidth={3} />
    </g>,
    <g key="2">
      {blob}
      <path d="M8 40 26 30l26 8-18 12z" {...ink} fill="#e8dcff" />
      <path d="M32 36s10-10 10-18a10 10 0 0 0-20 0c0 8 10 18 10 18z" {...ink} fill="#c9b0ff" />
      <circle cx="32" cy="18" r="4" {...ink} fill="#fff" />
      <path d="M40 8h12M46 2v12" {...ink} />
    </g>,
  ];
  return (
    <svg viewBox="0 0 64 60" width={66} height={62} className="-mt-[6px] shrink-0">
      {parts[n]}
    </svg>
  );
}

const iso = "matrix(0.731,0.682,-0.857,0.515,0,0)";

function IsoCard({ x, y, w, h, children, dark, faint }: { x: number; y: number; w: number; h: number; children?: ReactNode; dark?: boolean; faint?: boolean }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[8px] ${dark ? "bg-[#1f2226]" : "bg-white"} ${faint ? "shadow-[0_4px_16px_rgba(30,40,60,0.06)]" : "shadow-[0_6px_20px_rgba(30,40,60,0.12),0_0_1px_rgba(30,40,60,0.2)]"}`}
      style={{ left: x, top: y, width: w, height: h, transform: iso, transformOrigin: "0 0" }}
    >
      {children}
    </div>
  );
}

const Bar = ({ x, y, w, c = "#e6e8ec", h = 4 }: { x: number; y: number; w: number; c?: string; h?: number }) => (
  <div className="absolute rounded-full" style={{ left: x, top: y, width: w, height: h, background: c }} />
);

const T = ({ x, y, children, c = "#6b6c72", s = 6, b }: { x: number; y: number; children: ReactNode; c?: string; s?: number; b?: boolean }) => (
  <div className="absolute leading-none whitespace-nowrap" style={{ left: x, top: y, color: c, fontSize: s, fontWeight: b ? 700 : 400 }}>
    {children}
  </div>
);

export function IsoArt() {
  return (
    <div className="absolute top-[-80px] left-0 h-[640px] w-[500px] overflow-hidden">
      <svg viewBox="0 0 500 640" width={500} height={640} className="absolute inset-0">
        <g fill="none" stroke="#c9ccd1" strokeWidth={1}>
          <path d="M126 83h20c6 0 8 2 12 6l40 32" />
          <path d="M133 279h-60l-40 20M133 279l-20 12c-4 3-4 6 0 10l12 10c4 4 2 8-3 10l-10 5" />
          <path d="M358 268l20 18c5 5 5 9-1 13l-62 42" />
          <path d="M73 410l-20 12c-4 3-4 6 0 10l12 10M73 410l-30-4" />
        </g>
        <g fill="#c9ccd1">
          <circle cx="198" cy="121" r="2.5" />
          <circle cx="133" cy="279" r="2.5" />
          <circle cx="358" cy="268" r="2.5" />
          <circle cx="73" cy="410" r="2.5" />
        </g>
      </svg>
      <IsoCard x={-34} y={254} w={90} h={60} faint />
      <IsoCard x={26} y={442} w={80} h={60} faint />
      <IsoCard x={48} y={28} w={139} h={133} dark>
        <svg viewBox="0 0 139 133" className="absolute inset-0">
          <path d="M0 70 139 40M30 0l30 133M95 0l10 133M0 110l139-30" stroke="#d89a3a" strokeOpacity={0.55} strokeWidth={1.2} fill="none" />
          <path d="M0 30 70 20l69 30M50 133 80 60" stroke="#4a4f57" strokeWidth={2} fill="none" />
          <circle cx="22" cy="118" r="7" fill="none" stroke="#5c6168" strokeWidth={2} />
        </svg>
        <div className="absolute top-[42px] left-[30px] h-[12px] w-[12px] rounded-[3px] bg-[#2d7ff0]" />
        <T x={46} y={46} c="#fff" s={7}>
          Your business on maps
        </T>
      </IsoCard>
      <IsoCard x={266} y={82} w={220} h={235}>
        <T x={16} y={12} c="#1f1f24" s={8} b>
          Business name
        </T>
        <Bar x={86} y={15} w={22} c="#62b3f5" h={3} />
        <T x={112} y={13} s={5.5}>
          80% completed
        </T>
        <T x={170} y={13} c="#2d7ff0" s={7}>
          ✎ Edit
        </T>
        <div className="absolute top-[34px] left-[66px] h-[92px] w-[140px] rounded-[4px] bg-[#f5f6f8]" />
        {["Address:", "Phone:", "Service area:", "Categories:", "Photos:"].map((l, i) => (
          <div key={l} className="absolute w-[58px] text-right text-[6.5px] leading-none text-[#6b6c72]" style={{ top: 45 + i * 15.5, left: 2 }}>
            {l}
          </div>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Bar key={i} x={76} y={46 + i * 15.5} w={[90, 70, 110, 80][i]} />
        ))}
        <T x={76} y={108} c="#8e5ff5" s={6.5}>
          ▣ +12
        </T>
        <T x={14} y={136} c="#1f1f24" s={6.5}>
          Your Listings
        </T>
        <Bar x={14} y={145} w={40} c="#1f1f24" h={1} />
        <T x={62} y={136} s={6.5}>
          Duplicates
        </T>
        <T x={106} y={136} s={6.5}>
          User Suggestions
        </T>
        {[
          ["#35c28c", 15, "Connected"],
          ["#8cc3f5", 76, "Processing"],
          ["#f04b4b", 134, "Unavailable"],
        ].map(([c, x, l]) => (
          <div key={l as string} className="absolute flex items-center gap-[4px] text-[6.5px] leading-none text-[#1f1f24]" style={{ left: x as number, top: 155 }}>
            <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: c as string }} />
            {l}
          </div>
        ))}
        <div className="absolute top-[170px] left-[15px] flex h-[3px] w-[181px] overflow-hidden rounded-full">
          <span className="w-[129px] bg-[#35c28c]" />
          <span className="w-[32px] bg-[#b6dcf8]" />
          <span className="w-[20px] bg-[#f07a7a]" />
        </div>
        <T x={14} y={186} s={6}>
          Directory
        </T>
        <T x={71} y={186} s={6}>
          Status
        </T>
        <T x={117} y={186} s={6}>
          Actions
        </T>
        <Bar x={14} y={203} w={40} />
        <Bar x={14} y={220} w={30} />
        <span className="absolute top-[199px] left-[74px] h-[11px] w-[11px] rounded-full bg-[#dff5ea]" />
        <span className="absolute top-[216px] left-[76px] h-[11px] w-[11px] rounded-full bg-[#e2effd]" />
        <T x={115} y={201} c="#2d7ff0" s={6}>
          Opt out
        </T>
        <T x={141} y={201} c="#2d7ff0" s={6}>
          View listing
        </T>
        <T x={115} y={218} c="#9cc6f5" s={6}>
          Opt out
        </T>
        <T x={141} y={218} c="#9cc6f5" s={6}>
          View listing
        </T>
      </IsoCard>
      <IsoCard x={71} y={334} w={84} h={54}>
        <T x={14} y={11} s={7}>
          Your listings
        </T>
        <div className="absolute top-[28px] left-[10px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#1877f2] text-[10px] font-bold text-white">f</div>
      </IsoCard>
      <IsoCard x={286} y={334} w={144} h={158}>
        <div className="absolute top-0 left-0 h-[64px] w-[144px] bg-[linear-gradient(90deg,#dfe8ec_0%,#c9d4d8_45%,#8f9aa0_100%)]">
          <div className="absolute top-[20px] left-[60px] h-[30px] w-[40px] rounded-full bg-[#2b2522]" />
          <div className="absolute top-[34px] left-[95px] h-[26px] w-[40px] rounded-full bg-[#f1ece6]" />
        </div>
        <T x={6} y={70} c="#1f1f24" s={8}>
          Your Google Business profile
        </T>
        <T x={6} y={81} s={5.5}>
          4.2 <span className="text-[#fbbc05]">★★★★★</span> (90)
        </T>
        <T x={6} y={89} s={5.5}>
          Advertising agency
        </T>
        <T x={10} y={100} c="#2d7ff0" s={6}>
          Overview
        </T>
        <Bar x={10} y={108} w={26} c="#2d7ff0" h={1.5} />
        <T x={60} y={100} s={6}>
          Reviews
        </T>
        <T x={108} y={100} s={6}>
          About
        </T>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`absolute top-[120px] h-[14px] w-[14px] rounded-full ${i ? "border border-[#8ab4f8]" : "bg-[#1a73e8]"}`} style={{ left: 8 + i * 27 }} />
        ))}
      </IsoCard>
    </div>
  );
}

export function CafeScene({ variant = 0 }: { variant?: number }) {
  const apron = variant ? "#1f1f24" : "#4a4b52";
  const top = variant ? "#e9e4dc" : "#9fb2c8";
  return (
    <svg viewBox="0 0 310 245" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id={`cafe-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={variant ? "#6b4a36" : "#7a5a44"} />
          <stop offset="0.6" stopColor={variant ? "#c9b39a" : "#b89478"} />
          <stop offset="1" stopColor="#e8dccd" />
        </linearGradient>
      </defs>
      <rect width="310" height="245" fill={`url(#cafe-bg-${variant})`} />
      <g fill="#3c2a1e" opacity={0.35}>
        <rect x="170" y="20" width="130" height="8" />
        <rect x="170" y="70" width="130" height="8" />
        {[180, 200, 220, 240, 260, 280].map((x) => (
          <rect key={x} x={x} y={30} width="10" height="38" rx="3" />
        ))}
      </g>
      {variant ? (
        <g>
          <rect x="190" y="110" width="110" height="60" rx="6" fill="#8d9096" />
          <rect x="200" y="120" width="90" height="16" rx="3" fill="#4b4e55" />
          <circle cx="215" cy="150" r="7" fill="#2d2f33" />
          <circle cx="245" cy="150" r="7" fill="#2d2f33" />
        </g>
      ) : (
        <g>
          <rect x="30" y="190" width="170" height="10" rx="2" fill="#d9d4cc" />
          <rect x="60" y="150" width="120" height="42" rx="4" fill="#c7ccd3" />
        </g>
      )}
      <g transform={variant ? "translate(40 20)" : "translate(80 20)"}>
        <path d="M20 245c0-60 20-100 70-110s80 40 80 110z" fill={top} />
        <path d="M60 245c0-50 10-80 30-90s40 20 40 90z" fill={apron} />
        <rect x="80" y="100" width="22" height="30" rx="8" fill="#b07a55" />
        <ellipse cx="91" cy="78" rx="30" ry="36" fill="#c08a64" />
        <path d="M58 70c0-30 20-44 36-44s34 14 32 44c-8-16-18-22-34-22s-26 8-34 22z" fill="#2a1a12" />
        {variant ? <path d="M60 64c-6 30-4 70 6 96l10-30c-6-20-8-40-4-60z" fill="#2a1a12" /> : <circle cx="94" cy="28" r="14" fill="#2a1a12" />}
        <path d="M80 94c6 5 16 5 22 0" fill="none" stroke="#7a3e2a" strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

function FoodTile({ kind }: { kind: number }) {
  const scenes = [
    <g key="0">
      <rect width="100" height="100" fill="#e9eaec" />
      <path d="M38 30h24l-4 18c10 6 14 18 12 30-2 10-8 14-20 14s-18-4-20-14c-2-12 2-24 12-30z" fill="#f4f6f8" stroke="#b9bcc2" />
      <path d="M31 70c6-6 32-6 38 0-2 10-8 16-19 16s-17-6-19-16z" fill="#3a2418" />
      <path d="M40 38c-6-14 4-22 20-26" fill="none" stroke="#2f3136" strokeWidth={2} />
    </g>,
    <g key="1">
      <rect width="100" height="100" fill="#6a8fa8" />
      <ellipse cx="50" cy="70" rx="40" ry="14" fill="#e9eef2" />
      <rect x="30" y="34" width="40" height="34" rx="6" fill="#7a3e22" />
      <circle cx="42" cy="32" r="6" fill="#c0392b" />
      <circle cx="58" cy="30" r="5" fill="#e0a02a" />
    </g>,
    <g key="2">
      <rect width="100" height="100" fill="#4e6a5a" />
      <ellipse cx="50" cy="55" rx="40" ry="30" fill="#f1ede6" />
      <circle cx="40" cy="50" r="10" fill="#e5a83b" />
      <circle cx="60" cy="58" r="9" fill="#c0492b" />
      <path d="M36 66h30" stroke="#6aa84f" strokeWidth={6} strokeLinecap="round" />
    </g>,
    <g key="3">
      <rect width="100" height="100" fill="#d9cdbd" />
      <rect x="30" y="18" width="40" height="64" rx="4" fill="#8b5a3c" />
      <ellipse cx="50" cy="40" rx="30" ry="12" fill="#f4f1ec" />
      <ellipse cx="50" cy="40" rx="12" ry="6" fill="#6b3b1f" />
    </g>,
    <g key="4">
      <rect width="100" height="100" fill="#dfe6e1" />
      <rect x="30" y="20" width="24" height="56" rx="6" fill="#a8c77a" stroke="#fff" strokeWidth={2} />
      <path d="M58 60c10-14 30-10 34 4-8 10-26 12-34-4z" fill="#d8a257" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {scenes[kind]}
    </svg>
  );
}

export function GbpProfileCard({ name, food = [0, 1, 2], scale = 1 }: { name: string; food?: number[]; scale?: number }) {
  return (
    <div className="overflow-hidden rounded-[6px] bg-white shadow-[0_6px_24px_rgba(20,10,50,0.25)]" style={{ width: 226 * scale, height: 310 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "0 0", width: 226 }}>
        <div className="px-[8px] pt-[7px] text-[7.5px] leading-[10px] text-[#70757a]">
          <div className="text-[10px] leading-[12px] text-[#202124]">{name}</div>
          <div>
            4.8 <span className="text-[#fbbc05]">★★★★★</span> (1748)
          </div>
          <div>Coffee shop · 21 min</div>
          <div>
            <span className="text-[#188038]">Open</span> · Closes 20:00
          </div>
        </div>
        <div className="mt-[8px] flex gap-[5px] pl-[8px] text-[7.5px] whitespace-nowrap">
          <span className="flex h-[21px] items-center gap-[4px] rounded-full bg-[#1a73e8] pr-[9px] pl-[5px] text-white">
            <svg viewBox="0 0 12 12" width={12} height={12}>
              <path d="M6 .8 11.2 6 6 11.2.8 6z" fill="#fff" />
              <path d="M4 7.6V5.8h3.2M6.3 4.6l1.2 1.2-1.2 1.2" fill="none" stroke="#1a73e8" strokeWidth={0.9} />
            </svg>
            Directions
          </span>
          {[
            ["Start", "M6 1.5 10 10.5 6 8.6 2 10.5z"],
            ["Call", "M3.2 1.5 5 3.6 4 5c.6 1.3 1.6 2.3 3 3l1.4-1 2.1 1.8-.8 1.7C5.8 10.3 1.7 6.2 1.5 2.3z"],
            ["Save", "M3 1.5h6v9L6 8.2 3 10.5z"],
          ].map(([l, d]) => (
            <span key={l} className="flex h-[21px] shrink-0 items-center gap-[4px] rounded-full border border-[#dadce0] pr-[9px] pl-[6px] text-[#1a73e8]">
              <svg viewBox="0 0 12 12" width={10} height={10}>
                <path d={d} fill={l === "Start" ? "#1a73e8" : "none"} stroke="#1a73e8" strokeWidth={1.1} strokeLinejoin="round" />
              </svg>
              {l}
            </span>
          ))}
        </div>
        <div className="mt-[10px] flex h-[168px] gap-[5px] pl-[8px]">
          <div className="w-[135px] shrink-0 overflow-hidden rounded-[4px]">
            <FoodTile kind={food[0]} />
          </div>
          <div className="flex w-[90px] shrink-0 flex-col gap-[4px]">
            <div className="flex-1 overflow-hidden rounded-[4px]">
              <FoodTile kind={food[1]} />
            </div>
            <div className="flex-1 overflow-hidden rounded-[4px]">
              <FoodTile kind={food[2]} />
            </div>
          </div>
        </div>
        <div className="mt-[6px] flex justify-between border-b border-[#e8eaed] px-[10px] pb-[4px] text-[7.5px] text-[#5f6368]">
          <span className="border-b-2 border-[#1a73e8] pb-[3px] text-[#1a73e8]">Overview</span>
          <span>Reviews</span>
          <span>Photos</span>
          <span>Updates</span>
          <span>About</span>
        </div>
        <div className="flex justify-between px-[8px] pt-[6px] text-[7px] text-[#5f6368]">
          <span>✓ In-store shopping · ✓ Delivery</span>
          <span>›</span>
        </div>
      </div>
    </div>
  );
}
