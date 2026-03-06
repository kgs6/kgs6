"use client";

import { useGetObjectsQuery } from "@/entities/object/api/object-admin-api";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { ObjectTable } from "../object-table";
import { useState, useEffect } from "react";

export default function ObjectList() {
  const { data: objectsData, isLoading } = useGetObjectsQuery();
  const [showContent, setShowContent] = useState(false);

  // Когда данные загружены, запускаем плавное появление
  useEffect(() => {
    if (!isLoading && objectsData) {
      const timeout = setTimeout(() => setShowContent(true), 50); // небольшая задержка для плавности
      return () => clearTimeout(timeout);
    }
  }, [isLoading, objectsData]);

  return (
    <div className="mt-4 relative">
      {/* Skeleton */}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <AdminTableSkeleton />
      </div>

      {/* Контент */}
      {objectsData && (
        <div
          className={`transition-opacity duration-500 absolute top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <ObjectTable objects={objectsData} />
        </div>
      )}

      {/* Ошибка */}
      {!isLoading && !objectsData && (
        <div>Помилка при завантаженні даних</div>
      )}
    </div>
  );
}