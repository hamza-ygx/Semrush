"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRerun(projectId?: string | null) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async () => {
    if (!projectId || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/seo/crawl", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ projectId }) });
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      if (res.ok) router.refresh();
      else setError(body?.error ?? "Crawl failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Crawl failed");
    } finally {
      setBusy(false);
    }
  };
  return { enabled: !!projectId, busy, error, run };
}
