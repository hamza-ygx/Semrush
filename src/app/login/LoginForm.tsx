"use client";

import { useActionState } from "react";
import { staffDomain } from "@/lib/supabase/env";
import { sendLink, verifyCode, type LoginState } from "./actions";

const input = "h-10 w-full rounded-md border border-rk-border-strong bg-white px-3 text-[14px] text-rk-text outline-none placeholder:text-rk-faint focus:border-rk-accent focus:ring-2 focus:ring-rk-accent/25";
const button = "flex h-10 w-full items-center justify-center rounded-md bg-rk-btn-dark text-[14px] font-medium text-white hover:bg-[#2b2e2b] disabled:opacity-60";

export function LoginForm({ next, initialError }: { next: string; initialError?: string }) {
  const [state, action, pending] = useActionState(
    async (prev: LoginState, form: FormData): Promise<LoginState> => {
      if (form.get("intent") === "reset") return { step: "email", email: prev.email, next };
      return prev.step === "code" ? verifyCode(prev, form) : sendLink(prev, form);
    },
    { step: "email", next, error: initialError },
  );

  if (state.step === "code")
    return (
      <form action={action} className="space-y-4">
        <p className="text-[14px] leading-5 text-rk-text-2">
          We sent a login link to <b className="font-semibold text-rk-text">{state.email}</b>. Open it on this device, or enter the code from the email.
        </p>
        <label className="block">
          <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Code</span>
          <input name="code" inputMode="numeric" autoComplete="one-time-code" placeholder="123456" className={input} autoFocus />
        </label>
        {state.error && <p role="alert" className="text-[13px] text-rk-danger">{state.error}</p>}
        <button type="submit" disabled={pending} className={button}>
          {pending ? "Checking…" : "Log in"}
        </button>
        <button type="submit" name="intent" value="reset" formNoValidate className="w-full text-[13px] text-rk-link hover:text-rk-link-hover">
          Use another email
        </button>
      </form>
    );

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-[13px] font-medium text-rk-text-2">Work email</span>
        <input name="email" type="email" required autoComplete="email" defaultValue={state.email} placeholder={`name@${staffDomain}`} className={input} autoFocus />
      </label>
      {state.error && <p role="alert" className="text-[13px] text-rk-danger">{state.error}</p>}
      <button type="submit" disabled={pending} className={button}>
        {pending ? "Sending…" : "Send login link"}
      </button>
    </form>
  );
}
