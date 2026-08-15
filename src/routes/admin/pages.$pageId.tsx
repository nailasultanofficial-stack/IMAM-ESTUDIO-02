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

export const Route = createFileRoute("/admin/pages/$pageId")({
  head: () => ({
    meta: [
      { title: "Page Editor — IMAM ESTUDIO OS" },
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
      className={`flex items-center justify-between rounded-lg border border-border bg-surface/60 p-4 transition-colors ${
        isDragging ? "border-primary shadow-lg shadow-emerald-500/10" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div>
          <h3 className="font-semibold text-foreground">{section.section_type}</h3>
          {section.title && <p className="text-xs text-muted-foreground">{section.title}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleVisibility(section.id)}
          className={`rounded p-1.5 transition-colors ${
            section.is_visible
              ? "text-primary hover:bg-primary/10"
              : "text-muted-foreground hover:bg-surface-raised hover:text-foreground"
          }`}
          title={section.is_visible ? "Visible" : "Hidden"}
        >
          {section.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
        <button
          onClick={() => onEdit(section)}
          className="rounded p-1.5 text-muted-foreground hover:bg-surface-raised hover:text-foreground"
          title="Edit Content"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(section.id)}
          className="rounded p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
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
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Page Editor</h1>
            <p className="mt-1 text-xs text-muted-foreground font-mono">
              Drag and drop to reorder sections. Changes must be saved.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 rounded-lg bg-surface-raised px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-surface-raised"
          >
            <Plus className="h-4 w-4" />
            <span>Add Section</span>
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-xs font-mono text-muted-foreground py-8">Loading sections...</p>
      ) : sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface/30 p-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">No sections found for this page.</p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary/10 text-primary px-4 py-2 text-xs font-semibold hover:bg-primary/20">
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
                    onEdit={() => toast.info("Section editor modal coming soon")}
                    onToggleVisibility={toggleVisibility}
                    onDelete={deleteSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
