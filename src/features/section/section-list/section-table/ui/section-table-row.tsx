import { SectionDTO } from "@/entities/section";
import { TableCell, TableRow } from "@/components/ui/table";
import ActivityStatus from "@/components/shared/activity-status";
import VisibilityButton from "@/components/shared/visibility-button";
import Link from "next/link";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, GripVertical, MoreHorizontalIcon, Pencil } from "lucide-react";
import DeletionAlert from "@/components/shared/deletion-alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useDeleteSectionMutation, useToggleSectionActiveMutation } from "@/entities/section/api/section-admin-api";
import { useParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


interface SectionTableRowProps {
  section: SectionDTO,
  allowReorder: boolean
}

export default function SectionTableRow({ section, allowReorder }: SectionTableRowProps) {
  const params = useParams();
  const year = params.year as string;
  const isMobile = useIsMobile();
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: section.id,
  });
  const [toggleSectionActive, {isLoading: isToggleLoading}] = useToggleSectionActiveMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function declOfNum(n: number, titles: [string, string, string]) {
    return titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)
          ? 1
          : 2
    ];
  }

  async function handleDeleteSection() {
    try {
      if (!section) {
        toast.error("Розділ не знайдено");
        return;
      }

      await deleteSection(section.id).unwrap();
      toast.success("Розділ видалено успішно");
    } catch (e: unknown) {
      const msg = getErrorMessage(e) || "Помилка видалення розділу";
      toast.error(msg);
    }
  }

  async function handleToggleActive() {
    try {
      if (!section) {
        toast.error("Розділ не знайдено");
        return;
      }
      await toggleSectionActive(section.id).unwrap();

      toast.success(`Розділ ${!section.isActive ? "активовано" : "приховано"} успішно`);
    } catch (e: unknown) {
      const msg = getErrorMessage(e) || "Помилка зміни статусу розділу";
      toast.error(msg);
    }
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="hover:bg-muted/50 cursor-pointer bg-background"
    >
      <TableCell className="text-center w-12">
        <div className="flex items-center justify-center gap-2">
          {allowReorder && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none p-1"
            >
              <GripVertical />
            </div>
          )}
        </div>
      </TableCell>

      <TableCell className="truncate">{section.title}</TableCell>
      <TableCell>
        {section._count.entries} {declOfNum(section._count.entries, ["запис", "записи", "записів"])}
      </TableCell>

      <TableCell className="text-center w-28">
        <ActivityStatus isActive={section.isActive} />
      </TableCell>

      <TableCell className="text-center w-40">
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={ADMIN_PAGES.RECORDS(year, section.name)}>
                <DropdownMenuItem>
                  <Pencil className="me-2" />
                  Редагувати
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleToggleActive}>
                {section.isActive ? (
                  <>
                    <EyeOff className="me-2" />
                    Приховати
                  </>
                ) : (
                  <>
                    <Eye className="me-2" />
                    Відобразити
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" asChild>
                <DeletionAlert
                  onDelete={handleDeleteSection}
                  alertTitle="Видалити запис?"
                  alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <VisibilityButton
              isActive={section.isActive}
              handleToggleActive={handleToggleActive}
              isIconOnly
              isLoading={isToggleLoading}
            />
            <Link href={ADMIN_PAGES.RECORDS(year, section.name)}>
              <Button size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeletionAlert
              onDelete={handleDeleteSection}
              isIconButton
              alertTitle="Видалити запис?"
              alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}