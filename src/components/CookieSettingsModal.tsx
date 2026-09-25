"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "./ui/Modal";

const categories = [
  { key: "necessary", title: "Necessary cookies", text: "Some cookies are required to provide core functionality. The website won’t function properly without these cookies, and they are enabled by default and cannot be disabled.", locked: true },
  { key: "functional", title: "Functional cookies", text: "Functional cookies help us remember your preferences, such as your language or region, and provide enhanced, more personal features." },
  { key: "analytics", title: "Analytics cookies", text: "Analytics cookies help us understand how visitors interact with the website, so we can improve the content and the way it works." },
  { key: "marketing", title: "Marketing cookies", text: "Marketing cookies are used to show you relevant ads across other websites and to measure the effectiveness of our campaigns." },
];

const policy = [
  ["Necessary cookies", "session_id, csrf_token, cookie_consent"],
  ["Functional cookies", "locale, sidebar_state, recent_searches"],
  ["Analytics cookies", "_ga, _gid, visitor_id"],
  ["Marketing cookies", "_fbp, ads_conversion, campaign_ref"],
];

const pill = "flex h-[50px] items-center rounded-full border border-[#1f1f1f] px-6 text-[16px] font-medium text-[#1f1f1f] hover:bg-[#f3f3f3]";

function Toggle({ on, locked, onChange }: { on: boolean; locked?: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={locked}
      onClick={onChange}
      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-[2px] ${on ? (locked ? "justify-end bg-[#dabcff]" : "justify-end bg-[#b580ff]") : "justify-start bg-[#c4c7cf]"}`}
    >
      <span className="h-4 w-4 rounded-full bg-white" />
    </button>
  );
}

export function CookieSettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"categories" | "policy">("categories");
  const [allowed, setAllowed] = useState<Record<string, boolean>>({ necessary: true, functional: true, analytics: false, marketing: false });
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const setAll = (v: boolean) => setAllowed((a) => Object.fromEntries(Object.keys(a).map((k) => [k, k === "necessary" || v])));
  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="About cookies on this site" className="flex h-[700px] w-[668px] flex-col rounded-xl bg-white pt-[41px] text-[#1f1f1f]">
        <div className="flex items-start justify-between pr-10 pl-[41px]">
          <h2 className="text-[42px] leading-[60px] font-normal tracking-[-0.025em]">About cookies on this site</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#1f1f1f] hover:bg-[#f3f3f3]">
            <svg viewBox="0 0 12 12" width={12} height={12}>
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="mt-[23px] ml-[43px] flex h-[38px] w-fit items-center rounded-full border border-[#eeeeee] p-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {(
            [
              ["categories", "Categories"],
              ["policy", "Cookie Policy"],
            ] as const
          ).map(([k, l]) => (
            <button key={k} type="button" onClick={() => setTab(k)} className={`h-[33px] rounded-full px-4 text-[16px] ${tab === k ? "bg-[#c191f8]" : "hover:bg-[#f5f0fd]"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="mt-[25px] mr-10 ml-[43px] h-[380px] overflow-scroll text-[16px] leading-[22.4px]">
          <div className="w-[570px]">
            {tab === "categories" ? (
              <>
                <p className="pt-[1px]">
                  Cookies used on the site are categorized and below you can read about each category and allow or deny some or all of them, except for Necessary Cookies which are required to provide core website functionality. When categories that have been previously allowed are disabled, all cookies assigned to that category will be removed from your browser. You can see a list of cookies assigned to each category and detailed information on those cookies in the “Cookie Policy” tab.
                </p>
                <button type="button" onClick={() => setTab("policy")} className="mt-[16px] text-[#2d6ae3] underline underline-offset-2">
                  Cookie Policy.
                </button>
                <div className="mt-[24px] flex gap-3">
                  <button type="button" onClick={() => setAll(true)} className={pill}>
                    Allow all cookies
                  </button>
                  <button type="button" onClick={() => setAll(false)} className={pill}>
                    Deny all
                  </button>
                </div>
                {categories.map((c) => (
                  <div key={c.key} className="mt-[50px] first-of-type:mt-[50px]">
                    <div className="flex items-center gap-[10px]">
                      <Toggle on={allowed[c.key]} locked={c.locked} onChange={() => setAllowed((a) => ({ ...a, [c.key]: !a[c.key] }))} />
                      <span className="text-[18px] leading-6 font-medium">{c.title}</span>
                    </div>
                    <p className="mt-[8px] pl-[46px]">{c.text}</p>
                  </div>
                ))}
              </>
            ) : (
              <table className="w-full text-left text-[14px] leading-5">
                <tbody>
                  {policy.map(([c, list]) => (
                    <tr key={c} className="border-b border-[#eee]">
                      <th className="py-3 pr-4 align-top font-medium">{c}</th>
                      <td className="py-3 text-[#555]">{list}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="mt-[25px] pl-10">
          <button type="button" aria-label="Save settings" onClick={onClose} className="h-[50px] rounded-full bg-[#181d17] px-6 text-[16px] font-semibold text-white hover:bg-black">
            Save settings
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
