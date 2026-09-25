import type { ReactNode } from "react";
import { EmptyTable } from "./illustrations";

export function Info({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={`inline-block shrink-0 text-[#a9abaa] ${className}`}>
      <text x="8" y="13" textAnchor="middle" fontSize="15" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif" fill="currentColor">
        i
      </text>
    </svg>
  );
}

export function Panel({
  title,
  count,
  info = true,
  right,
  children,
  className = "",
  headerClassName = "h-10",
  divider = true,
}: {
  title: ReactNode;
  count?: ReactNode;
  info?: boolean;
  right?: ReactNode;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  divider?: boolean;
}) {
  return (
    <section className={`rounded-md border border-[#e5e6e6] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)] ${className}`}>
      <div className={`flex items-center justify-between px-5 ${divider ? "border-b-2 border-[#edefef]" : ""} ${headerClassName}`}>
        <h2 className="flex items-center gap-[6px] text-[16px] leading-6 font-semibold text-rk-text">
          {title}
          {count && <span className="-mr-[4px] -ml-[2px] font-normal text-rk-muted">{count}</span>}
          {info && <Info className="ml-[1px]" />}
        </h2>
        {right}
      </div>
      {children}
    </section>
  );
}

export function DarkButton({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex h-7 items-center gap-[6px] rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-medium whitespace-nowrap text-white hover:bg-[#2b2e38] ${className}`}>
      {children}
    </button>
  );
}

export function GrayButton({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-[#f0f1f1] px-[9px] text-[14px] whitespace-nowrap text-rk-text-2 hover:bg-rk-hover ${className}`}
    >
      {children}
    </button>
  );
}

export function NothingFound({ title = "Nothing found", text = "Try changing your filters.", className = "", icon }: { title?: string; text?: ReactNode; className?: string; icon?: ReactNode }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {icon ?? <EmptyTable size={80} />}
      <div className="mt-[17px] text-[16px] leading-6 font-semibold text-rk-text-2">{title}</div>
      <div className="mt-[4px] text-[14px] leading-5 text-rk-text-2">{text}</div>
    </div>
  );
}

export function ExtLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-[4px] text-rk-link hover:text-rk-link-hover ${className}`}>
      {children}
      <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#a9abaa]">
        <path d="M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v4h-9v-9h4" fill="none" stroke="currentColor" strokeWidth={1.4} />
      </svg>
    </a>
  );
}
