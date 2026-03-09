"use client"

import { NewsDTO, useGetNewsQuery } from "@/entities/news";
import { NewsTable } from "@/features/news/news-list/news-table";
import NewsFilter from "@/features/news/news-list/news-filter/ui/news-filter";
import { useState, useEffect } from "react";
import { AdminFilterSkeleton } from "@/widgets/admin-filter-skeleton";
import { AdminTableSkeleton } from "@/widgets/admin-table-skeleton";

export default function NewsList() {
  const { data: news, isLoading } = useGetNewsQuery();
  const [filteredNews, setFilteredNews] = useState<NewsDTO[]>(news || []);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && news) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, news]);

  return (
    <div className="mt-4">
      <div
        className={`flex flex-col gap-5 transition-opacity duration-500 ${
          showContent ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <AdminFilterSkeleton />
        <AdminTableSkeleton />
      </div>

      {news && (
        <div
          className={`transition-opacity duration-500 top-0 left-0 w-full ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <NewsFilter news={news} onFilter={setFilteredNews} />
          <NewsTable news={filteredNews} />
        </div>
      )}

      {!isLoading && !news && <p>Новин не знайдено</p>}
    </div>
  );
}