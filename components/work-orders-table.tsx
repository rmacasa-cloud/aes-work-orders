"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { PriorityBadge } from "@/components/priority-badge";
import { STATUS_LABELS, StatusPill } from "@/components/status-pill";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
type StatusFilter = WorkOrderStatus | "ALL";

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
    cell: (order) => <PriorityBadge priority={order.priority} />,
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

// Canonical domain orderings: status by lifecycle, priority by severity. Used
// both to sort those columns meaningfully (not alphabetically) and to order the
// status filter's options.
const STATUS_ORDER: WorkOrderStatus[] = [
  "NEW",
  "SCHEDULED",
  "IN_PROGRESS",
  "WAITING_ON_PARTS",
  "COMPLETED",
  "CANCELLED",
];

const PRIORITY_ORDER: WorkOrderPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

function sortValue(order: WorkOrder, key: keyof WorkOrder): string | number {
  switch (key) {
    case "status":
      return STATUS_ORDER.indexOf(order.status);
    case "priority":
      return PRIORITY_ORDER.indexOf(order.priority);
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = orders.filter((order) => {
      const matchesStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      const matchesSearch =
        query === "" || order.customer.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
    if (!sortKey) return filtered;
    const direction = sortDirection === "asc" ? 1 : -1;
    // filtered is a fresh array from .filter(), so sorting it in place is safe.
    return filtered.sort((a, b) => {
      const aValue = sortValue(a, sortKey);
      const bValue = sortValue(b, sortKey);
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return String(aValue).localeCompare(String(bValue)) * direction;
    });
  }, [orders, statusFilter, search, sortKey, sortDirection]);

  function toggleSort(key: keyof WorkOrder) {
    if (key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search customers…"
          aria-label="Search by customer name"
          className="w-full sm:w-64"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as StatusFilter)}
        >
          <SelectTrigger className="w-full sm:w-52" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            {STATUS_ORDER.map((status) => (
              <SelectItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground sm:ml-auto">
          Showing {visibleOrders.length} of {orders.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
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
            {visibleOrders.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={COLUMNS.length}
                  className="h-32 text-center whitespace-normal"
                >
                  <p className="font-medium">No work orders found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search or status filter.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              visibleOrders.map((order) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
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
