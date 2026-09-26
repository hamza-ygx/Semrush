import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LogoIcon } from "@/components/icons";
import { staffDomain } from "@/lib/supabase/env";
import { safeRedirect } from "@/lib/safeRedirect";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: `Log in | ${brand.name}` };

const errors: Record<string, string> = {
  domain: `Only @${staffDomain} accounts have access. Log in with your work email.`,
  link: "That login link is invalid or has expired. Request a new one.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-rk-bg px-4">
      <div className="w-full max-w-[400px] rounded-lg border border-rk-border bg-white p-8 shadow-[0_1px_2px_rgba(27,30,26,0.06)]">
        <div className="mb-6 flex items-center gap-2 text-[16px] font-bold text-rk-text">
          <LogoIcon width={24} height={24} />
          {brand.name}
        </div>
        <h1 className="mb-1 text-[22px] leading-7 font-bold text-rk-text">Log in</h1>
        <p className="mb-6 text-[14px] leading-5 text-rk-muted">For {brand.legalName} staff.</p>
        <LoginForm next={safeRedirect(next)} initialError={error ? errors[error] : undefined} />
      </div>
      <p className="mt-6 text-[12px] text-rk-muted">© 2026 {brand.legalName}</p>
    </main>
  );
}
