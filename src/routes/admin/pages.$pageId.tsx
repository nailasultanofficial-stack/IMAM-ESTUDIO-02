import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminPageSections, updateAdminPageSections } from "@/lib/admin.functions";
import type { PageSection } from "@/lib/content-types";
import { toast } from "sonner";
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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { updateAdminSection } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/pages/$pageId")({
  head: () => ({
    meta: [
      { title: "Page Editor — MALIK JAHANZAIB OS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PageEditor,
});

function SortableSectionItem({
  section,
  onEdit,
  onToggleVisibility,
  onDelete,
}: {
  section: PageSection;
  onEdit: (s: PageSection) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 transition-colors ${
        isDragging ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-zinc-500 hover:text-white active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div>
          <h3 className="font-semibold text-white">{section.section_type}</h3>
          {section.title && <p className="text-xs text-zinc-400">{section.title}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleVisibility(section.id)}
          className={`rounded p-1.5 transition-colors ${
            section.is_visible
              ? "text-emerald-400 hover:bg-emerald-400/10"
              : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
          }`}
          title={section.is_visible ? "Visible" : "Hidden"}
        >
          {section.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
        <button
          onClick={() => onEdit(section)}
          className="rounded p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          title="Edit Content"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(section.id)}
          className="rounded p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
          title="Delete Section"
          disabled={section.is_locked}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PageEditor() {
  const { pageId } = Route.useParams();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // Prevents accidental drag on click
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminPageSections({ data: { pageId } });
        setSections(data.sort((a, b) => a.display_order - b.display_order));
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pageId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update display_order internally
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          display_order: index,
        }));
        
        setHasChanges(true);
        return updatedItems;
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAdminPageSections({
        data: {
          pageId,
          sections: sections.map(({ id, display_order, is_visible }) => ({
            id,
            display_order,
            is_visible,
          })),
        },
      });
      setHasChanges(false);
      toast.success("Page sections updated successfully.");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditSave = async () => {
    if (!editingSection) return;
    setSaving(true);
    try {
      const parsedContent = JSON.parse(editContent);
      const updated = await updateAdminSection({
        data: {
          id: editingSection.id,
          content: parsedContent,
        },
      });
      setSections((prev) =>
        prev.map((s) => (s.id === updated.id ? { ...s, content: parsedContent } : s))
      );
      toast.success("Section content updated");
      setEditingSection(null);
    } catch (e: any) {
      toast.error(e.message || "Invalid JSON format");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_visible: !s.is_visible } : s))
    );
    setHasChanges(true);
  };

  const deleteSection = (id: string) => {
    if (confirm("Are you sure you want to remove this section? This cannot be undone.")) {
      setSections((prev) => prev.filter((s) => s.id !== id));
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/pages"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Page Editor</h1>
            <p className="mt-1 text-xs text-zinc-400 font-mono">
              Drag and drop to reorder sections. Changes must be saved.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Section</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-zinc-500 py-8">Loading sections...</p>
      ) : sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <p className="text-sm text-zinc-400 mb-4">No sections found for this page.</p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 text-emerald-400 px-4 py-2 text-xs font-semibold hover:bg-emerald-500/20">
            <Plus className="h-4 w-4" />
            <span>Add First Section</span>
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {sections.map((section) => (
                  <SortableSectionItem
                    key={section.id}
                    section={section}
                    onEdit={(s) => {
                      setEditingSection(s);
                      setEditContent(JSON.stringify(s.content, null, 2));
                    }}
                    onToggleVisibility={toggleVisibility}
                    onDelete={deleteSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {editingSection && (
        <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
          <DialogContent className="sm:max-w-2xl bg-zinc-950 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">Edit {editingSection.section_type}</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Update the JSON content for this section. Must be valid JSON.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-64 bg-zinc-900 border border-zinc-800 rounded-md p-4 text-sm text-zinc-300 font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                spellCheck={false}
              />
            </div>
            <DialogFooter>
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={saving}
                className="px-4 py-2 bg-emerald-500 text-zinc-950 rounded-md text-sm font-medium hover:bg-emerald-400 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Content"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
