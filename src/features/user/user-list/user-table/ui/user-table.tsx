"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserAdminDTO } from "@/entities/user/model/types"
import UserTableRow from "./user-table-row";

interface UserTableProps {
  users: UserAdminDTO[]
}

export default function UserTable({users}: UserTableProps) {

  return (
    <div className={"border rounded-lg overflow-hidden"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start min-w-36 truncate"}>Імʼя</TableHead>
            <TableHead className={"text-start min-w-full truncate"}>Пошта</TableHead>
            <TableHead className={"text-start min-w-56"}>Роль</TableHead>
            <TableHead className={"text-start min-w-56"}>Google OAuth</TableHead>
            <TableHead className={"text-start w-36"}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((item) => <UserTableRow key={item.id} user={item} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground h-24"
              >
                Нічого не знайдено
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}