import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Fragment, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";

type P = SVGProps<SVGSVGElement>;

export function WidePage({ children, width = 1300 }: { children: ReactNode; width?: number }) {
  return <div style={{ minWidth: width }}>{children}</div>;
}

export function CenteredFooter({ className = "pt-[136px] pb-[37px]" }: { className?: string }) {
  const link = "text-[16px] leading-6 text-rk-muted hover:text-rk-text";
  return (
    <>
      <div className="hidden pt-[34px] xl:block">
        <Footer />
      </div>
      <footer className={`flex flex-col items-center gap-6 xl:hidden ${className}`}>
        <button type="button" className={`${link} flex items-center gap-[6px]`}>
          <TranslateGlyph />
          English
          <svg viewBox="0 0 16 16" width={14} height={14} className="text-rk-faint">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex gap-7">
          <a href="#" className={link}>
            Contact us
          </a>
          <a href="#" className={link}>
            Cookie settings
          </a>
        </div>
        <span className="text-[16px] leading-6 text-rk-muted">
          © 2026 {brand.legalName}. All rights reserved.
        </span>
      </footer>
    </>
  );
}

const TranslateGlyph = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text-2">
    <g fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 3h6.5M4.7 1.5V3M2.6 3c.6 2.2 2 3.8 4 4.6M6.8 3C6.3 5.4 4.6 7.2 2 8" />
    </g>
    <path d="M10.8 7h1.4l3.3 8h-1.6l-.8-2h-3.3l-.8 2H7.5zm-.5 4.6h2.4L11.5 8.6z" fill="currentColor" />
  </svg>
);

const CapIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 2.5 1 6l7 3.5L15 6z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M4 7.6v3.4c1 1.4 2.3 2 4 2s3-.6 4-2V7.6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

const ManualIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M1.5 2.5h5.2L8 3.6l1.3-1.1h5.2v10H9.3L8 13.6l-1.3-1.1H1.5z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M8 3.6v10M3.8 5.5h2M3.8 8h2M10.2 5.5h2M10.2 8h2" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export function DemoTag({ className = "" }: { className?: string }) {
  return <span className={`ml-[2px] inline-flex h-5 items-center rounded-[4px] bg-[#f0f1f1] px-[6px] text-[12px] leading-4 font-normal text-rk-muted ${className}`}>Demo data</span>;
}

export function KwHeader({
  tool,
  subject,
  meta,
  tabs,
  right,
  titleRight,
  demo,
}: {
  tool: string;
  demo?: boolean;
  titleRight?: ReactNode;
  subject?: ReactNode;
  meta?: ReactNode;
  tabs?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className={`border-b border-rk-border px-8 pt-4 ${tabs ? "" : "pb-[18px]"}`}>
      <div className="flex items-center justify-between">
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: tool }]} />
        <div className="flex items-center gap-5 text-[14px] leading-5 text-rk-link">
          <Link href="#" className="flex items-center gap-[5px] hover:text-rk-link-hover">
            <CapIcon />
            Keyword Research course
          </Link>
          <Link href="#" className="flex items-center gap-[5px] hover:text-rk-link-hover">
            <ManualIcon />
            User manual
          </Link>
          {right}
        </div>
      </div>
      <div className="mt-2 flex h-7 items-center justify-between">
        <h1 className="flex items-center gap-2 text-[20px] leading-7 font-semibold">
          {tool}:<span className="text-rk-muted">{subject}</span>
          {demo && <DemoTag />}
        </h1>
        {titleRight}
      </div>
      {meta && <div className="mt-2 flex h-5 items-center gap-6 text-[14px] leading-5">{meta}</div>}
      {tabs && <div className="mt-6">{tabs}</div>}
    </div>
  );
}

export const SparkleIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M6 3.5c.4 2.6 1.5 3.8 4.2 4.3-2.7.5-3.8 1.7-4.2 4.3-.4-2.6-1.5-3.8-4.2-4.3C4.5 7.3 5.6 6.1 6 3.5z" fill="#8f3ae0" />
    <path d="M12 1c.2 1.2.7 1.8 2 2-1.3.2-1.8.8-2 2-.2-1.2-.7-1.8-2-2 1.3-.2 1.8-.8 2-2z" fill="#b16cf2" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 14.5s-5-4.3-5-8a5 5 0 0 1 10 0c0 3.7-5 8-5 8z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <circle cx="8" cy="6.5" r="1.8" fill="currentColor" />
  </svg>
);

export const Chevron = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CirclePlus = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M8 4.8v6.4M4.8 8h6.4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const ExtIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M9.5 2.5h4v4M13.5 2.5 8 8M12 9.5v4H2.5V4h4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SerpIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M2.5 8h11M10 8v5.5" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

export const SfIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M13.5 6V2.5h-11v11H7" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M2.5 5.5h11" stroke="currentColor" strokeWidth={1.4} />
    <circle cx="10.5" cy="10.5" r="2.2" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="m12.2 12.2 1.8 1.8" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.3} />
    <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth={1.3} />
  </svg>
);

export const SortIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const SendIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M2.5 13.5V10c0-2.5 1.8-4 4.3-4h7M10.3 2.5 13.8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BulbBadge = () => (
  <svg viewBox="0 0 40 40" width={40} height={40}>
    <path
      d="M20 2.5l4 2.8 4.8-.4 2.1 4.4 4.4 2.1-.4 4.8 2.8 4-2.8 4 .4 4.8-4.4 2.1-2.1 4.4-4.8-.4-4 2.8-4-2.8-4.8.4-2.1-4.4-4.4-2.1.4-4.8-2.8-4 2.8-4-.4-4.8 4.4-2.1 2.1-4.4 4.8.4z"
      fill="#b98af5"
    />
    <circle cx="20" cy="17" r="8" fill="#e8d7ff" stroke="#3b2a60" strokeWidth={1.5} />
    <path d="M17 25h6v4h-6zM18 29.5h4" stroke="#3b2a60" strokeWidth={1.5} fill="#fff" strokeLinejoin="round" />
    <path d="M18 21v-4l2 2 2-2v4" fill="none" stroke="#3b2a60" strokeWidth={1.3} strokeLinejoin="round" />
  </svg>
);

export function OnboardingTip({
  title,
  children,
  onClose,
  actions,
  className = "",
  style,
}: {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  actions: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style} className={`absolute z-40 flex rounded-md bg-[#e1cdff] py-4 pr-4 pl-4 shadow-[0_2px_10px_rgba(25,27,35,0.12)] ${className}`}>
      <div className="shrink-0">
        <BulbBadge />
      </div>
      <div className="min-w-0 flex-1 pr-6">
        <div className="text-[16px] leading-6 font-semibold text-rk-text">{title}</div>
        <div className="mt-[3px] text-[14px] leading-5 text-rk-text-2">{children}</div>
        <div className="mt-4 flex items-center gap-4">{actions}</div>
      </div>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[14px] right-[14px] text-rk-text-2 hover:text-rk-text">
        <svg viewBox="0 0 16 16" width={14} height={14}>
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function KdDot({ kd, size = 10 }: { kd: number | null; size?: number }) {
  const c = kd == null ? "#d9d9de" : kd < 15 ? "#009f81" : kd < 30 ? "#3ee1b4" : kd < 50 ? "#fcb40a" : kd < 70 ? "#ff8c43" : "#ff4953";
  return <span className="inline-block shrink-0 rounded-full" style={{ background: c, width: size, height: size }} />;
}

export function SegButtons<T extends string>({
  items,
  value,
  onChange,
  className = "",
  itemClassName = "h-7 px-2 text-[14px]",
}: {
  items: { value: T; label: ReactNode; wrap?: (button: ReactNode) => ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`inline-flex rounded-md ${className}`}>
      {items.map((it, i) => {
        const on = it.value === value;
        const button = (
          <button
            key={it.value}
            type="button"
            onClick={() => onChange(it.value)}
            className={`relative -ml-px flex items-center border first:ml-0 ${i === 0 ? "rounded-l-md" : ""} ${i === items.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#9ea6f5] bg-[#e9ecfd] text-rk-text" : "border-rk-border bg-white text-rk-text hover:bg-rk-bg"
            } ${itemClassName}`}
          >
            {it.label}
          </button>
        );
        return it.wrap ? <Fragment key={it.value}>{it.wrap(button)}</Fragment> : button;
      })}
    </div>
  );
}
