"use client";

import { useState } from "react";
import { Modal } from "../ui/Modal";
import { CloseIcon, InfoIcon } from "../ui/icons";

const Spinner = () => (
  <svg viewBox="0 0 16 16" width={14} height={14} className="inline-block animate-spin align-[-2px]">
    <path d="M8 2a6 6 0 1 0 6 6" fill="none" stroke="#c4c7cf" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export function InviteUsersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [emails, setEmails] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const commit = () => {
    const v = draft.trim().replace(/,$/, "");
    if (v) setEmails((e) => [...e, v]);
    setDraft("");
  };
  const invalid = emails.some((e) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) || emails.length > 1;
  return (
    <Modal open={open} onClose={onClose} title="Invite users">
      <div className="mb-2 flex items-center gap-[6px] text-[16px]">
        Email addresses
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-rk-border-strong px-1 text-[12px] text-rk-text-2">{emails.length}</span>
        {emails.length > 0 && invalid && (
          <svg viewBox="0 0 16 16" width={18} height={18}>
            <path d="M8 1.5 15 14H1z" fill="none" stroke="#d1002f" strokeWidth={1.6} strokeLinejoin="round" />
            <path d="M8 6v4" stroke="#d1002f" strokeWidth={1.6} strokeLinecap="round" />
            <circle cx="8" cy="12" r=".9" fill="#d1002f" />
          </svg>
        )}
      </div>
      <div
        className="flex min-h-[108px] flex-wrap content-start gap-1 rounded-md border border-rk-border-strong p-3 focus-within:border-[#7a86f2]"
        onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
      >
        {emails.map((e, i) => (
          <span key={i} className="flex h-7 items-center gap-1 rounded-md bg-[#e0e1e9] px-2 text-[14px] text-rk-text-2">
            {e}
            <button type="button" aria-label={`Remove ${e}`} onClick={() => setEmails((x) => x.filter((_, j) => j !== i))}>
              <CloseIcon width={12} height={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (["Enter", ",", " ", "Tab"].includes(e.key) && draft.trim()) {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && !draft) setEmails((x) => x.slice(0, -1));
          }}
          onBlur={commit}
          className="h-7 min-w-[120px] flex-1 text-[14px] outline-none"
        />
      </div>
      <p className="mt-5 text-[14px] leading-5 text-rk-text-2">
        By clicking “Invite users”, you agree that {emails.length} additional user{emails.length === 1 ? "" : "s"} will be added to your subscription for <Spinner /> /month per user.
      </p>
      <div className="mt-[6px] border-t-2 border-rk-text-2 pt-1 text-[14px] font-semibold">
        Today’s charge: <Spinner /> (incl. Tax) <InfoIcon className="inline text-rk-muted" />
      </div>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={onClose} className="h-10 rounded-md bg-[#009f81] px-3 text-[16px] font-medium text-white hover:bg-[#007c65]">
          Invite users
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-rk-border-strong bg-rk-bg px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
      </div>
    </Modal>
  );
}
