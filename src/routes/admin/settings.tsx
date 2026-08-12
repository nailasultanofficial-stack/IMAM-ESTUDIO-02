import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminGlobalSettings, updateAdminGlobalSetting } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Save, Settings2 } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Global Settings — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminSettingsPage,
});

function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states for site_config
  const [siteConfig, setSiteConfig] = useState<Record<string, any>>({
    name: "",
    founder: "",
    role: "",
    handle: "",
    whatsapp: "",
    email: "",
    location: "",
    rating: "",
  });

  const load = async () => {
    try {
      const data = await getAdminGlobalSettings({ data: {} });
      setSettings(data);
      if (data["site_config"]) {
        setSiteConfig(data["site_config"]);
      }
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
          key: "site_config",
          value: siteConfig,
        },
      });
      toast.success("Settings updated");
      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-xs font-mono text-zinc-500 py-8">Loading settings...</p>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings2 className="h-6 w-6 text-emerald-500" />
            Global Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Manage global brand information and site configuration.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Site Configuration</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Site Name</label>
              <input
                type="text"
                value={siteConfig["name"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Founder</label>
              <input
                type="text"
                value={siteConfig["founder"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, founder: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Role</label>
              <input
                type="text"
                value={siteConfig["role"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, role: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Handle (Social)</label>
              <input
                type="text"
                value={siteConfig["handle"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, handle: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Email Address</label>
              <input
                type="email"
                value={siteConfig["email"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">WhatsApp Number</label>
              <input
                type="text"
                value={siteConfig["whatsapp"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Location</label>
              <input
                type="text"
                value={siteConfig["location"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, location: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400">Rating</label>
              <input
                type="text"
                value={siteConfig["rating"] || ""}
                onChange={(e) => setSiteConfig({ ...siteConfig, rating: e.target.value })}
                className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-sm text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
