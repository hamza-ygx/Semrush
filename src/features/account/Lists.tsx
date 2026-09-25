"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { Info } from "@/components/ui/primitives";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { AppsEmptyArt } from "./art";
import { activities } from "./data";

const cols = "grid grid-cols-[198px_160px_139px_141px_1fr]";

export function ActivityLog() {
  const [page, setPage] = useState(1);
  return (
    <AccountShell active="activity">
      <div className="min-h-[930px]">
        <PageTop crumb="Activity log" title="Activity log" variant="plain" />
        <div className="px-8 pt-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-card">
            <div className={`${cols} h-10 items-center border-b border-[#e9eaea] bg-[#fafafa] px-3 text-[12px] leading-4 text-rk-text`}>
              <span>Date &amp; Time</span>
              <span>Event Type</span>
              <span>IP</span>
              <span>Country</span>
              <span>User Agent</span>
            </div>
            {activities.map((a) => (
              <div key={a.date} className={`${cols} border-b border-[#eceef0] px-3 pt-3 pb-3 text-[14px] leading-5 last:border-b-0`}>
                <span className="tabular-nums">{a.date}</span>
                <span>{a.type}</span>
                <span className="tabular-nums">{a.ip}</span>
                <span>{a.country}</span>
                <span>
                  {a.ua.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-[14px]">
            <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage(1)} className="flex h-7 w-7 items-center justify-center rounded-md text-rk-muted disabled:opacity-40">
              <ChevronLeft />
            </button>
            <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-[#e0e2e1] px-2">{page}</span>
            <button type="button" aria-label="Next page" disabled className="flex h-7 w-7 items-center justify-center rounded-md text-rk-muted disabled:opacity-40">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}

export function AuthorizedApps() {
  return (
    <AccountShell active="apps">
      <div className="min-h-[835px]">
        <PageTop
          crumb="Authorized Applications"
          title={
            <>
              Authorized Applications
              <Info className="-ml-[1px]" />
            </>
          }
          variant="plain"
        />
        <div className="px-8 pt-4">
          <div className="rounded-lg bg-white shadow-card">
            <div className="flex h-10 items-center border-b border-[#eceef0] px-5 text-[16px] leading-6 font-semibold">Authorized Applications</div>
            <div className="flex gap-[42px] px-5 pt-[21px] pb-[20px]">
              <AppsEmptyArt width={298} height={229} />
              <div className="-mt-[2px]">
                <h2 className="text-[20px] leading-7 font-medium">No applications yet</h2>
                <p className="mt-[7px] text-[14px] leading-5">All applications that you authorize to interact with your {brand.name} account will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
