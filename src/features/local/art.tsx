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

const iso = "matrix(0.866,0.5,-0.866,0.5,0,0)";

function IsoCard({ x, y, w, h, children, dark }: { x: number; y: number; w: number; h: number; children?: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`absolute rounded-[10px] ${dark ? "bg-[#23262d]" : "bg-white"} shadow-[0_8px_24px_rgba(30,40,60,0.12),0_0_1px_rgba(30,40,60,0.2)]`}
      style={{ left: x, top: y, width: w, height: h, transform: iso, transformOrigin: "0 0" }}
    >
      {children}
    </div>
  );
}

const Line = ({ w, c = "#e6e8ec", t = 0, l = 0 }: { w: number; c?: string; t?: number; l?: number }) => (
  <div className="h-[6px] rounded-full" style={{ width: w, background: c, marginTop: t, marginLeft: l }} />
);

export function IsoArt() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 500 560" width={500} height={560} className="absolute inset-0">
        <g fill="none" stroke="#d3d6dc" strokeWidth={1.5}>
          <path d="M150 40 200 60 240 90M110 130 150 150M60 230 20 240M130 240 110 290 130 300M80 350 40 360 30 400M340 220 380 240 400 260 370 280M30 470 60 480M180 330 190 380" />
        </g>
        <g fill="#d3d6dc">
          <circle cx="240" cy="90" r="3" />
          <circle cx="370" cy="280" r="3" />
          <circle cx="130" cy="300" r="3" />
          <circle cx="30" cy="400" r="3" />
        </g>
      </svg>
      <IsoCard x={40} y={-10} w={120} h={130} dark>
        <div className="absolute top-[40px] left-[30px] h-[12px] w-[12px] rounded-[3px] bg-[#2d6fe0]" />
        <div className="absolute top-[60px] left-[20px] text-[8px] text-white/80">Your business on maps</div>
        <svg viewBox="0 0 120 130" className="absolute inset-0">
          <path d="M0 80 120 40M20 0l40 130M80 0l10 130" stroke="#e8a33c" strokeOpacity={0.5} />
        </svg>
      </IsoCard>
      <IsoCard x={300} y={50} w={210} h={200}>
        <div className="px-[14px] pt-[12px]">
          <div className="text-[11px] font-bold text-[#1f1f24]">Business name</div>
          <div className="mt-[6px] h-[4px] w-[120px] rounded-full bg-[#e6e8ec]">
            <div className="h-full w-[60px] rounded-full bg-[#62b3f5]" />
          </div>
          <div className="mt-[10px] grid grid-cols-[50px_1fr] gap-y-[7px] text-[7px] text-[#5f6068]">
            {["Address:", "Phone:", "Service area:", "Categories:", "Photos:"].map((l) => (
              <span key={l} className="contents">
                <span>{l}</span>
                <Line w={90} />
              </span>
            ))}
          </div>
          <div className="mt-[12px] flex gap-[8px] text-[7px] text-[#8b8c91]">
            <span>Your Listings</span>
            <span>Duplicates</span>
            <span>User Suggestions</span>
          </div>
          <div className="mt-[6px] flex h-[4px] w-[170px] overflow-hidden rounded-full">
            <span className="w-[40%] bg-[#35c28c]" />
            <span className="w-[35%] bg-[#62b3f5]" />
            <span className="w-[25%] bg-[#f06a6a]" />
          </div>
          <div className="mt-[8px] flex gap-[16px] text-[7px] text-[#62b3f5]">
            <span>Opt out</span>
            <span>View listing</span>
          </div>
        </div>
      </IsoCard>
      <IsoCard x={150} y={250} w={90} h={80}>
        <div className="absolute top-[20px] left-[16px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#1877f2] text-[10px] font-bold text-white">f</div>
        <div className="absolute top-[40px] left-[16px] text-[8px] text-[#5f6068]">Your listings</div>
      </IsoCard>
      <IsoCard x={290} y={300} w={180} h={140}>
        <div className="absolute top-0 right-0 h-[140px] w-[80px] rounded-r-[10px] bg-gradient-to-b from-[#d9dfe6] to-[#9aa3ad]" />
        <div className="px-[12px] pt-[14px] text-[9px] font-bold text-[#1f1f24]">Your Google Business profile</div>
        <div className="mt-[4px] px-[12px] text-[7px] text-[#f5a623]">★★★★★</div>
        <div className="mt-[14px] flex gap-[10px] px-[12px]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-[14px] w-[14px] rounded-full border ${i ? "border-[#c9cacf]" : "border-[#2d6fe0] bg-[#2d6fe0]"}`} />
          ))}
        </div>
      </IsoCard>
      <IsoCard x={60} y={340} w={90} h={90} />
      <div className="absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-t from-white to-transparent" />
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
        <div className="mt-[6px] flex gap-[5px] px-[8px] text-[7.5px]">
          <span className="flex h-[21px] items-center gap-[4px] rounded-full bg-[#1a73e8] px-[9px] text-white">◆ Directions</span>
          {["Start", "Call", "Save"].map((l) => (
            <span key={l} className="flex h-[21px] items-center rounded-full border border-[#dadce0] px-[8px] text-[#1a73e8]">
              {l}
            </span>
          ))}
        </div>
        <div className="mt-[8px] flex h-[168px] gap-[4px] px-[8px]">
          <div className="w-[135px] overflow-hidden rounded-[4px]">
            <FoodTile kind={food[0]} />
          </div>
          <div className="flex flex-1 flex-col gap-[4px]">
            <div className="flex-1 overflow-hidden rounded-[4px]">
              <FoodTile kind={food[1]} />
            </div>
            <div className="flex-1 overflow-hidden rounded-[4px]">
              <FoodTile kind={food[2]} />
            </div>
          </div>
        </div>
        <div className="mt-[8px] flex justify-between border-b border-[#e8eaed] px-[10px] pb-[4px] text-[7.5px] text-[#5f6368]">
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
