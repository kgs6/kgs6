"use client";

import { useParams } from "next/navigation";
import { useGetSectionsQuery } from "@/entities/section/api/section-admin-api";
import { AdminFilterSkeleton } from "@/widgets/admin-filter-skeleton";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";
import { SectionFilter } from "@/features/section/section-list/section-filter";
import { SectionTable } from "@/features/section/section-list/section-table";
import { useState, useEffect } from "react";
import { SectionDTO } from "@/entities/section";

export default function SectionList() {
  const params = useParams();
  const year = params.year as string;

  const { data: sections, isLoading } = useGetSectionsQuery(year);

  const [filteredSections, setFilteredSections] = useState<SectionDTO[]>([]);
  const [allowReorder, setAllowReorder] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && sections) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, sections]);

  return (
    <div className="mt-4">
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

      {sections && (
        <div
          className={`mt-4 transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <SectionFilter
            sections={sections}
            onFilter={setFilteredSections}
            allowReorder={allowReorder}
            setAllowReorder={setAllowReorder}
          />

          <SectionTable
            sections={filteredSections}
            allowReorder={allowReorder}
          />
        </div>
      )}

      {!isLoading && !sections && (
        <div>Помилка при завантаженні розділів</div>
      )}
    </div>
  );
}