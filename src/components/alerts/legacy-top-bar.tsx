"use client";

import {
  BarChart3,
  Bell,
  Bot,
  ChevronRight,
  CircleHelp,
  Download,
  Home,
  Lightbulb,
  MessageCircleWarning,
  Rocket,
} from "lucide-react";

import { Button } from "@ciq-dev/ciq-design-system";

const utilities = [
  { icon: Bot, label: "Agent status", dot: "success" as const },
  { icon: Bell, label: "Notifications", dot: "alert" as const },
  { icon: CircleHelp, label: "Help" },
  { icon: Lightbulb, label: "Tips" },
  { icon: Download, label: "Downloads" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Rocket, label: "Updates", dot: "alert" as const },
  { icon: MessageCircleWarning, label: "Feedback" },
];

export function LegacyTopBar() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-slate-500">
        <Home className="size-4" aria-hidden />
        <ChevronRight className="size-3.5 text-slate-300" />
        <span>Agents</span>
      </nav>
      <div className="flex items-center gap-0.5">
        {utilities.map(({ icon: Icon, label, dot }) => (
          <Button key={label} variant="ghost" size="icon" className="relative size-9 text-slate-500">
            <Icon className="size-4" />
            <span className="sr-only">{label}</span>
            {dot === "alert" ? (
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-rose-500" />
            ) : null}
            {dot === "success" ? (
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-emerald-500" />
            ) : null}
          </Button>
        ))}
        <div className="ml-2 size-8 rounded-full bg-slate-200" aria-label="User profile" />
      </div>
    </header>
  );
}
