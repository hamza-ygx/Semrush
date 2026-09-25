"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { CloseIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { routes } from "@/config/routes";
import { tabHref } from "./BacklinksPage";
import { anchorsRows, bulk, domain, ipRows, outRows, pageRows } from "./data";
import { AsSelect, Card, CardHead, Checkbox, Chevron, ChevronRightSm, Chip, DarkBtn, ExportBtn, ExtLink, Flag, Pager, SearchBox, SelectBtn, Th, ext } from "./ui";

const blLink = "text-rk-link hover:text-rk-link-hover";

export function AnchorsReport() {
  return (
    <Card>
      <CardHead title="Anchors" count="1 - 23 (23)" right={<ExportBtn />} />
      <div className="flex h-[68px] items-center px-5">
        <SearchBox placeholder="Filter by anchor" width={260} />
      </div>
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col />
          <col style={{ width: 137 }} />
          <col style={{ width: 137 }} />
          <col style={{ width: 137 }} />
          <col style={{ width: 141 }} />
        </colgroup>
        <thead>
          <tr>
            <Th className="!pl-5">Anchor Text</Th>
            <Th align="right" sorted>
              Backlinks
            </Th>
            <Th align="right">Domains</Th>
            <Th align="right">First Seen</Th>
            <Th align="right" className="!pr-5">
              Last Seen
            </Th>
          </tr>
        </thead>
        <tbody>
          {anchorsRows.map((r) => (
            <tr key={r.a} className="h-[45px] border-b border-[#f0f0f2] hover:bg-[#fafafb]">
              <td className={`truncate pr-[12px] pl-5 ${r.empty ? "text-rk-muted italic" : ""}`}>{r.a}</td>
              <td className="px-3 text-right">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {r.bl}
                </Link>
              </td>
              <td className="px-3 text-right">{r.d}</td>
              <td className="px-3 text-right">{r.first}</td>
              <td className="pr-5 pl-3 text-right">{r.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pager pages={1} />
    </Card>
  );
}

export function PagesReport() {
  const [broken, setBroken] = useState(false);
  const rows = broken ? pageRows.filter((r) => r.e404) : pageRows;
  return (
    <Card>
      <CardHead title="Indexed Pages" count="1 - 100 (~6,211)" right={<ExportBtn />} />
      <div className="flex h-[59px] items-center gap-[7px] px-5">
        <Checkbox checked={broken} onChange={() => setBroken(!broken)} label="Broken Pages" />
        <Info />
      </div>
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col />
          <col style={{ width: 128 }} />
          <col style={{ width: 129 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 130 }} />
          <col style={{ width: 138 }} />
        </colgroup>
        <thead>
          <tr>
            <Th className="!pl-5">Title and URL</Th>
            <Th align="right">Backlinks</Th>
            <Th align="right" sorted>
              Domains
            </Th>
            <Th align="right">External Links</Th>
            <Th align="right">Internal Links</Th>
            <Th align="right" className="!pr-5">
              Last Seen
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-[#f0f0f2] align-top hover:bg-[#fafafb]">
              <td className="pt-[12px] pr-[8px] pb-[12px] pl-5">
                {r.title && <div className="mb-[4px] truncate">{r.title}</div>}
                <div className="flex items-center gap-[3px]">
                  <a href={r.url} target="_blank" rel="noreferrer" className={`truncate ${blLink}`}>
                    {r.url}
                  </a>
                  <ExtLink href={r.url} />
                </div>
                {r.e404 && (
                  <Chip tone="404" className="mt-[4px]">
                    404
                  </Chip>
                )}
              </td>
              <td className="px-3 pt-[12px] text-right">
                <Link href={tabHref("backlinks")} className={r.bl ? blLink : "pointer-events-none text-rk-muted"}>
                  {r.bl}
                </Link>
              </td>
              <td className="px-3 pt-[12px] text-right">
                <Link href={routes.referringDomains} className={r.d ? blLink : "pointer-events-none text-rk-muted"}>
                  {r.d}
                </Link>
              </td>
              <td className="px-3 pt-[12px] text-right">{r.ext}</td>
              <td className="px-3 pt-[12px] text-right">{r.int}</td>
              <td className="pt-[12px] pr-5 pl-3 text-right whitespace-nowrap">{r.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pager pages={63} />
    </Card>
  );
}

const outCats = ["Online Services", "Education", "Government", "Information Technology", "Finance", "Banking", "Accounting & Auditing"];
const asBuckets = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"];

export function OutboundReport() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Card>
      <CardHead title="Outbound Domains" count="1 - 34 (34)" info right={<ExportBtn />} />
      <div className="flex h-[68px] items-center gap-[8px] px-5">
        <SelectBtn label="Category" options={outCats} />
        <SelectBtn label="Authority Score" options={asBuckets} width={140} />
      </div>
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col style={{ width: 90 }} />
          <col />
          <col style={{ width: 154 }} />
          <col style={{ width: 153 }} />
          <col style={{ width: 154 }} />
        </colgroup>
        <thead>
          <tr>
            <Th align="right">AS</Th>
            <Th>Root Domain / Category</Th>
            <Th align="right" sorted>
              Outbound Links
            </Th>
            <Th align="right">First Seen</Th>
            <Th align="right">Last Seen</Th>
          </tr>
        </thead>
        <tbody>
          {outRows.map((r) => (
            <Fragment key={r.d}>
              <tr className="border-b border-[#f0f0f2] align-top hover:bg-[#fafafb]">
                <td className="px-3 pt-[11px] text-right">
                  <AsSelect value={r.as} />
                </td>
                <td className="px-3 pt-[11px] pb-[12.4px]">
                  <div className="flex items-center gap-[4px]">
                    <a href={ext(r.d)} target="_blank" rel="noreferrer" className={blLink}>
                      {r.d}
                    </a>
                    <ExtLink href={r.d} />
                  </div>
                  <div className="text-rk-text-2">{r.c}</div>
                  {r.lost && (
                    <Chip tone="red" className="mt-[4px]">
                      Lost
                    </Chip>
                  )}
                </td>
                <td className="px-3 pt-[11px] text-right">
                  <button type="button" onClick={() => setOpen(open === r.d ? null : r.d)} className="inline-flex items-center gap-[12px] hover:text-rk-link">
                    <ChevronRightSm className={`text-rk-text-2 ${open === r.d ? "rotate-90" : ""}`} />
                    {r.links}
                  </button>
                </td>
                <td className="px-3 pt-[11px] text-right">{r.first}</td>
                <td className={`px-3 pt-[11px] text-right ${r.lost ? "text-[#d1002f]" : ""}`}>{r.last}</td>
              </tr>
              {open === r.d && (
                <tr className="border-b border-[#f0f0f2] bg-[#fafafb]">
                  <td />
                  <td colSpan={4} className="px-3 py-[10px] text-[13px] text-rk-muted">
                    Links from{" "}
                    <a href={ext(domain)} className={blLink}>
                      {domain}
                    </a>{" "}
                    to{" "}
                    <a href={ext(r.d)} className={blLink}>
                      {r.d}
                    </a>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      <Pager pages={1} />
    </Card>
  );
}

export function RefIpsReport() {
  return (
    <Card>
      <CardHead title="Referring IPs" count="1 - 100 (181)" right={<ExportBtn />} />
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col />
          <col style={{ width: 152 }} />
          <col style={{ width: 154 }} />
          <col style={{ width: 153 }} />
          <col style={{ width: 154 }} />
        </colgroup>
        <thead>
          <tr>
            <Th className="!pl-5">Country / IP</Th>
            <Th align="right" sorted>
              Domains
            </Th>
            <Th align="right">Backlinks</Th>
            <Th align="right">First Seen</Th>
            <Th align="right" className="!pr-5">
              Last Seen
            </Th>
          </tr>
        </thead>
        <tbody>
          {ipRows.map((r) => (
            <tr key={r.ip} className="h-[46.33px] border-b border-[#f0f0f2] hover:bg-[#fafafb]">
              <td className="pl-5">
                <span className="flex items-center gap-[4px] tabular-nums">
                  {r.flag ? <Flag code={r.flag} /> : <span className="w-4" />}
                  {r.ip}
                </span>
              </td>
              <td className="px-3 text-right">
                <Link href={routes.referringDomains} className={blLink}>
                  {r.d}
                </Link>
              </td>
              <td className="px-3 text-right">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {r.bl}
                </Link>
              </td>
              <td className="px-3 text-right">{r.first}</td>
              <td className="pr-5 pl-3 text-right">{r.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pager pages={2} />
    </Card>
  );
}

export function CompetitorsEmpty() {
  return (
    <div className="pt-[2px]">
      <h2 className="text-[24px] leading-[26px] font-medium text-rk-text">No matching results</h2>
      <div className="mt-[24px] flex">
        <div className="w-[370px] border-r border-[#d4d6d5] pr-[18px]">
          <h3 className="max-w-[330px] text-[16px] leading-6 font-bold text-rk-text">Is it your site? Connect GSC to get more data in Backlink Audit!</h3>
          <p className="mt-[12px] text-[14px] leading-[19.7px] text-rk-text-2">Secure your SEO efforts in link building. Comprehensive algorithms help discover and disavow toxic backlinks which can lead to penalties by search engines</p>
          <DarkBtn href={routes.backlinkAudit} className="mt-[19px]">
            Set up backlink audit
          </DarkBtn>
        </div>
        <div className="pl-[24px]">
          <h3 className="text-[16px] leading-6 font-bold text-rk-text">This could be because:</h3>
          <ul className="mt-[11px] w-[350px] text-[14px] leading-5 text-rk-text-2">
            {["The domain name was mistyped or doesn’t exist. Double-check its spelling.", "This is a new website or page, and we haven’t crawled it yet. Please come back later.", "The website or page doesn’t have any backlinks."].map((t) => (
              <li key={t} className="mb-[7px] flex gap-[8px] pl-[3px]">
                <span className="text-[#6a6c6a]">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const cols: { label: string; w?: number; align?: "right" }[] = [
  { label: "Target" },
  { label: "Authority Score", w: 132, align: "right" },
  { label: "Backlinks", w: 125, align: "right" },
  { label: "Domains", w: 95, align: "right" },
  { label: "Monthly Visits", w: 104, align: "right" },
  { label: "Follow / Nofollow", w: 122, align: "right" },
  { label: "Text", w: 65, align: "right" },
  { label: "Image", w: 64, align: "right" },
  { label: "Form", w: 65, align: "right" },
  { label: "Frame", w: 66, align: "right" },
  { label: "Info", w: 87 },
];

export function BulkAnalysis() {
  const [lines, setLines] = useState(domain);
  const [scope, setScope] = useState("Auto");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [more, setMore] = useState(false);
  const scopeRef = useOutsideClose<HTMLDivElement>(scopeOpen, () => setScopeOpen(false));
  const moreRef = useOutsideClose<HTMLTableCellElement>(more, () => setMore(false));
  const count = lines.split("\n").filter((l) => l.trim()).length;
  const pct = "block text-[12px] leading-4 text-rk-muted";
  return (
    <div className="-mt-px">
      <div className="flex h-5 items-center gap-[6px] text-[14px] text-rk-muted">
        Enter up to 200 URLs/domains, one per line
        <span className="rounded-full border border-[#d6d8d7] px-[5px] text-[11px] leading-[15px] text-rk-text-2">{count}/200</span>
      </div>
      <div className="mt-[9px] flex h-[160px] w-[600px] rounded-md border border-[#d6d8d7] bg-white focus-within:border-[#8f9cea] focus-within:shadow-[0_0_0_2px_rgba(143,156,234,0.25)]">
        <div className="w-[40px] shrink-0 pt-[7px] pl-[11px] text-[16px] leading-6 text-[#a9abaa]">
          {lines.split("\n").map((_, i) => (
            <div key={i}>{i + 1}.</div>
          ))}
        </div>
        <textarea
          data-testid="bulk-input"
          autoFocus
          value={lines}
          onChange={(e) => setLines(e.target.value)}
          className="h-full flex-1 resize-none bg-transparent pt-[7px] pr-3 text-[16px] leading-6 text-rk-text outline-none"
        />
      </div>
      <div className="mt-[12px] flex h-7 w-[600px] items-center">
        <span className="text-[14px] text-rk-text-2">Results scope</span>
        <div ref={scopeRef} className="relative ml-[12px]">
          <button type="button" onClick={() => setScopeOpen(!scopeOpen)} className="flex h-7 items-center gap-[6px] rounded-md border border-[#d6d8d7] bg-white pr-[7px] pl-[8px] text-[14px] text-rk-text">
            {scope}
            <Chevron />
          </button>
          {scopeOpen && (
            <div className="absolute top-8 left-0 z-40 min-w-[150px] rounded-md bg-white py-1 shadow-popover">
              {["Auto", "Root domain", "Subdomain", "Subfolder", "URL"].map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    setScope(o);
                    setScopeOpen(false);
                  }}
                  className={`block w-full px-3 py-[6px] text-left text-[14px] hover:bg-rk-bg ${o === scope ? "bg-[#e9f7ff]" : ""}`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
        <DarkBtn className="ml-[8px]">Compare</DarkBtn>
        <button type="button" onClick={() => setLines("")} className="ml-auto flex items-center gap-[8px] pr-[9px] text-[14px] text-rk-muted hover:text-rk-text">
          <CloseIcon width={14} height={14} />
          Clear all
        </button>
      </div>
      <Card className="mt-[17px]">
        <CardHead title="Analyzed Targets" count="(1)" right={<ExportBtn />} />
        <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
          <colgroup>
            {cols.map((c) => (
              <col key={c.label} style={c.w ? { width: c.w } : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {cols.map((c, i) => (
                <Th key={c.label} align={c.align} className={`!static ${i === 0 ? "!pl-5" : ""}`}>
                  {c.label}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="h-[60px]">
              <td className="pl-5">
                <span className="flex items-center gap-[4px]">
                  {domain}
                  <ExtLink href={domain} />
                </span>
                <span className="block text-[12px] leading-4 text-rk-muted">root domain</span>
              </td>
              <td className="px-3 text-right align-top pt-[9px]">
                <AsSelect value={bulk.as} />
              </td>
              <td className="px-3 pt-[9px] text-right align-top">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {bulk.bl}
                </Link>
              </td>
              <td className="px-3 pt-[9px] text-right align-top">
                <Link href={routes.referringDomains} className={blLink}>
                  {bulk.d}
                </Link>
              </td>
              <td className="px-3 pt-[9px] text-right align-top text-rk-muted">{bulk.visits}</td>
              <td className="pt-[9px] pr-[30px] pl-3 text-right align-top">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {bulk.follow}
                </Link>{" "}
                /{" "}
                <Link href={tabHref("backlinks")} className={blLink}>
                  {bulk.nofollow}
                </Link>
                <span className={pct}>
                  {bulk.fPct} / {bulk.nPct}
                </span>
              </td>
              <td className="px-3 pt-[9px] text-right align-top">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {bulk.text}
                </Link>
                <span className={pct}>{bulk.tPct}</span>
              </td>
              <td className="px-3 pt-[9px] text-right align-top">
                <Link href={tabHref("backlinks")} className={blLink}>
                  {bulk.image}
                </Link>
                <span className={pct}>{bulk.iPct}</span>
              </td>
              <td className="px-3 pt-[9px] text-right align-top text-rk-muted">
                {bulk.form}
                <span className={pct}>0%</span>
              </td>
              <td className="px-3 pt-[9px] text-right align-top text-rk-muted">
                {bulk.frame}
                <span className={pct}>0%</span>
              </td>
              <td ref={moreRef} className="relative px-3 pt-[9px] align-top">
                <button type="button" onClick={() => setMore(!more)} className="inline-flex items-center gap-[4px] text-rk-link hover:text-rk-link-hover">
                  more
                  <Chevron className={more ? "rotate-180" : ""} />
                </button>
                {more && (
                  <div className="absolute top-[36px] right-3 z-30 w-[200px] rounded-md bg-white py-2 text-[13px] shadow-popover">
                    {[
                      ["Ref. IPs", "181"],
                      ["Ref. Subnets", "138"],
                      ["Outbound Domains", "34"],
                      ["Organic Traffic", "60"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between px-3 py-[4px]">
                        <span className="text-rk-muted">{k}</span>
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
