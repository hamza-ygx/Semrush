import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

type Spec = { d: "h" | "v"; c: string[]; dot?: string };

const specs: Record<string, Spec> = {
  AE: { d: "h", c: ["#00732f", "#fff", "#000"] },
  AL: { d: "h", c: ["#e41e20"], dot: "#000" },
  AM: { d: "h", c: ["#d90012", "#0033a0", "#f2a800"] },
  AR: { d: "h", c: ["#74acdf", "#fff", "#74acdf"] },
  AT: { d: "h", c: ["#ed2939", "#fff", "#ed2939"] },
  AU: { d: "h", c: ["#012169"], dot: "#fff" },
  AZ: { d: "h", c: ["#00b5e2", "#ef3340", "#509e2f"] },
  BA: { d: "h", c: ["#002395"], dot: "#fecb00" },
  BD: { d: "h", c: ["#006a4e"], dot: "#f42a41" },
  BE: { d: "v", c: ["#000", "#fdda24", "#ef3340"] },
  BG: { d: "h", c: ["#fff", "#00966e", "#d62612"] },
  BH: { d: "v", c: ["#fff", "#ce1126", "#ce1126"] },
  BN: { d: "h", c: ["#f7e017", "#fff", "#000", "#f7e017"] },
  BO: { d: "h", c: ["#d52b1e", "#f9e300", "#007934"] },
  BR: { d: "h", c: ["#009c3b"], dot: "#ffdf00" },
  BY: { d: "h", c: ["#c8313e", "#c8313e", "#4aa657"] },
  CA: { d: "v", c: ["#d80621", "#fff", "#fff", "#d80621"], dot: "#d80621" },
  CH: { d: "h", c: ["#d52b1e"], dot: "#fff" },
  CL: { d: "h", c: ["#fff", "#d52b1e"] },
  CO: { d: "h", c: ["#fcd116", "#fcd116", "#003893", "#ce1126"] },
  CR: { d: "h", c: ["#002b7f", "#fff", "#ce1126", "#ce1126", "#fff", "#002b7f"] },
  CY: { d: "h", c: ["#fff"], dot: "#d57800" },
  CZ: { d: "h", c: ["#fff", "#d7141a"] },
  DE: { d: "h", c: ["#000", "#dd0000", "#ffce00"] },
  DK: { d: "h", c: ["#c60c30"], dot: "#fff" },
  DO: { d: "h", c: ["#002d62", "#ce1126"], dot: "#fff" },
  DZ: { d: "v", c: ["#006233", "#fff"], dot: "#d21034" },
  EC: { d: "h", c: ["#ffdd00", "#ffdd00", "#034ea2", "#ed1c24"] },
  EE: { d: "h", c: ["#0072ce", "#000", "#fff"] },
  EG: { d: "h", c: ["#ce1126", "#fff", "#000"] },
  ES: { d: "h", c: ["#c60b1e", "#ffc400", "#ffc400", "#c60b1e"] },
  FI: { d: "h", c: ["#fff"], dot: "#003580" },
  FR: { d: "v", c: ["#002395", "#fff", "#ed2939"] },
  GE: { d: "h", c: ["#fff"], dot: "#ff0000" },
  GH: { d: "h", c: ["#ce1126", "#fcd116", "#006b3f"], dot: "#000" },
  GR: { d: "h", c: ["#0d5eaf", "#fff", "#0d5eaf", "#fff", "#0d5eaf"] },
  GT: { d: "v", c: ["#4997d0", "#fff", "#4997d0"] },
  HK: { d: "h", c: ["#de2910"], dot: "#fff" },
  HN: { d: "h", c: ["#0073cf", "#fff", "#0073cf"] },
  HR: { d: "h", c: ["#ff0000", "#fff", "#171796"] },
  HU: { d: "h", c: ["#ce2939", "#fff", "#477050"] },
  ID: { d: "h", c: ["#ce1126", "#fff"] },
  IE: { d: "v", c: ["#169b62", "#fff", "#ff883e"] },
  IL: { d: "h", c: ["#fff", "#0038b8", "#fff"] },
  IN: { d: "h", c: ["#ff9933", "#fff", "#138808"] },
  IS: { d: "h", c: ["#02529c"], dot: "#dc1e35" },
  IT: { d: "v", c: ["#009246", "#fff", "#ce2b37"] },
  JM: { d: "h", c: ["#009b3a"], dot: "#fed100" },
  JO: { d: "h", c: ["#000", "#fff", "#007a3d"] },
  JP: { d: "h", c: ["#fff"], dot: "#bc002d" },
  KE: { d: "h", c: ["#000", "#bb0000", "#006600"] },
  KH: { d: "h", c: ["#032ea1", "#e00025", "#e00025", "#032ea1"] },
  KR: { d: "h", c: ["#fff"], dot: "#cd2e3a" },
  KZ: { d: "h", c: ["#00afca"], dot: "#fec50c" },
  LB: { d: "h", c: ["#ed1c24", "#fff", "#fff", "#ed1c24"], dot: "#00a651" },
  LK: { d: "v", c: ["#00534e", "#eb7400", "#8d153a", "#8d153a"] },
  LT: { d: "h", c: ["#fdb913", "#006a44", "#c1272d"] },
  LU: { d: "h", c: ["#ed2939", "#fff", "#00a1de"] },
  LV: { d: "h", c: ["#9e3039", "#9e3039", "#fff", "#9e3039", "#9e3039"] },
  MA: { d: "h", c: ["#c1272d"], dot: "#006233" },
  MD: { d: "v", c: ["#003da5", "#ffd200", "#c8102e"] },
  ME: { d: "h", c: ["#c40308"], dot: "#d4af3a" },
  MK: { d: "h", c: ["#d20000"], dot: "#ffe600" },
  MN: { d: "v", c: ["#c4272f", "#015197", "#c4272f"] },
  MT: { d: "v", c: ["#fff", "#cf142b"] },
  MU: { d: "h", c: ["#ea2839", "#1a206d", "#ffd500", "#00a551"] },
  MX: { d: "v", c: ["#006847", "#fff", "#ce1126"], dot: "#8c6a2f" },
  MY: { d: "h", c: ["#cc0001", "#fff", "#cc0001", "#fff", "#cc0001"] },
  NG: { d: "v", c: ["#008751", "#fff", "#008751"] },
  NI: { d: "h", c: ["#0067c6", "#fff", "#0067c6"] },
  NL: { d: "h", c: ["#ae1c28", "#fff", "#21468b"] },
  NO: { d: "h", c: ["#ba0c2f"], dot: "#00205b" },
  NP: { d: "h", c: ["#dc143c"], dot: "#fff" },
  NZ: { d: "h", c: ["#012169"], dot: "#c8102e" },
  OM: { d: "h", c: ["#fff", "#db161b", "#008000"] },
  PA: { d: "v", c: ["#fff", "#d21034"] },
  PE: { d: "v", c: ["#d91023", "#fff", "#d91023"] },
  PH: { d: "h", c: ["#0038a8", "#ce1126"] },
  PK: { d: "v", c: ["#fff", "#01411c", "#01411c", "#01411c"] },
  PL: { d: "h", c: ["#fff", "#dc143c"] },
  PT: { d: "v", c: ["#006600", "#ff0000", "#ff0000"], dot: "#ffcc00" },
  PY: { d: "h", c: ["#d52b1e", "#fff", "#0038a8"] },
  RO: { d: "v", c: ["#002b7f", "#fcd116", "#ce1126"] },
  RU: { d: "h", c: ["#fff", "#0039a6", "#d52b1e"] },
  SG: { d: "h", c: ["#ef3340", "#fff"] },
  SI: { d: "h", c: ["#fff", "#0000ff", "#ff0000"] },
  SK: { d: "h", c: ["#fff", "#0b4ea2", "#ee1c25"] },
  SV: { d: "h", c: ["#0047ab", "#fff", "#0047ab"] },
  TH: { d: "h", c: ["#a51931", "#f4f5f8", "#2d2a4a", "#2d2a4a", "#f4f5f8", "#a51931"] },
  TN: { d: "h", c: ["#e70013"], dot: "#fff" },
  TR: { d: "h", c: ["#e30a17"], dot: "#fff" },
  TW: { d: "h", c: ["#fe0000"], dot: "#000095" },
  UA: { d: "h", c: ["#0057b7", "#ffd700"] },
  UY: { d: "h", c: ["#fff", "#0038a8", "#fff", "#0038a8", "#fff"] },
  VE: { d: "h", c: ["#ffcc00", "#00247d", "#cf142b"] },
  VN: { d: "h", c: ["#da251d"], dot: "#ff0" },
  ZA: { d: "h", c: ["#007749", "#fff", "#de3831"] },
};

function Special({ code }: { code: string }) {
  if (code === "QA")
    return (
      <>
        <rect width={16} height={12} fill="#8a1538" />
        <path d="M0 0h4.6l1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7 1.6.7-1.6.7H0z" fill="#fff" />
      </>
    );
  if (code === "RS")
    return (
      <>
        <rect width={16} height={4} fill="#c6363c" />
        <rect y={4} width={16} height={4} fill="#0c4076" />
        <rect y={8} width={16} height={4} fill="#fff" />
        <rect x={3.4} y={2.4} width={3.4} height={5.6} rx={1} fill="#c6363c" stroke="#fff" strokeWidth={0.6} />
      </>
    );
  if (code === "SA")
    return (
      <>
        <rect width={16} height={12} fill="#006c35" />
        <path d="M4 4.6h8M4.6 6h6.8" stroke="#fff" strokeWidth={0.9} strokeDasharray="1.2 .5" />
        <path d="M4.4 8.2h7.2" stroke="#fff" strokeWidth={0.7} />
      </>
    );
  return null;
}

const special = new Set(["QA", "RS", "SA"]);

export function DbFlag({ code, width = 14, height = 10 }: { code: string; width?: number; height?: number }) {
  if (code === "SE") return <FlagSE width={width} height={height} className="shrink-0" />;
  if (code === "US") return <FlagUS width={width} height={height} className="shrink-0" />;
  if (code === "UK") return <FlagUK width={width} height={height} className="shrink-0" />;
  const s = specs[code] ?? { d: "h", c: ["#d6d8d7"] };
  const n = s.c.length;
  return (
    <svg viewBox="0 0 16 12" width={width} height={height} className="shrink-0">
      {special.has(code) ? (
        <Special code={code} />
      ) : (
        <>
          {s.c.map((c, i) =>
            s.d === "h" ? <rect key={i} x={0} y={(12 / n) * i} width={16} height={12 / n + 0.05} fill={c} /> : <rect key={i} x={(16 / n) * i} y={0} width={16 / n + 0.05} height={12} fill={c} />,
          )}
          {s.dot && <circle cx={8} cy={6} r={2.4} fill={s.dot} />}
        </>
      )}
    </svg>
  );
}
