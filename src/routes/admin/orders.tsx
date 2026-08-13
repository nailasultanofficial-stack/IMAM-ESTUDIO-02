import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminOrders, upsertAdminOrder } from "@/lib/admin.functions";
import type { Order } from "@/lib/content-types";
import { ShoppingBag, Plus, DollarSign, Clock, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders & Quotes — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Order> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminOrders({ data: {} });
      setOrders(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || editing?.amount === undefined) {
      toast.error("Title and amount are required");
      return;
    }
    setSaving(true);
    try {
      await upsertAdminOrder({
        data: {
          id: editing.id,
          title: editing.title,
          amount: Number(editing.amount),
          currency: editing.currency || "USD",
          payment_status: editing.payment_status || "Pending",
          fulfillment_status: editing.fulfillment_status || "Unfulfilled",
          notes: editing.notes ?? null,
        },
      });
      toast.success(editing.id ? "Order updated" : "Order created");
      setEditing(null);
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Quotes & Operational Orders
          </h1>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Manage proposals, custom quotes, payment state, and project fulfillment.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              title: "Custom Engineering Engagement",
              amount: 5000,
              currency: "USD",
              payment_status: "Pending",
              fulfillment_status: "Unfulfilled",
            })
          }
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Create Quote / Order</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading operational orders...</p>
      ) : (
        <div className="rounded-xl border border-border bg-surface/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono uppercase bg-background/80">
                <th className="p-4">Reference</th>
                <th className="p-4">Engagement Title</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfillment</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-surface/40">
                  <td className="p-4 font-mono font-bold text-primary">{o.reference}</td>
                  <td className="p-4 font-semibold text-foreground">{o.title}</td>
                  <td className="p-4 font-mono text-foreground">
                    ${Number(o.amount).toLocaleString()}{" "}
                    <span className="text-[0.65rem] text-muted-foreground">{o.currency}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                        o.payment_status === "Paid"
                          ? "border border-primary/30 bg-primary/10 text-primary"
                          : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {o.payment_status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-muted-foreground">{o.fulfillment_status}</td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditing(o)}
                      className="rounded bg-surface-raised px-3 py-1 text-xs text-muted-foreground hover:bg-surface-raised"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-background p-6 text-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                {editing.id ? "Edit Quote/Order" : "Create Quote/Order"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Engagement Title
                </label>
                <input
                  type="text"
                  required
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={editing.amount ?? 0}
                    onChange={(e) => setEditing({ ...editing, amount: Number(e.target.value) })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={editing.currency || "USD"}
                    onChange={(e) => setEditing({ ...editing, currency: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Payment Status
                  </label>
                  <select
                    value={editing.payment_status || "Pending"}
                    onChange={(e) =>
                      setEditing({ ...editing, payment_status: e.target.value as any })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Fulfillment
                  </label>
                  <select
                    value={editing.fulfillment_status || "Unfulfilled"}
                    onChange={(e) =>
                      setEditing({ ...editing, fulfillment_status: e.target.value as any })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  >
                    <option value="Unfulfilled">Unfulfilled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-primary px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
