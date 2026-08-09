import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminThemeSections,
  updateAdminSection,
  reorderAdminSections,
} from "@/lib/admin.functions";
import type { PageSection } from "@/lib/content-types";
import {
  Palette,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff,
  Edit3,
  Save,
  Check,
  RotateCcw,
  Monitor,
  Smartphone,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/theme-editor")({
  head: () => ({
    meta: [
      { title: "Theme Editor — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminThemeEditorPage,
});

function AdminThemeEditorPage() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<PageSection | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [editingContent, setEditingContent] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const data = await getAdminThemeSections({ data: {} });
      setSections(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const moved = newSections.splice(index, 1)[0];
    if (!moved) return;
    newSections.splice(targetIndex, 0, moved);

    setSections(newSections);

    try {
      await reorderAdminSections({
        data: {
          orderedIds: newSections.map((s) => s.id),
        },
      });
      toast.success("Section reordered");
    } catch (e: any) {
      toast.error(e.message);
      load();
    }
  };

  const handleToggleVisibility = async (section: PageSection) => {
    try {
      await updateAdminSection({
        data: {
          id: section.id,
          content: section.content,
          is_visible: !section.is_visible,
        },
      });
      toast.success(`Section ${section.is_visible ? "hidden" : "visible"}`);
      await load();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const openEditor = (section: PageSection) => {
    setActiveSection(section);
    setEditingContent(JSON.stringify(section.content, null, 2));
  };

  const handleSaveContent = async () => {
    if (!activeSection) return;
    try {
      const parsedContent = JSON.parse(editingContent);
      setSaving(true);
      await updateAdminSection({
        data: {
          id: activeSection.id,
          title: activeSection.title,
          subtitle: activeSection.subtitle,
          content: parsedContent,
        },
      });
      toast.success("Section content published to Supabase");
      setActiveSection(null);
      await load();
    } catch (e: any) {
      toast.error(e.message || "Invalid JSON content");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Visual Theme & Section Editor
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Reorder, configure, and publish homepage sections in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono transition-colors ${
              previewMode === "desktop" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            Desktop
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-mono transition-colors ${
              previewMode === "mobile" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Mobile
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading homepage sections...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Section List / Reorder Column */}
          <div className="space-y-3 lg:col-span-7">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                  section.is_visible
                    ? "border-zinc-800 bg-zinc-900/60"
                    : "border-zinc-800/40 bg-zinc-950 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white capitalize">
                      {section.section_type.replace("_", " ")}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate max-w-sm">
                      {section.title || section.subtitle || "Homepage section"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30"
                  >
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-30"
                  >
                    <MoveDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleVisibility(section)}
                    className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    {section.is_visible ? (
                      <Eye className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-zinc-600" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditor(section)}
                    className="flex items-center gap-1 rounded bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Preview / JSON Editor Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">
                {activeSection ? `Editing: ${activeSection.section_type}` : "Section Configurator"}
              </h2>

              {activeSection ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={activeSection.title || ""}
                      onChange={(e) =>
                        setActiveSection({ ...activeSection, title: e.target.value })
                      }
                      className="w-full rounded border border-zinc-800 bg-zinc-950 p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      JSON Content Config
                    </label>
                    <textarea
                      rows={12}
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full font-mono text-xs rounded border border-zinc-800 bg-zinc-950 p-3 text-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => setActiveSection(null)}
                      className="rounded px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveContent}
                      disabled={saving}
                      className="flex items-center gap-1.5 rounded bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-emerald-400"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {saving ? "Publishing..." : "Publish Config"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-zinc-500">
                  Select a section from the left column to configure its contents and JSON payload.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
