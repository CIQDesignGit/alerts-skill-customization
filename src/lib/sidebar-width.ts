/** @ciq-dev/ciq-design-system default expanded width. */
export const CIQ_SIDEBAR_DEFAULT_WIDTH_PX = 380;

/** Open sidebar width: 20% narrower than the design-system default. */
export const NEW_SIDEBAR_WIDTH_PX = Math.round(CIQ_SIDEBAR_DEFAULT_WIDTH_PX * 0.8);

export const NEW_SIDEBAR_WIDTH = `${NEW_SIDEBAR_WIDTH_PX}px`;

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/** Run synchronously before `SidebarProvider` mounts so open width is correct on first paint. */
export function syncNewExperienceSidebarWidth() {
  if (typeof window === "undefined") return;

  localStorage.setItem("sidebar_width", NEW_SIDEBAR_WIDTH);

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
    ?.slice(SIDEBAR_COOKIE_NAME.length + 1);

  if (!raw) return;

  try {
    const states = JSON.parse(decodeURIComponent(raw)) as Record<
      string,
      { open?: boolean; openMobile?: boolean; sidebarWidth?: string }
    >;
    let changed = false;
    for (const id of Object.keys(states)) {
      if (states[id]?.sidebarWidth !== NEW_SIDEBAR_WIDTH) {
        states[id] = { ...states[id], sidebarWidth: NEW_SIDEBAR_WIDTH };
        changed = true;
      }
    }
    if (changed) {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(states))}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
  } catch {
    /* legacy cookie shape */
  }
}
