"use client"

import {TableCell, TableRow} from "@/components/ui/table";
import ActivityStatus from "@/components/shared/activity-status";
import DeletionAlert from "@/components/shared/deletion-alert";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import VisibilityButton from "@/components/shared/visibility-button";
import {Button} from "@/components/ui/button";
import {Eye, EyeOff, MoreHorizontalIcon, Pencil} from "lucide-react";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {useIsMobile} from "@/hooks/use-mobile";
import {YearDTO} from "@/entities/year";
import Link from "next/link";
import {useDeleteYearMutation, useToggleYearActiveMutation} from "@/entities/year/api/year-admin-api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface YearsTableRowProps {
  year: YearDTO
}

export default function YearsTableRow({year}: YearsTableRowProps) {
  const [deleteYear, {isLoading}] = useDeleteYearMutation();
  const [toggleYearActive, {isLoading: isToggleLoading}] = useToggleYearActiveMutation();
  const isMobile = useIsMobile();


  const handleDelete = async () => {
    try {
      await deleteYear(year.id);

      toast.success(`Новина "${year.year}" успішно видалена`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при видаленні новини";
      console.error("Помилка при видаленні новини:", error);
      toast.error(msg);
    }
  }

  const handleToggleActive = async () => {
    try {
      await toggleYearActive(year.id);

      toast.success(`Новина "${year.year}" ${year.isActive ? "приховано" : "опубліковано"}`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при змінні статусу новини";
      console.error("Помилка при зміні статутси новини:", error);
      toast.error(msg);
    }
  }

  return (
    <TableRow>
      <TableCell>{year.year}</TableCell>
      <TableCell>
        {year._count.sections} розділ{year._count.sections === 1 ? "" : "ів"}
      </TableCell>
      <TableCell>
        <ActivityStatus isActive={year.isActive}/>
      </TableCell>
      <TableCell className="flex gap-2">
       {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={ADMIN_PAGES.SECTIONS(year.year.toString())}>
                <DropdownMenuItem>
                  <Pencil className="me-2" />
                  Редагувати
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleToggleActive}>
                {year.isActive ? (
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
                  onDelete={handleDelete}
                  alertTitle="Видалити запис?"
                  alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <VisibilityButton
              isActive={year.isActive}
              handleToggleActive={handleToggleActive}
              isIconOnly
              isLoading={isToggleLoading}
            />
            <Link href={ADMIN_PAGES.SECTIONS(year.year.toString())}>
              <Button size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeletionAlert
              onDelete={handleDelete}
              isIconButton
              alertTitle="Видалити запис?"
              isDeleting={isLoading}
              alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}