import ActivityStatus from "@/components/shared/activity-status"
import DeletionAlert from "@/components/shared/deletion-alert";
import VisibilityButton from "@/components/shared/visibility-button";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { TableCell, TableRow } from "@/components/ui/table"
import { ObjectDTO } from "@/entities/object"
import { useDeleteObjectMutation, useToggleObjectActiveMutation } from "@/entities/object/api/object-admin-api";
import { useIsMobile } from "@/hooks/use-mobile";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Pencil } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { ADMIN_PAGES } from "@/shared/config/pages.config";


interface ObjectTableRowProps {
  object: ObjectDTO
}

export default function ObjectTableRow({ object }: ObjectTableRowProps) {
  const isMobile = useIsMobile();
  const [toggleObjectActive, {isLoading: isLoadingActivity}] = useToggleObjectActiveMutation();
  const [deleteObject, {isLoading: isLoadingDeletion}] = useDeleteObjectMutation();


  const handleDelete = async () => {
    try {
      await deleteObject(object.id);

      toast.success(`Об'єкт "${object.name}" успішно видалений`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при видаленні об'єкта";
      console.error("Помилка при видаленні об'єкта:", error);
      toast.error(msg);
    }
  }

  const handleToggleActive = async () => {
    try {
      await toggleObjectActive(object.id);

      toast.success(`Об'єкт "${object.name}" ${object.isActive ? "приховано" : "опубліковано"}`);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Помилка при змінні статусу об'єкта";
      console.error("Помилка при зміні статутси об'єкта:", error);
      toast.error(msg);
    }
  }

  return (
    <TableRow>
      <TableCell>
        {object.image ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Image
                src={object.image.url}
                alt={object.name}
                width={64}
                height={64}
                className="rounded-md object-cover cursor-zoom-in"
              />
            </HoverCardTrigger>

            <HoverCardContent className="w-80 h-auto p-1">
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                <Image
                  src={object.image.url}
                  alt={object.name}
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            </HoverCardContent>
          </HoverCard>) : (
          <div className="w-16 h-12.75 bg-muted rounded-md flex items-center justify-center">
            <ImageIcon className="text-muted-foreground/50" />
          </div>
        )}
      </TableCell>

      <TableCell>
        {object.name}
      </TableCell>

      <TableCell>
        <ActivityStatus isActive={object.isActive} />
      </TableCell>
      <TableCell className="h-full">
        <div className="flex items-center justify-center gap-2 h-full">
          <VisibilityButton
            isActive={object.isActive}
            handleToggleActive={handleToggleActive}
            isIconOnly={true}
            isLoading={isLoadingActivity}
          />
          <Link href={ADMIN_PAGES.EDIT_OBJECTS(object.id)}>
            <Button
              size={isMobile ? "icon-lg" : "icon"}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeletionAlert
            alertTitle={`Ви впевнені, що хочете видалити об'єкт "${object.name}"?`}
            alertDescription={"Ця дія не може бути скасована."}
            onDelete={handleDelete}
            isIconButton={true}
            isDeleting={isLoadingDeletion}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}