import type { ReactNode } from "react";
import { Info } from "@/components/ui/primitives";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={className} aria-hidden>
      <path d="M5.5 5.2 6.5 8l2.8 1-2.8 1-1 2.8-1-2.8L1.7 9l2.8-1z" fill="#7a3fe0" />
      <path d="M11.3 1.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" fill="#7a3fe0" />
    </svg>
  );
}

export function TrophyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden>
      <path d="M4.5 2h7v3.2a3.5 3.5 0 0 1-7 0z" fill="#f2a20c" />
      <path d="M4.5 3.2H2.3v1.1A2.4 2.4 0 0 0 4.8 6.7M11.5 3.2h2.2v1.1a2.4 2.4 0 0 1-2.5 2.4" fill="none" stroke="#f2a20c" strokeWidth={1.3} />
      <path d="M8 8.7v2.6M5.3 13.3h5.4v-.6c0-.8-.6-1.4-1.4-1.4H6.7c-.8 0-1.4.6-1.4 1.4z" fill="#f2a20c" stroke="#f2a20c" strokeWidth={1.3} strokeLinejoin="round" />
    </svg>
  );
}

export function QuestionCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={className} aria-hidden>
      <circle cx={8} cy={8} r={6.8} fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M6.3 6.3a1.7 1.7 0 1 1 2.5 1.5c-.5.3-.8.6-.8 1.2v.2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <circle cx={8} cy={11.2} r={0.8} fill="currentColor" />
    </svg>
  );
}

export function AiRefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} className={className} aria-hidden>
      <path d="M13.8 10.5A5.6 5.6 0 1 1 8.7 3.2M4.2 14.2l-1.5 1.6.2-2.6" fill="none" stroke="#235fe2" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" fill="#235fe2" />
    </svg>
  );
}

function ArrowDownThin() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
      <path d="M8 2.5v11M3.8 9.3 8 13.5l4.2-4.2" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SampleCard({ title, info = true, children, className = "", head }: { title: ReactNode; info?: boolean; children: ReactNode; className?: string; head?: ReactNode }) {
  return (
    <section className={`rounded-lg bg-white shadow-card ${className}`}>
      <div className="border-b border-rk-border px-5 pt-[8px] pb-[11px]">
        <h2 className="flex items-center gap-[6px] text-[16px] leading-5 font-semibold text-rk-text">
          {title}
          {info && <Info className="-mt-[5px]" />}
        </h2>
        {head}
      </div>
      {children}
    </section>
  );
}

export function InsightBanner({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`border-b border-rk-border bg-[linear-gradient(90deg,#f8f7ff_0%,#f8f9ff_60%,#f3fafe_100%)] px-5 pt-[16px] pb-[20px] ${className}`}>
      <div className="flex items-center gap-2">
        <SparkleIcon className="-mt-[6px] -mr-[1px] -ml-[1px]" />
        <span className="text-[16px] leading-6 font-semibold text-[#7a3fe0]">{title}</span>
      </div>
      <p className="mt-[4px] max-w-[736px] pl-6 text-[16px] leading-6 text-rk-text">{children}</p>
    </div>
  );
}

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-[6px] text-[16px] leading-6 text-rk-muted ${className}`}>
      {children}
      <ArrowDownThin />
    </div>
  );
}

export function ColorCheck({ color, checked = true, onClick, label }: { color: string; checked?: boolean; onClick?: () => void; label?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border"
      style={checked ? { background: color, borderColor: color } : { background: "#fff", borderColor: "#d6d8d7" }}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width={12} height={12} aria-hidden>
          <path d="m3.5 8.3 2.8 2.8 6-6" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function YouTag() {
  return <span className="rounded-[9px] bg-[#e4e3fa] px-[8px] text-[12px] leading-[17px] font-normal text-[#5a50c8]">you</span>;
}

export function TipBulb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" width={40} height={40} className={`-ml-[2px] ${className}`} aria-hidden>
      <path d="M20 2l4 3.2 5-.6 1.8 4.7 4.7 1.8-.6 5L38 20l-3.2 4 .6 5-4.7 1.8-1.8 4.7-5-.6L20 38l-4-3.2-5 .6-1.8-4.7-4.7-1.8.6-5L2 20l3.2-4-.6-5 4.7-1.8L11 4.6l5 .6z" fill="#b27ef3" />
      <g transform="rotate(-28 20 20) translate(20 20) scale(1.15) translate(-20 -20)">
        <path d="M20 6.5a8.5 8.5 0 0 0-4.9 15.5c.8.6 1.2 1.4 1.2 2.3v2h7.4v-2c0-.9.4-1.7 1.2-2.3A8.5 8.5 0 0 0 20 6.5z" fill="rgba(239,228,255,0.35)" stroke="#3b2266" strokeWidth={1.3} />
        <path d="M17.6 18.5 20 13l2.4 5.5M20 13v13" fill="none" stroke="#6a3fb0" strokeWidth={1} />
        <path d="M16.3 28.3h7.4M17 30.8h6" fill="none" stroke="#3b2266" strokeWidth={1.3} strokeLinecap="round" />
        <path d="M15 11a6 6 0 0 1 3.5-2.4" fill="none" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
      </g>
    </svg>
  );
}
