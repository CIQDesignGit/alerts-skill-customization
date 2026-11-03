# Design instructions

These rules apply to every page and component in this project unless the user explicitly says otherwise.

> **Note for AI:** A Cursor rule in `.cursor/rules/design-instructions.mdc` mirrors this file. Update both when rules change.

---

## Component library (design-system first)

- Prefer **`@ciq-dev/ciq-design-system`** for UI (Button, Input, Badge, tables, etc.).
- Import from the package export surface: `import { Button } from "@ciq-dev/ciq-design-system"`.
- Global styles: `@ciq-dev/ciq-design-system/styles` in `src/app/layout.tsx` (before `./globals.css`).
- Do **not** run `shadcn init` until you need a primitive the design system does not export. Then re-skin with CIQ tokens.

---

## Icons

- **Lucide React** only. Example: `import { Bell } from "lucide-react"`.

---

## Colors

- Use Tailwind semantic tokens (`bg-canvas`, `text-fg-primary`, `bg-brand-500`, `slate-*`).
- **Slate** is the neutral palette. Do not use `zinc-*`.
- No raw hex in components.

---

## Images

- Placeholders: `https://placehold.co/{width}x{height}`.

---

## Gradients

- Do not add gradients unless the user asks.

---

## Styling

- Tailwind CSS 4 utilities only.
- Typography roles: `type-heading`, `type-body`, `type-label`, etc. (see `src/styles/ciq-theme.css`).
- Fonts: **Inter** (UI), **JetBrains Mono** (code/data) via `layout.tsx`.

---

## Layout

- Add an AppShell when the prototype needs RCA-style chrome (sidebar + main). Until then, keep pages simple.
- Keep route files under ~300 lines; extract into `src/components/`.

---

## Code quality

- Interactive pages: `"use client"` when using hooks or browser APIs.
- No inline styles.
- Keep components focused; split when they grow past ~150 lines.

---

## Related files

| File | Purpose |
| --- | --- |
| `product-context.md` | What to build and domain rules |
| `processguide.md` | How this repo was scaffolded |
| `src/styles/ciq-theme.css` | CIQ Tailwind theme + type utilities |
| `src/app/layout.tsx` | Fonts + design system styles |
