"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { account, brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { MenuLines } from "./icons";
import { menuLinks } from "./data";

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const menuRef = useOutsideClose<HTMLDivElement>(menu, () => setMenu(false));
  const profileRef = useOutsideClose<HTMLDivElement>(profile, () => setProfile(false));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 0);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header data-scrolled={scrolled} className="pricing-header fixed inset-x-0 top-0 z-50 flex h-[70px] items-center justify-between bg-transparent pr-[22px] pl-[18px] data-[scrolled=true]:bg-white">
      <style>{`@supports (animation-timeline: scroll()) { .pricing-header { animation: pricing-header-bg linear both; animation-timeline: scroll(root); animation-range: 0px 1px; } } @keyframes pricing-header-bg { from { background-color: transparent; } to { background-color: #fff; } }`}</style>
      <Link href={routes.home} className="flex items-center gap-[7px] text-[18px] leading-6 font-bold tracking-[-0.02em] text-[#171a17]">
        <LogoIcon width={28} height={28} />
        {brand.name}
      </Link>
      <div className="flex items-center gap-[13px]">
        <div ref={menuRef} className="relative">
          <button type="button" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)} className="flex h-9 w-9 items-center justify-center rounded-full text-[#1b1e1a] hover:bg-black/5">
            <MenuLines />
          </button>
          {menu && (
            <div className="absolute top-[calc(100%+10px)] right-[-60px] w-[240px] rounded-xl bg-white py-2 shadow-popover">
              {menuLinks.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setMenu(false)} className="block px-4 py-[9px] text-[15px] leading-5 text-[#1b1e1a] hover:bg-[#f4f4f4]">
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div ref={profileRef} className="relative">
          <button
            type="button"
            aria-label="Profile"
            aria-expanded={profile}
            onClick={() => setProfile((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c38ef8] text-[17px] font-medium text-[#2a1740] hover:brightness-95"
          >
            {account.initial}
          </button>
          {profile && (
            <div className="absolute top-[calc(100%+10px)] right-0 w-[260px] rounded-xl bg-white py-2 shadow-popover">
              <div className="px-4 pt-1 pb-2 text-[14px] leading-5">
                <div className="font-medium text-[#1b1e1a]">{account.email}</div>
                <div className="text-[#6a6c6a]">ID: {account.id}</div>
              </div>
              <div className="my-1 border-t border-[#ececec]" />
              <Link href={routes.account.profile} onClick={() => setProfile(false)} className="block px-4 py-[9px] text-[15px] leading-5 text-[#1b1e1a] hover:bg-[#f4f4f4]">
                My profile
              </Link>
              <Link href={routes.account.subscription} onClick={() => setProfile(false)} className="block px-4 py-[9px] text-[15px] leading-5 text-[#1b1e1a] hover:bg-[#f4f4f4]">
                Subscription info
              </Link>
              <Link href={routes.home} onClick={() => setProfile(false)} className="block px-4 py-[9px] text-[15px] leading-5 text-[#1b1e1a] hover:bg-[#f4f4f4]">
                Go to dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
