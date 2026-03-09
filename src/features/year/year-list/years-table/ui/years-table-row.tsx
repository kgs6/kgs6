"use client"

import {TableCell, TableRow} from "@/components/ui/table";
import ActivityStatus from "@/components/shared/activity-status";
import DeletionAlert from "@/components/shared/deletion-alert";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import VisibilityButton from "@/components/shared/visibility-button";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {useIsMobile} from "@/hooks/use-mobile";
import {YearDTO} from "@/entities/year";
import Link from "next/link";
import {useDeleteYearMutation, useToggleYearActiveMutation} from "@/entities/year/api/year-admin-api";

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
        <VisibilityButton
          isActive={year.isActive}
          handleToggleActive={handleToggleActive}
          isIconOnly={true}
          isLoading={isToggleLoading}
        />
        <Link href={ADMIN_PAGES.SECTIONS(year.year.toString())}>
          <Button
            size={isMobile ? "icon-lg" : "icon"}
          >
            <Pencil className="h-4 w-4"/>
          </Button>
        </Link>
        <DeletionAlert
          alertTitle={`Ви впевнені, що хочете видалити новину "${year.year}"?`}
          alertDescription={"Ця дія не може бути скасована."}
          isDeleting={isLoading}
          onDelete={handleDelete}
          isIconButton={true}
        />
      </TableCell>
    </TableRow>
  )
}