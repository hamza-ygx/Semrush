"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { CheckIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { botIcon } from "./Overview";
import { bots, crawledRows, pageColumns, pageFilterFields, pageDetailHref, structure, structureAll, type CrawledRow, type Dir } from "./data";
import { AddCondition, AdvancedFilterPanel, Checkbox, CogIcon, ExtIcon, PageSize, ReauditIcon, SearchBox, SelectButton, SortIcon, thinScroll, useToggle, XIcon } from "./ui";

const c = routes.siteAuditCampaign;

const ListIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M5.5 3.5h9M5.5 8h9M5.5 12.5h9" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <circle cx="2.2" cy="3.5" r="1" fill="currentColor" />
    <circle cx="2.2" cy="8" r="1" fill="currentColor" />
    <circle cx="2.2" cy="12.5" r="1" fill="currentColor" />
  </svg>
);

const TableIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M2 2.5h12v11H2zM2 6h12M2 9.8h12M6.5 6v7.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

function DropItem({ on, onClick, children }: { on?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg ${on ? "bg-[#e9effb] before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-rk-text" : ""}`}
    >
      {children}
    </button>
  );
}

function ViewSwitch({ view }: { view: "pages" | "structure" }) {
  const item = (on: boolean) =>
    `relative -ml-px flex h-7 items-center gap-2 border px-2 text-[14px] first:ml-0 first:rounded-l-md last:rounded-r-md ${
      on ? "z-10 border-[#a3aae9] bg-[#e5e8f5] text-rk-text" : "border-rk-border-strong bg-white text-rk-text hover:bg-rk-bg"
    }`;
  return (
    <div className="flex">
      <Link href={c.crawledPages} className={item(view === "pages")}>
        <ListIcon />
        Pages
      </Link>
      <Link href={c.siteStructure} className={item(view === "structure")}>
        <TableIcon />
        Site Structure
      </Link>
    </div>
  );
}

function Scope() {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState("Everywhere");
  return (
    <div ref={ref} className="relative" data-scope>
      <SelectButton open={open} onClick={toggle} className="w-[117px] rounded-r-none">
        {v}
      </SelectButton>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-[117px] overflow-hidden rounded-md bg-white py-1 shadow-popover">
          {["Everywhere", "URL", "Title", "Description"].map((o) => (
            <DropItem
              key={o}
              on={o === v}
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
            >
              {o}
            </DropItem>
          ))}
        </div>
      )}
    </div>
  );
}

function BotsFilter() {
  const { open, ref, toggle } = useToggle();
  const [sel, setSel] = useState<string[]>([]);
  return (
    <div ref={ref} className="relative" data-bots>
      <SelectButton open={open} onClick={toggle} placeholder={!sel.length} className="w-[195px]">
        {sel.length ? `Blocked for ${sel.length} bot${sel.length > 1 ? "s" : ""}` : "Blocked AI search bots"}
      </SelectButton>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-[221px] rounded-md bg-white py-1 shadow-popover">
          {bots.map((b) => (
            <label key={b} className="flex h-8 cursor-pointer items-center gap-2 px-2 text-[14px] hover:bg-rk-bg">
              <Checkbox checked={sel.includes(b)} onChange={() => setSel(sel.includes(b) ? sel.filter((x) => x !== b) : [...sel, b])} />
              {botIcon(b)}
              {b}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function FieldSelect() {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState(pageFilterFields[0]);
  return (
    <div ref={ref} className="relative w-[241px]" data-field>
      <SelectButton open={open} onClick={toggle} className="w-full">
        {v}
      </SelectButton>
      {open && (
        <div className={`absolute top-[calc(100%+9px)] left-0 z-50 h-[245px] w-full overflow-y-auto rounded-md bg-white py-1 shadow-popover ${thinScroll}`} data-field-list>
          {pageFilterFields.map((o) => (
            <DropItem
              key={o}
              on={o === v}
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
            >
              {o}
            </DropItem>
          ))}
        </div>
      )}
    </div>
  );
}

function ValueSelect() {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState("");
  return (
    <div ref={ref} className="relative w-[242px]">
      <SelectButton open={open} onClick={toggle} placeholder={!v} className="w-full">
        {v || "Select..."}
      </SelectButton>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full rounded-md bg-white py-1 shadow-popover">
          {["With errors", "With warnings", "With notices", "Without issues"].map((o) => (
            <DropItem
              key={o}
              on={o === v}
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
            >
              {o}
            </DropItem>
          ))}
        </div>
      )}
    </div>
  );
}

function AdvancedFilters({ active }: { active: boolean }) {
  const router = useRouter();
  const { open, setOpen, ref, toggle } = useToggle();
  const [on, setOn] = useState(active);
  return (
    <div ref={ref} className="relative" data-adv>
      {on ? (
        <div className="flex h-7">
          <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-l-md border border-[#a3aae9] bg-[#e5e8f5] px-2 text-[14px] text-rk-text">
            Advanced filters
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7c83ea] px-1 text-[11px] leading-none text-white">1</span>
          </button>
          <button type="button" aria-label="Clear filters" onClick={() => (active ? router.push(c.siteStructure) : setOn(false))} className="-ml-px flex h-7 w-[26px] items-center justify-center rounded-r-md border border-[#a3aae9] bg-[#e5e8f5] hover:bg-[#d7dcf0]">
            <XIcon size={14} />
          </button>
        </div>
      ) : (
        <SelectButton open={open} onClick={toggle} placeholder className="w-[151px]">
          Advanced filters
        </SelectButton>
      )}
      {open && (
        <AdvancedFilterPanel className="left-0 w-[583px] max-xl:left-[-43px] max-xl:w-[567px]" onApply={() => setOpen(false)}>
          <div className="mt-[2px] flex items-center">
            <FieldSelect />
            <span className="mx-[17px] text-[14px] max-xl:mx-[12px]">is</span>
            <ValueSelect />
          </div>
          <div className="pt-[6px] pb-[7px]">
            <AddCondition />
          </div>
        </AdvancedFilterPanel>
      )}
    </div>
  );
}

function FilterRow({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex items-center">
      <Scope />
      <SearchBox width={202} className="-ml-px" />
      <div className="ml-[9px]">
        <BotsFilter />
      </div>
      <div className="ml-[9px]">
        <AdvancedFilters key={String(filtered)} active={filtered} />
      </div>
    </div>
  );
}

const statusCls = { 200: "bg-[#d2f7ea] text-[#007c65]", 301: "bg-[#e8e7fb] text-[#5a50c8]", 404: "bg-[#ffdcbc] text-[#a2470b]" };

const Dash = () => <span className="inline-block h-[2px] w-[10px] bg-[#6c6e79] align-middle" />;

function cell(key: string, r: CrawledRow): ReactNode {
  switch (key) {
    case "ilr":
      return r.ilr ?? <Dash />;
    case "url":
      return (
        <span className="flex items-start gap-[6px]">
          <Link href={pageDetailHref(r.id)} data-testid="sa-page-link" className="break-all text-rk-link hover:text-rk-link-hover">
            {r.url}
          </Link>
          <a href={r.url} target="_blank" rel="noreferrer" aria-label="Open page" className="mt-[2px] text-[#8a8e9b] hover:text-rk-text-2">
            <ExtIcon />
          </a>
        </span>
      );
    case "title":
      return r.title ? <span className="line-clamp-3 [overflow-wrap:anywhere]">{r.title}</span> : <Dash />;
    case "status":
      return <span className={`inline-flex h-[22px] items-center rounded-full align-top px-2 text-[13px] ${statusCls[r.status]}`}>{r.status}</span>;
    case "issues":
      if (r.issues)
        return (
          <Link href={c.issues} className="text-rk-link hover:text-rk-link-hover">
            {r.issues} issues
          </Link>
        );
      return (
        <span className="inline-flex items-center gap-[6px] align-top">
          {r.state === "Healthy" ? (
            <CheckIcon className="text-[#009f81]" strokeWidth={2} />
          ) : r.state === "Broken" ? (
            <XIcon className="text-[#d1002f]" size={15} />
          ) : (
            <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#8a8e9b]">
              <path d="M1.5 12 6 7.5l2.5 2.5L14 4.5M10 4.5h4v4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {r.state}
        </span>
      );
    case "depth":
      return `${r.depth} ${r.depth === 1 ? "click" : "clicks"}`;
    case "reaudit":
      return r.reaudit ? (
        <button type="button" aria-label="Reaudit" className="text-[#2d6be3] hover:text-rk-link-hover">
          <ReauditIcon />
        </button>
      ) : null;
    default:
      return <Dash />;
  }
}

const rightAligned = new Set(["ilr", "issues", "depth", "pageviews", "load", "inlinks", "outlinks", "extlinks", "words", "ratio"]);
const centered = new Set(["status", "reaudit"]);

function ManageColumns({ on, setOn }: { on: string[]; setOn: (v: string[]) => void }) {
  const { open, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative" data-columns>
      <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] pr-[6px] pl-[7px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
        <CogIcon />
        Manage columns
        <span className="rounded-full border border-rk-border-strong px-[5px] text-[11px] leading-[16px] text-rk-text-2">
          {on.length}/{pageColumns.length}
        </span>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+7px)] right-0 z-50 w-[241px] rounded-md bg-white shadow-popover">
          <div className="px-2 pt-[6px] pb-[4px]">
            <div className="text-[14px] font-semibold">Columns</div>
            <button type="button" onClick={() => setOn(pageColumns.filter((p) => p.on).map((p) => p.key))} className="mt-3 block text-[14px] text-rk-link hover:text-rk-link-hover">
              Reset to default
            </button>
            <button type="button" onClick={() => setOn(pageColumns.map((p) => p.key))} className="mt-3 block text-[14px] text-rk-link hover:text-rk-link-hover">
              Select all
            </button>
          </div>
          <div className={`h-[400px] overflow-y-auto pt-[6px] pb-2 ${thinScroll}`} data-columns-list>
            {pageColumns.map((p) => {
              const checked = on.includes(p.key);
              return (
                <label key={p.key} className={`flex h-8 items-center gap-[10px] px-2 text-[14px] ${p.fixed ? "text-[#a9abb6]" : "cursor-pointer text-rk-text hover:bg-rk-bg"}`}>
                  <Checkbox checked={checked} disabled={p.fixed} onChange={() => setOn(checked ? on.filter((k) => k !== p.key) : pageColumns.filter((x) => x.key === p.key || on.includes(x.key)).map((x) => x.key))} />
                  {p.label}
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const narrowW: Record<string, number> = { ilr: 66, title: 136 };

function useHScroll() {
  const head = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ w: number; x: number } | null>(null);
  const measure = useCallback(() => {
    const b = body.current;
    if (!b) return;
    if (head.current) head.current.scrollLeft = b.scrollLeft;
    const max = b.scrollWidth - b.clientWidth;
    if (max <= 1) return setBar(null);
    const track = b.clientWidth - 346;
    const w = Math.max(40, (track * b.clientWidth) / b.scrollWidth);
    setBar({ w, x: ((track - w) * b.scrollLeft) / max });
  }, []);
  useLayoutEffect(() => {
    const b = body.current;
    if (!b) return;
    const ro = new ResizeObserver(measure);
    ro.observe(b);
    if (b.firstElementChild) ro.observe(b.firstElementChild);
    return () => ro.disconnect();
  }, [measure]);
  return { head, body, bar, measure };
}

function PagesTable() {
  const [on, setOn] = useState(pageColumns.filter((p) => p.on).map((p) => p.key));
  const cols = pageColumns.filter((p) => on.includes(p.key));
  const total = cols.reduce((a, p) => a + p.w, 0);
  const totalN = cols.reduce((a, p) => a + (narrowW[p.key] ?? p.w), 0);
  const wide = total > 1169;
  const { head, body, bar, measure } = useHScroll();
  const rowStyle = { "--tw": wide ? `${total}px` : "100%", "--tn": `${totalN}px` } as CSSProperties;
  const rowCls = "w-[var(--tw)] max-xl:w-[var(--tn)]";
  const colStyle = (p: (typeof pageColumns)[number]) =>
    ({ "--w": `${p.w}px`, "--wn": `${narrowW[p.key] ?? p.w}px`, flexGrow: wide ? 0 : p.w }) as CSSProperties;
  const colCls = "w-[var(--w)] min-w-0 shrink max-xl:w-[var(--wn)] max-xl:shrink-0 max-xl:!grow-0";
  const stick = (k: string, bg: string) => (k === "ilr" ? `sticky left-0 z-10 ${bg}` : k === "url" ? `sticky left-[71px] max-xl:left-[66px] z-10 ${bg}` : "");
  const headRow = (
    <div className={`flex h-[42px] border-y border-rk-border bg-[#f7f7f8] text-[13px] text-rk-text-2 max-xl:h-[40px] max-xl:border-t-0 ${rowCls}`} style={rowStyle}>
      {cols.map((p) => (
        <div
          key={p.key}
          style={colStyle(p)}
          className={`${colCls} flex items-center gap-1 px-3 whitespace-nowrap ${stick(p.key, p.key === "ilr" ? "" : "bg-[#f7f7f8]")} ${
            p.key === "ilr" ? "justify-center bg-[#e9eaee] pl-5" : rightAligned.has(p.key) ? "justify-end" : centered.has(p.key) ? "justify-center" : ""
          }`}
        >
          {p.label}
          {p.key === "ilr" && <SortIcon />}
        </div>
      ))}
    </div>
  );
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="sticky top-[61px] z-20 rounded-t-lg bg-white">
        <div className="flex h-[44px] items-center justify-between pr-5 pl-5">
          <h2 className="text-[16px] leading-6 font-semibold">Crawled Pages</h2>
          <ManageColumns on={on} setOn={setOn} />
        </div>
        <div className="relative">
          <div ref={head} className="overflow-hidden">
            {headRow}
          </div>
          {bar && (
            <div className="pointer-events-none absolute bottom-[3px] left-[325px] h-[5px] rounded-full bg-[#c4c7cf]" style={{ width: bar.w, transform: `translateX(${bar.x}px)` }} />
          )}
        </div>
      </div>
      <div ref={body} onScroll={measure} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className={rowCls} style={rowStyle}>
          {crawledRows.map((r) => (
            <div key={r.url} className="flex border-b border-rk-border text-[14px] leading-5 last:border-b-0">
              {cols.map((p) => (
                <div
                  key={p.key}
                  style={colStyle(p)}
                  className={`${colCls} px-3 ${stick(p.key, "bg-white")} ${r.title ? "min-h-[83.4px] pt-[12px] pb-[11px] max-xl:min-h-[83.5px]" : "pt-[12px] pb-[12px]"} ${
                    p.key === "ilr" ? "pl-5 text-right" : rightAligned.has(p.key) ? "text-right" : centered.has(p.key) ? "text-center" : ""
                  } ${p.key === "status" ? "!pt-[10px]" : ""} ${p.key === "blocked" || p.key === "pageviews" ? "!pt-[9px]" : ""}`}
                >
                  {cell(p.key, r)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-[63px] items-center gap-2 border-t border-rk-border px-5 pb-[3px] text-[14px]">
        <span>Page:</span>
        <input placeholder="1" className="h-7 w-[70px] rounded-md border border-rk-border px-2 outline-none placeholder:text-[#a9abb6]" />
        <span className="ml-[2px]">of 1</span>
        <div className="ml-[6px]">
          <PageSize value={100} />
        </div>
      </div>
    </div>
  );
}

const FolderOpen = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M1.5 3h4.2l1.3 1.5h6.5v2H4.3L1.5 12.5z" fill="#8f95f2" />
    <path d="M4 7.5h11l-2.5 5.5H1.5z" fill="#8f95f2" />
  </svg>
);
const FolderClosed = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M1.5 3.5h4.7l1.4 1.5h6.9v8H1.5z" fill="#8f95f2" />
  </svg>
);
const FolderEmpty = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M1.75 3.25h4.4l1.4 1.5h6.7v8.5H1.75z" fill="none" stroke="#8a8e9b" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);
const Chev = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 text-rk-text-2 ${open ? "rotate-90" : ""}`}>
    <path d="m6 3.5 4.5 4.5L6 12.5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function TreeRow({ d, depth, open, onToggle }: { d: Dir; depth: number; open: boolean; onToggle?: () => void }) {
  const has = !!d.children;
  return (
    <div className="flex h-[45px] items-center border-b border-rk-border pr-5 text-[14px] hover:bg-[#f9f9f9]" style={{ paddingLeft: 20 + depth * 24 }} data-dir={d.name}>
      <button type="button" onClick={onToggle} disabled={!has} className="flex items-center gap-2">
        <span className="flex w-4 justify-center">{has && <Chev open={open} />}</span>
        {has ? open ? <FolderOpen /> : <FolderClosed /> : <FolderEmpty />}
        <span className="text-rk-text">{d.name}</span>
      </button>
      <Link href={c.crawledPages} className="ml-auto text-rk-link hover:text-rk-link-hover">
        {d.urls}
      </Link>
      <span className="w-[120px] text-right">{d.issues}</span>
    </div>
  );
}

function SiteStructure({ roots }: { roots: Dir[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set([roots[0].name]));
  const toggle = (k: string) => {
    const n = new Set(open);
    if (n.has(k)) n.delete(k);
    else n.add(k);
    setOpen(n);
  };
  const render = (d: Dir, depth: number, path: string): ReactNode[] => {
    const key = path + d.name;
    const isOpen = open.has(key);
    const out: ReactNode[] = [<TreeRow key={key} d={d} depth={depth} open={isOpen} onToggle={() => toggle(key)} />];
    if (isOpen && d.children) d.children.forEach((ch) => out.push(...render(ch, depth + 1, key)));
    return out;
  };
  return (
    <div className="rounded-lg bg-white pb-3 shadow-card">
      <div className="flex h-[39px] items-center gap-2 pt-[2px] pl-5">
        <h2 className="text-[16px] leading-6 font-semibold">Site Structure</h2>
        <Info className="text-[#a9abb6]" />
      </div>
      <div className="flex h-[45px] items-center border-y border-rk-border bg-[#f7f7f8] pr-5 pl-5 text-[13px] text-rk-text-2">
        Directory
        <span className="ml-auto">URLs</span>
        <span className="w-[120px] text-right">Issues</span>
      </div>
      <div className="[&>div:last-child]:border-b-0">{roots.flatMap((r) => render(r, 0, ""))}</div>
    </div>
  );
}

export function CrawledPages({ view, filtered = false }: { view: "pages" | "structure"; filtered?: boolean }) {
  return (
    <div className={`px-8 pt-[14px] max-xl:pt-[15px] ${view === "pages" ? "pb-[148px]" : "pb-[140px]"}`}>
      <ViewSwitch view={view} />
      <div className="sticky top-0 z-30 -mx-8 bg-rk-bg px-8 pt-4 pb-[16px]">
        <FilterRow filtered={view === "structure" && filtered} />
      </div>
      {view === "pages" ? <PagesTable /> : <SiteStructure key={filtered ? "f" : "a"} roots={filtered ? [structure] : structureAll} />}
    </div>
  );
}
