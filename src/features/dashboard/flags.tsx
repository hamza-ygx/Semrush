import { FlagSE, FlagUS, GlobeIcon } from "@/components/ui/icons";

type Stripes = { dir: "h" | "v"; colors: string[] };

const flags: Record<string, Stripes> = {
  Afghanistan: { dir: "v", colors: ["#000", "#be0000", "#007a36"] },
  Albania: { dir: "h", colors: ["#e41e20"] },
  Algeria: { dir: "v", colors: ["#006233", "#fff"] },
  Angola: { dir: "h", colors: ["#cc092f", "#000"] },
  Argentina: { dir: "h", colors: ["#74acdf", "#fff", "#74acdf"] },
  Armenia: { dir: "h", colors: ["#d90012", "#0033a0", "#f2a800"] },
  Australia: { dir: "h", colors: ["#012169"] },
  Austria: { dir: "h", colors: ["#ed2939", "#fff", "#ed2939"] },
  Belgium: { dir: "v", colors: ["#000", "#fae042", "#ed2939"] },
  Brazil: { dir: "h", colors: ["#009c3b"] },
  Canada: { dir: "v", colors: ["#d52b1e", "#fff", "#d52b1e"] },
  Denmark: { dir: "h", colors: ["#c8102e"] },
  Estonia: { dir: "h", colors: ["#0072ce", "#000", "#fff"] },
  Finland: { dir: "h", colors: ["#fff"] },
  France: { dir: "v", colors: ["#002395", "#fff", "#ed2939"] },
  Germany: { dir: "h", colors: ["#000", "#dd0000", "#ffce00"] },
  Hungary: { dir: "h", colors: ["#ce2939", "#fff", "#477050"] },
  Ireland: { dir: "v", colors: ["#169b62", "#fff", "#ff883e"] },
  Italy: { dir: "v", colors: ["#009246", "#fff", "#ce2b37"] },
  Netherlands: { dir: "h", colors: ["#ae1c28", "#fff", "#21468b"] },
  Norway: { dir: "h", colors: ["#ba0c2f"] },
  Poland: { dir: "h", colors: ["#fff", "#dc143c"] },
  Spain: { dir: "h", colors: ["#aa151b", "#f1bf00", "#f1bf00", "#aa151b"] },
  Ukraine: { dir: "h", colors: ["#0057b7", "#ffd700"] },
  "United Kingdom": { dir: "h", colors: ["#012169"] },
};

export function Flag({ country }: { country: string }) {
  if (country === "Worldwide") return <GlobeIcon width={14} height={14} />;
  if (country === "Sweden") return <FlagSE width={14} height={10} />;
  if (country === "United States" || country === "USA") return <FlagUS width={14} height={10} />;
  const f = flags[country] ?? { dir: "h", colors: ["#c4c7cf", "#e0e1e9"] };
  const n = f.colors.length;
  return (
    <svg viewBox="0 0 16 12" width={14} height={10} className="shrink-0">
      {f.colors.map((c, i) =>
        f.dir === "h" ? (
          <rect key={i} x={0} y={(12 / n) * i} width={16} height={12 / n + 0.1} fill={c} />
        ) : (
          <rect key={i} x={(16 / n) * i} y={0} width={16 / n + 0.1} height={12} fill={c} />
        ),
      )}
      <rect width={16} height={12} fill="none" stroke="rgba(0,0,0,.12)" />
    </svg>
  );
}
