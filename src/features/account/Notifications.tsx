"use client";

import Link from "next/link";
import { useState } from "react";
import { account } from "@/config/brand";
import { ChevronRight } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { accountRoutes, notificationGroups, type NotificationKey } from "./data";

const VerifiedIcon = () => (
  <svg viewBox="0 0 16 16" width={18} height={18} className="text-[#009f81]">
    <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="m5 8.2 2 2 4-4.2" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Switch({ on, label, onToggle }: { on: boolean; label: string; onToggle: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className="flex h-10 items-center gap-4 text-left">
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[#00a980]" : "bg-[#d5d7d7]"}`}>
        <span className={`absolute top-[2px] flex h-4 w-4 items-center justify-center rounded-full bg-white transition-[left] ${on ? "left-[18px]" : "left-[2px]"}`}>
          <svg viewBox="0 0 16 16" width={14} height={14}>
            {on ? (
              <path d="m4 8.3 2.7 2.6L12 5.5" fill="none" stroke="#00a980" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="m5 5 6 6m0-6-6 6" fill="none" stroke="#9a9c9b" strokeWidth={2} strokeLinecap="round" />
            )}
          </svg>
        </span>
      </span>
      <span className="text-[16px] leading-6 text-rk-text">{label}</span>
    </button>
  );
}

export function Notifications({ tab }: { tab: NotificationKey }) {
  const [state, setState] = useState(() => Object.fromEntries(notificationGroups.map((g) => [g.key, g.items.map((i) => i.on as boolean)])) as Record<NotificationKey, boolean[]>);
  const group = notificationGroups.find((g) => g.key === tab) ?? notificationGroups[0];
  return (
    <AccountShell active="notifications" footerPb={3}>
      <PageTop
        crumb="Email notifications"
        title="Email notifications"
        variant="plain"
        meta={
          <span className="mt-[1px] mb-[3px] flex items-center gap-1">
            {account.email}
            <VerifiedIcon />
          </span>
        }
      />
      <div className="flex items-start gap-4 px-8 pt-6">
        <nav className="w-[300px] shrink-0 rounded-lg bg-white p-1 shadow-card">
          {notificationGroups.map((g) => {
            const on = state[g.key].filter(Boolean).length;
            return (
              <Link
                key={g.key}
                href={`${accountRoutes.notifications}?tab=${g.key}`}
                replace
                scroll={false}
                className={`mb-1 flex h-[37px] items-center rounded-md pr-[8px] pl-2 text-[14px] leading-5 text-rk-text last:mb-0 hover:bg-[#cbddfd] ${g.key === group.key ? "bg-[#ecf0ff]" : ""}`}
              >
                <span className="flex-1">{g.label}</span>
                <span className="text-rk-muted">{on ? `${on}/${g.items.length} active` : "Off"}</span>
                <ChevronRight className="ml-[10px] text-rk-muted" width={14} height={14} />
              </Link>
            );
          })}
        </nav>
        <div className="flex-1 rounded-lg bg-white px-5 py-3 shadow-card">
          {group.items.map((it, i) => (
            <Switch
              key={it.label}
              on={state[group.key][i]}
              label={it.label}
              onToggle={() => setState((s) => ({ ...s, [group.key]: s[group.key].map((v, j) => (j === i ? !v : v)) }))}
            />
          ))}
        </div>
      </div>
    </AccountShell>
  );
}
