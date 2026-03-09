"use client";

import { useGetRecordsQuery } from "@/entities/record/api/record-admin-api";
import { AdminFilterSkeleton } from "@/widgets/admin-filter-skeleton";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { useParams } from "next/navigation";
import { RecordTable } from "../record-table";
import { RecordDTO } from "@/entities/record";
import { useState, useEffect } from "react";
import { RecordFilter } from "../record-filter.tsx";

export default function RecordList() {
  const sectionName = useParams().section as string;

  const { data: records, isLoading } = useGetRecordsQuery(sectionName);

  const [filteredRecords, setFilteredRecords] = useState<RecordDTO[]>([]);
  const [allowReorder, setAllowReorder] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && records) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, records]);

  return (
    <div className="mt-4">
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <AdminFilterSkeleton />
        <AdminTableSkeleton />
      </div>

      {records && (
        <div
          className={`mt-4 transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <RecordFilter
            sections={records}
            onFilter={setFilteredRecords}
            allowReorder={allowReorder}
            setAllowReorder={setAllowReorder}
          />

          <RecordTable
            records={filteredRecords}
            allowReorder={allowReorder}
          />
        </div>
      )}

      {!isLoading && !records && (
        <div>No records found.</div>
      )}

    </div>
  );
}