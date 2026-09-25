import type { ReactNode } from "react";
import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

type Stripes = { dir: "h" | "v"; colors: string[] };

const stripes: Record<string, Stripes> = {
  DE: { dir: "h", colors: ["#000", "#dd0000", "#ffce00"] },
  NL: { dir: "h", colors: ["#ae1c28", "#fff", "#21468b"] },
  IN: { dir: "h", colors: ["#ff9933", "#fff", "#138808"] },
  IT: { dir: "v", colors: ["#009246", "#fff", "#ce2b37"] },
  FR: { dir: "v", colors: ["#002395", "#fff", "#ed2939"] },
  ES: { dir: "h", colors: ["#aa151b", "#f1bf00", "#f1bf00", "#aa151b"] },
  AT: { dir: "h", colors: ["#ed2939", "#fff", "#ed2939"] },
  BE: { dir: "v", colors: ["#000", "#fae042", "#ed2939"] },
  PL: { dir: "h", colors: ["#fff", "#dc143c"] },
  IE: { dir: "v", colors: ["#169b62", "#fff", "#ff883e"] },
  RU: { dir: "h", colors: ["#fff", "#0039a6", "#d52b1e"] },
  UA: { dir: "h", colors: ["#0057b7", "#ffd700"] },
};

const cross: Record<string, [string, string]> = {
  FI: ["#fff", "#003580"],
  NO: ["#ba0c2f", "#00205b"],
  DK: ["#c8102e", "#fff"],
};

function Box({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  return (
    <svg viewBox="0 0 16 12" width={w} height={h} className="shrink-0">
      <clipPath id="flag-r">
        <rect width="16" height="12" rx="1" />
      </clipPath>
      <g clipPath="url(#flag-r)">{children}</g>
    </svg>
  );
}

export function CountryFlag({ code, w = 14, h = 10 }: { code: string; w?: number; h?: number }): ReactNode {
  if (code === "US") return <FlagUS width={w} height={h} className="shrink-0" />;
  if (code === "UK") return <FlagUK width={w} height={h} className="shrink-0" />;
  if (code === "SE") return <FlagSE width={w} height={h} className="shrink-0" />;
  const s = stripes[code];
  if (s) {
    const n = s.colors.length;
    return (
      <Box w={w} h={h}>
        {s.colors.map((c, i) =>
          s.dir === "h" ? <rect key={i} x="0" y={(12 / n) * i} width="16" height={12 / n + 0.1} fill={c} /> : <rect key={i} y="0" x={(16 / n) * i} height="12" width={16 / n + 0.1} fill={c} />,
        )}
        {code === "IN" && <circle cx="8" cy="6" r="1.5" fill="none" stroke="#000080" strokeWidth=".6" />}
      </Box>
    );
  }
  const c = cross[code];
  if (c)
    return (
      <Box w={w} h={h}>
        <rect width="16" height="12" fill={c[0]} />
        <path d="M4.5 0h3v12h-3zM0 4.5h16v3H0z" fill={c[1]} />
      </Box>
    );
  if (code === "CA")
    return (
      <Box w={w} h={h}>
        <rect width="16" height="12" fill="#fff" />
        <path d="M0 0h4v12H0zM12 0h4v12h-4z" fill="#d52b1e" />
        <path d="m8 2.6.8 1.6 1-.4-.3 2.2 1.1-.7.3.8 1-.2-.5 1.5.4.3-2.4 1.5.2.8H8.3V11h-.6V9.9H6.4l.2-.8-2.4-1.5.4-.3L4.1 5.8l1 .2.3-.8 1.1.7-.3-2.2 1 .4z" fill="#d52b1e" />
      </Box>
    );
  if (code === "AU")
    return (
      <Box w={w} h={h}>
        <rect width="16" height="12" fill="#012169" />
        <path d="M0 0l8 6M8 0 0 6" stroke="#fff" strokeWidth="1.4" />
        <path d="M0 0l8 6M8 0 0 6" stroke="#c8102e" strokeWidth=".5" />
        <path d="M4 0v6M0 3h8" stroke="#fff" strokeWidth="1.8" />
        <path d="M4 0v6M0 3h8" stroke="#c8102e" strokeWidth="1" />
        <circle cx="4" cy="9.2" r="1" fill="#fff" />
        <circle cx="12" cy="3" r=".7" fill="#fff" />
        <circle cx="10.5" cy="6" r=".7" fill="#fff" />
        <circle cx="13.5" cy="6.5" r=".7" fill="#fff" />
        <circle cx="12" cy="9.7" r=".7" fill="#fff" />
      </Box>
    );
  if (code === "VN")
    return (
      <Box w={w} h={h}>
        <rect width="16" height="12" fill="#da251d" />
        <path d="m8 2.4 1 2.6h2.7l-2.2 1.6.8 2.6L8 7.6 5.7 9.2l.8-2.6L4.3 5H7z" fill="#ff0" />
      </Box>
    );
  return <span className="shrink-0 rounded-[1px] bg-[#eceef1]" style={{ width: w, height: h }} />;
}

export const organicCountries: { code: string; name: string; count?: number }[] = [
  { code: "SE", name: "Sweden", count: 134 },
  { code: "US", name: "United States", count: 21 },
  { code: "UK", name: "United Kingdom", count: 18 },
  { code: "CA", name: "Canada", count: 9 },
  { code: "AU", name: "Australia", count: 6 },
  { code: "FI", name: "Finland", count: 2 },
  { code: "IN", name: "India", count: 2 },
  { code: "NL", name: "Netherlands", count: 2 },
  { code: "VN", name: "Vietnam", count: 2 },
  { code: "DE", name: "Germany", count: 1 },
  { code: "NO", name: "Norway", count: 1 },
  { code: "DK", name: "Denmark", count: 1 },
  { code: "ES", name: "Spain", count: 1 },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "FR", name: "France" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "PL", name: "Poland" },
  { code: "UA", name: "Ukraine" },
];
