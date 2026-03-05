"use client";

import {useParams} from "next/navigation";
import {useGetSectionsQuery} from "@/entities/section/api/section-admin-api";
import {AdminFilterSkeleton} from "@/widgets/admin-filter-skeleton";
import {AdminTableSkeleton} from "@/widgets/admin-table-skeleton";
import {SectionFilter} from "@/features/section/section-list/section-filter";
import {SectionTable} from "@/features/section/section-list/section-table";
import {useState} from "react";
import {SectionDTO} from "@/entities/section";

export default function SectionList() {
  const params = useParams();
  const year = params.year as string;

  const {data: sections, isLoading} = useGetSectionsQuery(year)
  const [filteredSections, setFilteredSections] = useState<SectionDTO[]>([]);
  const [allowReorder, setAllowReorder] = useState(true);

  return (
    <div className={"mt-4"}>
      {isLoading ? (
        <div className={"flex flex-col gap-4"}>
          <AdminFilterSkeleton />
          <AdminTableSkeleton />
        </div>
      ) : sections ? (
        <div>
          <SectionFilter sections={sections} onFilter={setFilteredSections}
            allowReorder={allowReorder}
            setAllowReorder={setAllowReorder}
          />
          <SectionTable sections={filteredSections} allowReorder={allowReorder} />
        </div>
      ) :  (
        <div>
          Помилка при завантаженні розділів
        </div>
      )}
    </div>
  )
}