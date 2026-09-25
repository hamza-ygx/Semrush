"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { Footer } from "@/components/Footer";
import { GoToTool } from "@/components/shell/HeaderSearch";
import { MoreMenu, ProfileMenu } from "@/components/shell/HeaderMenus";
import { InviteUsersModal } from "@/components/shell/InviteUsersModal";
import { ChevronRight, PlusIcon } from "@/components/ui/icons";
import { sessions } from "./data";

export function MultiloginPage({ redirectTo }: { redirectTo: string }) {
  const [invite, setInvite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-rk-bg">
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-rk-border bg-white pr-[33px] pl-8">
        <div className="flex items-center gap-4">
          <Link href={routes.home} className="flex items-center gap-[6px] text-[16px] leading-5 font-bold tracking-tight text-rk-text">
            <LogoIcon width={24} height={24} />
            {brand.name}
          </Link>
          <GoToTool compact extra={-12} />
        </div>
        <nav className="flex items-center gap-[39px] text-[14px] text-rk-text">
          <button type="button" onClick={() => setInvite(true)} className="flex items-center gap-[7px] hover:text-rk-link">
            <PlusIcon />
            Invite users
          </button>
          <a href="#" className="hover:text-rk-link">
            Pricing
          </a>
          <a href="#" className="hover:text-rk-link">
            Enterprise
          </a>
          <MoreMenu />
          <div className="-ml-4">
            <ProfileMenu />
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-[660px] pt-[79px]">
          <h1 className="text-[36px] leading-[44px] font-bold tracking-[-0.01em] text-rk-text">You have too many active sessions</h1>
          <p className="mt-[13px] text-[16px] leading-6 text-rk-text">Multi-login activity may result in a temporary account block.</p>
          <Link
            href={redirectTo}
            className="mt-[23px] inline-flex h-10 items-center rounded-md bg-rk-btn-dark px-3 text-[16px] font-medium text-white hover:bg-[#2b2e2b]"
          >
            Continue
          </Link>
          <div className="mt-[40px]">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-[8px] text-[16px] leading-6 font-medium text-rk-text hover:text-rk-link"
            >
              <ChevronRight width={16} height={16} className={`transition-transform ${expanded ? "rotate-90" : ""}`} />
              This account was logged in from
            </button>
            {expanded && (
              <ul className="mt-3 ml-6 flex flex-col gap-2 text-[14px] leading-5 text-rk-text">
                {sessions.map((s) => (
                  <li key={s.device} className="flex items-center gap-2">
                    <span className="font-medium">{s.device}</span>
                    <span className="text-rk-muted">
                      {s.location} · {s.time}
                    </span>
                    {s.current && <span className="rounded-md bg-[#dbeede] px-[6px] text-[12px] leading-5 text-[#006a40]">This device</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <div className="pt-[34px]">
        <Footer />
      </div>
      <InviteUsersModal open={invite} onClose={() => setInvite(false)} />
    </div>
  );
}
