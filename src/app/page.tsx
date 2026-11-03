"use client";

import { AppShell } from "@/components/shell/app-shell";
import { HomeView } from "@/components/shell/home-view";

export default function Home() {
  return (
    <AppShell>
      <HomeView />
    </AppShell>
  );
}
