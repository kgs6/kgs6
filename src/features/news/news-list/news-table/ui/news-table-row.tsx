"use client"

import {NewsDTO, useDeleteNewsMutation, useToggleNewsActiveMutation} from "@/entities/news";
import {TableCell, TableRow} from "@/components/ui/table";
import ActivityStatus from "@/components/shared/activity-status";
import DeletionAlert from "@/components/shared/deletion-alert";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import VisibilityButton from "@/components/shared/visibility-button";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useRouter} from "next/navigation";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {useIsMobile} from "@/hooks/use-mobile";

interface NewsTableRowProps {
  news: NewsDTO
}

export default function NewsTableRow({news}: NewsTableRowProps) {
  const router = useRouter();
  const [deleteNews, {isLoading: isLoadingDeleting}] = useDeleteNewsMutation();
  const [toggleNewsActive, {isLoading: isLoadingActivity}] = useToggleNewsActiveMutation();
  const isMobile = useIsMobile();

  const handleDelete = async () => {
    try {
      await deleteNews(news.id).unwrap();

      toast.success(`Новина "${news.title}" успішно видалена`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при видаленні новини";
      console.error("Помилка при видаленні новини:", error);
      toast.error(msg);
    }
  }

  const handleToggleActive = async () => {
    try {
      await toggleNewsActive(news.id).unwrap();

      toast.success(`Новина "${news.title}" ${news.isActive ? "приховано" : "опубліковано"}`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при змінні статусу новини";
      console.error("Помилка при зміні статутси новини:", error);
      toast.error(msg);
    }
  }
  
  return (
    <TableRow>
      <TableCell>{news.title}</TableCell>
      <TableCell>
        {new Date(news.publishedAt).toLocaleDateString("uk-UA", {
          year: "numeric",
          month: isMobile ? "numeric" : "long",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <ActivityStatus isActive={news.isActive}/>
      </TableCell>
      <TableCell className="flex gap-2">
        <VisibilityButton
          isActive={news.isActive}
          handleToggleActive={handleToggleActive}
          isIconOnly={true}
          isLoading={isLoadingActivity}
        />
        <Button
          size={isMobile ? "icon-lg" : "icon" }
          onClick={() => router.push(ADMIN_PAGES.EDIT_NEWS(news.id))}
        >
          <Pencil className="h-4 w-4"/>
        </Button>
        <DeletionAlert
          isDeleting={isLoadingDeleting}
          alertTitle={`Ви впевнені, що хочете видалити новину "${news.title}"?`}
          alertDescription={"Ця дія не може бути скасована."}
          onDelete={handleDelete}
          isIconButton={true}
        />
      </TableCell>
    </TableRow>
  )
}