// components/SortableFileItem.tsx
import { FileItem } from "@/types/interfaces/file-item";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getFileType } from "@/shared/lib/get-file-type";
import FileIcon from "./file-icon";
import DeletionAlert from "@/components/shared/deletion-alert";

export default function SortableFileItem({
  file,
  onChangeName,
  onRemove,
}: {
  file: FileItem;
  onChangeName: (id: string | number, value: string) => void;
  onRemove: (id: string | number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const firstDotIndex = file.name.indexOf(".");
  const nameWithoutExt =
    firstDotIndex !== -1 ? file.name.slice(0, firstDotIndex) : file.name;

  const ext = firstDotIndex !== -1 ? file.name.slice(firstDotIndex) : "";

  const { type, isSigned } = getFileType(file.name);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-center sm:items-center gap-2 p-3 border rounded-lg bg-background"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-muted-foreground"
      >
        <GripVertical size={18} />
      </div>

      <div className="w-full flex flex-col gap-2 sm:flex-row">
        <Input
          value={nameWithoutExt}
          onChange={(e) => onChangeName(file.id, e.target.value + ext)}
          className="flex-1"
        />

        <div className="flex flex-row items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-4">
          <FileIcon type={type} isSigned={isSigned} />
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
          { file.url ? (
            <DeletionAlert
              alertTitle={`Файл \"${file.name}\" буде видалено`}
              alertDescription={`Цей файл зберігається на сервері. Натиснув \"Видалити\" після збереження цю дію не можна буде скасувати.`}
              onDelete={() => onRemove(file.id)}
              isIconButton={true}
            />
          ) : (
            <Button variant="ghost" size="icon" onClick={() => onRemove(file.id)}>
              <Trash size={16} className="text-destructive"/>
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}
