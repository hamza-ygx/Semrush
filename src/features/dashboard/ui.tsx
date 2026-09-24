"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon, InfoIcon, SearchIcon } from "@/components/ui/icons";

export function WidgetCard({ children, className = "", grey = false }: { children: ReactNode; className?: string; grey?: boolean }) {
  return <section className={`relative flex flex-col rounded-lg ${grey ? "bg-[#ebecf2]" : "bg-white shadow-card"} ${className}`}>{children}</section>;
}

export function I({ className = "" }: { className?: string }) {
  return <InfoIcon width={16} height={16} className={`inline-block shrink-0 text-rk-faint ${className}`} />;
}

export function CloseX({ onClick, label = "Hide widget", className = "" }: { onClick?: () => void; label?: string; className?: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className={`-mr-[3px] flex h-5 w-5 shrink-0 items-center justify-center text-[#a9abb6] hover:text-rk-text-2 ${className}`}>
      <CloseIcon width={16} height={16} strokeWidth={1.8} />
    </button>
  );
}

export function WTitle({ children, info = true, href }: { children: ReactNode; info?: boolean; href?: string }) {
  return (
    <h2 className="flex items-center gap-[6px] text-[16px] leading-6 font-semibold whitespace-nowrap text-rk-text">
      {href ? (
        <Link href={href} className="hover:text-rk-link">
          {children}
        </Link>
      ) : (
        children
      )}
      {info && <I />}
    </h2>
  );
}

export function Label({ children, info = true, className = "" }: { children: ReactNode; info?: boolean; className?: string }) {
  return (
    <div className={`flex items-center gap-[6px] text-[14px] leading-5 text-rk-text ${className}`}>
      {children}
      {info && <I />}
    </div>
  );
}

export function Num({ children, href, className = "", color = "text-rk-number" }: { children: ReactNode; href?: string; className?: string; color?: string }) {
  const cls = `text-[20px] leading-6 font-semibold ${color} ${className}`;
  return href ? (
    <Link href={href} className={`${cls} hover:opacity-80`}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}

export function Delta({ v }: { v: string }) {
  const up = v.startsWith("+");
  const zero = !up && !v.startsWith("-");
  return <span className={`text-[12px] leading-4 ${zero ? "text-rk-muted" : up ? "text-rk-success" : "text-rk-danger"}`}>{v}</span>;
}

export function MenuPanel({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div style={style} className={`absolute z-50 rounded-md bg-white py-1 shadow-popover ${className}`}>
      {children}
    </div>
  );
}

export function MenuRow({ children, selected, onClick, className = "" }: { children: ReactNode; selected?: boolean; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-center gap-2 px-2 py-[6px] text-left text-[14px] leading-5 whitespace-nowrap text-rk-text ${
        selected ? "bg-[#ebf0ff]" : "hover:bg-rk-bg"
      } ${className}`}
    >
      {selected && <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-rk-text" />}
      {children}
    </button>
  );
}

export function Chevron({ open }: { open?: boolean }) {
  return <ChevronDown width={16} height={16} strokeWidth={2} className={open ? "rotate-180" : ""} />;
}

export function useMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  return { open, setOpen, close, ref, toggle: () => setOpen((o) => !o) };
}

export function LinkDropdown<T extends string>({
  value,
  options,
  render,
  renderOption,
  onChange,
  align = "left",
  panelClassName = "",
  panelTop = 2,
  id,
}: {
  value: T;
  options: readonly T[];
  render?: (v: T) => ReactNode;
  renderOption?: (v: T) => ReactNode;
  onChange?: (v: T) => void;
  align?: "left" | "right";
  panelClassName?: string;
  panelTop?: number;
  id?: string;
}) {
  const { open: mOpen, ref: mRef, toggle: mToggle, close: mClose } = useMenu();
  const [cur, setCur] = useState(value);
  return (
    <div ref={mRef} className="relative inline-flex">
      <button type="button" data-dd={id} onClick={mToggle} className="group flex items-center gap-[6px] text-[14px] leading-5 whitespace-nowrap text-rk-link hover:text-rk-link-hover">
        <span className={`flex items-center gap-[6px] ${mOpen ? "underline underline-offset-[5px]" : ""}`}>{render ? render(cur) : cur}</span>
        <Chevron />
      </button>
      {mOpen && (
        <MenuPanel style={{ top: `calc(100% + ${panelTop}px)` }} className={`${align === "right" ? "right-0" : "left-0"} ${panelClassName}`}>
          {options.map((o) => (
            <MenuRow
              key={o}
              selected={o === cur}
              onClick={() => {
                setCur(o);
                onChange?.(o);
                mClose();
              }}
            >
              {renderOption ? renderOption(o) : o}
            </MenuRow>
          ))}
        </MenuPanel>
      )}
    </div>
  );
}

export function SearchList({ items, render, onPick, first }: { items: string[]; render: (v: string) => ReactNode; onPick: (v: string) => void; first?: ReactNode }) {
  const [q, setQ] = useState("");
  const list = items.filter((i) => i.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="w-[212px]">
      <div className="px-0 pb-[1px]">
        <label className="mx-0 flex h-8 items-center gap-2 rounded-md border-2 border-[#7a86f2] bg-white px-2 text-rk-muted">
          <SearchIcon width={14} height={14} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full text-[14px] text-rk-text outline-none placeholder:text-rk-muted" />
        </label>
      </div>
      <div className={`${first && !q ? "max-h-[245px]" : "max-h-[206px]"} overflow-y-auto [scrollbar-width:thin]`}>
        {!q && first}
        <div className="h-1" />
        {list.map((c) => (
          <button key={c} type="button" onClick={() => onPick(c)} className="flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg">
            {render(c)}
          </button>
        ))}
        {list.length === 0 && <div className="px-2 py-[6px] text-[14px] text-rk-muted">Nothing found</div>}
      </div>
    </div>
  );
}
