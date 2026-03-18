import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Trash, Trash2} from "lucide-react";

interface DeletionAlertProps {
  alertTitle?: string;
  alertDescription?: string;
  isDeleting?: boolean;
  onDelete: () => void;
  isIconButton?: boolean;
}

const DeletionAlert = ({
  isDeleting,
  onDelete,
  alertTitle,
  alertDescription,
  isIconButton
}: DeletionAlertProps) => {
  const isMobile = window.innerWidth < 768;

  const buttonSize = isMobile ? "icon-lg" : "icon";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isIconButton ? (
          <Button variant="destructive" size={buttonSize}>
            <Trash size={16}/>
          </Button>
        ) : (
          <Button variant="destructive" className="gap-2 bg-background text-destructive" >
            <Trash2 className="h-4 w-4"/>
            Видалити
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} variant="destructive" onClick={onDelete}>
            <Trash2 className="h-4 w-4"/>
            Видалити
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletionAlert;