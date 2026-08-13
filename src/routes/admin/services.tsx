import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminServices, upsertAdminService, deleteAdminService } from "@/lib/admin.functions";
import type { Service } from "@/lib/content-types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableRow } from "@/components/admin/SortableRow";
import { Layers, Plus, Edit2, Trash2, Check, X, Star, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Services Manager — IMAM ESTUDIO OS" },
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setServices((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        const saveOrder = async () => {
           try {
             const promises = newItems.map((item, index) => {
               return upsertAdminService({ 
                 data: { 
                   id: item.id,
                   title: item.title,
                   slug: item.slug,
                   gig_id: item.gig_id,
                   category: item.category,
                   short_description: item.short_description,
                   full_description: item.full_description,
                   starting_price: item.starting_price,
                   hourly_rate: item.hourly_rate,
                   features: item.features,
                   tech_stack: item.tech_stack,
                   image_url: item.image_url,
                   cta_label: item.cta_label,
                   is_featured: item.is_featured,
                   is_published: item.is_published,
                   display_order: index + 1 
                 } 
               });
             });
             await Promise.all(promises);
           } catch(e: any) {
             toast.error("Failed to update ordering: " + e.message);
             load(); 
           }
        };
        saveOrder();
        
        return newItems;
      });
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Services & Capabilities Manager
          </h1>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
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
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
        >
          <Plus className="h-4 w-4" />
          <span>New Capability</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading capabilities...</p>
      ) : (
        <div className="rounded-xl border border-border bg-surface/60 overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground font-mono uppercase bg-background/80">
                  <th className="w-10 px-2 py-4"></th>
                  <th className="p-4">Order</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Starting Price</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Published</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <SortableContext items={services.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                <tbody className="divide-y divide-zinc-800/60">
                  {services.map((s) => (
                    <SortableRow key={s.id} id={s.id}>
                      <td className="p-4 font-mono text-muted-foreground">{s.display_order}</td>
                      <td className="p-4 font-semibold text-foreground">
                        <div>{s.title}</div>
                        <div className="text-[0.65rem] font-mono text-muted-foreground">/{s.slug}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{s.category}</td>
                      <td className="p-4 font-mono text-primary">
                        {s.starting_price ? `$${s.starting_price}` : "Custom"}
                      </td>
                      <td className="p-4">
                        {s.is_featured ? (
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                            s.is_published
                              ? "border border-primary/30 bg-primary/10 text-primary"
                              : "border border-border-strong bg-surface-raised text-muted-foreground"
                          }`}
                        >
                          {s.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditing(s)}
                            className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="rounded p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </SortableRow>
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </DndContext>
        </div>
      )}

      {/* Edit Drawer Modal */}
      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background p-6 text-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                {editing.id ? "Edit Service Capability" : "Create New Capability"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">Title</label>
                  <input
                    type="text"
                    required
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">Slug</label>
                  <input
                    type="text"
                    required
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editing.category || ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Gig Reference ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 408370669"
                    value={editing.gig_id || ""}
                    onChange={(e) => setEditing({ ...editing, gig_id: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Starting Price ($)
                  </label>
                  <input
                    type="number"
                    value={editing.starting_price ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, starting_price: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    value={editing.hourly_rate ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, hourly_rate: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editing.short_description || ""}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Full Description
                </label>
                <textarea
                  rows={4}
                  value={editing.full_description || ""}
                  onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
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
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
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
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editing.image_url || ""}
                    onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    CTA Label
                  </label>
                  <input
                    type="text"
                    value={editing.cta_label || ""}
                    onChange={(e) => setEditing({ ...editing, cta_label: e.target.value })}
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={editing.is_published ?? true}
                    onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
                    className="rounded border-border"
                  />
                  Published on public site
                </label>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={editing.is_featured ?? true}
                    onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  Featured on homepage
                </label>
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
