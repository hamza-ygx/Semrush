import type { Snap } from "./context";

export type TrackingSearch = Promise<{ date_begin?: string; date_end?: string; prediction?: string; upd?: string; target?: string }>;

export function snapFrom(p: Awaited<TrackingSearch>, fallback?: string): Snap {
  return {
    begin: p.date_begin ?? fallback,
    end: p.date_end,
    fresh: !!p.date_end,
    hours: p.upd && /^\d{1,2}$/.test(p.upd) ? +p.upd : undefined,
  };
}
