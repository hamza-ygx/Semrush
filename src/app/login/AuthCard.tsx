import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { LogoIcon } from "@/components/icons";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-rk-bg px-4">
      <div className="w-full max-w-[400px] rounded-lg border border-rk-border bg-white p-8 shadow-[0_1px_2px_rgba(27,30,26,0.06)]">
        <div className="mb-6 flex items-center gap-2 text-[16px] font-bold text-rk-text">
          <LogoIcon width={24} height={24} />
          {brand.name}
        </div>
        <h1 className="mb-1 text-[22px] leading-7 font-bold text-rk-text">{title}</h1>
        <p className="mb-6 text-[14px] leading-5 text-rk-muted">{subtitle}</p>
        {children}
      </div>
      <p className="mt-6 text-[12px] text-rk-muted">© 2026 {brand.legalName}</p>
    </main>
  );
}
