"use client";

import { AgentspaceView } from "@/components/agentspace/agentspace-view";
import { AppShell } from "@/components/shell/app-shell";

export default function AgentspacePage() {
  return (
    <AppShell>
      <AgentspaceView />
    </AppShell>
  );
}
