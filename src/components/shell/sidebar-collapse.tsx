"use client";

import { useSidebar } from "@ciq-dev/ciq-design-system";

/** Click anywhere on the sidebar chrome (except links/buttons) to expand or collapse. */
export function SidebarToggleSurfaces() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      className="absolute inset-0 z-0 cursor-pointer border-0 bg-transparent p-0"
      onClick={toggleSidebar}
    />
  );
}

export function ExpandedOnly({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  if (state === "collapsed") return null;
  return children;
}

export function CollapsedOnly({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  if (state !== "collapsed") return null;
  return children;
}

export function useSidebarCollapsed() {
  const { state } = useSidebar();
  return state === "collapsed";
}
