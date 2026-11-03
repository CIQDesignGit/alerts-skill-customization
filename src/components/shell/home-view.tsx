"use client";

import { NewAlertsView } from "@/components/new-experience/new-alerts-view";
import { OldAlertsView } from "@/components/old-experience/old-alerts-view";
import { useExperience } from "@/lib/experience";

export function HomeView() {
  const experience = useExperience();
  return experience === "old" ? <OldAlertsView /> : <NewAlertsView />;
}
