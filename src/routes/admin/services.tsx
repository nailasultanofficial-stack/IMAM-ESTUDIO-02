import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminServices, upsertAdminService, deleteAdminService } from "@/lib/admin.functions";
import type { Service } from "@/lib/content-types";
import { Layers, Plus, Edit2, Trash2, Check, X, Star, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Services Manager — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminServicesPage,
});

function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminServices({ data: {} });
      setServices(data);
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
    if (!editing?.title || !editing?.slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    try {
      await upsertAdminService({
        data: {
          id: editing.id,
          title: editing.title,
          slug: editing.slug,
          gig_id: editing.gig_id ?? null,
          category: editing.category || "Engineering",
          short_description: editing.short_description || "",
          full_description: editing.full_description || "",
          starting_price: editing.starting_price ? Number(editing.starting_price) : null,
          hourly_rate: editing.hourly_rate ? Number(editing.hourly_rate) : 18.0,
          features: editing.features || [],
          tech_stack: editing.tech_stack || [],
          image_url: editing.image_url || null,
          cta_label: editing.cta_label || "Discuss project",
          is_featured: editing.is_featured ?? true,
          is_published: editing.is_published ?? true,
          display_order: editing.display_order ?? services.length + 1,
        },
      });
      toast.success(editing.id ? "Service updated" : "Service created");
      setEditing(null);
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteAdminService({ data: { id } });
      toast.success("Service deleted");
      await load();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Services & Capabilities Manager
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Manage public engineering capabilities and pricing in PostgreSQL.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              title: "",
              slug: "",
              category: "Shopify Commerce",
              short_description: "",
              full_description: "",
              starting_price: 3500,
              hourly_rate: 18.0,
              features: [],
              tech_stack: [],
              cta_label: "Discuss project",
              is_featured: true,
              is_published: true,
              display_order: services.length + 1,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>New Capability</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading capabilities...</p>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
                <th className="p-4">Order</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-900/40">
                  <td className="p-4 font-mono text-zinc-500">{s.display_order}</td>
                  <td className="p-4 font-semibold text-white">
                    <div>{s.title}</div>
                    <div className="text-[0.65rem] font-mono text-zinc-500">/{s.slug}</div>
                  </td>
                  <td className="p-4 text-zinc-300">{s.category}</td>
                  <td className="p-4 font-mono text-emerald-400">
                    {s.starting_price ? `$${s.starting_price}` : "Custom"}
                  </td>
                  <td className="p-4">
                    {s.is_featured ? (
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                        s.is_published
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {s.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(s)}
                        className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Drawer Modal */}
      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editing.id ? "Edit Service Capability" : "Create New Capability"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">Slug</label>
                  <input
                    type="text"
                    required
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editing.category || ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Gig Reference ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 408370669"
                    value={editing.gig_id || ""}
                    onChange={(e) => setEditing({ ...editing, gig_id: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Starting Price ($)
                  </label>
                  <input
                    type="number"
                    value={editing.starting_price ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, starting_price: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={editing.hourly_rate ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, hourly_rate: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editing.short_description || ""}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Full Description
                </label>
                <textarea
                  rows={4}
                  value={editing.full_description || ""}
                  onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editing.features?.join(", ") || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        features: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editing.tech_stack?.join(", ") || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        tech_stack: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editing.image_url || ""}
                    onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
                    CTA Label
                  </label>
                  <input
                    type="text"
                    value={editing.cta_label || ""}
                    onChange={(e) => setEditing({ ...editing, cta_label: e.target.value })}
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={editing.is_published ?? true}
                    onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                    className="rounded border-zinc-800"
                  />
                  Published on public site
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={editing.is_featured ?? true}
                    onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                    className="rounded border-zinc-800"
                  />
                  Featured on homepage
                </label>
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
                  {saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
