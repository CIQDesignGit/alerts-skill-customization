"use client";

import { useSyncExternalStore } from "react";

export type Experience = "new" | "old";

const STORAGE_KEY = "ciq-experience";
const listeners = new Set<() => void>();

function read(): Experience {
  return window.localStorage.getItem(STORAGE_KEY) === "old" ? "old" : "new";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function setExperience(next: Experience) {
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

/** Persists across reloads; the server always renders the new experience. */
export function useExperience(): Experience {
  return useSyncExternalStore(subscribe, read, () => "new");
}

/** False during SSR and the first client paint (avoids hydration mismatches). */
export function useClientMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
