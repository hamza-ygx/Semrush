export type Range = { from: Date; to: Date };

const d = (m: number, day: number, y = 2026) => new Date(y, m - 1, day);

export const today = d(9, 25);

export const reportPeriod: Range = { from: d(9, 18), to: d(9, 24) };
export const comparePeriod: Range = { from: d(9, 11), to: d(9, 17) };
export const generatedOn = "September 25, 2026";

export const datePresets: { label: string; range: Range }[] = [
  { label: "Previous week (Mo-Su)", range: { from: d(9, 14), to: d(9, 20) } },
  { label: "Previous month", range: { from: d(8, 1), to: d(8, 31) } },
  { label: "Previous 3 months", range: { from: d(6, 1), to: d(8, 31) } },
  { label: "Last 2 days", range: { from: d(9, 23), to: d(9, 24) } },
  { label: "Last 7 days", range: reportPeriod },
  { label: "Last 30 days", range: { from: d(8, 26), to: d(9, 24) } },
  { label: "Previous 6 months", range: { from: d(3, 1), to: d(8, 31) } },
  { label: "Last 90 days", range: { from: d(6, 27), to: d(9, 24) } },
  { label: "Current year", range: { from: d(1, 1), to: d(9, 24) } },
  { label: "Previous year", range: { from: d(1, 1, 2025), to: d(12, 31, 2025) } },
];

export const fmtDate = (x: Date) => x.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
