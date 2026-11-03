# Process guide: jumpstarting a CommerceIQ frontend prototype

This is the repeatable checklist for spinning up a new Next.js prototype that follows the CommerceIQ design system. Copy this whole `ciq-prototype-template` folder's contents into every new prototype and work through the steps below in order.

## 0. Confirm prerequisites (once per machine, not per project)

Run these checks before starting. These are verification commands only — see the linked official docs if something is missing or out of date.

| Check | Command | Official docs |
|---|---|---|
| Node.js installed | `node -v` && `npm -v` | [nodejs.org/en/download](https://nodejs.org/en/download) |
| Git installed | `git --version` | [git-scm.com/downloads](https://git-scm.com/downloads) |
| Git identity configured | `git config --get user.name` && `git config --get user.email` | [First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) |
| GitHub CLI logged in (if you use `gh`) | `gh auth status` | [gh auth status](https://cli.github.com/manual/gh_auth_status) |
| SSH auth to GitHub (if you use SSH remotes) | see docs | [Testing your SSH connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection) |

## 1. Scaffold the Next.js app

```bash
npx create-next-app@latest my-prototype-name \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --src-dir \
  --import-alias "@/*"

cd my-prototype-name
```

Answer the prompts to match your team's usual conventions if `create-next-app` asks anything not covered by the flags above.

## 2. Install the design system

```bash
npm install @ciq-dev/ciq-design-system
```

Import the precompiled styles **once**, in your root layout (`src/app/layout.tsx`), above any other global stylesheet import:

```tsx
import "@ciq-dev/ciq-design-system/styles";
import "./globals.css";
```

Use components from the single export surface:

```tsx
import { Button, Input, Badge } from "@ciq-dev/ciq-design-system";

export function Example() {
  return (
    <div>
      <Button intent="task">Assign to Blake</Button>
      <Input placeholder="Search..." />
    </div>
  );
}
```

## 3. Confirm Tailwind is wired to the design system tokens

The design system is itself built on Tailwind + shadcn/ui, so this project's `tailwind.config.ts` should extend (not replace) the design system's token set — colors, spacing, radius, shadows. If the package publishes a Tailwind preset or token export, reference it in `tailwind.config.ts` instead of re-declaring brand colors by hand. If it doesn't expose one yet, hand-copy the token values from `instructions.md`'s quick reference and keep them in one place (e.g. `tailwind.config.ts` theme.extend) rather than scattering hex codes through components.

## 4. Add shadcn/ui only when you need a primitive the design system doesn't export

The design system already wraps shadcn/ui for components like Button. Don't run `shadcn init` speculatively — only pull in shadcn when a specific primitive is missing from `@ciq-dev/ciq-design-system`'s exports:

```bash
npx shadcn@latest init
npx shadcn@latest add <component>
```

Then re-skin the generated component with the design system's tokens (colors, radius, shadows, type scale) instead of leaving shadcn's default theme — see `instructions.md` for the rule on this.

## 5. Drop in the instruction files

Copy these two files from this template into the new project's root:

- `product-context.md` — what this prototype is and who it's for. Fill in the "This prototype" section at the bottom before you start building.
- `instructions.md` — the working rules for whoever (human or AI agent) builds in this repo: design-system-first styling, minimal-diff changes, and UX/visual design principles to check against.

If you're working with an AI coding agent that auto-loads a specific filename (for example Claude Code looks for `CLAUDE.md`), duplicate or rename `instructions.md` accordingly so it's picked up automatically.

## 6. Initialize git

```bash
git init
git add .
git commit -m "Initial scaffold: Next.js + CIQ design system"
```

Add a remote and push once you've created the repo on GitHub, if this prototype needs to be shared:

```bash
git remote add origin <repo-url>
git push -u origin main
```

## 7. Start building

```bash
npm run dev
```

Build against `product-context.md` for what you're making and `instructions.md` for how to make it.
