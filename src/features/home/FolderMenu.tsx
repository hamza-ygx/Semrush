"use client";

import { useState, type ReactNode } from "react";
import { KebabIcon } from "@/components/icons";
import { useOutsideClose } from "@/components/ui/Popover";

const ic = (d: ReactNode) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-rk-muted">
    <g fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
      {d}
    </g>
  </svg>
);

const items: { label: string; icon: ReactNode }[] = [
  {
    label: "Share",
    icon: ic(
      <>
        <circle cx="6" cy="5" r="2.3" />
        <path d="M1.8 13.5c.3-2.5 2-3.8 4.2-3.8s3.9 1.3 4.2 3.8M10.5 3a2.2 2.2 0 0 1 1.2 3.9M12.6 9.9c1 .6 1.5 1.8 1.6 3.3" />
      </>,
    ),
  },
  { label: "Pin", icon: ic(<path d="M4.5 2.5h7M5.8 2.5v4.3L3.7 9.5h8.6L10.2 6.8V2.5M8 9.5v4.5" />) },
  {
    label: "Tags",
    icon: ic(
      <>
        <path d="M8.6 2.3h5.1v5.1l-6.3 6.3a1 1 0 0 1-1.4 0L2.3 10a1 1 0 0 1 0-1.4z" />
        <circle cx="11" cy="5" r="0.8" />
      </>,
    ),
  },
  {
    label: "Settings",
    icon: ic(
      <>
        <circle cx="8" cy="8" r="2" />
        <path d="M8 1.8l1.2 1.4 1.8-.3.6 1.7 1.7.6-.3 1.8L14.2 8l-1.2 1.2.3 1.8-1.7.6-.6 1.7-1.8-.3L8 14.2l-1.2-1.2-1.8.3-.6-1.7-1.7-.6.3-1.8L1.8 8 3 6.8l-.3-1.8 1.7-.6.6-1.7 1.8.3z" />
      </>,
    ),
  },
];

const trash = ic(<path d="M3 3.5h10M4.5 3.5v10h7v-10M6.5 3.5V2h3v1.5" />);

export function FolderMenu({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const row = "flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg";
  return (
    <div ref={ref} className="group relative mr-[2px] ml-auto">
      <button
        type="button"
        aria-label="Folder actions"
        data-testid="folder-menu"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-6 w-6 items-center justify-center rounded text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : ""}`}
      >
        <KebabIcon />
      </button>
      <span className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-40 hidden -translate-x-1/2 rounded-md bg-white px-3 py-[10px] text-[14px] leading-5 whitespace-nowrap text-rk-text shadow-popover group-hover:block">
        Settings
        <span className="absolute top-full left-1/2 -mt-[4px] h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
      </span>
      {open && (
        <div className="absolute top-[calc(100%+7px)] right-[-1px] z-50 w-[180px] rounded-md bg-white py-1 shadow-popover">
          {items.map((it) => (
            <button key={it.label} type="button" onClick={() => setOpen(false)} className={row}>
              {it.icon}
              {it.label}
            </button>
          ))}
          <div className="my-1 border-t border-rk-border" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className={row}
          >
            {trash}
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
