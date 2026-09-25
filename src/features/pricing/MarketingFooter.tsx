"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { LogoIcon } from "@/components/icons";
import { CookieSettingsModal } from "@/components/CookieSettingsModal";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown } from "@/components/ui/icons";
import { SocialIcon } from "./icons";
import { footerColumns, languages, pricingRoutes } from "./data";

const socials = [
  { name: "linkedin", label: "LinkedIn" },
  { name: "instagram", label: "Instagram" },
  { name: "tiktok", label: "TikTok" },
  { name: "youtube", label: "YouTube" },
  { name: "facebook", label: "Facebook" },
  { name: "x", label: "X" },
];

function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex items-center gap-[7px] text-[15px] leading-5 text-[#1b1e1a] hover:text-[#6a3fd0]">
        {lang}
        <ChevronDown width={10} height={10} strokeWidth={2} />
      </button>
      {open && (
        <div className="absolute right-0 bottom-[calc(100%+8px)] z-20 w-[160px] rounded-xl bg-white py-2 shadow-popover">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`block w-full px-4 py-[7px] text-left text-[14px] leading-5 hover:bg-[#f4f4f4] ${l === lang ? "font-semibold" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MarketingFooter() {
  const [cookies, setCookies] = useState(false);
  return (
    <footer className="relative bg-white pt-[202px]">
      <div className="px-6">
        <h2 className="text-[51px] leading-[48px] font-bold tracking-[-0.055em] text-[#171a17] uppercase">
          Ready for
          <br />
          more?
        </h2>
        <p className="mt-[18px] text-[16px] leading-5 tracking-[-0.01em] text-[#1b1e1a]">Unlock the full power of {brand.name}.</p>
        <Link href={pricingRoutes.one} className="mt-[34px] inline-flex h-[58px] w-[166px] items-center justify-center rounded-full bg-[#c090fe] text-[17px] font-medium text-[#171a17] hover:bg-[#b27cf9]">
          Explore plans
        </Link>
        <div className="mt-[31px] grid grid-cols-5">
          {footerColumns.map((c) => (
            <div key={c.title}>
              <div className="text-[16.5px] leading-5 font-medium text-[#171a17]">{c.title}</div>
              <ul className="mt-[35px] flex flex-col gap-[11.6px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[15px] leading-5 text-[#2b2d2b] hover:text-[#6a3fd0]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[197px] flex items-center gap-4">
          {socials.map((s) => (
            <a key={s.name} href="#" aria-label={s.label} className="text-[#1b1e1a] hover:text-[#6a3fd0]">
              <SocialIcon name={s.name} width={24} height={24} />
            </a>
          ))}
        </div>
        <div className="mt-[30px] flex items-center pb-[30px] text-[14.5px] leading-5 text-[#1b1e1a]">
          <LogoIcon width={24} height={24} />
          <span className="ml-[12px] w-[439px] text-[14px] whitespace-nowrap">
            © 2026 <b className="font-semibold">{brand.legalName}.</b> All rights reserved.
          </span>
          <div className="ml-[0px] flex items-center gap-[21px]">
            <a href="#" className="hover:text-[#6a3fd0]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#6a3fd0]">
              Terms of Service
            </a>
            <button type="button" onClick={() => setCookies(true)} className="hover:text-[#6a3fd0]">
              Cookies Settings
            </button>
          </div>
          <div className="ml-auto pr-[3px]">
            <LanguageSelect />
          </div>
        </div>
      </div>
      <div className="relative h-[488px] overflow-hidden" style={{ background: "linear-gradient(180deg, #dceeeb 0%, #dcecef 25%, #d6e5f3 45%, #c8d6f4 62%, #a9a8ef 80%, #72c7df 100%)" }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(178,140,250,0.85) 0 1.6px, rgba(90,236,214,0.55) 1.6px 3.2px, transparent 3.2px 4.4px)",
            maskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 70%, #000 85%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 25%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 70%, #000 85%)",
          }}
        />
        <svg aria-hidden viewBox="0 0 1067 150" preserveAspectRatio="none" className="absolute right-[30px] bottom-[30px] left-[30px] h-[150px] w-[calc(100%-60px)]">
          <text x="0" y="150" textLength="1067" lengthAdjust="spacingAndGlyphs" fontSize="206" fontWeight="700" fill="#181d15" fontFamily="inherit">
            {brand.name.toUpperCase()}
          </text>
        </svg>
      </div>
      <CookieSettingsModal open={cookies} onClose={() => setCookies(false)} />
    </footer>
  );
}
