import type { ReactNode } from "react";
import { LogoIcon } from "@/components/icons";
import { FirebaseIcon } from "./ReportIcons";

const box = "absolute rounded-md border border-dashed border-[#dfe2e6]";
const blue = "text-[#1c8ff5]";

function Tile({ x, y, size = 41, className = "", children }: { x: number; y: number; size?: number; className?: string; children: ReactNode }) {
  return (
    <div
      style={{ left: x, top: y, width: size, height: size }}
      className={`absolute flex items-center justify-center rounded-lg shadow-[0_4px_14px_rgba(25,27,35,0.14)] ${className}`}
    >
      {children}
    </div>
  );
}

const legend = [
  { label: "Paid search", pct: "33%", ch: "29%", up: true, c: "#29a8f5" },
  { label: "Organic", pct: "56%", ch: "18%", up: false, c: "#5ad6a6" },
  { label: "Social", pct: "7%", ch: "4%", up: true, c: "#fb5d2e" },
  { label: "Other", pct: "4%", ch: "1%", up: false, c: "#c9cbd0" },
];

function Delta({ v, up, className = "" }: { v: string; up: boolean; className?: string }) {
  return <span className={`${up ? "text-[#13a36e]" : "text-[#e0304e]"} ${className}`}>{`${up ? "↑" : "↓"}${v}`}</span>;
}

export function ReportMock() {
  return (
    <div className="relative h-[519px] overflow-hidden rounded-xl border border-[#e3e5e9] bg-[#f3f4f6] text-[#3a3d46]" aria-hidden>
      <div className="absolute top-[29px] left-[79px] h-[520px] w-[660px] rounded-t-md bg-white shadow-[0_0_14px_rgba(25,27,35,0.06)]">
        <div style={{ left: 16, top: 9, width: 140, height: 38 }} className={`${box} flex items-center gap-4 pl-[5px]`}>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded bg-[#cfe6fb]">
            <svg viewBox="0 0 20 20" width={18} height={18}>
              <rect x="3" y="7" width="14" height="9" rx="1.5" fill="#3a3d46" />
              <circle cx="10" cy="11.5" r="2.6" fill="#f3c63f" />
              <path d="M7 7l1.2-2h3.6L13 7" fill="#3a3d46" />
            </svg>
          </span>
          <span className="text-[13px] font-semibold text-[#1c8ff5] underline decoration-dotted underline-offset-4">Your Logo</span>
        </div>
        <div style={{ left: 527, top: 9, width: 115, height: 38 }} className={`${box} flex items-center justify-center gap-2 text-[13px] text-[#6a6c6a]`}>
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M3 13l1-3.5 6.5-6.5 2.5 2.5L6.5 12zM9.5 4l2.5 2.5" fill="none" stroke="#8b8d8c" strokeWidth={1.2} strokeLinejoin="round" />
          </svg>
          June 2025
        </div>
        <div className="absolute top-[53px] right-0 left-0 border-t border-dashed border-[#e3e5e9]" />
        <div style={{ left: 16, top: 61, width: 626, height: 56 }} className={`${box} flex items-center justify-center text-[24px] font-bold`}>
          Digital Marketing Report
        </div>
        <div style={{ left: 16, top: 124, width: 356, height: 185 }} className={box}>
          <div className="absolute top-[9px] left-[8px] text-[14px] font-semibold">Sessions by Source</div>
          <svg viewBox="0 0 120 120" width={120} height={120} className="absolute top-[46px] left-[8px]">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#5ad6a6" strokeWidth="20" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#29a8f5" strokeWidth="20" strokeDasharray="103.7 314.2" transform="rotate(-90 60 60)" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#fb5d2e" strokeWidth="20" strokeDasharray="22 314.2" transform="rotate(-137 60 60)" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#c9cbd0" strokeWidth="20" strokeDasharray="12.6 314.2" transform="rotate(-104 60 60)" />
            <text x="60" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="#3a3d46" fontFamily="Inter, sans-serif">
              6.2K
            </text>
          </svg>
          <div className="absolute top-[60px] left-[142px] w-[206px] text-[12px] leading-6">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center">
                <span className="mr-[6px] h-2 w-2 rounded-full" style={{ background: l.c }} />
                <span className="flex-1 font-medium text-[#555861]">{l.label}</span>
                <span className="w-9 text-right text-[#8b8d8c]">{l.pct}</span>
                <Delta v={l.ch} up={l.up} className="w-[54px] text-right" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ left: 380, top: 124, width: 262, height: 131 }} className={box}>
          <div className="absolute top-[9px] left-[8px] text-[14px] font-semibold">Spend</div>
          <div className="absolute top-[52px] left-[8px] flex items-baseline gap-[6px]">
            <span className={`text-[32px] leading-10 font-bold ${blue}`}>1,248$</span>
            <Delta v="14%" up={false} className="text-[11px] font-semibold" />
          </div>
        </div>
        <div style={{ left: 380, top: 262, width: 262, height: 133 }} className={`${box} bg-[#eaf6fe]`} />
        <div style={{ left: 16, top: 317, width: 356, height: 220 }} className={box}>
          <div className="absolute top-[9px] left-[8px] text-[14px] font-semibold">Organic Search: Traffic Chart</div>
          <svg viewBox="0 0 356 200" width={356} height={200} className="absolute top-[30px] left-0">
            {[
              ["15K", 20],
              ["7.5K", 79],
              ["0", 138],
            ].map(([t, y]) => (
              <g key={t}>
                <text x="40" y={+y + 4} textAnchor="end" fontSize="11" fill="#6a6c6a" fontFamily="Inter, sans-serif">
                  {t}
                </text>
                <line x1="48" x2="350" y1={y} y2={y} stroke="#e7e8ec" />
              </g>
            ))}
            {[86, 186, 256, 318].map((x) => (
              <line key={x} x1={x} x2={x} y1="14" y2="150" stroke="#e7e8ec" />
            ))}
            <polyline
              points="56,74 64,68 72,74 82,62 90,62 97,70 105,60 112,70 120,56 140,56 148,52 158,52 170,48 180,56 196,52 212,50 222,50 236,56 248,60 262,60 268,54 280,52 294,48 306,40 314,32 322,42 332,32 340,32"
              fill="none"
              stroke="#29a8f5"
              strokeWidth="1.8"
            />
            <polyline
              points="56,126 64,122 72,126 82,118 90,120 97,116 105,120 112,114 120,114 140,114 148,112 158,116 170,112 180,114 196,112 212,114 222,114 236,116 248,116 262,114 268,110 280,112 294,108 306,104 314,100 322,106 332,98 340,98"
              fill="none"
              stroke="#5ad6a6"
              strokeWidth="1.8"
            />
          </svg>
        </div>
        <div style={{ left: 380, top: 402, width: 262, height: 140 }} className={box}>
          <div className="absolute top-[9px] left-[8px] text-[14px] font-semibold">Facebook Likes</div>
          <div className="absolute top-[42px] left-[8px] flex items-baseline gap-[6px]">
            <span className={`flex items-center text-[32px] leading-10 font-bold ${blue}`}>
              4,096
              <svg viewBox="0 0 20 20" width={22} height={22} className="ml-[1px]">
                <path d="M10 17S2.5 12.4 2.5 7.3A3.8 3.8 0 0 1 10 5.6a3.8 3.8 0 0 1 7.5 1.7C17.5 12.4 10 17 10 17z" fill="currentColor" />
              </svg>
            </span>
            <Delta v="56%" up className="text-[11px] font-semibold" />
          </div>
        </div>
      </div>

      <div className="absolute top-[271px] left-[573px] h-[136px] w-[261px] -rotate-[1.5deg] rounded-md border border-dashed border-[#dfe2e6] bg-white shadow-[0_8px_24px_rgba(25,27,35,0.12)]">
        <div className="absolute top-[11px] left-[8px] text-[14px] font-semibold">Sessions Conversion</div>
        <div className="absolute top-[28px] left-[8px] flex items-baseline gap-2">
          <span className={`text-[36px] leading-[44px] font-bold ${blue}`}>22%</span>
          <Delta v="3.1%" up className="text-[11px] font-semibold" />
        </div>
        <svg viewBox="0 0 240 70" width={240} height={70} className="absolute top-[57px] left-[10px]">
          <path d="M0 68 L20 34 L42 44 L60 30 L85 36 L105 40 L128 36 L147 40 L175 34 L195 26 L218 10 L240 6 L240 64 L0 68Z" fill="#d6effd" />
          <polyline points="0,68 20,34 42,44 60,30 85,36 105,40 128,36 147,40 175,34 195,26 218,10 240,6" fill="none" stroke="#5bb8ee" strokeWidth="1.2" />
          <circle cx="60" cy="30" r="4" fill="#1c8ff5" />
        </svg>
      </div>

      <Tile x={609} y={138} className="bg-[#1877f2]">
        <svg viewBox="0 0 20 20" width={22} height={22}>
          <path d="M11.2 17v-6h2l.3-2.4h-2.3V7.2c0-.7.2-1.1 1.2-1.1h1.2V4a15 15 0 0 0-1.8-.1c-1.8 0-3 1.1-3 3.1v1.6H6.8V11h2v6z" fill="#fff" />
        </svg>
      </Tile>
      <Tile x={798} y={252} size={40} className="bg-white">
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path d="M9 4.5l-6 10.4a3 3 0 0 0 5.2 3L14.2 7.5A3 3 0 0 0 9 4.5z" fill="#fbbc04" />
          <path d="M15 4.5a3 3 0 0 0-5.2 3l6 10.4a3 3 0 0 0 5.2-3z" fill="#4285f4" />
          <circle cx="5.6" cy="16.4" r="3" fill="#34a853" />
        </svg>
      </Tile>
      <Tile x={780} y={438} size={39} className="bg-white">
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path
            d="M12 3.5c-4.5 0-7.5 3.3-7.5 7.3 0 2 .7 3.7 2 5l-.5 2.5 2.5-.6c1 .5 2.2.8 3.5.8 4.5 0 7.5-3.3 7.5-7.5S16.5 3.5 12 3.5z"
            fill="#1b1e1a"
          />
          <circle cx="14.2" cy="10.2" r="1.2" fill="#fff" />
          <path d="M9 14c1.5 1.2 4.5 1.2 6 0" fill="none" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
        </svg>
      </Tile>
      <Tile x={83} y={186} size={40} className="bg-white">
        <FirebaseIcon width={24} height={24} />
      </Tile>
      <Tile x={53} y={343} className="bg-[#ff642d]">
        <LogoIcon width={24} height={24} />
      </Tile>
    </div>
  );
}
