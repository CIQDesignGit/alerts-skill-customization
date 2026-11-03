"use client";

import { useSidebar } from "@ciq-dev/ciq-design-system";
import { useLayoutEffect, useRef } from "react";

import { NEW_SIDEBAR_WIDTH, NEW_SIDEBAR_WIDTH_PX } from "@/lib/sidebar-width";

/** Keeps expanded sidebar at the prototype width (persists via design-system storage). */
export function SidebarWidthLock() {
  const { sidebarWidth, setSidebarWidth } = useSidebar();
  const locked = useRef(false);

  useLayoutEffect(() => {
    if (locked.current) return;
    if (Math.round(parseFloat(sidebarWidth)) !== NEW_SIDEBAR_WIDTH_PX) {
      setSidebarWidth(NEW_SIDEBAR_WIDTH);
    }
    locked.current = true;
  }, [sidebarWidth, setSidebarWidth]);

  return null;
}
