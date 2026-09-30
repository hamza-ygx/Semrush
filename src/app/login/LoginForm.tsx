"use client";

import { useActionState } from "react";
import { staffDomain } from "@/lib/auth/config";
import { login } from "./actions";

const input = "h-10 w-full rounded-md border border-rk-border-strong bg-white px-3 text-[14px] text-rk-text outline-none placeholder:text-rk-faint focus:border-rk-accent focus:ring-2 focus:ring-rk-accent/25";

export function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Work email</span>
        <input name="email" type="email" required autoComplete="username" placeholder={`name@${staffDomain}`} className={input} autoFocus />
      </label>
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={input} />
      </label>
      {error && (
        <p role="alert" className="text-[13px] text-rk-danger">
          {error}
        </p>
      )}
      <button type="submit" disabled={pending} className="flex h-10 w-full items-center justify-center rounded-md bg-rk-btn-dark text-[14px] font-medium text-white hover:bg-[#2b2e2b] disabled:opacity-60">
        {pending ? "Logging in…" : "Log in"}
      </button>
      <p className="text-[12px] leading-4 text-rk-muted">No account or forgot your password? Ask an administrator to set a temporary one for you.</p>
    </form>
  );
}
