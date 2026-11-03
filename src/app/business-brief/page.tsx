"use client";

import { BusinessBriefView } from "@/components/business-brief/business-brief-view";
import { AppShell } from "@/components/shell/app-shell";

export default function BusinessBriefPage() {
  return (
    <AppShell>
      <BusinessBriefView />
    </AppShell>
  );
}
