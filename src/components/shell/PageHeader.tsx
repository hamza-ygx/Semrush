import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "../ui/primitives";
import { BookIcon, FeedbackIcon } from "../ui/icons";

export function HeaderLink({ href = "#", icon, children }: { href?: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
      {icon}
      {children}
    </Link>
  );
}

export const SendFeedback = () => <HeaderLink icon={<FeedbackIcon />}>Send feedback</HeaderLink>;
export const HelpCenter = ({ label = "Help center" }: { label?: string }) => <HeaderLink icon={<BookIcon />}>{label}</HeaderLink>;

/**
 * Report header: breadcrumbs row (with right-hand links), title row (with actions),
 * optional meta row, optional tabs. Sits on the page background above the report body.
 */
export function PageHeader({
  crumbs,
  links = <SendFeedback />,
  title,
  actions,
  meta,
  tabs,
  children,
  border = true,
  className = "",
}: {
  crumbs: { label: string; href?: string }[];
  links?: ReactNode;
  title: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  tabs?: ReactNode;
  children?: ReactNode;
  border?: boolean;
  className?: string;
}) {
  return (
    <div className={`px-8 pt-4 ${border ? "border-b border-rk-border" : ""} ${tabs ? "" : "pb-[17px]"} ${className}`}>
      <div className="flex items-center justify-between">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-6">{links}</div>
      </div>
      <div className="mt-[9px] flex items-start justify-between gap-4">
        <h1 className="flex min-h-7 items-center gap-2 text-[20px] leading-7 font-semibold">{title}</h1>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {meta && <div className="mt-[7px] flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] leading-5 text-rk-text">{meta}</div>}
      {children}
      {tabs && <div className="mt-8">{tabs}</div>}
    </div>
  );
}
