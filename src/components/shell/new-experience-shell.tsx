"use client";

import { SidebarInset, SidebarProvider } from "@ciq-dev/ciq-design-system";
import type { CSSProperties } from "react";

import { NewSidebar } from "@/components/shell/new-sidebar";
import { SidebarWidthLock } from "@/components/shell/sidebar-width-lock";
import { useClientMounted } from "@/lib/experience";
import { NEW_SIDEBAR_WIDTH, syncNewExperienceSidebarWidth } from "@/lib/sidebar-width";

function NewExperienceShellPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className="dark shrink-0 border-r border-sidebar-border bg-sidebar"
        style={{ width: NEW_SIDEBAR_WIDTH }}
        aria-hidden
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}

function NewExperienceShellReady({ children }: { children: React.ReactNode }) {
  syncNewExperienceSidebarWidth();

  return (
    <SidebarProvider
      className="flex h-screen w-full overflow-hidden"
      style={{ "--sidebar-width": NEW_SIDEBAR_WIDTH } as CSSProperties}
    >
      <SidebarWidthLock />
      <NewSidebar />
      <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export function NewExperienceShell({ children }: { children: React.ReactNode }) {
  const mounted = useClientMounted();
  if (!mounted) {
    return <NewExperienceShellPlaceholder>{children}</NewExperienceShellPlaceholder>;
  }
  return <NewExperienceShellReady>{children}</NewExperienceShellReady>;
}
