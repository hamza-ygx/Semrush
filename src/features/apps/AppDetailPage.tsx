"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { AppLogo } from "./AppLogo";
import { AppsShell } from "./AppsChrome";
import { AppCard } from "./AppsPage";
import { appsBase, sections, type AppDetail } from "./data";

function FeatureCard({ word, title, children }: { word: string; title: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-[#e8e8e8] bg-[linear-gradient(180deg,#ffffff_0%,#f4f7fa_40%,#eceef6_100%)]">
      <div className="pointer-events-none -mt-[20px] text-center text-[108px] leading-[100px] font-black tracking-[-0.01em] whitespace-nowrap text-[#dde8f1]">{word}</div>
      <h2 className="mx-auto mt-[18px] max-w-[790px] text-center text-[23.8px] leading-[27px] font-bold text-[#1b1e1a]">{title}</h2>
      <div className="mt-[18px]">{children}</div>
    </section>
  );
}

function ProductMock({ detail, variant }: { detail: AppDetail; variant: number }) {
  const bars = variant % 2 ? [40, 62, 55, 78, 70, 92, 84, 100] : [70, 52, 80, 64, 90, 76, 96, 88];
  return (
    <div className="mx-auto h-[420px] w-[825px] rounded-t-[14px] border-[3px] border-b-0 border-[#e9eaea] bg-[#f5f7fb]">
      <div className="flex h-[33px] items-center gap-2 bg-white px-4 text-[8px] text-[#484a49]">
        <span className="origin-left scale-50">
          <AppLogo logo={detail.app.logo} />
        </span>
        <span className="-ml-4 font-semibold">{detail.app.name}</span>
        <span className="ml-auto flex gap-3 text-[#9a9ca8]">
          <span>Overview</span>
          <span>Reports</span>
          <span>Settings</span>
        </span>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {["Visits", "Conversions", "Growth"].map((l, i) => (
            <div key={l} className="rounded-[6px] bg-white p-4">
              <div className="text-[12px] text-[#6a6c6a]">{l}</div>
              <div className="text-[22px] font-bold text-[#1b1e1a]">{["24.6K", "1,318", "+18%"][i]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-[230px] items-end gap-5 rounded-[6px] bg-white px-6 pt-6 pb-5">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-[4px] bg-[#6a5cff]" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AppDetailPage({ detail }: { detail: AppDetail }) {
  const [trial, setTrial] = useState(false);
  const { app } = detail;
  const more = sections[0].apps.filter((x) => x.name !== app.name).slice(0, 3);
  return (
    <AppsShell>
      <div className="bg-white px-[15px] pt-[50px] pb-[60px]">
        <AppLogo logo={app.logo} />
        <h1 className="mt-[16px] text-[24px] leading-7 font-semibold text-[#1b1e1a]">{app.name}</h1>
        <div className="mt-[6px] flex items-center gap-[5px] text-[14px] leading-5 text-[#6a6c6a]">
          <svg viewBox="0 0 16 16" width={15} height={15}>
            <path d="M8 14s-5.5-3.3-5.5-7.3A3 3 0 0 1 8 4.5a3 3 0 0 1 5.5 2.2C13.5 10.7 8 14 8 14z" fill="#f37c80" />
          </svg>
          {detail.likes} users liked it
        </div>
        <p className="mt-[15px] text-[16px] leading-6 text-[#1b1e1a]">{app.description}</p>
        <button type="button" onClick={() => setTrial(true)} className="mt-[25px] h-10 w-[330px] rounded-md bg-[#00a380] text-[16px] font-medium text-white hover:bg-[#008c6e]">
          Try it free
        </button>
        <p className="mt-[12px] w-[330px] text-center text-[14px] leading-5 text-[#6a6c6a]">Free 7 - day trial. Unsubscribe anytime</p>
        <div className="mt-[36px] space-y-6">
          {detail.features.map((f, i) => (
            <FeatureCard key={f.word} word={f.word} title={f.title}>
              <ProductMock detail={detail} variant={i} />
            </FeatureCard>
          ))}
        </div>
        <div className="mt-12 flex items-end justify-between">
          <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-rk-text">You may also like</h2>
          <Link href={appsBase} className="text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
            Go to App Center
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {more.map((x) => (
            <AppCard key={x.name} app={x} />
          ))}
        </div>
      </div>
      <Modal open={trial} onClose={() => setTrial(false)} title={`Try ${app.name} free`} width={480}>
        <p className="text-[16px] leading-6">
          Start your free 7-day trial of {app.name}. After the trial, the app costs {app.price}. Unsubscribe anytime.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => setTrial(false)} className="h-10 rounded-md bg-[#00a380] px-4 text-[16px] font-medium text-white hover:bg-[#008c6e]">
            Start free trial
          </button>
          <button type="button" onClick={() => setTrial(false)} className="h-10 rounded-md border border-rk-border-strong px-4 text-[16px] text-rk-text-2 hover:bg-rk-bg">
            Not now
          </button>
        </div>
      </Modal>
    </AppsShell>
  );
}
