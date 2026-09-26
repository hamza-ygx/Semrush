"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { marketingRoutes } from "@/features/marketing/routes";
import { CookieSettingsModal } from "./CookieSettingsModal";
import { ChevronDownIcon, TranslateIcon } from "./icons";
import { useOutsideClose } from "./ui/Popover";

const languages = ["English", "Deutsch", "Español", "Français", "Italiano", "Nederlands", "Polski", "Português (Brasil)", "Svenska", "Tiếng Việt", "Türkçe", "中文", "日本語", "한국어"];

function LanguagePicker({ className, chevron, wide }: { className: string; chevron: string; wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button type="button" data-testid={wide ? undefined : "footer-language"} onClick={() => setOpen((o) => !o)} className={`group flex items-center gap-[6px] ${className}`}>
        <TranslateIcon />
        <span className="decoration-1 underline-offset-[3px] group-hover:underline">{lang}</span>
        <ChevronDownIcon className={chevron} />
      </button>
      {open && (
        <div className={`absolute bottom-[calc(100%+7px)] z-50 w-[157px] rounded-md bg-white py-1 shadow-popover ${wide ? "left-0" : "left-[9px]"}`}>
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`flex h-8 w-full items-center border-l-2 pl-[7px] text-left text-[14px] text-rk-text ${l === lang ? "border-rk-text bg-[#e9effd]" : "border-transparent hover:bg-rk-bg"}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const link = "text-[14px] leading-5 text-[#484a49] hover:text-[#1b1e1a]";

export function Footer({ compactPb = 40 }: { compactPb?: number }) {
  const [cookies, setCookies] = useState(false);
  return (
    <footer className="mt-auto px-8 pb-[28px] max-xl:pb-[var(--fpb)]" style={{ "--fpb": `${compactPb}px` } as CSSProperties}>
      <div className="flex flex-col items-center gap-6 text-[16px] leading-6 text-[#6c6e79] xl:hidden">
        <LanguagePicker className="hover:text-rk-text" chevron="text-[#a9abaa]" />
        <div className="flex gap-7">
          <Link href={marketingRoutes.contacts} className="hover:text-rk-text">Contact us</Link>
          <button type="button" onClick={() => setCookies(true)} className="hover:text-rk-text">
            Cookie settings
          </button>
        </div>
        <span>© 2026 {brand.legalName}. All rights reserved.</span>
      </div>
      <div className="hidden h-8 items-center justify-between gap-6 xl:flex">
        <div className="flex shrink-0 items-center gap-5">
          <Link href={marketingRoutes.contacts} className={link}>Contact us</Link>
          <Link href={marketingRoutes.about} className={link}>About us</Link>
          <Link href={marketingRoutes.blog} className={link}>Blog</Link>
          <LanguagePicker wide className={link} chevron="text-[#8b8d8c]" />
        </div>
        <div className="flex min-w-0 gap-2">
          <Link
            href={routes.pricing.one}
            className="flex h-[30px] shrink-0 items-center rounded-md border border-[#d6d8d7] bg-[#e0e2e1] px-3 text-[14px] text-[#484a49] hover:bg-[#d6d8d7]"
          >
            See plans and pricing
          </Link>
          <a
            href="#"
            title={`Get started with ${brand.name}`}
            className="flex h-[30px] min-w-0 items-center rounded-md bg-[#009f81] px-3 text-[14px] font-medium text-white hover:bg-[#007c65]"
          >
            <span className="truncate">Get started with {brand.name}</span>
          </a>
        </div>
      </div>
      <div className="mt-[14px] hidden items-center justify-between gap-6 xl:flex">
        <div className="flex shrink-0 gap-5">
          <button type="button" onClick={() => setCookies(true)} className={link}>
            Cookie settings
          </button>
          <Link href={marketingRoutes.legal} className={link}>Legal info</Link>
          <Link href={marketingRoutes.privacyPolicy} className={link}>Privacy policy</Link>
          <Link href={`${marketingRoutes.privacyPolicy}#your-rights`} className={link}>Do not sell my personal info</Link>
        </div>
        <span title={`© 2026 ${brand.legalName}. All rights reserved.`} className="min-w-0 truncate text-[14px] leading-5 text-[#484a49]">
          © 2026 {brand.legalName}. All rights reserved.
        </span>
      </div>
      <CookieSettingsModal open={cookies} onClose={() => setCookies(false)} />
    </footer>
  );
}
