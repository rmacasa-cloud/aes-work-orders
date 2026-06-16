export type WorkOrderStatus =
  | "NEW"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "WAITING_ON_PARTS"
  | "COMPLETED"
  | "CANCELLED";

export type WorkOrderPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface WorkOrder {
  /** Display identifier, e.g. "WO-2026-0142". */
  id: string;
  customer: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  /** Invented technician name; a small roster is reused across orders. */
  assignedTech: string;
  /** ISO date (YYYY-MM-DD). */
  scheduledDate: string;
  /** Decimal hours logged. Coherent with status (NEW/SCHEDULED are 0). */
  hoursWorked: number;
}
