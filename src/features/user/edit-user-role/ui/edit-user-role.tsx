"use client";

import UserRoleBadge from "@/components/shared/user-role-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface EditUserRoleProps {
  currentRole: string;
  userId: string;
}

export default function EditUserRole({
  currentRole,
  userId,
}: EditUserRoleProps) {
  const [role, setRole] = useState(currentRole);

  

  return (
    <Select onValueChange={setRole} value={role}>
      <SelectTrigger className="w-32 border-0 shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USER">
          <UserRoleBadge role="USER" />
        </SelectItem>
        <SelectItem value="ADMIN">
          <UserRoleBadge role="ADMIN" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
