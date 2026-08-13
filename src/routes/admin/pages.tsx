import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminPages, upsertAdminPage } from "@/lib/admin.functions";
import type { SitePage } from "@/lib/content-types";
import { FileText, Plus, Edit2, Lock, Globe, X, Layers } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({
    meta: [
      { title: "Pages Manager — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPagesPage,
});

function AdminPagesPage() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SitePage> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminPages({ data: {} });
      setPages(data);
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
      await upsertAdminPage({
        data: {
          id: editing.id,
          title: editing.title,
          slug: editing.slug,
          template: editing.template || "default",
          is_published: editing.is_published ?? true,
          seo_title: editing.seo_title ?? null,
          seo_description: editing.seo_description ?? null,
          og_image: editing.og_image ?? null,
        },
      });
      toast.success(editing.id ? "Page updated" : "Page created");
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
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Page Builder & CMS Pages</h1>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Manage system routes and dynamic CMS pages in PostgreSQL.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              title: "",
              slug: "",
              template: "default",
              is_published: true,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
        >
          <Plus className="h-4 w-4" />
          <span>New Page</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading pages...</p>
      ) : (
        <div className="rounded-xl border border-border bg-surface/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono uppercase bg-background/80">
                <th className="p-4">Title</th>
                <th className="p-4">Route Slug</th>
                <th className="p-4">Template</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-surface/40">
                  <td className="p-4 font-semibold text-foreground">{p.title}</td>
                  <td className="p-4 font-mono text-primary">/{p.slug}</td>
                  <td className="p-4 font-mono text-muted-foreground">{p.template}</td>
                  <td className="p-4">
                    {p.is_system ? (
                      <span className="flex items-center gap-1.5 text-muted-foreground font-mono">
                        <Lock className="h-3.5 w-3.5 text-amber-400" />
                        System
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground font-mono">
                        <Globe className="h-3.5 w-3.5 text-blue-400" />
                        Custom
                      </span>
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
                      <Link
                        to="/admin/pages/$pageId"
                        params={{ pageId: p.id }}
                        className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-primary"
                        title="Manage Sections"
                      >
                        <Layers className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setEditing(p)}
                        className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                        title="Edit Page Properties"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
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
                {editing.id ? "Edit Page" : "Create Page"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Page Title
                </label>
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

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">SEO Title</label>
                <input
                  type="text"
                  value={editing.seo_title || ""}
                  onChange={(e) => setEditing({ ...editing, seo_title: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  SEO Description
                </label>
                <textarea
                  rows={3}
                  value={editing.seo_description || ""}
                  onChange={(e) => setEditing({ ...editing, seo_description: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
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
                  {saving ? "Saving..." : "Save Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
