import type { ReactNode } from "react";
import { DarkScrollbar, PeopleAlsoAsk } from "./client";
import { dbNames, places, related, results, tabs, type Place, type Result } from "./data";

const font = { fontFamily: "arial, sans-serif" };

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((t, i) =>
        i % 2 ? (
          <b key={i} className="font-bold text-[#5f6368]">
            {t}
          </b>
        ) : (
          t
        ),
      )}
    </>
  );
}

function GoogleLogo({ size = 30 }: { size?: number }) {
  const c = ["#4285f4", "#ea4335", "#fbbc05", "#4285f4", "#34a853", "#ea4335"];
  return (
    <span className="font-medium tracking-[-1.5px] select-none" style={{ fontSize: size, lineHeight: 1, fontFamily: "'Product Sans', arial, sans-serif" }}>
      {"Google".split("").map((ch, i) => (
        <span key={i} style={{ color: c[i] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const Icon = ({ children, size = 24, className = "" }: { children: ReactNode; size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    {children}
  </svg>
);

function SearchBox({ phrase }: { phrase: string }) {
  return (
    <div className="absolute top-[26px] left-[179px] flex h-[51px] w-[861px] items-center rounded-full bg-white pr-[18px] pl-[21px] shadow-[0_1px_6px_rgba(32,33,36,0.2)]">
      <span className="flex-1 text-[16px] text-[#202124]">{phrase}</span>
      <Icon className="text-[#5f6368]">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </Icon>
      <span className="mx-[13px] h-[33px] w-px bg-[#dadce0]" />
      <Icon className="text-[#3c4043]">
        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
      </Icon>
      <Icon className="ml-[17px] text-[#3c4043]">
        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.49 6-3.3 6-6.72h-1.7z" />
      </Icon>
      <Icon className="ml-[16px] text-[#3c4043]">
        <path d="M6 5h2V3H6a3 3 0 0 0-3 3v2h2V6a1 1 0 0 1 1-1zm12-2h-2v2h2a1 1 0 0 1 1 1v2h2V6a3 3 0 0 0-3-3zM5 16H3v2a3 3 0 0 0 3 3h2v-2H6a1 1 0 0 1-1-1v-2zm14 2a1 1 0 0 1-1 1h-2v2h2a3 3 0 0 0 3-3v-2h-2v2zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </Icon>
      <Icon className="ml-[16px] text-[#3c4043]">
        <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </Icon>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex text-[#fbbc04]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width={13} height={13}>
          <path d="m12 17.3 6.2 3.7-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14l-1.6 7z" fill={i < Math.floor(n) ? "currentColor" : "#dadce0"} />
        </svg>
      ))}
    </span>
  );
}

function RoundAction({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex w-[70px] flex-col items-center">
      <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#dadce0] text-[#0b57d0]">{children}</span>
      <span className="mt-[7px] text-[14px] leading-5 whitespace-nowrap text-[#1558d6]">{label}</span>
    </span>
  );
}

function PlaceRow({ p, last }: { p: Place; last?: boolean }) {
  return (
    <div className={`flex items-start justify-between pt-[13px] pb-[18px] ${last ? "" : "border-b border-[#ebebeb]"}`}>
      <div className="text-[14px] leading-[21.5px] text-[#70757a]">
        <div className="text-[18px] leading-[22px] text-[#202124]">{p.name}</div>
        <div className="flex items-center gap-1">
          {p.rating} <Stars n={p.stars} /> ({p.reviews}) · {p.kind}
        </div>
        <div>{p.line2}</div>
        <div>
          <span className="text-[#d93025]">{p.open ? "Öppet" : "Stängt"}</span> · {p.line3}
        </div>
      </div>
      <div className="mt-[8px] flex gap-[13px]">
        <RoundAction label="Webbplats">
          <Icon size={22}>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 17.9A8 8 0 0 1 4 12c0-.6.1-1.2.2-1.8L9 15v1a2 2 0 0 0 2 2v1.9zm6.9-2.5A2 2 0 0 0 16 16h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.4a8 8 0 0 1 2.9 12.8z" />
          </Icon>
        </RoundAction>
        <RoundAction label="Vägvisning">
          <Icon size={22}>
            <path d="M21.7 11.3 12.7 2.3a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4zM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
          </Icon>
        </RoundAction>
      </div>
    </div>
  );
}

function MapArt() {
  const pin = (x: number, y: number) => (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 14C-6 6-10 2-10-4a10 10 0 0 1 20 0c0 6-4 10-10 18z" fill="#ea4335" stroke="#b31412" strokeWidth="1" />
      <circle cy="-4" r="4.2" fill="#fff" />
    </g>
  );
  const dot = (x: number, y: number) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.8" fill="#ea4335" stroke="#fff" strokeWidth="1" />;
  const label = (x: number, y: number, t: string, size = 12, cls = "#3c4043") => (
    <text x={x} y={y} fontSize={size} fill={cls} fontFamily="arial" stroke="#fff" strokeWidth="3" paintOrder="stroke">
      {t}
    </text>
  );
  const small = (x: number, y: number, t: string) => (
    <text x={x} y={y} fontSize="8" letterSpacing="1" fill="#5f6368" fontFamily="arial" fontWeight="700">
      {t}
    </text>
  );
  return (
    <svg viewBox="0 0 652 200" width={652} height={200} className="block rounded-lg">
      <rect width="652" height="200" fill="#e8f0e4" />
      <path d="M0 0h200l-20 60-80 30L0 70z" fill="#cfe8cf" />
      <path d="M430 0h222v200H500l-40-80z" fill="#d7ecd3" />
      <path d="M170 200c20-40 70-70 110-80 30-8 50 10 60 40l10 40z" fill="#aadaff" />
      <path d="M120 60c20 10 50 5 60-10" fill="none" stroke="#aadaff" strokeWidth="8" />
      <path d="M300 0c-5 40 5 80 10 110" fill="none" stroke="#8fc9f0" strokeWidth="5" />
      <g fill="none" stroke="#ffffff" strokeWidth="5">
        <path d="M0 130c100-30 230-50 330-40s200 5 322-40" />
        <path d="M250 0c40 60 90 120 150 200" />
        <path d="M420 0c20 60 30 120 50 200" />
        <path d="M0 95c80-10 150 0 230 10" />
        <path d="M520 110c40-30 80-60 132-70" />
      </g>
      <g fill="none" stroke="#c6cbe6" strokeWidth="3">
        <path d="M380 0c30 70 50 130 60 200" />
        <path d="M200 40c80 20 160 20 260 60" />
      </g>
      <rect x="467" y="39" width="18" height="12" rx="2" fill="#4a7fd4" />
      <text x="470" y="48" fontSize="8" fill="#fff" fontFamily="arial">
        25
      </text>
      {small(30, 17, "FAMMARP")}
      {small(247, 10, "MICKEDALA")}
      {small(130, 45, "FLYGSTADEN")}
      {small(546, 17, "BROGÅRD")}
      {small(450, 87, "SNÖSTORP")}
      {small(60, 146, "BÄCKAGÅRD")}
      {small(110, 157, "SÖNDRUM")}
      {small(60, 186, "STENHUGGERIET")}
      {label(47, 52, "Mjällby", 13, "#202124")}
      {label(9, 101, "Möllegård", 13, "#202124")}
      {label(122, 176, "Eketånga", 13, "#202124")}
      {label(406, 158, "Andersberg", 13, "#202124")}
      {label(540, 148, "Röinge", 13, "#202124")}
      {label(278, 131, "Accenten", 12)}
      {label(274, 145, "Redovisning", 12)}
      {label(228, 24, "Ellox", 12)}
      {label(228, 38, "Redovisning AB", 12)}
      {label(377, 11, "Palms", 12)}
      {label(377, 25, "Redovisningsbyrå...", 12)}
      {label(406, 119, "Jb Ekonomipartner", 12)}
      {label(406, 133, "AB", 12)}
      {label(452, 187, "BDCG AB", 12)}
      <text x="535" y="195" fontSize="10" fill="#3c4043" fontFamily="arial" stroke="#fff" strokeWidth="2.5" paintOrder="stroke">
        Kartdata ©2026 Google
      </text>
      {[
        [215, 43],
        [271, 66],
        [311, 67],
        [293, 81],
        [322, 83],
        [343, 64],
        [387, 74],
        [327, 90],
        [328, 95],
        [381, 130],
        [543, 26],
      ].map(([x, y]) => dot(x, y))}
      {pin(213, 27)}
      {pin(362, 21)}
      {pin(310, 101)}
      {pin(392, 117)}
      {pin(439, 182)}
    </svg>
  );
}

function Favicon({ f }: { f: Result["favicon"] }) {
  const long = f.text.length > 2;
  return (
    <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#dadce0]" style={{ background: f.bg, color: f.fg }}>
      <span className={`font-bold ${long ? "text-[7px]" : "text-[11px]"}`}>{f.text}</span>
    </span>
  );
}

function OrganicResult({ r }: { r: Result }) {
  return (
    <div className={`relative w-[652px] pb-[27px] ${r.highlight ? "before:absolute before:-inset-x-3 before:-top-2 before:bottom-[14px] before:rounded-lg before:bg-[#fff8c5]" : ""}`}>
      <div className="relative">
        <div className="flex items-center gap-3">
          <Favicon f={r.favicon} />
          <div className="leading-[18px]">
            <div className="text-[14px] text-[#202124]">{r.site}</div>
            <div className="flex items-center text-[12px] text-[#4d5156]">
              {r.url} {r.path}
              <Icon size={18} className="ml-[10px] text-[#4d5156]">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </Icon>
            </div>
          </div>
        </div>
        <a href={r.url} target="_blank" rel="noreferrer" className="mt-[7px] block text-[20px] leading-[26px] text-[#1a0dab] hover:underline">
          {r.title}
        </a>
        <div className="mt-[4px] text-[14px] leading-[22px] text-[#4d5156]">
          {r.snippet.map((l, i) => (
            <div key={i}>
              <Bold text={l} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pager() {
  const os = "oooooooooo";
  return (
    <div className="mt-[46px] flex flex-col items-center pl-[148px]">
      <div className="flex items-end">
        <span style={{ fontFamily: "'Product Sans', arial, sans-serif" }} className="text-[34px] leading-none font-medium tracking-[-1px]">
          <span className="text-[#4285f4]">G</span>
          {os.split("").map((o, i) => (
            <span key={i} className={i === 0 ? "text-[#fbbc05]" : "text-[#ea4335]"}>
              {o}
            </span>
          ))}
          <span className="text-[#4285f4]">g</span>
          <span className="text-[#34a853]">l</span>
          <span className="text-[#ea4335]">e</span>
        </span>
        <span className="mb-[6px] ml-[14px] text-[18px] text-[#4285f4]">›</span>
      </div>
      <div className="mt-[4px] flex items-center text-[14px] text-[#1a0dab]">
        <span className="text-[#202124]">1</span>
        {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <span key={n} className="ml-[10px]">
            {n}
          </span>
        ))}
        <span className="ml-[56px]">Nästa</span>
      </div>
    </div>
  );
}

export function SerpSnapshot({ phrase, db, domain, position }: { phrase: string; db: string; domain: string; position: string }) {
  const meta = [
    ["Phrase", phrase],
    ["Database", dbNames[db] ?? db.toUpperCase()],
    ["Device", "Desktop"],
    ["Date", "Sep 2026"],
    ["Mask", `${domain} (${position})`],
  ];
  return (
    <div className="min-h-screen bg-white text-[#202124]" style={font}>
      <DarkScrollbar />
      <div className="flex h-[117px] bg-[#5b5b5b] pt-[16px] text-[12px] leading-[17px]">
        <div className="w-[722px]">
          {meta.map(([k, v]) => (
            <div key={k} className="flex">
              <span className="w-[160px] text-right text-[#cfcfcf]">{k}:</span>
              <span className="ml-[7px] text-white">{v}</span>
            </div>
          ))}
        </div>
        <div className="w-[672px] text-[#d6d6d6]">
          This is Google cache of search results for the term: <b className="font-normal text-white">{phrase}</b>. It is a snapshot of the page as it appeared on the day of database collection. Please note,
          the current page may differ from the snapshot captured.
        </div>
      </div>
      <div className="relative h-[138px] border-b border-[#ebebeb]" style={{ width: 1497 }}>
        <span className="absolute top-[37px] left-[43px]">
          <GoogleLogo />
        </span>
        <SearchBox phrase={phrase} />
        <Icon className="absolute top-[41px] left-[1465px] text-[#444746]">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 21 5a3 3 0 1 0-5.91.7L8.04 9.81A3 3 0 1 0 6 15c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65A2.92 2.92 0 1 0 18 16.08z" />
        </Icon>
        <div className="absolute top-[106px] left-[199px] flex text-[14px] text-[#70757a]">
          {tabs.map((t) => (
            <span key={t} className={`relative mr-[24px] ${t === "Allt" ? "text-[#202124]" : ""}`}>
              {t}
              {t === "Allt" && <span className="absolute -right-[1px] -bottom-[11px] -left-[1px] h-[3px] rounded-t bg-[#202124]" />}
            </span>
          ))}
          <span className="flex items-center gap-[6px]">
            Fler
            <svg viewBox="0 0 10 5" width={8} height={4}>
              <path d="M0 0l5 5 5-5z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <div className="pl-[199px]">
        <div className="mt-[9px] flex gap-[7px]">
          {["Öppet nu", "Högst betyg"].map((c) => (
            <span key={c} className="flex h-[35px] items-center rounded-full border border-[#dadce0] px-[15px] text-[14px] text-[#202124]">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-[33px] flex items-center text-[14px]">
          <Icon size={18} className="ml-[1px] text-[#202124]">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5c0 2.9-2.9 7.2-5 9.9C9.9 16.2 7 11.9 7 9a5 5 0 0 1 5-5zm0 2.5A2.5 2.5 0 1 0 12 11.5 2.5 2.5 0 0 0 12 6.5z" />
          </Icon>
          <b className="ml-[5px]">Halmstad</b>
          <span className="ml-1 text-[#70757a]">·</span>
          <span className="ml-1 text-[#1a0dab]">Välj område</span>
          <span className="ml-[20px] text-[#70757a]">⋮</span>
        </div>
        <div className="mt-[47px] w-[652px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] leading-[26px]">Företag</h2>
            <Icon size={18} className="mt-[9px] mr-[-1px] text-[#70757a]">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </Icon>
          </div>
          <div className="mt-[14px]">
            <MapArt />
          </div>
          {places.map((p, i) => (
            <PlaceRow key={p.name} p={p} last={i === places.length - 1} />
          ))}
          <div className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-[#f1f3f4] text-[14px] text-[#202124]">
            Fler företag
            <span className="text-[16px]">→</span>
          </div>
        </div>
        <div className="mt-[44px] w-[652px]">
          <PeopleAlsoAsk />
        </div>
        <div className="mt-[34px]">
          {results.map((r) => (
            <OrganicResult key={r.url} r={r} />
          ))}
        </div>
        <h2 className="mt-[11px] text-[20px] leading-[26px]">Andra söker även efter</h2>
        <div className="mt-[11px] grid w-[652px] grid-cols-2 gap-x-[17px] gap-y-[9px]">
          {related.map((t) => (
            <span key={t} className="flex h-[51px] items-center justify-between rounded-lg bg-[#f1f3f4] pr-[18px] pl-[16px] text-[16px] font-bold text-[#202124]">
              {t}
              <Icon size={20} className="text-[#9aa0a6]">
                <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </Icon>
            </span>
          ))}
        </div>
        <div className="w-[652px] pb-[64px]">
          <Pager />
        </div>
      </div>
    </div>
  );
}
