import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminSeoSettings, upsertAdminSeoSetting } from "@/lib/admin.functions";
import type { SeoSetting } from "@/lib/content-types";
import { Search, Plus, Edit2, Globe, Shield, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/seo")({
  head: () => ({
    meta: [
      { title: "SEO Manager — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminSeoPage,
});

function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SeoSetting> | null>(null);

  const load = async () => {
    try {
      const data = await getAdminSeoSettings({ data: {} });
      setSeoList(data);
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
    if (!editing?.route) {
      toast.error("Route path is required");
      return;
    }
    try {
      await upsertAdminSeoSetting({
        data: {
          id: editing.id,
          route: editing.route,
          title: editing.title ?? null,
          description: editing.description ?? null,
          og_image: editing.og_image ?? null,
          keywords: editing.keywords || [],
          noindex: editing.noindex ?? false,
        },
      });
      toast.success("SEO settings saved");
      setEditing(null);
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
            Global & Page-Level SEO Manager
          </h1>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Manage meta titles, OpenGraph images, JSON-LD, and robots indexing rules.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              route: "/",
              title:
                "IMAM ESTUDIO — Senior Full-Stack Engineer & UI/UX Architect",
              description:
                "Shopify commerce, AI automation pipelines, and full-stack SaaS engineering.",
              keywords: ["Shopify", "AI", "SaaS", "Engineering"],
              noindex: false,
            })
          }
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Add Route SEO</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading SEO configurations...</p>
      ) : (
        <div className="rounded-xl border border-border bg-surface/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-mono uppercase bg-background/80">
                <th className="p-4">Route Path</th>
                <th className="p-4">Meta Title</th>
                <th className="p-4">Meta Description</th>
                <th className="p-4">Robots</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {seoList.map((seo) => (
                <tr key={seo.id} className="hover:bg-surface/40">
                  <td className="p-4 font-mono text-primary font-bold">{seo.route}</td>
                  <td className="p-4 font-semibold text-foreground max-w-xs truncate">
                    {seo.title || "—"}
                  </td>
                  <td className="p-4 text-muted-foreground max-w-sm truncate">{seo.description || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[0.65rem] ${
                        seo.noindex
                          ? "border border-red-500/30 bg-red-500/10 text-red-400"
                          : "border border-primary/30 bg-primary/10 text-primary"
                      }`}
                    >
                      {seo.noindex ? "noindex" : "index, follow"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setEditing(seo)}
                      className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
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
              <h2 className="text-lg font-bold text-foreground">Route SEO Configuration</h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Route Path
                </label>
                <input
                  type="text"
                  required
                  value={editing.route || ""}
                  onChange={(e) => setEditing({ ...editing, route: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="mt-1 w-full rounded border border-border bg-surface p-2 text-sm text-foreground"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={editing.noindex ?? false}
                    onChange={(e) => setEditing({ ...editing, noindex: e.target.checked })}
                    className="rounded border-border"
                  />
                  Mark route as noindex (Hide from search engines)
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
                  className="rounded bg-primary px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary"
                >
                  Save SEO Config
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
