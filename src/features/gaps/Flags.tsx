import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

const h = (a: string, b: string, c: string) => (
  <>
    <rect width="14" height="3.4" fill={a} />
    <rect y="3.3" width="14" height="3.4" fill={b} />
    <rect y="6.6" width="14" height="3.4" fill={c} />
  </>
);
const v = (a: string, b: string, c: string) => (
  <>
    <rect width="4.7" height="10" fill={a} />
    <rect x="4.6" width="4.8" height="10" fill={b} />
    <rect x="9.3" width="4.7" height="10" fill={c} />
  </>
);
const cross = (bg: string, fg: string) => (
  <>
    <rect width="14" height="10" fill={bg} />
    <path d="M4 0h2v10H4zM0 4h14v2H0z" fill={fg} />
  </>
);

const art: Record<string, React.ReactNode> = {
  de: h("#191b1c", "#dd0000", "#ffce00"),
  fr: v("#0055a4", "#fff", "#ef4135"),
  af: (
    <>
      {v("#191b1c", "#d32011", "#007a36")}
      <circle cx="7" cy="5" r="1.6" fill="#fff" />
    </>
  ),
  al: (
    <>
      <rect width="14" height="10" fill="#e41e20" />
      <path d="M5 3.2 7 2l2 1.2-.6 2.6L7 8 5.6 5.8z" fill="#191b1c" />
    </>
  ),
  dz: (
    <>
      <rect width="7" height="10" fill="#006233" />
      <rect x="7" width="7" height="10" fill="#fff" />
      <circle cx="7" cy="5" r="2.4" fill="#d21034" />
      <circle cx="7.7" cy="5" r="2" fill="#fff" />
    </>
  ),
  ad: v("#10069f", "#fedd00", "#d50032"),
  ao: (
    <>
      <rect width="14" height="5" fill="#cc092f" />
      <rect y="5" width="14" height="5" fill="#191b1c" />
    </>
  ),
  ar: h("#74acdf", "#fff", "#74acdf"),
  am: h("#d90012", "#0033a0", "#f2a800"),
  au: (
    <>
      <rect width="14" height="10" fill="#012169" />
      <circle cx="10" cy="6.5" r=".9" fill="#fff" />
      <path d="M0 0h6v4H0z" fill="#c8102e" opacity=".8" />
    </>
  ),
  at: h("#ed2939", "#fff", "#ed2939"),
  be: v("#191b1c", "#fdda24", "#ef3340"),
  dk: cross("#c8102e", "#fff"),
  fi: cross("#fff", "#003580"),
  it: v("#009246", "#fff", "#ce2b37"),
  nl: h("#ae1c28", "#fff", "#21468b"),
  no: (
    <>
      {cross("#ba0c2f", "#fff")}
      <path d="M4.5 0h1v10h-1zM0 4.5h14v1H0z" fill="#00205b" />
    </>
  ),
  es: (
    <>
      <rect width="14" height="10" fill="#aa151b" />
      <rect y="2.5" width="14" height="5" fill="#f1bf00" />
    </>
  ),
};

export function CountryFlag({ code }: { code: string }) {
  if (code === "us") return <FlagUS width={14} height={10} />;
  if (code === "uk") return <FlagUK width={14} height={10} />;
  if (code === "se") return <FlagSE width={14} height={10} />;
  return (
    <svg viewBox="0 0 14 10" width={14} height={10} className="shrink-0 overflow-hidden rounded-[1px]">
      {art[code]}
    </svg>
  );
}
