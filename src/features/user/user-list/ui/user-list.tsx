"use client";

import { useGetUsersQuery } from "@/entities/user/api/user-api";
import { useEffect, useState } from "react";
import { UserTable } from "../user-table";

export default function UserList() {
  const {data: users, isLoading} = useGetUsersQuery(); 
  const [showContent, setShowContent] = useState(false);
  // const [filteredSections, setFilteredSections] = useState<SectionDTO[]>([]);

  useEffect(() => {
    if (!isLoading && users) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, users]);

  return (
    <div className="mt-4">
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-4">
          
        </div>
      </div>

      {users && (
        <div
          className={`mt-4 transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <UserTable users={users}/>
        </div>
      )}

      {!isLoading && !users && (
        <div>Помилка при завантаженні розділів</div>
      )}
    </div>
  );
}