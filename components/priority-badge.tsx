import { Badge } from "@/components/ui/badge";
import type { WorkOrderPriority } from "@/types/work-order";

// Understated severity palette (spec.md): URGENT red, HIGH amber, MEDIUM
// neutral, LOW muted — so urgent work pops while routine work stays quiet.
// HIGH/URGENT reuse the status pills' amber/red tints for visual consistency;
// LOW is a plain outline chip, MEDIUM a soft neutral fill.
const PRIORITY_STYLES: Record<WorkOrderPriority, string> = {
  LOW: "text-muted-foreground",
  MEDIUM:
    "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  HIGH: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
  URGENT:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300",
};

const PRIORITY_LABELS: Record<WorkOrderPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export function PriorityBadge({ priority }: { priority: WorkOrderPriority }) {
  return (
    <Badge variant="outline" className={PRIORITY_STYLES[priority]}>
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}
