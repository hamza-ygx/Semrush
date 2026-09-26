"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { AppShell } from "@/components/shell/AppShell";
import { routes } from "@/config/routes";

export function AppsShell({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <AppShell
      section="apps"
      footer={false}
      help="none"
      search={{
        kind: "analyze",
        value: "",
        placeholder: "Enter website or keyword",
        inputClassName: "w-[342px] xl:w-[480px] xl:text-[14px]",
        action: routes.domainOverview,
      }}
    >
      {children}
      {footer && (
        <div className="border-t border-rk-border pt-10">
          <Footer compactPb={37} />
        </div>
      )}
    </AppShell>
  );
}

export function SeeAllLink({ onClick, href }: { onClick?: () => void; href?: string }) {
  const body = (
    <>
      See all
      <svg viewBox="0 0 16 16" width={16} height={16}>
        <path d="M2.5 8h10.5M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
  const cls = "mb-[-3px] flex shrink-0 items-center gap-1 text-[14px] leading-5 text-rk-link hover:text-rk-link-hover";
  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {body}
    </button>
  );
}
