import { WorkOrdersTable } from "@/components/work-orders-table";
import { workOrders } from "@/data/work-orders";

// Server Component: owns the mock data and renders the shell, delegating all
// interactivity (sorting, and later filtering/search) to the client component.
export default function WorkOrdersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Work Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {workOrders.length} work orders
        </p>
      </header>

      <WorkOrdersTable orders={workOrders} />
    </main>
  );
}
