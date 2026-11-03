"use client";

import {
  Atom,
  Building2,
  ChevronsLeft,
  FileText,
  Lightbulb,
  Mail,
  Sparkles,
  Star,
} from "lucide-react";

import { ExperienceToggle } from "@/components/alerts/experience-toggle";
import { cn } from "@/lib/utils";

const WORKSPACE = [
  { label: "Command Center", icon: Atom },
  { label: "Business Overview", icon: Building2 },
  { label: "Recommendations", icon: Lightbulb },
  { label: "Agentspace", icon: Sparkles },
  { label: "News Feed & Alerts", icon: Mail, active: true, badge: "NEW" as const },
  { label: "Reports", icon: FileText, badge: "NEW" as const },
];

const FOOTER = [
  { label: "Tools and Settings", icon: Sparkles },
  { label: "Chrome Plugin", icon: Sparkles },
];

export function LegacySidebar() {
  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col bg-shell text-shell-foreground">
      <button
        type="button"
        aria-label="Collapse sidebar"
        className="absolute top-2.5 -right-3.5 z-10 flex size-7 items-center justify-center rounded-full bg-shell-accent text-white shadow-md"
      >
        <ChevronsLeft className="size-3.5" />
      </button>

      <div className="flex h-14 items-center px-4">
        <span className="text-lg font-semibold tracking-tight">
          Commerce<span className="text-shell-accent">IQ</span>
        </span>
      </div>

      <div className="px-3 pb-3">
        <p className="mb-1.5 text-[10px] font-medium tracking-wide text-shell-muted uppercase">
          Region &amp; Retailer
        </p>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md bg-shell-elevated px-2.5 py-2 text-left text-sm hover:bg-shell-hover"
        >
          <span aria-hidden>🇺🇸</span>
          <span className="flex-1 truncate font-medium">US Amazon</span>
        </button>
        <div className="mt-3 rounded-md border border-shell-border bg-shell-elevated px-2.5 py-2 text-sm text-shell-muted">
          Search for SKUs
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3">
        <p className="px-1 text-[10px] font-semibold tracking-wider text-shell-section uppercase">
          My Workspace
        </p>
        <p className="mt-1 mb-2 flex items-center gap-1 px-1 text-[10px] text-shell-muted">
          <Star className="size-3 fill-shell-section text-shell-section" />
          Star any page for easy access
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="My Workspace">
          {WORKSPACE.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm",
                  item.active
                    ? "bg-shell-accent text-white"
                    : "text-shell-foreground/90 hover:bg-shell-hover",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {["Strategy & planning", "Digital shelf", "Supply chain"].map((section) => (
          <div key={section} className="mt-4">
            <p className="px-1 text-[10px] font-semibold tracking-wider text-cyan-400/90 uppercase">
              {section}
            </p>
            <div className="mt-1 h-8 rounded-md bg-shell-elevated/50" aria-hidden />
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-shell-border px-3 py-2">
        {FOOTER.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-shell-muted hover:bg-shell-hover hover:text-shell-foreground"
          >
            {item.label}
          </button>
        ))}
      </div>

      <ExperienceToggle variant="legacy" />
    </aside>
  );
}
