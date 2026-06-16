"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { StatusPill } from "@/components/status-pill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type {
  WorkOrder,
  WorkOrderPriority,
  WorkOrderStatus,
} from "@/types/work-order";

type SortDirection = "asc" | "desc";

type Column = {
  key: keyof WorkOrder;
  label: string;
  numeric?: boolean;
  cell: (order: WorkOrder) => ReactNode;
};

const COLUMNS: Column[] = [
  {
    key: "id",
    label: "ID",
    cell: (order) => <span className="font-mono text-xs">{order.id}</span>,
  },
  {
    key: "customer",
    label: "Customer",
    cell: (order) => <span className="font-medium">{order.customer}</span>,
  },
  {
    key: "status",
    label: "Status",
    cell: (order) => <StatusPill status={order.status} />,
  },
  {
    key: "priority",
    label: "Priority",
    cell: (order) => order.priority,
  },
  {
    key: "assignedTech",
    label: "Assigned Tech",
    cell: (order) => order.assignedTech,
  },
  {
    key: "scheduledDate",
    label: "Scheduled Date",
    cell: (order) => order.scheduledDate,
  },
  {
    key: "hoursWorked",
    label: "Hours Worked",
    numeric: true,
    cell: (order) => order.hoursWorked,
  },
];

// Status and priority sort by domain order (lifecycle / severity) rather than
// alphabetically, so sorting those columns is actually meaningful.
const STATUS_RANK: Record<WorkOrderStatus, number> = {
  NEW: 0,
  SCHEDULED: 1,
  IN_PROGRESS: 2,
  WAITING_ON_PARTS: 3,
  COMPLETED: 4,
  CANCELLED: 5,
};

const PRIORITY_RANK: Record<WorkOrderPriority, number> = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  URGENT: 3,
};

function sortValue(order: WorkOrder, key: keyof WorkOrder): string | number {
  switch (key) {
    case "status":
      return STATUS_RANK[order.status];
    case "priority":
      return PRIORITY_RANK[order.priority];
    case "hoursWorked":
      return order.hoursWorked;
    case "customer":
    case "assignedTech":
      return order[key].toLowerCase();
    default:
      // id and scheduledDate (ISO) both sort correctly as plain strings.
      return order[key];
  }
}

function ariaSort(
  active: boolean,
  direction: SortDirection
): "ascending" | "descending" | "none" {
  if (!active) return "none";
  return direction === "asc" ? "ascending" : "descending";
}

export function WorkOrdersTable({ orders }: { orders: WorkOrder[] }) {
  const [sortKey, setSortKey] = useState<keyof WorkOrder | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedOrders = useMemo(() => {
    if (!sortKey) return orders;
    const direction = sortDirection === "asc" ? 1 : -1;
    return [...orders].sort((a, b) => {
      const aValue = sortValue(a, sortKey);
      const bValue = sortValue(b, sortKey);
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return String(aValue).localeCompare(String(bValue)) * direction;
    });
  }, [orders, sortKey, sortDirection]);

  function toggleSort(key: keyof WorkOrder) {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((column) => {
              const active = column.key === sortKey;
              return (
                <TableHead
                  key={column.key}
                  aria-sort={ariaSort(active, sortDirection)}
                  className={column.numeric ? "text-right" : undefined}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(column.key)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1.5 rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {column.label}
                    <SortIcon active={active} direction={sortDirection} />
                  </button>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id}>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.key}
                  className={
                    column.numeric ? "text-right tabular-nums" : undefined
                  }
                >
                  {column.cell(order)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SortIcon({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  if (!active) {
    return <ArrowUpDown className="size-3.5" aria-hidden="true" />;
  }
  return direction === "asc" ? (
    <ArrowUp className="size-3.5" aria-hidden="true" />
  ) : (
    <ArrowDown className="size-3.5" aria-hidden="true" />
  );
}
