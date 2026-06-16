# AES Work Orders Dashboard

A single-page dashboard for browsing field service work orders across customers
and sites. The table supports per-column sorting, status filtering, and
case-insensitive customer search, with colored status pills and priority
indicators so the queue reads at a glance. Intentionally simple UI for readability
and clarity.

Data is 20 inline mock work orders — there is no backend. All sorting, filtering,
and search run client-side.

## Stack

- **Next.js** (App Router) + **React**
- **TypeScript** (strict, no `any`)
- **Tailwind CSS**
- **shadcn/ui** primitives (table, select, input, badge)

## Architecture

The page is split deliberately across the server/client boundary:

- **`app/page.tsx`** is a **Server Component**. It owns the mock data and renders
  the page shell, passing the work-order array down as props.
- **`components/work-orders-table.tsx`** is the **Client Component**
  (`'use client'`). It receives the data and owns all interactive state — sort
  column and direction, status filter, and search query.

Presentational pieces (`StatusPill`, `PriorityBadge`) are plain components used by
both. Types live in `types/`, mock data in `data/`.

## Running locally

Requires **Node.js 20+**.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm start        # serve the production build
npm run lint     # run ESLint
```

## Reflection

<!--
~200 words, in the author's own voice. Placeholder — replace the line below.
Optional things to touch on (delete this comment when done):
  - key design decisions / trade-offs (e.g. the server/client split, sorting
    status & priority by domain order rather than alphabetically)
  - what you'd add or change with more time
  - anything intentionally left out of scope
-->

_TODO: ~200-word reflection goes here._
