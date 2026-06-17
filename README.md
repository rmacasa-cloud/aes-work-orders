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

I used Claude Code for the high volume work of generating the twenty mock work orders and setting up the shadcn table, select, and input elements. I specified the shape of what would be realistic such as the customer rosters that read like actual aerospace customers and battery testing companies, hours that were consistent with statuses, etc. Then I just told it to go ahead and generate them all before I started typing out my own data, and through all of this I'm still deciding whether or not something is “realistic” by checking each row for accuracy.

One thing I pushed back on was sort semantics. If you simply use the obvious path and sort every column alphabetically, then the status will be sorted alphabetically too giving you Cancelled, Completed, and In Progress, which doesn’t tell an operator anything. So I had it sort status based on lifecycle (New -> Completed) and priority based on severity (Low -> Urgent), and instead of using a generic alphabetical order array, I created specific order arrays to create explicit rules when sorting these columns, therefore making this sort useful to someone who is actively triaging a queue.

If I had more time, I would mute the priority badge on completed jobs because a finished job’s urgency is no longer actionable and test the interaction of the status filter and search functionality at their point of composition because that area of the application is where the most subtle edge cases are hiding.
