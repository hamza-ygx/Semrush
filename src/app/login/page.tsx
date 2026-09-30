import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { entra, staffDomain } from "@/lib/auth/config";
import { safeRedirect } from "@/lib/safeRedirect";

export const metadata: Metadata = { title: `Log in | ${brand.name}` };

const errors: Record<string, string> = {
  domain: `Only @${staffDomain} accounts have access. Sign in with your work account.`,
  link: "Sign-in didn't complete. Try again.",
};

function MicrosoftLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  const target = safeRedirect(next);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-rk-bg px-4">
      <div className="w-full max-w-[400px] rounded-lg border border-rk-border bg-white p-8 shadow-[0_1px_2px_rgba(27,30,26,0.06)]">
        <div className="mb-6 flex items-center gap-2 text-[16px] font-bold text-rk-text">
          <LogoIcon width={24} height={24} />
          {brand.name}
        </div>
        <h1 className="mb-1 text-[22px] leading-7 font-bold text-rk-text">Log in</h1>
        <p className="mb-6 text-[14px] leading-5 text-rk-muted">For {brand.legalName} staff.</p>
        {error && errors[error] && (
          <p role="alert" className="mb-4 text-[13px] text-rk-danger">
            {errors[error]}
          </p>
        )}
        {entra ? (
          <a
            href={`/auth/login?next=${encodeURIComponent(target)}`}
            className="flex h-10 w-full items-center justify-center gap-3 rounded-md border border-rk-border-strong bg-white text-[14px] font-medium text-rk-text hover:bg-rk-bg"
          >
            <MicrosoftLogo />
            Sign in with Microsoft
          </a>
        ) : (
          <p className="text-[14px] text-rk-text-2">
            Login is not configured on this server. <a href={routes.home} className="text-rk-link hover:text-rk-link-hover">Continue to the app</a>
          </p>
        )}
      </div>
      <p className="mt-6 text-[12px] text-rk-muted">© 2026 {brand.legalName}</p>
    </main>
  );
}
