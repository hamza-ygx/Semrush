import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

const stripes: Record<string, [string[], boolean]> = {
  AR: [["#74acdf", "#fff", "#74acdf"], false],
  AM: [["#d90012", "#0033a0", "#f2a800"], false],
  AT: [["#ed2939", "#fff", "#ed2939"], false],
  BE: [["#1a1a1a", "#fdda24", "#ef3340"], true],
  BG: [["#fff", "#00966e", "#d62612"], false],
  CO: [["#fcd116", "#fcd116", "#003893", "#ce1126"], false],
  EE: [["#0072ce", "#1a1a1a", "#fff"], false],
  FR: [["#002395", "#fff", "#ed2939"], true],
  DE: [["#1a1a1a", "#dd0000", "#ffce00"], false],
  HU: [["#ce2939", "#fff", "#477050"], false],
  ID: [["#e70011", "#fff"], false],
  IE: [["#169b62", "#fff", "#ff883e"], true],
  IT: [["#009246", "#fff", "#ce2b37"], true],
  LV: [["#9e3039", "#9e3039", "#fff", "#9e3039", "#9e3039"], false],
  LT: [["#fdb913", "#006a44", "#c1272d"], false],
  LU: [["#ed2939", "#fff", "#00a1de"], false],
  MX: [["#006847", "#fff", "#ce1126"], true],
  NL: [["#ae1c28", "#fff", "#21468b"], false],
  NG: [["#008751", "#fff", "#008751"], true],
  PE: [["#d91023", "#fff", "#d91023"], true],
  PL: [["#fff", "#dc143c"], false],
  RO: [["#002b7f", "#fcd116", "#ce1126"], true],
  RS: [["#c6363c", "#0c4076", "#fff"], false],
  TH: [["#a51931", "#f4f5f8", "#2d2a4a", "#2d2a4a", "#f4f5f8", "#a51931"], false],
  UA: [["#0057b7", "#ffd700"], false],
  UY: [["#fff", "#0038a8", "#fff", "#0038a8", "#fff"], false],
};

function Stripes({ colors, vertical }: { colors: string[]; vertical: boolean }) {
  return (
    <svg viewBox="0 0 16 12" width={16} height={12}>
      {colors.map((c, i) =>
        vertical ? (
          <rect key={i} x={(16 / colors.length) * i} width={16 / colors.length + 0.1} height="12" fill={c} />
        ) : (
          <rect key={i} y={(12 / colors.length) * i} width="16" height={12 / colors.length + 0.1} fill={c} />
        ),
      )}
    </svg>
  );
}

function Nordic({ bg, cross, inner }: { bg: string; cross: string; inner?: string }) {
  return (
    <svg viewBox="0 0 16 12" width={16} height={12}>
      <rect width="16" height="12" fill={bg} />
      <path d="M4.5 0h3v12h-3zM0 4.5h16v3H0z" fill={cross} />
      {inner && <path d="M5.3 0h1.4v12H5.3zM0 5.3h16v1.4H0z" fill={inner} />}
    </svg>
  );
}

export function DbFlag({ code }: { code: string }) {
  switch (code) {
    case "SE":
      return <FlagSE width={16} height={12} />;
    case "US":
      return <FlagUS width={16} height={12} />;
    case "UK":
      return <FlagUK width={16} height={12} />;
    case "DK":
      return <Nordic bg="#c8102e" cross="#fff" />;
    case "NO":
      return <Nordic bg="#ba0c2f" cross="#fff" inner="#00205b" />;
    case "IS":
      return <Nordic bg="#02529c" cross="#fff" inner="#dc1e35" />;
    case "FI":
      return <Nordic bg="#fff" cross="#002f6c" />;
    case "CH":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="12" fill="#da291c" />
          <path d="M7 2.5h2v2.5h2.5v2H9v2.5H7V7H4.5V5H7z" fill="#fff" />
        </svg>
      );
    case "SG":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="6" fill="#ef3340" />
          <rect y="6" width="16" height="6" fill="#f4f4f4" />
          <circle cx="3.6" cy="3" r="1.8" fill="#f4f4f4" />
          <circle cx="4.3" cy="3" r="1.6" fill="#ef3340" />
        </svg>
      );
    case "SK":
    case "SI":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="4" fill="#f4f4f4" />
          <rect y="4" width="16" height="4" fill="#0b4ea2" />
          <rect y="8" width="16" height="4" fill="#ee1c25" />
          {code === "SK" ? (
            <path d="M3 2.6h4.4v4.6c0 1.4-1 2.3-2.2 2.9C4 9.5 3 8.6 3 7.2z" fill="#ee1c25" stroke="#f4f4f4" strokeWidth=".6" />
          ) : (
            <path d="M3.4 2.2h3.4v3c0 1-.8 1.7-1.7 2-.9-.3-1.7-1-1.7-2z" fill="#0b4ea2" stroke="#f4f4f4" strokeWidth=".5" />
          )}
        </svg>
      );
    case "ZA":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="6" fill="#e03c31" />
          <rect y="6" width="16" height="6" fill="#001489" />
          <path d="M0 0l7 6-7 6z" fill="#ffb81c" />
          <path d="M0 1.2 5.6 6 0 10.8z" fill="#1a1a1a" />
          <path d="M5 4.4h11v3.2H5L0 12V11L4.3 6 0 1V0z" fill="#fff" />
          <path d="M5.6 5h10.4v2H5.6L0 11.5v-1L4.9 6 0 1.6v-1z" fill="#007749" />
        </svg>
      );
    case "KR":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="12" fill="#f4f4f4" />
          <circle cx="8" cy="6" r="2.6" fill="#cd2e3a" />
          <path d="M5.4 6a2.6 2.6 0 0 0 5.2 0c0-.7-.6-1.3-1.3-1.3S8 5.3 8 6s-.6 1.3-1.3 1.3S5.4 6.7 5.4 6z" fill="#0047a0" />
          <path d="M2 2.4l1.8-1.2M2.6 3.3l1.8-1.2M12.2 1.2 14 2.4M11.6 2.1l1.8 1.2M2 9.6l1.8 1.2M12.2 10.8l1.8-1.2" stroke="#1a1a1a" strokeWidth=".6" />
        </svg>
      );
    case "LK":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="12" fill="#ffb700" />
          <rect x="1" y="1" width="1.6" height="10" fill="#005f56" />
          <rect x="2.6" y="1" width="1.6" height="10" fill="#ff5b00" />
          <rect x="5" y="1" width="10" height="10" fill="#8d2029" />
        </svg>
      );
    case "JP":
      return (
        <svg viewBox="0 0 16 12" width={16} height={12}>
          <rect width="16" height="12" fill="#f4f4f4" />
          <circle cx="8" cy="6" r="3" fill="#bc002d" />
        </svg>
      );
    default: {
      const s = stripes[code];
      if (s) return <Stripes colors={s[0]} vertical={s[1]} />;
      return <Stripes colors={["#2f5fb3", "#f4f4f4", "#c8313e"]} vertical={false} />;
    }
  }
}
