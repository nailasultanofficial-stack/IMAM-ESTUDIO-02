import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminProjects, upsertAdminProject, deleteAdminProject } from "@/lib/admin.functions";
import type { Project } from "@/lib/content-types";
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
import { Briefcase, Plus, Edit2, Trash2, Star, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: "Projects Manager — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminProjectsPage,
});

function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminProjects({ data: {} });
      setProjects(data);
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
      setProjects((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        const saveOrder = async () => {
           try {
             const promises = newItems.map((item, index) => {
               // Only partial update to avoid overwriting with stale data, though our upsert expects full data 
               // For safety, let's use the full item from newItems and update its display_order
               return upsertAdminProject({ 
                 data: { 
                   id: item.id,
                   title: item.title,
                   slug: item.slug,
                   gig_id: item.gig_id,
                   category: item.category,
                   client_name: item.client_name,
                   description: item.description,
                   outcomes: item.outcomes,
                   tags: item.tags,
                   thumbnail_url: item.thumbnail_url,
                   gallery_urls: item.gallery_urls,
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
    if (!editing?.title || !editing?.slug || !editing?.thumbnail_url) {
      toast.error("Title, slug and thumbnail URL are required");
      return;
    }
    setSaving(true);
    try {
      await upsertAdminProject({
        data: {
          id: editing.id,
          title: editing.title,
          slug: editing.slug,
          gig_id: editing.gig_id ?? null,
          category: editing.category || "Shopify Commerce",
          client_name: editing.client_name ?? null,
          description: editing.description || "",
          outcomes: editing.outcomes || [],
          tags: editing.tags || [],
          thumbnail_url: editing.thumbnail_url,
          gallery_urls: editing.gallery_urls || [],
          is_featured: editing.is_featured ?? true,
          is_published: editing.is_published ?? true,
          display_order: editing.display_order ?? projects.length + 1,
        },
      });
      toast.success(editing.id ? "Project updated" : "Project created");
      setEditing(null);
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await deleteAdminProject({ data: { id } });
      toast.success("Project deleted");
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
            Case Studies & Work Manager
          </h1>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Manage portfolio items, Cloudinary gig references, outcomes, and imagery.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              title: "",
              slug: "",
              category: "Shopify Commerce",
              description: "",
              outcomes: [],
              tags: [],
              thumbnail_url:
                "https://res.cloudinary.com/demo/image/upload/v1/samples/ecommerce/shoes.jpg",
              gallery_urls: [],
              is_featured: true,
              is_published: true,
              display_order: projects.length + 1,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
        >
          <Plus className="h-4 w-4" />
          <span>New Case Study</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading projects...</p>
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
                  <th className="p-4">Thumb</th>
                  <th className="p-4">Title / Slug</th>
                  <th className="p-4">Gig Ref</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                <tbody className="divide-y divide-zinc-800/60">
                  {projects.map((p) => (
                    <SortableRow key={p.id} id={p.id}>
                      <td className="p-4">
                        <img
                          src={p.thumbnail_url}
                          alt={p.title}
                          className="h-10 w-14 rounded object-cover border border-border"
                        />
                      </td>
                      <td className="p-4 font-semibold text-foreground">
                        <div>{p.title}</div>
                        <div className="text-[0.65rem] font-mono text-muted-foreground">/{p.slug}</div>
                      </td>
                      <td className="p-4 font-mono text-primary">{p.gig_id || "—"}</td>
                      <td className="p-4 text-muted-foreground">{p.category}</td>
                      <td className="p-4">
                        {p.is_featured ? (
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                            p.is_published
                              ? "border border-primary/30 bg-primary/10 text-primary"
                              : "border border-border-strong bg-surface-raised text-muted-foreground"
                          }`}
                        >
                          {p.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditing(p)}
                            className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
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
                {editing.id ? "Edit Case Study" : "Create Case Study"}
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editing.client_name || ""}
                    onChange={(e) => setEditing({ ...editing, client_name: e.target.value })}
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

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  required
                  value={editing.thumbnail_url || ""}
                  onChange={(e) => setEditing({ ...editing, thumbnail_url: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editing.tags?.join(", ") || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground">
                    Outcomes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editing.outcomes?.join(", ") || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        outcomes: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Gallery URLs (comma separated)
                </label>
                <textarea
                  rows={2}
                  value={editing.gallery_urls?.join(",\n") || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      gallery_urls: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground font-mono"
                />
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
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
