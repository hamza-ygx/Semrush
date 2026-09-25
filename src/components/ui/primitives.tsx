import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, InfoIcon } from "./icons";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg bg-white shadow-card ${className}`}>{children}</div>;
}

type BtnVariant = "primary" | "secondary" | "tertiary" | "success" | "ghost";

const btn: Record<BtnVariant, string> = {
  primary: "bg-rk-btn-dark text-white hover:bg-[#2b2e38] font-semibold",
  secondary: "border border-rk-border-strong bg-[#f8f9f9] font-medium text-rk-muted hover:bg-rk-bg",
  tertiary: "border border-rk-border-strong bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover",
  success: "bg-[#009f81] text-white hover:bg-[#007c65] font-medium",
  ghost: "text-rk-text-2 hover:bg-rk-bg",
};

export function Button({
  children,
  variant = "secondary",
  size = "m",
  href,
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  variant?: BtnVariant;
  size?: "s" | "m" | "l";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const sz = size === "s" ? "h-6 px-2 text-[13px] gap-1" : size === "l" ? "h-10 px-4 text-[16px] gap-2" : "h-7 px-2 text-[14px] gap-[6px]";
  const cls = `inline-flex shrink-0 items-center justify-center rounded-md whitespace-nowrap ${sz} ${btn[variant]} ${className}`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Info({ className = "" }: { className?: string }) {
  return <InfoIcon className={`inline-block shrink-0 text-rk-faint ${className}`} width={16} height={16} />;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-[9px] text-[14px] leading-5">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-[9px]">
          {i > 0 && <ChevronRight className="text-rk-muted" width={14} height={14} />}
          {it.href ? (
            <Link href={it.href} className="text-rk-muted hover:text-rk-link">
              {it.label}
            </Link>
          ) : (
            <span className="text-rk-text">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Tabs({
  tabs,
  active,
  className = "",
}: {
  tabs: { label: ReactNode; href: string; key?: string }[];
  active: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {tabs.map((t) => {
        const key = t.key ?? t.href;
        const on = key === active;
        return (
          <Link
            key={key}
            href={t.href}
            className={`relative pb-[10px] text-[16px] leading-6 whitespace-nowrap ${
              on ? "text-rk-text" : "text-rk-text hover:text-rk-link"
            }`}
          >
            {t.label}
            {on && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
          </Link>
        );
      })}
    </div>
  );
}

export function Tag({
  children,
  tone = "gray",
  className = "",
}: {
  children: ReactNode;
  tone?: "gray" | "ai" | "seo" | "blue" | "green" | "orange" | "red";
  className?: string;
}) {
  const tones = {
    gray: "bg-[#e0e2e1] text-rk-text-2",
    ai: "bg-rk-ai-bg text-rk-ai-text",
    seo: "bg-rk-seo-bg text-rk-seo-text",
    blue: "bg-[#e9f7ff] text-[#006dca]",
    green: "bg-[#dbfee8] text-[#007c65]",
    orange: "bg-[#fff3d9] text-[#c33909]",
    red: "bg-[#fff0f7] text-[#d1002f]",
  };
  return <span className={`inline-flex items-center rounded px-[6px] text-[12px] leading-[18px] ${tones[tone]} ${className}`}>{children}</span>;
}

/** Big indigo metric value with optional delta. */
export function Metric({
  value,
  delta,
  href,
  size = 24,
  className = "",
}: {
  value: ReactNode;
  delta?: string;
  href?: string;
  size?: number;
  className?: string;
}) {
  const v = (
    <span style={{ fontSize: size, lineHeight: 1.2 }} className="font-semibold text-rk-number">
      {value}
    </span>
  );
  const up = delta?.startsWith("+");
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      {href ? (
        <Link href={href} className="hover:opacity-80">
          {v}
        </Link>
      ) : (
        v
      )}
      {delta && <span className={`text-[12px] ${up ? "text-rk-success" : delta === "0" ? "text-rk-muted" : "text-rk-danger"}`}>{delta}</span>}
    </span>
  );
}
