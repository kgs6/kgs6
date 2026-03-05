"use client";

import { useGetObjectsQuery } from "@/entities/object/api/object-admin-api";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { ObjectTable } from "../object-table";


export default function ObjectList() {
  const {data: objectsData, isLoading} = useGetObjectsQuery();

  return (
    <div className="mt-4">
      {isLoading ? (
        <div>
          <AdminTableSkeleton />
        </div>
      ) : objectsData ? (
        <div>
          <ObjectTable objects={objectsData}/>
        </div>
      ) : (
        <div>
          Помилка при завантаженні даних
        </div>
      )}
    </div>
  )
}