import { AgentCard } from "@/components/agentspace/agent-card";
import { LegacyChromeHeader } from "@/components/agentspace/legacy-chrome-header";
import { AGENT_PROFILES } from "@/lib/agentspace-data";

export function AgentspaceView() {
  return (
    <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-slate-100">
      <LegacyChromeHeader />

      <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="space-y-3">
            <h1 className="type-heading text-fg-primary">Meet your AI teammates</h1>
            <p className="max-w-3xl type-body text-fg-secondary">
              Agents empower your business through smart automation, delivering actionable insights
              and recommendations across Retail Media Management, Digital Shelf Analytics, and
              Enterprise Sales Management.
            </p>
          </div>

          <div className="grid gap-6 pt-4 md:grid-cols-2">
            {AGENT_PROFILES.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
