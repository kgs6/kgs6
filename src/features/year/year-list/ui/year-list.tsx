"use client"


import {YearFilter} from "@/features/year/year-list/years-filter";
import YearsTable from "@/features/year/year-list/years-table/ui/years-table";
import {AdminFilterSkeleton} from "@/widgets/admin-filter-skeleton";
import {AdminTableSkeleton} from "@/widgets/admin-table-skeleton";
import {useState} from "react";
import {YearDTO} from "@/entities/year";
import {useGetYearQuery} from "@/entities/year/api/year-admin-api";

export default function YearList() {
  const {data: years, isLoading: yearsLoading} = useGetYearQuery();
  const [filteredYears, setFilteredYears] = useState<YearDTO[]>([]);

  return (
    <div className={"mt-4"}>
      {yearsLoading ? (
        <div className={"flex flex-col gap-4"}>
          <AdminFilterSkeleton />
          <AdminTableSkeleton />
        </div>
      ) : years ? (
          <div>
            <YearFilter years={years} onFilter={setFilteredYears}/>
            <YearsTable years={filteredYears} />
          </div>
      ) : (
        <div>
          No data
        </div>
      )}

    </div>
  )
}