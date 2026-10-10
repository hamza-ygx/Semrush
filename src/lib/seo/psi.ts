const audits = ["largest-contentful-paint", "interaction-to-next-paint", "cumulative-layout-shift", "first-contentful-paint", "server-response-time", "total-blocking-time", "speed-index", "total-byte-weight", "dom-size"];

type Psi = {
  lighthouseResult?: { categories?: Record<string, { score: number | null }>; audits?: Record<string, { numericValue?: number; score?: number | null; title?: string; displayValue?: string; details?: { type?: string; overallSavingsMs?: number } }> };
  loadingExperience?: { overall_category?: string; metrics?: Record<string, { percentile: number; category: string }> };
  originLoadingExperience?: { overall_category?: string; metrics?: Record<string, { percentile: number; category: string }> };
};

export async function runPagespeed(url: string, strategy: "mobile" | "desktop") {
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", strategy);
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) api.searchParams.append("category", c);
  if (process.env.PAGESPEED_API_KEY) api.searchParams.set("key", process.env.PAGESPEED_API_KEY);
  const res = await fetch(api, { signal: AbortSignal.timeout(60000) });
  if (!res.ok) {
    const msg = ((await res.json().catch(() => null)) as { error?: { message?: string } } | null)?.error?.message;
    throw new Error(`PageSpeed ${res.status}: ${msg ?? res.statusText}`);
  }
  const r = (await res.json()) as Psi;
  const lh = r.lighthouseResult;
  const field = (e: Psi["loadingExperience"]) =>
    e?.metrics ? { overall: e.overall_category ?? null, metrics: Object.fromEntries(Object.entries(e.metrics).map(([k, v]) => [k, { p75: v.percentile, category: v.category }])) } : null;
  return {
    url,
    strategy,
    fetchedAt: new Date().toISOString(),
    scores: Object.fromEntries(Object.entries(lh?.categories ?? {}).map(([k, v]) => [k, v.score === null ? null : Math.round(v.score * 100)])),
    lab: Object.fromEntries(audits.map((a) => [a, lh?.audits?.[a] ? { value: lh.audits[a].numericValue ?? null, score: lh.audits[a].score ?? null, display: lh.audits[a].displayValue ?? null } : null])),
    opportunities: Object.entries(lh?.audits ?? {})
      .filter(([, a]) => a.details?.type === "opportunity" && (a.details.overallSavingsMs ?? 0) > 0)
      .map(([id, a]) => ({ id, title: a.title ?? id, savingsMs: Math.round(a.details?.overallSavingsMs ?? 0), display: a.displayValue ?? null }))
      .sort((a, b) => b.savingsMs - a.savingsMs),
    field: field(r.loadingExperience),
    originField: field(r.originLoadingExperience),
  };
}
