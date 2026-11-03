"use client";

import { NewExperienceShell } from "@/components/shell/new-experience-shell";
import { OldSidebar } from "@/components/shell/old-sidebar";
import { useExperience } from "@/lib/experience";

export function AppShell({ children }: { children: React.ReactNode }) {
  const experience = useExperience();

  if (experience === "old") {
    return (
      <div className="flex h-screen overflow-hidden">
        <OldSidebar />
        {children}
      </div>
    );
  }

  return <NewExperienceShell>{children}</NewExperienceShell>;
}
