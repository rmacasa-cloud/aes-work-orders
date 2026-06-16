import { Badge } from "@/components/ui/badge";
import type { WorkOrderStatus } from "@/types/work-order";

// Semantic palette from spec.md, kept understated (50-level tint, matching
// border, 700/800-level text) so the table reads calmly at a glance.
const STATUS_STYLES: Record<WorkOrderStatus, string> = {
  NEW: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300",
  SCHEDULED:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300",
  IN_PROGRESS:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300",
  WAITING_ON_PARTS:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
  CANCELLED:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300",
};

export const STATUS_LABELS: Record<WorkOrderStatus, string> = {
  NEW: "New",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  WAITING_ON_PARTS: "Waiting on Parts",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function StatusPill({ status }: { status: WorkOrderStatus }) {
  return (
    <Badge variant="outline" className={STATUS_STYLES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
