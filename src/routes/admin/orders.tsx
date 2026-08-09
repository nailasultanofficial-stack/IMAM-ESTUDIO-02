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
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Quotes & Operational Orders
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
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
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>Create Quote / Order</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading operational orders...</p>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
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
                <tr key={o.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 font-mono font-bold text-emerald-400">{o.reference}</td>
                  <td className="p-4 font-semibold text-white">{o.title}</td>
                  <td className="p-4 font-mono text-white">
                    ${Number(o.amount).toLocaleString()}{" "}
                    <span className="text-[0.65rem] text-zinc-500">{o.currency}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                        o.payment_status === "Paid"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {o.payment_status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-zinc-300">{o.fulfillment_status}</td>
                  <td className="p-4 font-mono text-zinc-500">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditing(o)}
                      className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700"
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
          <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editing.id ? "Edit Quote/Order" : "Create Quote/Order"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Engagement Title
                </label>
                <input
                  type="text"
                  required
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={editing.amount ?? 0}
                    onChange={(e) => setEditing({ ...editing, amount: Number(e.target.value) })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={editing.currency || "USD"}
                    onChange={(e) => setEditing({ ...editing, currency: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Payment Status
                  </label>
                  <select
                    value={editing.payment_status || "Pending"}
                    onChange={(e) =>
                      setEditing({ ...editing, payment_status: e.target.value as any })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Fulfillment
                  </label>
                  <select
                    value={editing.fulfillment_status || "Unfulfilled"}
                    onChange={(e) =>
                      setEditing({ ...editing, fulfillment_status: e.target.value as any })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  >
                    <option value="Unfulfilled">Unfulfilled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-emerald-500 px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50"
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
