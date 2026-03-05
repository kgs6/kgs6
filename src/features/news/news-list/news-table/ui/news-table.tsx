"use client";

import {NewsDTO} from "@/entities/news";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {NewsTableRow} from "@/features/news/news-list/news-table";

interface NewsTableProps {
  news: NewsDTO[]
}

export default function NewsTable({news}: NewsTableProps) {
  return (
    <div className={"border rounded-lg overflow-hidden"}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"text-start min-w-36 truncate"}>Заголовок</TableHead>
            <TableHead className={"text-start w-28"}>Дата публікації</TableHead>
            <TableHead className={"text-start w-28"}>Статус</TableHead>
            <TableHead className={"w-36 text-start"}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((newsItem) => (
            <NewsTableRow key={newsItem.id} news={newsItem}/>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}