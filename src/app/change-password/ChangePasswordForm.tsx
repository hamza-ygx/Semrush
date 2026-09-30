"use client";

import { useActionState } from "react";
import { changePassword } from "./actions";

const input = "h-10 w-full rounded-md border border-rk-border-strong bg-white px-3 text-[14px] text-rk-text outline-none focus:border-rk-accent focus:ring-2 focus:ring-rk-accent/25";

export function ChangePasswordForm() {
  const [error, action, pending] = useActionState(changePassword, null);
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Current password</span>
        <input name="current" type="password" required autoComplete="current-password" className={input} autoFocus />
      </label>
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">New password (at least 12 characters)</span>
        <input name="password" type="password" required minLength={12} autoComplete="new-password" className={input} />
      </label>
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Repeat new password</span>
        <input name="confirm" type="password" required minLength={12} autoComplete="new-password" className={input} />
      </label>
      {error && (
        <p role="alert" className="text-[13px] text-rk-danger">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="flex h-10 w-full items-center justify-center rounded-md bg-rk-btn-dark text-[14px] font-medium text-white hover:bg-[#2b2e2b] disabled:opacity-60">
        {pending ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
