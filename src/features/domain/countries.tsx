import type { ReactNode } from "react";
import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

type Stripes = { dir: "h" | "v"; colors: string[]; mark?: string };

const stripes: Record<string, Stripes> = {
  DE: { dir: "h", colors: ["#000", "#dd0000", "#ffce00"] },
  AF: { dir: "v", colors: ["#000", "#be0000", "#007a36"] },
  AL: { dir: "h", colors: ["#e41e20"], mark: "#000" },
  DZ: { dir: "v", colors: ["#006233", "#fff"], mark: "#d21034" },
  AO: { dir: "h", colors: ["#cc092f", "#000"], mark: "#ffcb00" },
  AR: { dir: "h", colors: ["#74acdf", "#fff", "#74acdf"] },
  AM: { dir: "h", colors: ["#d90012", "#0033a0", "#f2a800"] },
  AU: { dir: "h", colors: ["#012169"], mark: "#fff" },
  AT: { dir: "h", colors: ["#ed2939", "#fff", "#ed2939"] },
  AZ: { dir: "h", colors: ["#00b5e2", "#ef3340", "#509e2f"] },
  BH: { dir: "v", colors: ["#fff", "#ce1126", "#ce1126"] },
  BD: { dir: "h", colors: ["#006a4e"], mark: "#f42a41" },
  BE: { dir: "v", colors: ["#000", "#fae042", "#ed2939"] },
  BR: { dir: "h", colors: ["#009c3b"], mark: "#ffdf00" },
  BG: { dir: "h", colors: ["#fff", "#00966e", "#d62612"] },
  CA: { dir: "v", colors: ["#d52b1e", "#fff", "#fff", "#d52b1e"], mark: "#d52b1e" },
  CL: { dir: "h", colors: ["#fff", "#d52b1e"], mark: "#0039a6" },
  CO: { dir: "h", colors: ["#fcd116", "#fcd116", "#003893", "#ce1126"] },
  DK: { dir: "h", colors: ["#c8102e"], mark: "#fff" },
  FI: { dir: "h", colors: ["#fff"], mark: "#003580" },
  FR: { dir: "v", colors: ["#002395", "#fff", "#ed2939"] },
  IN: { dir: "h", colors: ["#ff9933", "#fff", "#138808"] },
  NO: { dir: "h", colors: ["#ba0c2f"], mark: "#00205b" },
  ES: { dir: "h", colors: ["#aa151b", "#f1bf00", "#f1bf00", "#aa151b"] },
  AE: { dir: "h", colors: ["#00732f", "#fff", "#000"], mark: "#ff0000" },
};

function StripeFlag({ s }: { s: Stripes }) {
  const n = s.colors.length;
  return (
    <svg viewBox="0 0 16 12" width={14} height={10} className="shrink-0">
      {s.colors.map((c, i) =>
        s.dir === "h" ? <rect key={i} x="0" y={(12 / n) * i} width="16" height={12 / n + 0.1} fill={c} /> : <rect key={i} y="0" x={(16 / n) * i} height="12" width={16 / n + 0.1} fill={c} />,
      )}
      {s.mark && <circle cx="8" cy="6" r="2.4" fill={s.mark} />}
    </svg>
  );
}

export function CountryFlag({ code }: { code: string }): ReactNode {
  if (code === "US") return <FlagUS width={14} height={10} className="shrink-0" />;
  if (code === "UK") return <FlagUK width={14} height={10} className="shrink-0" />;
  if (code === "SE") return <FlagSE width={14} height={10} className="shrink-0" />;
  const s = stripes[code];
  return s ? <StripeFlag s={s} /> : <span className="h-[10px] w-[14px] shrink-0 bg-[#eceef1]" />;
}

export const topCountries = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "SE", name: "Sweden" },
  { code: "DE", name: "Germany" },
];

export const allCountries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AO", name: "Angola" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BE", name: "Belgium" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "NO", name: "Norway" },
  { code: "ES", name: "Spain" },
  { code: "AE", name: "United Arab Emirates" },
];
