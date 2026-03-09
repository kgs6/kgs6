"use client";

import { useGetObjectsQuery } from "@/entities/object/api/object-admin-api";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { ObjectTable } from "../object-table";
import { useState, useEffect } from "react";

export default function ObjectList() {
  const { data: objectsData, isLoading } = useGetObjectsQuery();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && objectsData) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, objectsData]);

  return (
    <div>
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <AdminTableSkeleton />
      </div>

      {objectsData && (
        <div
          className={`mt-4 transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <ObjectTable objects={objectsData} />
        </div>
      )}

      {!isLoading && !objectsData && (
        <div>Помилка при завантаженні даних</div>
      )}
    </div>
  );
}