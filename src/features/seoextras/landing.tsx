"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";

export function LandingPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-[979px] pt-[25px] ${className}`}>{children}</div>;
}

export function LandingCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.12)] ${className}`}>{children}</div>;
}

export function DomainForm({ button, className = "", inputClassName = "w-[544px]" }: { button: string; className?: string; inputClassName?: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  return (
    <form
      className={`flex justify-center gap-3 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const v = value.trim();
        if (!v) {
          setError(true);
          return;
        }
        router.push(`${routes.domainOverview}?q=${encodeURIComponent(v)}&db=se&searchType=domain`);
      }}
    >
      <input
        value={value}
        aria-label="Enter domain"
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        placeholder="Enter domain"
        className={`h-10 rounded-md border bg-white px-3 text-[16px] outline-none placeholder:text-[#8b8d8c] focus:border-[#008ff8] ${error ? "border-[#ff4953]" : "border-[#d1d4db]"} ${inputClassName}`}
      />
      <button type="submit" className="h-10 shrink-0 rounded-md bg-[#009f81] px-[13px] text-[16px] font-medium text-white hover:bg-[#008a70]">
        {button}
      </button>
    </form>
  );
}

export function Bullets({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-[16px] leading-6 text-rk-text ${className}`}>
      {items.map((it, i) => (
        <li key={i} className="relative pl-[17px]">
          <span className="absolute top-[10px] left-[3px] h-[5px] w-[5px] rounded-full bg-[#484a49]" />
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={`space-y-[1px] ${className}`}>
      {items.map((it, i) => (
        <div key={it.q} className="bg-[#f4f5f5]">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex h-10 w-full items-center gap-[8px] px-4 text-left text-[16px] font-semibold text-[#5b5e68] hover:text-rk-text"
          >
            <svg viewBox="0 0 16 16" width={12} height={12} className={`shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`}>
              <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {it.q}
          </button>
          {open === i && <p className="px-[38px] pb-4 text-[14px] leading-5 text-rk-text-2">{it.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function NoHelpButton() {
  return <style>{`button[aria-label="Help"]{display:none!important}`}</style>;
}
