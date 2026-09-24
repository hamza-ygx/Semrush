import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/config/routes";
import type { Template, TemplateIcon } from "./data";
import { GaIcon, GoogleGIcon, GscIcon, MegaphoneIcon, SparkleIcon, TrafficBarsIcon } from "./ReportIcons";

export const templateIcon: Record<Exclude<TemplateIcon, "plus">, ReactNode> = {
  sparkle: <SparkleIcon />,
  ga: <GaIcon />,
  gsc: <GscIcon />,
  traffic: <TrafficBarsIcon />,
  megaphone: <MegaphoneIcon />,
  google: <GoogleGIcon />,
};

export function TemplateCard({ t, className = "" }: { t: Template; className?: string }) {
  const scratch = t.icon === "plus";
  return (
    <Link
      href={routes.reports.constructor}
      className={`block rounded-[5px] px-3 pt-3 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] ${scratch ? "bg-[#e55a00] text-white" : "bg-white text-rk-text"} ${className}`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${scratch ? "bg-white text-[#e55a00]" : "bg-[#f0f1f4]"}`}>
        {scratch ? (
          <svg viewBox="0 0 20 20" width={22} height={22}>
            <path d="M10 3v14M3 10h14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          </svg>
        ) : (
          templateIcon[t.icon as Exclude<TemplateIcon, "plus">]
        )}
      </span>
      <div className="mt-[15px] text-[16px] leading-6 font-bold">{t.title}</div>
      <p className={`mt-4 text-[14px] leading-5 ${scratch ? "text-white" : "text-rk-muted"}`}>{t.description}</p>
    </Link>
  );
}
