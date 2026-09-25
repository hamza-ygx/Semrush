import type { CSSProperties, ReactNode } from "react";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";

export const FRAME = "#b980ff";
export const PANEL = "#d7b8fb";
export const EDITOR = "#ede3fc";
export const MUTED = "#8d6fb8";

export function A({
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
  rotate,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  rotate?: number;
}) {
  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y, width: w, height: h, transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}>
      {children}
    </div>
  );
}

export const Line = ({ x, y, w, h = 7 }: { x: number; y: number; w: number; h?: number }) => <A x={x} y={y - h / 2} w={w} h={h} className="rounded-full bg-[#e3e3e8]" />;

export function Chip({ x, y, w, h = 21, children, className = "" }: { x: number; y: number; w: number; h?: number; children: ReactNode; className?: string }) {
  return (
    <A x={x} y={y} w={w} h={h} className={`flex items-center justify-center gap-[5px] rounded-md border border-[#c9a3f7] text-[13px] whitespace-nowrap ${className}`} style={{ color: MUTED }}>
      {children}
    </A>
  );
}

export function Toolbar({ x, y, w, extra, groups = true }: { x: number; y: number; w: number; extra?: ReactNode; groups?: boolean }) {
  const g = "flex h-[26px] items-center gap-[7px] rounded-md border border-[#e3dcef] px-[6px] text-[14px] font-medium text-[#6a6c6a]";
  return (
    <A x={x} y={y} w={w} h={43} className="flex items-center gap-[10px] rounded-lg bg-[#f8f4fe] px-[8px]">
      {extra}
      {groups && (
        <>
          <span className={g}>
            {[1, 2, 3].map((n) => (
              <span key={n}>
                H<span className="text-[9px]">{n}</span>
              </span>
            ))}
          </span>
          <span className={`${g} gap-[14px] px-[10px] font-semibold`}>
            B <i className="font-serif">I</i>
          </span>
          <span className={g}>
            <svg viewBox="0 0 34 14" width={34} height={14} aria-hidden>
              <path d="M5 2h8M5 7h8M5 12h8M21 2h12M21 7h12M21 12h12" stroke="#6a6c6a" strokeWidth={1.4} />
              <circle cx="18" cy="2" r="1" fill="#6a6c6a" />
              <circle cx="18" cy="7" r="1" fill="#6a6c6a" />
              <circle cx="18" cy="12" r="1" fill="#6a6c6a" />
            </svg>
          </span>
        </>
      )}
    </A>
  );
}

export const DocsChip = ({ x, y, w }: { x: number; y: number; w: number }) => (
  <A x={x} y={y} w={w} h={27} className="flex items-center gap-2 rounded-md border border-[#e3dcef] bg-[#f3eefb] px-[8px] text-[14px] whitespace-nowrap text-[#6a6c6a]">
    <svg viewBox="0 0 12 16" width={11} height={14} aria-hidden>
      <path d="M1 1h7l3 3v11H1z" fill="#4c8bf5" />
      <path d="M3 8h6M3 10.5h6M3 13h4" stroke="#fff" strokeWidth={1} />
    </svg>
    Send to Google Docs
  </A>
);

export function FoodBag({ x, y, w = 65, h = 66 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <A x={x} y={y} w={w} h={h} className="overflow-hidden rounded-md bg-[#f0dcd0]">
      <div className="mx-auto mt-[5px] flex h-[56px] w-[42px] flex-col items-center rounded-sm bg-[#e8efe8] pt-[3px] text-[6px] leading-[7px] font-bold text-[#5b6b5b]">
        <span>BEST PUPPY</span>
        <span className="text-[8px] leading-[9px] text-[#3f5a3f]">Dry Food</span>
        <span className="mt-[3px] h-[16px] w-[16px] rounded-full bg-[#f6d9b8]" />
        <span className="mt-[3px] text-[7px]">2025</span>
      </div>
    </A>
  );
}

export const TitleKeywords = ({ x, y, h1, title }: { x: number; y: number; h1: number; title: string }) => (
  <>
    <A x={h1} y={y - 10} className="text-[13px] text-[#a9abaa]">
      h1
    </A>
    <A x={x} y={y - 14} className="text-[20px] leading-7 font-semibold whitespace-nowrap text-[#484a49]">
      {title}
    </A>
    <A x={x} y={y + 33} className="flex items-center gap-2 text-[13px] whitespace-nowrap text-[#6a6c6a]">
      Target keywords:
      <span className="flex h-[25px] items-center rounded-full bg-[#ececef] px-[9px] text-[#484a49]">puppy food</span>
      <span className="flex h-[25px] items-center rounded-full border border-dashed border-[#d6d8d7] px-[8px]">+ Add keyword</span>
    </A>
  </>
);

export function LogoTile({ x, y, kind, size = 46, rotate }: { x: number; y: number; kind: "gpt" | "claude" | "gemini" | "google" | "perplexity" | "wp" | "mailchimp"; size?: number; rotate?: number }) {
  const icon =
    kind === "gpt" ? (
      <ChatGptIcon width={24} height={24} />
    ) : kind === "gemini" ? (
      <GeminiIcon width={24} height={24} />
    ) : kind === "google" ? (
      <GoogleIcon width={24} height={24} />
    ) : kind === "claude" ? (
      <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden>
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19M8 3l8 18M16 3 8 21M3 8l18 8M21 8 3 16" stroke="#e5643e" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    ) : kind === "perplexity" ? (
      <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden>
        <path d="M12 2v20M4 6l8 6 8-6M4 6v10l8-4 8 4V6M7 18l5-6 5 6" fill="none" stroke="#1fb8cd" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    ) : kind === "wp" ? (
      <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#1b1c22" strokeWidth={1.6} />
        <path d="M6 8l3.5 9 2.5-7 2.5 7L18 8M5 8h3M10.5 8h3M16 8h3" fill="none" stroke="#1b1c22" strokeWidth={1.5} />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden>
        <path d="M6 16c-2-2-2-6 1-9 3-3 8-4 11-1 2 2 2 6 0 8-1 3-5 5-8 4-2 0-3-1-4-2z" fill="#1b1c22" />
        <circle cx="14" cy="11" r="1.5" fill="#fff" />
      </svg>
    );
  return (
    <A x={x} y={y} w={size} h={size} rotate={rotate} className="flex items-center justify-center rounded-xl bg-white shadow-[0_2px_8px_rgba(60,20,120,0.18)]">
      {icon}
    </A>
  );
}

export const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 14 14" width={12} height={12} className={className} aria-hidden>
    <path d="M6 1c.6 3 1.8 4.2 5 5-3.2.8-4.4 2-5 5-.6-3-1.8-4.2-5-5 3.2-.8 4.4-2 5-5z" fill="#8b5cf6" />
    <path d="M11.5 0c.2 1 .6 1.4 1.5 1.6-.9.2-1.3.6-1.5 1.5-.2-.9-.6-1.3-1.5-1.5.9-.2 1.3-.6 1.5-1.6z" fill="#8b5cf6" />
  </svg>
);

export function Gauge({ size = 40, value = 0.72, color = "#2fd3a6" }: { size?: number; value?: number; color?: string }) {
  const r = size / 2 - 5;
  const c = Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size / 2 + 4}`} width={size} height={size / 2 + 4} aria-hidden>
      <path d={`M5 ${size / 2} a${r} ${r} 0 0 1 ${2 * r} 0`} fill="none" stroke="#e3e3e8" strokeWidth={8} />
      <path d={`M5 ${size / 2} a${r} ${r} 0 0 1 ${2 * r} 0`} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${c * value} ${c}`} />
    </svg>
  );
}
