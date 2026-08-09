import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminMediaAssets, upsertAdminMediaAsset } from "@/lib/admin.functions";
import type { MediaAsset } from "@/lib/content-types";
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  ShieldAlert,
  Check,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/media")({
  head: () => ({
    meta: [
      { title: "Media Library — IMAM ESTUDIO OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<MediaAsset> | null>(null);

  const load = async () => {
    try {
      const data = await getAdminMediaAssets({ data: {} });
      setAssets(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Asset URL copied to clipboard");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.filename || !editing?.url) {
      toast.error("Filename and URL are required");
      return;
    }
    try {
      await upsertAdminMediaAsset({
        data: {
          id: editing.id,
          filename: editing.filename,
          url: editing.url,
          alt_text: editing.alt_text ?? null,
          mime_type: editing.mime_type ?? null,
        },
      });
      toast.success("Media asset saved");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Media Asset Library</h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Register, audit references, and manage Supabase & Cloudinary media.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              filename: "Hero Portrait.png",
              url: "https://yqaslfozryelumtlkoxk.supabase.co/storage/v1/object/public/asset/Cinematic%20Portrait%20in%20a%20Dark%20Tech%20Studio.png",
              alt_text: "IMAM ESTUDIO Hero Portrait",
            })
          }
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading media assets...</p>
      ) : assets.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-12 text-center text-xs font-mono text-zinc-500">
          No media assets registered in database yet. Click "Add Media Asset" to register media
          references.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-950 border border-zinc-800">
                <img
                  src={asset.url}
                  alt={asset.alt_text || asset.filename}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-white truncate">{asset.filename}</p>
                <p className="text-[0.65rem] font-mono text-zinc-500 truncate mt-0.5">
                  {asset.url}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                <button
                  onClick={() => handleCopyUrl(asset.url)}
                  className="flex items-center gap-1.5 rounded bg-zinc-800 px-2.5 py-1 text-[0.7rem] text-zinc-300 hover:bg-zinc-700"
                >
                  <Copy className="h-3 w-3" />
                  Copy URL
                </button>
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded p-1 text-zinc-400 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-white">Register Media Asset</h2>
              <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">Filename</label>
                <input
                  type="text"
                  required
                  value={editing.filename || ""}
                  onChange={(e) => setEditing({ ...editing, filename: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">
                  Public Asset URL
                </label>
                <input
                  type="text"
                  required
                  value={editing.url || ""}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400">Alt Text</label>
                <input
                  type="text"
                  value={editing.alt_text || ""}
                  onChange={(e) => setEditing({ ...editing, alt_text: e.target.value })}
                  className="mt-1 w-full rounded border border-zinc-800 bg-zinc-900 p-2 text-sm text-white"
                />
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
                  className="rounded bg-emerald-500 px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
