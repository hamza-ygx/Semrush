import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";

export const aiButton = "bg-[linear-gradient(90deg,#a55ff7_0%,#8a66ef_55%,#6b6be0_100%)] text-white hover:brightness-95";

const tones = {
  lavender: [
    "linear-gradient(180deg, rgba(243,245,245,0) calc(100% - 340px), #f3f5f5 calc(100% - 100px))",
    "radial-gradient(ellipse 420px 360px at 0% 34%, rgba(214,242,236,0.95), rgba(214,242,236,0) 70%)",
    "radial-gradient(ellipse 520px 380px at -4% 72%, rgba(250,232,222,0.95), rgba(250,232,222,0) 72%)",
    "radial-gradient(ellipse 500px 420px at 102% 40%, rgba(222,238,252,0.95), rgba(222,238,252,0) 72%)",
    "linear-gradient(180deg, #eceef8 0%, #eaebf8 55%, #eeeef6 78%, #f3f5f5 100%)",
  ],
  light: [
    "linear-gradient(180deg, rgba(248,248,247,0) calc(100% - 360px), #f8f8f7 calc(100% - 120px))",
    "radial-gradient(ellipse 380px 260px at 26% 22%, rgba(223,240,250,0.95), rgba(223,240,250,0) 72%)",
    "radial-gradient(ellipse 560px 420px at -6% 70%, rgba(252,238,228,0.9), rgba(252,238,228,0) 72%)",
    "radial-gradient(ellipse 520px 460px at 100% 62%, rgba(232,234,252,0.95), rgba(232,234,252,0) 72%)",
    "linear-gradient(180deg, #f7f8f8 0%, #f5f4f8 50%, #f7f6f6 100%)",
  ],
};

export function LandingBg({ children, className = "", tone = "lavender" }: { children: ReactNode; className?: string; tone?: keyof typeof tones }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: tones[tone].join(","),
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function LandingFooter({ gap = 40 }: { gap?: number }) {
  return (
    <div style={{ paddingTop: gap }} className="max-xl:[&>footer]:pb-[37px]">
      <Footer />
    </div>
  );
}

export function Feature({ art, title, children, className = "" }: { art: ReactNode; title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {art}
      <h3 className="font-semibold text-rk-text">{title}</h3>
      {children}
    </div>
  );
}

export function ExampleChip({ href, domain = "warbyparker.com", className = "" }: { href: string; domain?: string; className?: string }) {
  return (
    <div className={`mx-auto flex items-center rounded-xl bg-white/85 shadow-[0_2px_12px_rgba(25,27,35,0.06)] ${className}`}>
      <span className="text-rk-text-2">{domain}</span>
      <Link href={href} className="flex items-center gap-[8px] text-rk-link hover:text-rk-link-hover">
        View free example
        <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
