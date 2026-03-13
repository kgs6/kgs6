"use client";

import AllowUserOauthBadge from "@/components/shared/allow-google-oauth";
import DeletionAlert from "@/components/shared/deletion-alert";
import UserRoleBadge from "@/components/shared/user-role-badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteUserMutation } from "@/entities/user/api/user-api";
import { UserAdminDTO } from "@/entities/user/model/types"
import { EditUser } from "@/features/user/edit-user";
import { useIsMobile } from "@/hooks/use-mobile";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import {  Pencil } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface UserTableRowProps {
  user: UserAdminDTO
}

export default function UserTableRow({user}: UserTableRowProps) {
  const isMobile = useIsMobile();
  const [deleteUser, {isLoading: isDeletingUser}] = useDeleteUserMutation();


  async function handleDeleteSection() {
      try {
        await deleteUser(user.id).unwrap();
        toast.success("Розділ видалено успішно");
      } catch (e: unknown) {
        const msg = getErrorMessage(e) || "Помилка видалення розділу";
        toast.error(msg);
      }
    }
  
    // async function handleToggleActive() {
    //   try {

  
    //     toast.success(` успішно`);
    //   } catch (e: unknown) {
    //     const msg = getErrorMessage(e) || "Помилка зміни статусу розділу";
    //     toast.error(msg);
    //   }
    // }

  return (
    <TableRow>
      <TableCell>
        {user.name}
      </TableCell>
      <TableCell>
        {user.email}
      </TableCell>
      
      <TableCell>
        <UserRoleBadge role={user.role} />
      </TableCell>
      
      <TableCell>
        <AllowUserOauthBadge allowed={user.oauthOnly} />
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-end gap-4 md:gap-2">
          <EditUser user={user}/>
          <DeletionAlert
            onDelete={() => handleDeleteSection()}
            isIconButton
            isDeleting={isDeletingUser}
            alertTitle={"Ви впевнені, що хочете видалити цього користувача?"}
            alertDescription={"Ця дія не може бути скасована. Це назавжди видалить користувача з наших серверів."}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}