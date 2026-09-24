export function Flag({ code }: { code: string }) {
  const box = "block h-[11px] w-[16px] shrink-0 overflow-hidden rounded-[1px]";
  if (code === "US")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#fff" />
        {[0, 2, 4, 6, 8, 10].map((y) => (
          <rect key={y} y={y * 0.85 + 0.1} width="16" height="0.85" fill="#d22f3c" />
        ))}
        <rect width="7" height="6" fill="#3c3b6e" />
      </svg>
    );
  if (code === "ES")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#c60b1e" />
        <rect y="2.75" width="16" height="5.5" fill="#ffc400" />
      </svg>
    );
  if (code === "UK")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#012169" />
        <path d="M0 0l16 11M16 0 0 11" stroke="#fff" strokeWidth="2.2" />
        <path d="M0 0l16 11M16 0 0 11" stroke="#c8102e" strokeWidth="0.8" />
        <path d="M8 0v11M0 5.5h16" stroke="#fff" strokeWidth="3.2" />
        <path d="M8 0v11M0 5.5h16" stroke="#c8102e" strokeWidth="1.8" />
      </svg>
    );
  if (code === "FR")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#fff" />
        <rect width="5.3" height="11" fill="#1f3fa8" />
        <rect x="10.7" width="5.3" height="11" fill="#e1242f" />
      </svg>
    );
  if (code === "DE")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="3.7" fill="#111" />
        <rect y="3.7" width="16" height="3.7" fill="#dd1c1c" />
        <rect y="7.3" width="16" height="3.7" fill="#ffce00" />
      </svg>
    );
  return <span className={`${box} bg-rk-border`} />;
}
