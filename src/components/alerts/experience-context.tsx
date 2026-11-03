"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type AlertsExperience = "ally" | "legacy";

const STORAGE_KEY = "alerts-ui-experience";

type ExperienceContextValue = {
  experience: AlertsExperience;
  setExperience: (value: AlertsExperience) => void;
  isAlly: boolean;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

const listeners = new Set<() => void>();

function readStoredExperience(): AlertsExperience {
  if (typeof window === "undefined") return "ally";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "legacy" ? "legacy" : "ally";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const experience = useSyncExternalStore(
    subscribe,
    readStoredExperience,
    () => "ally" as AlertsExperience,
  );

  const setExperience = useCallback((value: AlertsExperience) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    notify();
  }, []);

  const value = useMemo(
    () => ({
      experience,
      setExperience,
      isAlly: experience === "ally",
    }),
    [experience, setExperience],
  );

  return (
    <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
  );
}

export function useAlertsExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useAlertsExperience must be used within ExperienceProvider");
  }
  return ctx;
}
