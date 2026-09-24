"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { routes } from "@/config/routes";
import { examples, type Example } from "./data";

export function LocalShell({ children, help = true, search = { kind: "none" }, enterprise = true }: { children: ReactNode; help?: boolean; search?: { kind: "none" } | { kind: "goto" }; enterprise?: boolean }) {
  return (
    <AppShell section="local" search={search} enterprise={enterprise} help={help ? "chat" : "none"}>
      {children}
    </AppShell>
  );
}

export const ChevronR = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={className}>
    <path d="m6.5 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronD = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
    <path d="m4 6.5 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MagnifierIcon = ({ size = 28, className = "", sw = 2 }: { size?: number; className?: string; sw?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <circle cx="11" cy="11" r="7.5" fill="none" stroke="currentColor" strokeWidth={sw} />
    <path d="m16.5 16.5 4.5 4.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" />
  </svg>
);

export const FlagCA = () => (
  <svg viewBox="0 0 16 12" width={16} height={12}>
    <rect width="16" height="12" rx="1.5" fill="#fff" />
    <path d="M0 0h4v12H0zM12 0h4v12h-4z" fill="#d22f27" />
    <path d="M8 2.5l.8 1.6 1-.4-.3 2.2 1-.8.3.9 1-.2-.6 1.4.5.3-2.2 1.4.2.7L8 9.3 6.3 9.6l.2-.7-2.2-1.4.5-.3-.6-1.4 1 .2.3-.9 1 .8-.3-2.2 1 .4z" fill="#d22f27" />
  </svg>
);

const FlagUS = () => (
  <svg viewBox="0 0 16 12" width={16} height={12}>
    <rect width="16" height="12" rx="1.5" fill="#fff" />
    <path d="M0 0h16v1.7H0zM0 3.4h16v1.7H0zM0 6.9h16v1.7H0zM0 10.3h16V12H0z" fill="#d22f27" />
    <rect width="7.5" height="6.9" fill="#1e50a0" />
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 16 12" width={16} height={12}>
    <rect width="16" height="12" rx="1.5" fill="#1e50a0" />
    <path d="M0 0l16 12M16 0 0 12" stroke="#fff" strokeWidth="2.4" />
    <path d="M0 0l16 12M16 0 0 12" stroke="#d22f27" strokeWidth=".9" />
    <path d="M8 0v12M0 6h16" stroke="#fff" strokeWidth="3.4" />
    <path d="M8 0v12M0 6h16" stroke="#d22f27" strokeWidth="1.8" />
  </svg>
);

const flags: Record<Example["flag"], () => ReactNode> = { us: FlagUS, ca: FlagCA, uk: FlagUK };

export function Pin({ x, y, s = 1, o = 0.55 }: { x: number; y: number; s?: number; o?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      opacity={o}
      fill="#fff"
      fillRule="evenodd"
      d="M0 0c-8.3 0-15 6.6-15 14.8 0 10.6 12.4 25.6 13.6 27 .7.8 2 .8 2.7 0C2.6 40.4 15 25.4 15 14.8 15 6.6 8.3 0 0 0zm0 9a6 6 0 1 1 0 12A6 6 0 0 1 0 9z"
    />
  );
}

export function HeroMap({ pins = [] as { x: number; y: number; s?: number; o?: number }[], variant = 0 }: { pins?: { x: number; y: number; s?: number; o?: number }[]; variant?: number }) {
  const id = `hm-${variant}`;
  return (
    <svg viewBox="0 0 1127 420" width={1127} height={420} className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2" aria-hidden>
      <defs>
        <radialGradient id={`${id}-g`} cx="0.5" cy="0.28" r="0.5" gradientTransform="matrix(1 0 0 1.4 0 -0.1)">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-m`}>
          <rect width="1127" height="420" fill={`url(#${id}-g)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-m)`} fill="none" stroke="#fff" strokeOpacity={0.065} strokeLinecap="butt">
        <g transform={variant ? "rotate(28 560 150)" : "rotate(32 560 150)"}>
          <path strokeWidth={26} d="M150 20H1000M150 130H1000M150 250H1000M200 370H950" />
          <path strokeWidth={22} d="M300 -200V500M470 -200V500M640 -200V500M800 -200V500" />
          <path strokeWidth={14} d="M380 70H560M700 190H880M540 310H720M380 190V310M720 70V190" />
        </g>
        <circle cx={variant ? 752 : 535} cy={variant ? 80 : 230} r={variant ? 34 : 36} strokeWidth={16} />
        <path strokeWidth={34} d="M980 -20C880 60 760 170 730 440" />
      </g>
      {pins.map((p, i) => (
        <Pin key={i} {...p} />
      ))}
    </svg>
  );
}

export function FreeAuditSearch({ placeholder, className = "", inputClass = "", variant = "hero" }: { placeholder: string; className?: string; inputClass?: string; variant?: "hero" | "light" }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [adv, setAdv] = useState(false);
  const go = () => router.push(routes.local.scan);
  const light = variant === "light";
  return (
    <div className={className}>
      <form
        className="flex h-14"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Business name"
          className={`h-14 min-w-0 flex-1 rounded-l-[6px] bg-white px-[13px] text-[16px] text-[#191b23] outline-none placeholder:text-[#8f8f94] ${light ? "border border-r-0 border-[#d1d4db]" : ""} ${inputClass}`}
        />
        <button type="submit" aria-label="Get free audit" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-r-[6px] bg-[#a35eff] text-white hover:bg-[#9048f2]">
          <MagnifierIcon size={28} sw={1.8} />
        </button>
      </form>
      <AdvancedSearch open={adv} onToggle={() => setAdv((v) => !v)} light={light} onSubmit={go} />
    </div>
  );
}

export function AdvancedSearch({ open, onToggle, light, onSubmit }: { open: boolean; onToggle: () => void; light?: boolean; onSubmit: () => void }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={`mx-auto mt-[20px] flex items-center gap-[7px] text-[14px] leading-5 font-semibold ${light ? "text-[#898c96] hover:text-[#6c6e79]" : "text-[#c9b1f2] hover:text-white"}`}
      >
        Advanced search
        <ChevronD className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <form
          className="mx-auto mt-4 grid max-w-[658px] grid-cols-3 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {["Country", "City", "ZIP code"].map((l) => (
            <input key={l} placeholder={l} aria-label={l} className="h-10 rounded-[6px] border border-[#d1d4db] bg-white px-3 text-[14px] text-[#191b23] outline-none placeholder:text-[#8f8f94]" />
          ))}
        </form>
      )}
    </>
  );
}

export function ExampleScans({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex w-[658px] flex-col gap-3 text-left ${className}`}>
      {examples.map((e) => {
        const F = flags[e.flag];
        return (
          <Link
            key={e.label}
            href={routes.local.scan}
            className="flex h-[51px] items-center rounded-[8px] bg-[#7f2aeb] pr-[21px] pl-[26px] font-[Arial,Helvetica,sans-serif] text-white hover:bg-[#8b3cf0]"
          >
            <F />
            <span className="ml-4 flex-1 text-[16px] text-[#fbeeff]">{e.label}</span>
            <span className="flex items-center gap-[6px] text-[14px] text-[#e9d7ff]">
              View free scan
              <ChevronR />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Faq({ items, className = "", itemClass = "", textClass = "" }: { items: { q: string; a: string }[]; className?: string; itemClass?: string; textClass?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={className}>
      {items.map((it, i) => (
        <div key={it.q} className={itemClass}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className={`flex w-full items-center text-left ${textClass}`}>
            <ChevronR className={`mr-[18px] shrink-0 text-[#6c6e79] transition-transform ${open === i ? "rotate-90" : ""}`} />
            <span>{it.q}</span>
          </button>
          {open === i && <p className="pr-6 pb-4 pl-[56px] text-[14px] leading-[22px] text-[#484a54]">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function PrimaryButton({ href, children, className = "", onClick }: { href?: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const cls = `inline-flex items-center justify-center rounded-[6px] bg-[#a35eff] font-semibold text-white hover:bg-[#9048f2] ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function DarkButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`inline-flex h-10 w-[220px] items-center justify-center rounded-[6px] bg-[#191b1a] text-[16px] font-semibold text-white hover:bg-[#33353a] ${className}`}>
      {children}
    </Link>
  );
}

export const GbpStoreIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
    <path d="M3 9.5 4.5 4h15L21 9.5v1a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 10.5z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M4.5 12.5V20h15v-7.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="M13 16h4.2a2.3 2.3 0 1 1-.7-1.7" fill="none" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);
