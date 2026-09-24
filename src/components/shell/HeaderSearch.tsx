"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { routes, tools } from "@/config/routes";
import { useOutsideClose } from "../ui/Popover";
import { ChevronDown, ClockIcon, CloseIcon, SearchIcon } from "../ui/icons";

const recents = [
  { label: "bokföring", href: routes.keywordOverview },
  { label: "www.rkjh.se", href: routes.domainOverview },
  { label: "rkjh.se", href: routes.domainOverview },
];

const recommended = ["Domain Overview", "Keyword Strategy Builder", "Position Tracking"];

function ToolLine({ name, description, href, onClick }: { name: string; description: string; href: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block truncate px-4 py-[6px] text-[14px] leading-5 hover:bg-rk-bg">
      <span className="text-rk-link">{name}</span>
      <span className="text-rk-muted"> — {description}</span>
    </Link>
  );
}

export function GoToTool() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const matches = q ? tools.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())).slice(0, 3) : [];
  const h = "h-[39px] xl:h-8";
  const close = () => {
    setOpen(false);
    setQ("");
  };

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="absolute -top-[10px] -right-[17px] -left-4 z-40 rounded-b-lg bg-white pt-[62px] pb-2 shadow-popover">
          {q ? (
            <>
              <div className="flex items-center justify-between px-4 pt-1 pb-3 text-[14px] leading-5">
                <span className="text-rk-muted">Toolkits and apps</span>
                <Link href={matches[0]?.href ?? routes.seoDashboard} onClick={close} className="text-rk-link hover:text-rk-link-hover">
                  See all results
                </Link>
              </div>
              {matches.map((t) => (
                <ToolLine key={t.name} {...t} onClick={close} />
              ))}
              {matches.length === 0 && <div className="px-4 py-[6px] text-rk-muted">No results found</div>}
            </>
          ) : (
            <>
              {recents.map((r) => (
                <Link key={r.label} href={r.href} onClick={close} className="flex items-center gap-2 px-4 py-[6px] text-[14px] leading-5 hover:bg-rk-bg">
                  <ClockIcon className="text-rk-muted" />
                  {r.label}
                </Link>
              ))}
              <div className="mx-4 my-[10px] border-t border-rk-border" />
              <div className="px-4 pb-2 text-[14px] leading-5 text-rk-muted">Recommendations</div>
              {recommended.map((n) => {
                const t = tools.find((x) => x.name === n)!;
                return <ToolLine key={n} {...t} onClick={close} />;
              })}
            </>
          )}
        </div>
      )}
      <form
        className="relative z-50 flex"
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0]) {
            router.push(matches[0].href);
            close();
          }
        }}
      >
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Go to tool..."
            className={`${h} w-[388px] xl:w-[402px] rounded-l-md border bg-white pr-8 pl-3 text-[14px] outline-none placeholder:text-rk-muted ${
              open ? "border-[#7a86f2] ring-2 ring-[#b7c0fa]" : "border-rk-border-strong"
            }`}
          />
          {q && (
            <button type="button" aria-label="Clear" onClick={() => setQ("")} className="absolute top-1/2 right-2 -translate-y-1/2 text-rk-text-2">
              <CloseIcon />
            </button>
          )}
        </div>
        <button type="submit" aria-label="Search" className={`${h} w-[41px] xl:w-[34px] flex items-center justify-center rounded-r-md border border-l-0 border-rk-border-strong bg-rk-bg text-rk-text-2 hover:bg-rk-hover`}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

const scopes = ["Root Domain", "Subdomain", "Subfolder", "Exact URL"] as const;

export function AnalyzeSearch({ value, scope }: { value: string; scope?: boolean }) {
  const [q, setQ] = useState(value);
  const [sc, setSc] = useState<(typeof scopes)[number]>("Root Domain");
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const router = useRouter();
  const path = usePathname();
  const h = "h-10 xl:h-8";
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(path);
      }}
    >
      <div className="relative">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter domain, subfolder or URL"
          className={`${h} ${scope ? "w-[197px]" : "w-[463px]"} rounded-l-md border border-rk-border-strong bg-white pr-9 pl-3 text-[16px] outline-none focus:border-[#7a86f2]`}
        />
        {q && (
          <button type="button" aria-label="Clear" onClick={() => setQ("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-rk-text-2">
            <CloseIcon />
          </button>
        )}
      </div>
      {scope && (
        <div ref={ref} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`${h} flex w-[125px] items-center justify-between border border-l-0 border-rk-border-strong bg-white px-3 text-[16px] text-rk-text`}
          >
            {sc}
            <ChevronDown className="text-rk-muted" />
          </button>
          {open && (
            <div className="absolute top-full left-0 z-50 mt-1 w-[160px] rounded-md bg-white py-1 shadow-popover">
              {scopes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSc(s);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-[6px] text-left text-[14px] hover:bg-rk-bg ${s === sc ? "bg-[#e9f7ff]" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <button type="submit" className={`${h} rounded-r-md bg-rk-btn-dark px-[14px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]`}>
        Analyze
      </button>
    </form>
  );
}
