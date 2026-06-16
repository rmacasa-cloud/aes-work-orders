# agents.md — Build Sequence & Commit Boundaries

Build in these units, in order. After each unit: summarize what changed, then STOP
and output `Ready to commit: <message>`. Do NOT commit yourself — the human (rmacasa-cloud)
reviews and commits each unit by hand. Wait for them to say "continue" before the next unit.

The Next.js scaffold and shadcn install are already done and already committed by the
human. Start from a working app with shadcn primitives present.

## Unit 1 — Types + mock data
- `types/work-order.ts`: the `WorkOrder` interface and the status/priority union types.
- `data/work-orders.ts`: 20 mock orders following all realism rules in `spec.md`.
- Ready to commit: `feat: add WorkOrder types and mock data`

## Unit 2 — Static table render (server component)
- `app/page.tsx` as a Server Component: imports the data, renders the shell, and
  passes the data into the (next) client component. For this unit a basic table
  render of all 20 rows / 7 columns is enough.
- Ready to commit: `feat: render work orders table`

## Unit 3 — Status pills
- Status cell renders the colored pill per the palette in `spec.md`.
- Ready to commit: `feat: add status indicator pills`

## Unit 4 — Client interactivity: sorting
- Extract the interactive table into a `'use client'` component receiving data as props.
- Clickable headers, asc/desc toggle, single active column, arrow indicator.
- Ready to commit: `feat: add column sorting`

## Unit 5 — Status filter
- shadcn select above the table, "All" + each status, filters rows.
- Ready to commit: `feat: add status filter dropdown`

## Unit 6 — Customer search
- Text input, case-insensitive substring on customer; composes with the filter.
- Ready to commit: `feat: add customer search`

## Unit 7 — Empty state
- Friendly message when filter + search yield zero rows.
- Ready to commit: `feat: add empty state for no results`

## Unit 8 — Priority flourish + polish
- The priority badge described in `spec.md`. Minor spacing/readability cleanup only.
- Ready to commit: `feat: add priority indicators and polish`

## Unit 9 — README + reflection (human writes the reflection)
- You may scaffold the README structure, but the 200-word reflection is written by
  the human in their own voice. Leave a clear placeholder; do not write it for them.
- Ready to commit: `docs: add README and reflection`

## Reminders
- Never run git. Never add Co-Authored-By or AI-attribution lines.
- Keep `'use client'` only on the interactive component.
- Stop at every boundary. One unit at a time.
