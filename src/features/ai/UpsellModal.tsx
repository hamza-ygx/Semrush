"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { brand } from "@/config/brand";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import { aiButton } from "./landing";

const card = "absolute rounded-[14px] bg-white shadow-[0_4px_24px_rgba(98,94,196,0.12)]";

function Bar({ w, c = "#edefef", h = 6 }: { w: number; c?: string; h?: number }) {
  return <span className="block rounded-full" style={{ width: w, height: h, background: c }} />;
}

export function Gauge({ size = 100, label = true }: { size?: number; label?: boolean }) {
  return (
    <svg viewBox="0 0 100 60" width={size} height={size * 0.6} aria-hidden>
      <defs>
        <radialGradient id="rk-gauge-fill" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="#fff6dc" />
          <stop offset="100%" stopColor="#ffe7a8" />
        </radialGradient>
      </defs>
      <path d="M6 56a44 44 0 0 1 88 0" fill="url(#rk-gauge-fill)" stroke="#fff3d6" strokeWidth={10} />
      <path d="M6 56a44 44 0 0 1 22-38" fill="none" stroke="#ffa94d" strokeWidth={10} strokeLinecap="round" />
      {label && (
        <>
          <text x="46" y="36" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f08c00">
            31
          </text>
          <text x="61" y="36" textAnchor="middle" fontSize="7" fill="#f0a040">
            /100
          </text>
          <text x="50" y="52" textAnchor="middle" fontSize="15" fontWeight="700" fill="#f08c00">
            Low
          </text>
        </>
      )}
    </svg>
  );
}

function LeftArt() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-[270px]">
      <div className={`${card} top-[18px] left-[-6px] h-[150px] w-[210px] -rotate-[4deg] px-4 pt-[20px]`}>
        <div className="text-[14px] text-[#8b8d8c]">Competitor Analysis</div>
        <div className="mt-[12px] flex items-center gap-2">
          <span className="h-[7px] w-[7px] rounded-full bg-[#8fd7f5]" />
          <Bar w={70} />
          <span className="h-[7px] w-[7px] rounded-full bg-[#b58af2]" />
          <Bar w={60} />
        </div>
        <svg viewBox="0 0 180 60" width={180} height={60} className="mt-[6px]">
          <path d="M0 40c20-4 30 6 50-8s30 4 50-6 30-8 50-20 20-4 30-6" fill="none" stroke="#8fd7f5" strokeWidth={1.6} />
          <path d="M0 56c20-2 30-14 50-6s30-16 50-8 30-6 50-14 20-8 30-12" fill="none" stroke="#c9a4fb" strokeWidth={1.6} />
        </svg>
      </div>
      <div className={`${card} top-[48px] left-[180px] flex h-[76px] w-[72px] rotate-[6deg] items-center justify-center`}>
        <GoogleIcon width={46} height={46} />
      </div>
      <div className={`${card} top-[158px] left-0 h-[198px] w-[240px] px-5 pt-[20px]`}>
        <div className="text-[14px] text-[#8b8d8c]">Domain Analytics</div>
        <div className="mt-[14px] grid grid-cols-2 text-[12px] text-[#8b8d8c]">
          <span>Authority Score</span>
          <span>Organic Traffic</span>
        </div>
        <div className="mt-[4px] grid grid-cols-2 items-center">
          <span className="flex items-center gap-[6px] text-[20px] font-semibold text-[#8fb6f5]">
            74 <span className="rounded-full bg-[#dff7ee] px-2 text-[12px] font-normal text-[#3aa98a]">Good</span>
          </span>
          <span className="text-[20px] font-semibold text-[#8fb6f5]">136.2M</span>
        </div>
        <div className="mt-[14px] flex items-end justify-between">
          <Bar w={86} />
          <svg viewBox="0 0 90 40" width={90} height={40}>
            <path d="M0 38c10 0 12-16 22-14s10 10 20 4 12-26 22-24 10 26 26 30" fill="none" stroke="#8fb6f5" strokeWidth={1.6} />
          </svg>
        </div>
      </div>
      <div className={`${card} top-[316px] left-0 h-[140px] w-[206px] px-4 pt-[14px]`}>
        <div className="text-[14px] text-[#8b8d8c]">Site Audit</div>
        <div className="mt-[10px] flex gap-3">
          <svg viewBox="0 0 80 50" width={78} height={48}>
            <path d="M8 46a32 32 0 0 1 64 0" fill="none" stroke="#e8f3fd" strokeWidth={8} />
            <path d="M8 46a32 32 0 0 1 52-24" fill="none" stroke="#8fd7f5" strokeWidth={8} />
            <text x="40" y="42" textAnchor="middle" fontSize="13" fontWeight="600" fill="#6fc3ea">
              75%
            </text>
          </svg>
          <svg viewBox="0 0 80 50" width={78} height={48}>
            <path d="M8 46a32 32 0 0 1 64 0" fill="none" stroke="#fdf1e4" strokeWidth={8} />
            <path d="M8 46a32 32 0 0 1 32-32" fill="none" stroke="#ffc98a" strokeWidth={8} />
            <text x="40" y="42" textAnchor="middle" fontSize="13" fontWeight="600" fill="#f5a64a">
              50%
            </text>
          </svg>
        </div>
        <div className="mt-[4px] flex h-[6px] w-[80px] overflow-hidden rounded-full">
          <span className="w-1/2 bg-[#ffc4b0]" />
          <span className="w-1/4 bg-[#ffd9a0]" />
          <span className="w-1/4 bg-[#8fb6f5]" />
        </div>
      </div>
    </div>
  );
}

const bubbles: [number, number, number, string, string, number][] = [
  [12, 63, 12, "#ffc9f3", "#e27ad6", 0.8],
  [72, 56, 36, "#a8f0d6", "#3fbf95", 0.8],
  [116, 80, 30, "#a8dcff", "#3fa2e6", 0.85],
  [180, 69, 25, "#e8d8ff", "#b58af2", 0.9],
  [205, 46, 20, "#ffe0c8", "#f5a64a", 0.9],
];

export function PieGlyph() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <g fill="none" stroke="#a15ff3" strokeWidth={1.6} strokeLinejoin="round">
        <path d="M7 3.2a5.3 5.3 0 1 0 5.8 5.8H7z" />
        <path d="M9.3 1.5v5.2h5.2a5.2 5.2 0 0 0-5.2-5.2z" />
      </g>
    </svg>
  );
}

export function SparkUserGlyph() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <g fill="none" stroke="#a15ff3" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6.5" cy="6" r="2.8" />
        <path d="M1.5 14.5c.6-2.6 2.6-4 5-4 1.2 0 2.2.3 3 .9" />
        <path d="M12.5 1.5v4M10.5 3.5h4" />
      </g>
    </svg>
  );
}

function RightArt() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-[-41px] w-[260px]">
      <div className={`${card} top-[50px] left-[-30px] flex h-[70px] w-[70px] -rotate-[8deg] items-center justify-center`}>
        <ChatGptIcon width={50} height={50} className="text-[#6a6c6a]" />
      </div>
      <div className={`${card} top-[18px] left-[28px] h-[150px] w-[240px] rotate-[3deg] px-4 pt-[18px]`}>
        <div className="text-[14px] text-[#8b8d8c]">Insights</div>
        {[PieGlyph, SparkUserGlyph].map((G, i) => (
          <div key={i} className="mt-[10px] flex h-[36px] items-center gap-[10px] rounded-lg border border-[#e6e2fb] px-3">
            <G />
            <Bar w={150} />
          </div>
        ))}
      </div>
      <div className={`${card} top-[158px] left-[-12px] h-[198px] w-[260px] px-5 pt-[20px]`}>
        <div className="text-[14px] text-[#8b8d8c]">Brand Perfomance</div>
        <svg viewBox="0 0 240 120" width={240} height={120} className="mt-[4px]">
          {bubbles.map(([cx, cy, r, fill, mark, op]) => (
            <g key={cx}>
              <circle cx={cx} cy={cy} r={r} fill={fill} opacity={op} />
              <path d={`M${cx - 3} ${cy}h6M${cx} ${cy - 3}v6`} stroke={mark} strokeWidth={0.8} />
            </g>
          ))}
        </svg>
      </div>
      <div className={`${card} top-[316px] left-[20px] h-[160px] w-[204px] -rotate-[4deg] px-5 pt-[18px]`}>
        <div className="text-[14px] text-[#8b8d8c]">AI Visibility Overview</div>
        <div className="mt-[6px] flex items-start justify-between">
          <Gauge size={120} />
          <div className="flex flex-col gap-[6px] pt-[6px] pr-2">
            <ChatGptIcon width={16} height={16} className="opacity-60" />
            <GoogleIcon width={16} height={16} />
            <GeminiIcon width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UpsellModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const el = document.documentElement;
    const prev = [el.style.overflow, el.style.scrollbarGutter];
    el.style.scrollbarGutter = "stable";
    el.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = prev[0];
      el.style.scrollbarGutter = prev[1];
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      className="fixed top-0 left-0 z-[100] flex h-screen w-screen items-center justify-center bg-[rgba(25,27,35,0.37)]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="Lead the new era of search" className="relative h-[434px] w-[960px] overflow-hidden rounded-xl bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_300px_300px_at_0%_0%,#eef4ff,transparent_70%),radial-gradient(ellipse_300px_300px_at_100%_0%,#f6eeff,transparent_70%)]" />
        <LeftArt />
        <RightArt />
        <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[11px] right-[12px] z-10 flex h-8 w-8 items-center justify-center rounded text-rk-text-2 hover:bg-rk-bg">
          <svg viewBox="0 0 20 20" width={20} height={20}>
            <path d="M3 3l14 14M17 3 3 17" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative mx-auto flex w-[380px] flex-col items-center pt-[56px] text-center">
          <h2 className="text-[32px] leading-[39px] font-semibold text-rk-text">
            Lead the new era
            <br />
            of search
          </h2>
          <p className="mt-[21px] text-[16px] leading-6 font-semibold text-rk-text">Stay ahead of the shift—track your visibility across Google and AI search.</p>
          <ul className="mt-[16px] flex flex-col items-center gap-[8px] text-[16px] leading-6 text-rk-text">
            {["Rank on Google and appear in AI results", "Uncover new growth opportunities", "Stay visible everywhere people search"].map((t) => (
              <li key={t} className="flex items-center gap-[8px]">
                <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden>
                  <path d="m2.5 8.5 3.5 3.5 7.5-8" fill="none" stroke="#a15ff3" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <button type="button" onClick={onClose} className={`mt-[32px] h-10 w-[320px] rounded-md text-[16px] font-medium ${aiButton}`}>
            Switch to {brand.name} One
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
