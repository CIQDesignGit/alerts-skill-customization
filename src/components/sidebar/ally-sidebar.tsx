"use client";

import {
  Clock,
  Gauge,
  Home,
  LayoutGrid,
  MessageSquare,
  PanelLeft,
  Sparkles,
  Wand2,
} from "lucide-react";

import { ExperienceToggle } from "@/components/alerts/experience-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "For You", icon: Home, active: true, count: 4 },
  { label: "Ask Ally", icon: MessageSquare, count: 3 },
];

const WORKSPACE = [
  { label: "Business Brief", icon: Gauge, delta: "-6.8%" },
  { label: "Dashboards", icon: LayoutGrid, count: 5 },
  { label: "Scheduled", icon: Clock, count: 3 },
];

export function AllySidebar() {
  return (
    <aside className="flex h-full w-55 shrink-0 flex-col bg-[#0e1129] text-white">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand-500">
            <Sparkles className="size-4 text-white" aria-hidden />
          </div>
          <span className="text-lg font-semibold tracking-tight">Ally</span>
        </div>
        <div className="flex items-center gap-1 text-white/60">
          <button type="button" aria-label="Assist" className="rounded p-1 hover:bg-white/10">
            <Wand2 className="size-4" />
          </button>
          <button type="button" aria-label="Collapse" className="rounded p-1 hover:bg-white/10">
            <PanelLeft className="size-4" />
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-3" aria-label="Ally">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm",
                item.active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5",
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.count != null ? (
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-[11px] font-semibold",
                    item.active ? "bg-fuchsia-500 text-white" : "text-white/50",
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto px-3">
        <div className="mb-2 flex items-center justify-between px-1">
          <p className="text-[10px] font-semibold tracking-wider text-violet-300/80 uppercase">
            Insights
          </p>
          <button type="button" className="text-[10px] text-violet-300/90">
            + New
          </button>
        </div>
        {WORKSPACE.slice(0, 1).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.delta ? (
                <span className="rounded-full bg-rose-950/80 px-2 py-0.5 text-[10px] font-medium text-rose-200">
                  {item.delta}
                </span>
              ) : null}
            </button>
          );
        })}

        <p className="mt-4 mb-2 px-1 text-[10px] font-semibold tracking-wider text-violet-300/80 uppercase">
          My workspace
        </p>
        {WORKSPACE.slice(1).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count != null ? (
                <span className="text-xs text-white/45">{item.count}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="shrink-0 px-3 pb-2">
        <div className="rounded-xl bg-[#070a1f] px-3 py-3 ring-1 ring-white/10">
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
            Ally is working
          </p>
          <p className="mt-1 text-xs text-white/55">5 shelf fixes on autopilot</p>
        </div>
      </div>

      <ExperienceToggle variant="ally" />
    </aside>
  );
}
