"use client";

import { useSyncExternalStore } from "react";

let loading = false;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function startDbLoading(ms = 1400) {
  clearTimeout(timer);
  loading = true;
  emit();
  timer = setTimeout(() => {
    loading = false;
    emit();
  }, ms);
}

export function useDbLoading() {
  return useSyncExternalStore(
    subscribe,
    () => loading,
    () => false,
  );
}
