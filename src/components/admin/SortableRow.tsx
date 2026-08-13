import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
}

export function SortableRow({ id, children }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-surface/40 ${isDragging ? "bg-surface-raised/80 shadow-lg" : ""}`}
    >
      <td className="w-10 px-2 py-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab p-1 text-muted-foreground hover:text-foreground active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      {children}
    </tr>
  );
}
