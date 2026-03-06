'use client';

import { NewsDTO } from '@/entities/news';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { NewsTableRow } from '@/features/news/news-list/news-table';

interface NewsTableProps {
  news: NewsDTO[];
}

export default function NewsTable({ news }: NewsTableProps) {
  return (
    <div className={'border rounded-lg overflow-hidden'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={'text-start min-w-36 truncate'}>
              Заголовок
            </TableHead>
            <TableHead className={'text-start w-28'}>Дата публікації</TableHead>
            <TableHead className={'text-start w-28'}>Статус</TableHead>
            <TableHead className={'w-36 text-start'}>Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news && news.length > 0 ? (
            news.map((item) => <NewsTableRow key={item.id} news={item} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground h-24"
              >
                Нічого не знайдено
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
