"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, SearchIcon } from "@/components/ui/icons";
import { useOutsideClose } from "@/components/ui/Popover";

export const ExtIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`inline-block shrink-0 ${className}`}>
    <path d="M9 2.5h4.5V7M13.5 2.5 7.5 8.5M11.5 9.5v4h-9v-9h4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SortIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const SortAscIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M2.5 13h11M2.5 9h7.5M2.5 5h4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);

export const SendIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M9.5 3 14 7.5 9.5 12M14 7.5H7c-2.8 0-4.5 1.7-4.5 5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparkleIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={`shrink-0 ${className}`}>
    <path d="M6.5 2.5c.4 3 1.6 4.3 4.5 4.8-2.9.5-4.1 1.8-4.5 4.8-.4-3-1.6-4.3-4.5-4.8 2.9-.5 4.1-1.8 4.5-4.8z" fill="#a347ff" />
    <path d="M12.5 1c.2 1.2.7 1.7 1.8 1.9-1.1.2-1.6.7-1.8 1.9-.2-1.2-.7-1.7-1.8-1.9 1.1-.2 1.6-.7 1.8-1.9zM12 10.5c.2 1 .6 1.4 1.5 1.6-.9.2-1.3.6-1.5 1.6-.2-1-.6-1.4-1.5-1.6.9-.2 1.3-.6 1.5-1.6z" fill="#a347ff" />
  </svg>
);

export const XIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={`shrink-0 ${className}`}>
    <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

export const ReauditIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M13 8a5 5 0 1 1-1.6-3.7" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    <path d="M13.6 2.2v3.6H10" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HelpCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M6.2 6.3a1.9 1.9 0 0 1 3.7.5c0 1.3-1.9 1.6-1.9 2.8" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    <circle cx="8" cy="11.4" r=".9" fill="currentColor" />
  </svg>
);

export function Checkbox({ checked, disabled, onChange, className = "" }: { checked?: boolean; disabled?: boolean; onChange?: () => void; className?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!!checked}
      disabled={disabled}
      onClick={onChange}
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
        checked ? (disabled ? "border-[#a9abb6] bg-[#a9abb6]" : "border-rk-text bg-rk-text") : "border-rk-border-strong bg-white"
      } ${className}`}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path d="m3.5 8.3 2.9 2.9 6.1-6.4" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function useToggle(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return { open, setOpen, ref, toggle: () => setOpen((o) => !o) };
}

export function SelectButton({
  children,
  open,
  onClick,
  className = "",
  placeholder,
}: {
  children: ReactNode;
  open?: boolean;
  onClick?: () => void;
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-7 items-center justify-between gap-1 rounded-md border bg-white px-2 text-[14px] ${
        open ? "border-[#8e92ec]" : "border-rk-border-strong hover:border-[#a9abb6]"
      } ${placeholder ? "text-rk-muted" : "text-rk-text"} ${className}`}
    >
      <span className="truncate">{children}</span>
      <ChevronDown className="shrink-0 text-rk-text" strokeWidth={2} />
    </button>
  );
}

export function SearchBox({ width = 200, placeholder = "Search", button = true, className = "" }: { width?: number; placeholder?: string; button?: boolean; className?: string }) {
  return (
    <div className={`flex h-7 ${className}`}>
      <input
        placeholder={placeholder}
        style={{ width }}
        className={`h-7 border border-rk-border-strong bg-white px-2 text-[14px] text-rk-text outline-none placeholder:text-rk-muted focus:border-[#8e92ec] ${
          button ? "rounded-l-md" : "rounded-md"
        }`}
      />
      {button && (
        <button type="button" aria-label="Search" className="-ml-px flex h-7 w-7 items-center justify-center rounded-r-md border border-rk-border-strong bg-[#f4f5f9] text-rk-text-2 hover:bg-rk-hover">
          <SearchIcon width={15} height={15} />
        </button>
      )}
    </div>
  );
}

export function PageSize({ value }: { value: number }) {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState(value);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} className="flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-white pr-[6px] pl-2 text-[14px] text-rk-text hover:border-[#a9abb6]">
        {v}
        <ChevronDown strokeWidth={2.2} width={14} height={14} />
      </button>
      {open && (
        <div className="absolute bottom-[calc(100%+4px)] left-0 z-50 w-[70px] rounded-md bg-white py-1 shadow-popover">
          {[10, 20, 50, 100].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setV(n);
                setOpen(false);
              }}
              className={`block w-full px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg ${n === v ? "bg-[#e9f7ff]" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function AdvancedFilterPanel({
  children,
  onApply,
  className = "",
}: {
  children: ReactNode;
  onApply?: () => void;
  className?: string;
}) {
  return (
    <div className={`absolute top-[calc(100%+4px)] z-50 rounded-md bg-white shadow-popover ${className}`}>
      <div className="px-4 pt-4 pb-[14px]">{children}</div>
      <div className="flex h-[60px] items-center justify-between border-t border-rk-border px-4">
        <button type="button" onClick={onApply} className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Apply filters
        </button>
        <button type="button" className="flex items-center gap-[6px] text-[14px] text-rk-text-2 hover:text-rk-text">
          <XIcon size={16} />
          Clear all
        </button>
      </div>
    </div>
  );
}

export function AddCondition() {
  return (
    <button type="button" className="mt-[15px] flex items-center gap-2 pl-[9px] text-[14px] font-medium text-rk-link hover:text-rk-link-hover">
      <svg viewBox="0 0 16 16" width={14} height={14}>
        <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
      Add condition
    </button>
  );
}

export const CogIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={`shrink-0 ${className}`}>
    <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </g>
  </svg>
);

export const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M2.5 8h11M9.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ErrorBolt = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="M5 1.8h6.2L9.3 6h3.2l-6.8 8.4 1.6-5.9H4.5z" fill="none" stroke="#e7163c" strokeWidth={1.7} strokeLinejoin="round" />
  </svg>
);

export const NoticeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="#8a8e9b" strokeWidth={1.4} />
    <path d="M8 7.2v4" stroke="#8a8e9b" strokeWidth={1.6} strokeLinecap="round" />
    <circle cx="8" cy="4.9" r=".95" fill="#8a8e9b" />
  </svg>
);

export const AiTag = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex h-4 items-center rounded-[4px] bg-gradient-to-r from-[#9a5cff] to-[#b18bff] px-[5px] text-[11px] leading-4 font-semibold text-white ${className}`}>AI Search</span>
);

export function BotIcon({ kind }: { kind: "perplexity" | "claude" }) {
  if (kind === "perplexity")
    return (
      <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
        <g fill="none" stroke="#20808d" strokeWidth={1.2} strokeLinejoin="round">
          <path d="M3 2.5 8 6.5l5-4v4H3zM8 1.5v13M3 6.5v5l5-4.5 5 4.5v-5M5 9.5v4.5L8 11l3 3V9.5" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
      <g stroke="#d97757" strokeWidth={1.8} strokeLinecap="round">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <path key={a} d="M8 8V1.8" transform={`rotate(${a} 8 8)`} />
        ))}
      </g>
    </svg>
  );
}
