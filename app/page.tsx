import { WorkOrdersTable } from "@/components/work-orders-table";
import { workOrders } from "@/data/work-orders";

// Server Component: owns the mock data and renders the shell, delegating all
// interactivity (sorting, filtering, search) to the client component.
export default function WorkOrdersPage() {
  return (
    <main className="flex-1 bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-8 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Work Orders</h1>
          <p className="text-sm text-muted-foreground">
            Field service work orders across all customers and sites.
          </p>
        </header>

        <WorkOrdersTable orders={workOrders} />
      </div>
    </main>
  );
}
