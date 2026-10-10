import { googleAccessToken, gscConfigured } from "./gsc";

export const ga4Configured = () => gscConfigured();

type Report = { dimensionHeaders?: { name: string }[]; metricHeaders?: { name: string }[]; rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] };

async function runReport(property: string, body: object) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(property)}:runReport`, {
    method: "POST",
    headers: { authorization: `Bearer ${await googleAccessToken("https://www.googleapis.com/auth/analytics.readonly")}`, "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const msg = ((await res.json().catch(() => null)) as { error?: { message?: string } } | null)?.error?.message;
    throw new Error(`Google Analytics ${res.status}: ${msg ?? res.statusText}`);
  }
  const r = (await res.json()) as Report;
  const dims = (r.dimensionHeaders ?? []).map((h) => h.name);
  const mets = (r.metricHeaders ?? []).map((h) => h.name);
  return (r.rows ?? []).map((row) => ({
    ...Object.fromEntries(dims.map((d, i) => [d, row.dimensionValues[i]?.value ?? ""])),
    ...Object.fromEntries(mets.map((m, i) => [m, Number(row.metricValues[i]?.value ?? 0)])),
  }));
}

const core = ["sessions", "totalUsers", "newUsers", "screenPageViews", "engagedSessions", "averageSessionDuration", "bounceRate", "engagementRate"].map((name) => ({ name }));
const range28 = [{ startDate: "28daysAgo", endDate: "yesterday", name: "current" }, { startDate: "56daysAgo", endDate: "29daysAgo", name: "previous" }];
const dims = (...names: string[]) => names.map((name) => ({ name }));

export async function fetchGa4(property: string) {
  const id = property.replace(/^properties\//, "");
  if (!/^\d+$/.test(id)) throw new Error("GA4 property ID must be a number");
  const [daily, channels, monthlyChannels, countries, pages, landing, devices, sources, countryDevices, monthlyCountries] = await Promise.all([
    runReport(id, { dateRanges: [{ startDate: "485daysAgo", endDate: "yesterday" }], dimensions: dims("date"), metrics: core, orderBys: [{ dimension: { dimensionName: "date" } }], limit: 1000 }),
    runReport(id, { dateRanges: range28, dimensions: dims("sessionDefaultChannelGroup"), metrics: core, limit: 100 }),
    runReport(id, { dateRanges: [{ startDate: "395daysAgo", endDate: "yesterday" }], dimensions: dims("yearMonth", "sessionDefaultChannelGroup"), metrics: dims("sessions", "totalUsers"), limit: 1000 }),
    runReport(id, { dateRanges: range28, dimensions: dims("country", "countryId"), metrics: core, orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 250 }),
    runReport(id, { dateRanges: range28, dimensions: dims("hostName", "pagePath", "pageTitle"), metrics: dims("screenPageViews", "totalUsers", "averageSessionDuration", "engagementRate"), orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 500 }),
    runReport(id, { dateRanges: range28, dimensions: dims("landingPage"), metrics: core, orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 500 }),
    runReport(id, { dateRanges: range28, dimensions: dims("deviceCategory"), metrics: core, limit: 10 }),
    runReport(id, { dateRanges: range28, dimensions: dims("sessionSource", "sessionMedium"), metrics: core, orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 250 }),
    runReport(id, { dateRanges: [range28[0]], dimensions: dims("countryId", "deviceCategory"), metrics: dims("sessions", "totalUsers"), limit: 1000 }),
    runReport(id, { dateRanges: [{ startDate: "395daysAgo", endDate: "yesterday" }], dimensions: dims("yearMonth", "countryId"), metrics: dims("sessions", "totalUsers"), limit: 5000 }),
  ]);
  const fixDate = (rows: Record<string, unknown>[]) => rows.map((r) => ({ ...r, date: typeof r.date === "string" ? `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}` : r.date }));
  return { daily: fixDate(daily), channels, monthlyChannels, countries, pages, landing, devices, sources, countryDevices, monthlyCountries };
}
