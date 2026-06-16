import { StatusPill } from "@/components/status-pill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { workOrders } from "@/data/work-orders";

// Server Component: owns the mock data and renders the shell. The interactive
// layer (sort/filter/search) is extracted into a client component in a later
// unit; for now this is a static render of all 20 rows.
export default function WorkOrdersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Work Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {workOrders.length} work orders
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned Tech</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead className="text-right">Hours Worked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id}</TableCell>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell>
                  <StatusPill status={order.status} />
                </TableCell>
                <TableCell>{order.priority}</TableCell>
                <TableCell>{order.assignedTech}</TableCell>
                <TableCell>{order.scheduledDate}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {order.hoursWorked}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
