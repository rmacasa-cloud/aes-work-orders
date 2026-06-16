# spec.md — Work Orders Dashboard (source of truth)

A single Next.js 14 page displaying a list of work orders with sortable columns,
a status filter, and customer search. This is the concrete target. Build to this.

## Data model

```typescript
interface WorkOrder {
  id: string;                    // "WO-2026-0142"
  customer: string;
  status: "NEW" | "SCHEDULED" | "IN_PROGRESS" | "WAITING_ON_PARTS" | "COMPLETED" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedTech: string;          // invented names, not real people
  scheduledDate: string;         // ISO date, e.g. "2026-06-12"
  hoursWorked: number;           // decimal, e.g. 4.5
}
```

## Mock data rules (20 work orders — judgment is graded here)

- **20 rows**, generated inline / in a static file. No DB.
- **Hours by status must be coherent:**
  - `NEW` → `hoursWorked` is 0
  - `SCHEDULED` → 0
  - `IN_PROGRESS` → partial, plausible (e.g. 1.5–6)
  - `WAITING_ON_PARTS` → some hours already logged (work started, then stalled)
  - `COMPLETED` → meaningful, finished amount
  - `CANCELLED` → small or 0
- **Customer names**: invented but evocative of an industrial / aerospace / defense
  / battery-testing clientele (AES serves that market). Examples of the *flavor*
  (invent your own, vary them): "Northgate Aerospace", "Cascade Battery Systems",
  "Halden Defense Labs", "Meridian Power Cells", "Brightline Avionics". Do NOT use
  real company names. No "Acme".
- **Assigned techs**: invented full names, a roster of ~6–8 reused across orders.
- **Scheduled dates**: clustered around June 2026, some past, some upcoming.
- **Spread the statuses and priorities** so filtering/sorting is visibly meaningful
  (don't make 18 of them COMPLETED).

## Functional requirements

1. **Table** — all 20 rows. Columns: ID, Customer, Status, Priority, Assigned Tech,
   Scheduled Date, Hours Worked. Use the shadcn table primitive.
2. **Sorting** — every column header clickable, toggles asc/desc. Only ONE column
   sorted at a time. The active sort column shows a visual indicator (arrow).
3. **Status filter** — a dropdown (shadcn select) above the table. "All" plus each
   status value. Filters rows by status.
4. **Customer search** — a text input above the table, case-insensitive substring
   match on customer name.
5. **Status indicator** — the Status cell shows the status text with a colored
   pill/dot. Use a sensible semantic palette:
   - COMPLETED → green, IN_PROGRESS → blue, SCHEDULED → indigo/violet,
     NEW → slate/gray, WAITING_ON_PARTS → amber, CANCELLED → red/muted.
6. **Empty state** — when filter + search produce zero rows, show a friendly message
   in place of an empty table, not just blank space.
7. **Filters compose** — status filter and search apply together (AND).

## Stylistic flourish (one tasteful touch — keep it small)

Add ONE small, cared-for detail beyond bare requirements — a clean priority
indicator is the natural pick: render `priority` as a subtle colored badge or a
small severity marker (e.g. URGENT in red, HIGH amber, MEDIUM neutral, LOW muted),
so the table communicates urgency at a glance. Keep it understated and consistent
with the status pills. Do not let this expand into a redesign.

## Out of scope (do not build)

Database, auth, multiple pages, pagination, editing rows, API routes, a backend.
Inline data + client-side sort/filter/search only.
