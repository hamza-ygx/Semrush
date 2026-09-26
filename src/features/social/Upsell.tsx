import { upsell } from "./data";

function LaughingPerson() {
  return (
    <svg viewBox="0 0 441 380" width={441} height={380} aria-hidden>
      <rect width="441" height="380" fill="#d5d6d7" />
      <rect x="330" y="0" width="111" height="380" fill="#c9cacb" />
      <rect x="352" y="30" width="60" height="80" rx="2" fill="#e9ecef" />
      <path d="M352 50h60M352 70h60M372 30v80M392 30v80" stroke="#b9c7d6" strokeWidth={1} />
      <path d="M410 380c0-60 10-120 31-150v150z" fill="#2f3b2a" opacity={0.7} />
      <path d="M170 380c4-70 40-110 88-118 50 6 84 46 90 118z" fill="#f2efe9" />
      <path d="M186 110c-6-50 30-86 72-86 46 0 80 36 74 92l8 150c-20 16-40 22-60 20l-4-80z" fill="#6b4630" />
      <ellipse cx="256" cy="140" rx="54" ry="70" fill="#f0c3a3" />
      <path d="M200 120c4-50 34-70 64-70 34 0 58 24 60 60-18-24-44-34-70-30-22 4-40 20-54 40z" fill="#6b4630" />
      <path d="M186 110c2 60 6 110 10 170l30 6-8-110c-6-24-10-50-8-72z" fill="#5a3a26" />
      <path d="M228 128c6-6 14-6 20 0M270 128c6-6 14-6 20 0" fill="none" stroke="#3a2518" strokeWidth={3} strokeLinecap="round" />
      <path d="M228 162c10 30 50 32 62 0z" fill="#fff" stroke="#9c4a3a" strokeWidth={2} />
      <path d="M236 178c10 8 36 8 46 0" fill="none" stroke="#c46a5a" strokeWidth={4} />
      <rect x="236" y="200" width="40" height="44" fill="#f0c3a3" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 30 30" width={30} height={30} aria-hidden>
      <rect width="30" height="30" rx="6" fill="#2b2447" />
      <path d="M6 9.5c0-1.4 1-2.5 2.4-2.5h9.2c1.4 0 2.4 1.1 2.4 2.5v6c0 1.4-1 2.5-2.4 2.5H11l-3.5 3v-3H8.4C7 18 6 16.9 6 15.5z" fill="#b88cff" />
      <path d="M21.5 5.5c1.2-1.4 3.6-.5 3.3 1.4-.2 1.5-2.2 2.8-3.3 3.6-1.1-.8-3.1-2.1-3.3-3.6-.3-1.9 2.1-2.8 3.3-1.4z" fill="#45d6a0" />
    </svg>
  );
}

export function UpsellBanner() {
  return (
    <section className="relative mx-auto mt-[17px] h-[420px] w-[959px] overflow-hidden rounded-lg bg-[#372d5e]">
      <div className="absolute top-[20px] left-[518px] h-[400px] w-[441px] overflow-hidden rounded-tl-[24px]">
        <LaughingPerson />
      </div>
      <div className="absolute top-[68px] left-[48px] w-[340px]">
        <h2 className="text-[36px] leading-10 font-bold tracking-[-0.01em] text-white">
          <span className="bg-gradient-to-r from-[#f5b77a] to-[#f9d98a] bg-clip-text text-transparent">{upsell.title[0]}</span> {upsell.title[1]}
          <br />
          {upsell.title[2]}
        </h2>
        <p className="mt-[20px] text-[16px] leading-6 text-[#d9d4ec]">{upsell.text}</p>
        <ul className="mt-4 space-y-2 text-[14px] leading-5 text-white">
          {upsell.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="#45d6a0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
        <button type="button" className="mt-6 h-10 rounded-md bg-[#ff642d] px-4 text-[16px] font-semibold text-white hover:bg-[#f2551c]">
          {upsell.cta}
        </button>
      </div>
      {upsell.chips.map((c, i) => (
        <div
          key={c.title}
          className="absolute flex w-[260px] gap-[9px] z-10 rounded-lg bg-[#7f769f]/95 px-[12px] pt-[12px] pb-[12px]"
          style={{ left: i ? 560 : 393, top: i ? 250 : 88 }}
        >
          <ChatIcon />
          <div className="leading-4">
            <div className="text-[14px] leading-5 font-semibold text-white">{c.title}</div>
            <div className="text-[12.5px] text-white">{c.text}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
