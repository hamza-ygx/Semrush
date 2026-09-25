import { FlagUK, FlagUS } from "@/components/ui/icons";

type Spec = { d: "h" | "v"; c: string[]; dot?: string };

const specs: Record<string, Spec> = {
  ES: { d: "h", c: ["#c60b1e", "#ffc400", "#ffc400", "#c60b1e"] },
  FR: { d: "v", c: ["#002395", "#fff", "#ed2939"] },
  DE: { d: "h", c: ["#000", "#dd0000", "#ffce00"] },
  IT: { d: "v", c: ["#009246", "#fff", "#ce2b37"] },
  RU: { d: "h", c: ["#fff", "#0039a6", "#d52b1e"] },
  BE: { d: "v", c: ["#000", "#fdda24", "#ef3340"] },
  MX: { d: "v", c: ["#006847", "#fff", "#ce1126"], dot: "#8c6a2f" },
  PL: { d: "h", c: ["#fff", "#dc143c"] },
  NL: { d: "h", c: ["#ae1c28", "#fff", "#21468b"] },
  TR: { d: "h", c: ["#e30a17"], dot: "#fff" },
  PT: { d: "v", c: ["#006600", "#ff0000", "#ff0000"], dot: "#ffcc00" },
  RO: { d: "v", c: ["#002b7f", "#fcd116", "#ce1126"] },
  GR: { d: "h", c: ["#0d5eaf", "#fff", "#0d5eaf", "#fff", "#0d5eaf"] },
  CH: { d: "h", c: ["#d52b1e"], dot: "#fff" },
  JP: { d: "h", c: ["#fff"], dot: "#bc002d" },
  KR: { d: "h", c: ["#fff"], dot: "#cd2e3a" },
  CA: { d: "v", c: ["#d80621", "#fff", "#fff", "#d80621"], dot: "#d80621" },
  AU: { d: "h", c: ["#012169"], dot: "#fff" },
  SE: { d: "h", c: ["#006aa7", "#fecc00", "#006aa7"] },
  IE: { d: "v", c: ["#169b62", "#fff", "#ff883e"] },
  CZ: { d: "h", c: ["#fff", "#d7141a"] },
  HU: { d: "h", c: ["#ce2939", "#fff", "#477050"] },
  SA: { d: "h", c: ["#006c35"], dot: "#fff" },
  AE: { d: "h", c: ["#00732f", "#fff", "#000"] },
  IL: { d: "h", c: ["#fff", "#0038b8", "#fff"] },
  EG: { d: "h", c: ["#ce1126", "#fff", "#000"] },
  MA: { d: "h", c: ["#c1272d"], dot: "#006233" },
  IN: { d: "h", c: ["#ff9933", "#fff", "#138808"] },
  BR: { d: "h", c: ["#009c3b"], dot: "#ffdf00" },
  AR: { d: "h", c: ["#74acdf", "#fff", "#74acdf"] },
  CO: { d: "h", c: ["#fcd116", "#fcd116", "#003893", "#ce1126"] },
  CL: { d: "h", c: ["#fff", "#d52b1e"] },
  PE: { d: "v", c: ["#d91023", "#fff", "#d91023"] },
  DZ: { d: "v", c: ["#006233", "#fff"], dot: "#d21034" },
  HK: { d: "h", c: ["#de2910"], dot: "#fff" },
  LT: { d: "h", c: ["#fdb913", "#006a44", "#c1272d"] },
  SK: { d: "h", c: ["#fff", "#0b4ea2", "#ee1c25"] },
  AT: { d: "h", c: ["#ed2939", "#fff", "#ed2939"] },
  UA: { d: "h", c: ["#0057b7", "#ffd700"] },
  RS: { d: "h", c: ["#c6363c", "#0c4076", "#fff"] },
  BG: { d: "h", c: ["#fff", "#00966e", "#d62612"] },
  HR: { d: "h", c: ["#ff0000", "#fff", "#171796"] },
  KZ: { d: "h", c: ["#00afca"], dot: "#fec50c" },
  CN: { d: "h", c: ["#de2910"], dot: "#ffde00" },
  TH: { d: "h", c: ["#a51931", "#f4f5f8", "#2d2a4a", "#2d2a4a", "#f4f5f8", "#a51931"] },
  PH: { d: "h", c: ["#0038a8", "#ce1126"] },
  ID: { d: "h", c: ["#ce1126", "#fff"] },
  VN: { d: "h", c: ["#da251d"], dot: "#ff0" },
  DK: { d: "h", c: ["#c60c30"], dot: "#fff" },
  NO: { d: "h", c: ["#ba0c2f"], dot: "#00205b" },
  FI: { d: "h", c: ["#fff"], dot: "#003580" },
};

export function Flag({ code, className = "" }: { code: string; className?: string }) {
  if (code === "US") return <FlagUS width={14} height={10} className={className} />;
  if (code === "GB") return <FlagUK width={14} height={10} className={className} />;
  const s = specs[code] ?? { d: "h", c: ["#d6d8d7"] };
  const n = s.c.length;
  return (
    <svg viewBox="0 0 16 12" width={14} height={10} className={`shrink-0 ${className}`}>
      {s.c.map((c, i) =>
        s.d === "h" ? <rect key={i} x={0} y={(12 / n) * i} width={16} height={12 / n + 0.05} fill={c} /> : <rect key={i} x={(16 / n) * i} y={0} width={16 / n + 0.05} height={12} fill={c} />,
      )}
      {s.dot && <circle cx={8} cy={6} r={2.4} fill={s.dot} />}
    </svg>
  );
}
