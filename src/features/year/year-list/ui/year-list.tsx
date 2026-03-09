"use client";

import { YearFilter } from "@/features/year/year-list/years-filter";
import YearsTable from "@/features/year/year-list/years-table/ui/years-table";
import { AdminFilterSkeleton } from "@/widgets/admin-filter-skeleton";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { useState, useEffect } from "react";
import { YearDTO } from "@/entities/year";
import { useGetYearQuery } from "@/entities/year/api/year-admin-api";

export default function YearList() {
  const { data: years, isLoading } = useGetYearQuery();
  const [filteredYears, setFilteredYears] = useState<YearDTO[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && years) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, years]);

  return (
    <div className="mt-4">

      {/* Skeleton */}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-4">
          <AdminFilterSkeleton />
          <AdminTableSkeleton />
        </div>
      </div>

      {/* Content */}
      {years && (
        <div
          className={`mt-4 transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <YearFilter years={years} onFilter={setFilteredYears} />
          <YearsTable years={filteredYears} />
        </div>
      )}

      {!isLoading && !years && (
        <div>No data</div>
      )}
    </div>
  );
}