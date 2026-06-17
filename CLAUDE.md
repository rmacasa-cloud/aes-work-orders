# CLAUDE.md — Operating Guide

This is a small, focused take-home: a single-page Next.js 14 work-orders dashboard.
Read `spec.md` for the concrete source of truth on what to build, and `agents.md`
for how to sequence the work. This file governs HOW you operate.

## Hard rules (do not violate)

 **Stay in scope.** This is time-boxed. Build exactly what `spec.md` lists.
   Do not add a database, auth, routing beyond the single page, state management
   libraries, or extra pages. Inline/static mock data only.

## Stack (fixed)

- Next.js 14, App Router
- TypeScript — real types, no `any`
- Tailwind CSS
- shadcn/ui primitives (already installed: table, select, input, badge)

## Architecture decision (build it this way deliberately)

- The **page and data live in a Server Component** (`app/page.tsx`). It owns the
  mock data and renders the shell.
- The **interactive layer is a Client Component** (`'use client'`) that receives
  the work-order array as props and owns all sort/filter/search state.
- This server/client split is intentional and should be clearly visible in the
  file structure. Keep `'use client'` only on the component that needs it.

## Code quality bar

- Sensible file structure: types in their own file, mock data in its own file,
  components reasonably sized and single-purpose.
- Real TypeScript types derived from the `WorkOrder` interface in `spec.md`.
- Readable Tailwind, no dead code, no commented-out experiments left behind.

## Working style

- Work in the logical units listed in `agents.md`, one at a time.
- After finishing each unit, summarize what changed and stop with a suggested
  commit message. Wait for the human to commit before continuing.
- If something in the spec is ambiguous, ask rather than guessing.
