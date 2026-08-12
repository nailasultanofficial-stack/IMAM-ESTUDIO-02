import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminProjects, upsertAdminProject, deleteAdminProject } from "@/lib/admin.functions";
import type { Project } from "@/lib/content-types";
import { Briefcase, Plus, Edit2, Trash2, Star, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: "Projects Manager — MALIK JAHANZAIB OS" },
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
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Case Studies & Work Manager
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
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
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>New Case Study</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading projects...</p>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-mono uppercase bg-zinc-950/80">
                <th className="p-4">Thumb</th>
                <th className="p-4">Title / Slug</th>
                <th className="p-4">Gig Ref</th>
                <th className="p-4">Category</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-900/40">
                  <td className="p-4">
                    <img
                      src={p.thumbnail_url}
                      alt={p.title}
                      className="h-10 w-14 rounded object-cover border border-zinc-800"
                    />
                  </td>
                  <td className="p-4 font-semibold text-white">
                    <div>{p.title}</div>
                    <div className="text-[0.65rem] font-mono text-zinc-500">/{p.slug}</div>
                  </td>
                  <td className="p-4 font-mono text-emerald-400">{p.gig_id || "—"}</td>
                  <td className="p-4 text-zinc-300">{p.category}</td>
                  <td className="p-4">
                    {p.is_featured ? (
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                        p.is_published
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
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
                {editing.id ? "Edit Case Study" : "Create Case Study"}
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
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editing.client_name || ""}
                    onChange={(e) => setEditing({ ...editing, client_name: e.target.value })}
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

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  required
                  value={editing.thumbnail_url || ""}
                  onChange={(e) => setEditing({ ...editing, thumbnail_url: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
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
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400">
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
                    className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
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
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white font-mono"
                />
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
