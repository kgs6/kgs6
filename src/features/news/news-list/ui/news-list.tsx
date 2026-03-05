"use client"

import {NewsDTO, useGetNewsQuery} from "@/entities/news";
import {NewsTable} from "@/features/news/news-list/news-table";
import NewsFilter from "@/features/news/news-list/news-filter/ui/news-filter";
import {useState} from "react";
import {AdminFilterSkeleton} from "@/widgets/admin-filter-skeleton";
import {AdminTableSkeleton} from "@/widgets/admin-table-skeleton";

export default function NewsList() {
  const {data: news, isLoading} = useGetNewsQuery()
  const [filteredNews, setFilteredNews] = useState<NewsDTO[]>([]);

  return (
    <div className={"mt-4"}>
      {isLoading ? (
        <div className={"flex flex-col gap-4"}>
          <AdminFilterSkeleton />
          <AdminTableSkeleton />
        </div>
      ) : news ? (
        <div>
          <NewsFilter news={news} onFilter={setFilteredNews}/>
          <NewsTable news={filteredNews}/>
        </div>
      ) : (
        <p>Новин не знайдено</p>
      )}

    </div>
  )
}