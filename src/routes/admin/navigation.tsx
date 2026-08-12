import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminGlobalSettings, updateAdminGlobalSetting } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Save, Navigation, Plus, Trash2 } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { globalSettingsQuery } from "@/lib/public-queries";
import { DEFAULT_NAV_LINKS } from "@/lib/utils";

export const Route = createFileRoute("/admin/navigation")({
  head: () => ({
    meta: [
      { title: "Navigation Manager — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminNavigationPage,
});

function AdminNavigationPage() {
  const [links, setLinks] = useState<{ label: string; to: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { data: settingsData } = useSuspenseQuery(globalSettingsQuery);

  const load = async () => {
    try {
      const navLinks = settingsData?.['nav_links']
        ? (typeof settingsData['nav_links'] === "string" ? JSON.parse(settingsData['nav_links']) : settingsData['nav_links'])
        : DEFAULT_NAV_LINKS;
      setLinks(Array.isArray(navLinks) ? navLinks : []);
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
    setSaving(true);
    try {
      await updateAdminGlobalSetting({
        data: {
          key: "nav_links",
          value: links.filter(l => l.label.trim() !== "" && l.to.trim() !== ""),
        },
      });
      toast.success("Navigation links updated");
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    setLinks([...links, { label: "", to: "/" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: "label" | "to", value: string) => {
    const newLinks = [...links];
    if (newLinks[index]) {
      newLinks[index][field] = value;
    }
    setLinks(newLinks);
  };

  if (loading) return <p className="text-xs font-mono text-zinc-500 py-8">Loading navigation...</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Navigation className="h-6 w-6 text-emerald-500" />
            Navigation Manager
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Manage the primary header and footer navigation links.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Header & Footer Links</h2>
          <button
            onClick={addLink}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-700"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Link
          </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Label (e.g. Home)"
                    value={link.label}
                    onChange={(e) => updateLink(index, "label", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Route (e.g. /work)"
                    value={link.to}
                    onChange={(e) => updateLink(index, "to", e.target.value)}
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white font-mono"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="rounded p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                  title="Remove Link"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            {links.length === 0 && (
              <p className="text-sm text-zinc-500 text-center py-4 border border-dashed border-zinc-800 rounded-lg">
                No navigation links found. Add your first link.
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-zinc-800 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Navigation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
