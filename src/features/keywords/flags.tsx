import { FlagSE, FlagUS } from "@/components/ui/icons";

const W = 16;
const H = 12;

function Tri({ colors, vertical = true }: { colors: string[]; vertical?: boolean }) {
  return (
    <svg viewBox="0 0 16 12" width={W} height={H}>
      {colors.map((c, i) =>
        vertical ? <rect key={i} x={(16 / colors.length) * i} width={16 / colors.length + 0.1} height="12" fill={c} /> : <rect key={i} y={(12 / colors.length) * i} width="16" height={12 / colors.length + 0.1} fill={c} />,
      )}
    </svg>
  );
}

export function CountryFlag({ code }: { code: string }) {
  switch (code) {
    case "SE":
      return <FlagSE width={W} height={H} />;
    case "US":
      return <FlagUS width={W} height={H} />;
    case "BE":
      return <Tri colors={["#1a1a1a", "#fdda24", "#ef3340"]} />;
    case "DE":
      return <Tri colors={["#1a1a1a", "#dd0000", "#ffce00"]} vertical={false} />;
    case "CA":
      return (
        <svg viewBox="0 0 16 12" width={W} height={H}>
          <rect width="16" height="12" fill="#fff" />
          <rect width="4" height="12" fill="#d52b1e" />
          <rect x="12" width="4" height="12" fill="#d52b1e" />
          <path d="M8 3l1 2 1.3-.4-.5 2.2 1-.2L9 8.5H7L5.2 6.6l1 .2-.5-2.2L7 5z" fill="#d52b1e" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 16 12" width={W} height={H}>
          <rect width="16" height="12" fill="#229e45" />
          <path d="M8 1.5 14.5 6 8 10.5 1.5 6z" fill="#f8e509" />
          <circle cx="8" cy="6" r="2.6" fill="#2b49a3" />
        </svg>
      );
    case "AU":
      return (
        <svg viewBox="0 0 16 12" width={W} height={H}>
          <rect width="16" height="12" fill="#00247d" />
          <path d="M0 0l7 5M7 0 0 5" stroke="#fff" strokeWidth="1.4" />
          <path d="M3.5 0v5M0 2.5h7" stroke="#fff" strokeWidth="1.8" />
          <path d="M3.5 0v5M0 2.5h7" stroke="#cf142b" strokeWidth=".9" />
          <circle cx="3.5" cy="8.8" r="1.1" fill="#fff" />
          <circle cx="12" cy="3" r=".7" fill="#fff" />
          <circle cx="10.5" cy="6.5" r=".7" fill="#fff" />
          <circle cx="13.5" cy="6" r=".7" fill="#fff" />
          <circle cx="12" cy="9.8" r=".7" fill="#fff" />
        </svg>
      );
    default:
      return <Tri colors={["#ccc"]} />;
  }
}
