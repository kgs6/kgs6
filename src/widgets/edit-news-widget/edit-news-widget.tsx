'use client';

import { useGetNewsByIdQuery } from '@/entities/news/api/news-admin-api';
import { EditNews, EditNewsSkeleton } from '@/features/news/edit-news';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditNewsWidget() {
  const params = useParams();
  const newsId = params.id as string;
  const { data: news, isLoading: isLoadingNews } = useGetNewsByIdQuery(
    newsId ?? '',
    {
      skip: !newsId,
    },
  );

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoadingNews && news) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoadingNews, news]);

  return (
    <div>
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'
        }`}
      >
        <EditNewsSkeleton />
      </div>

      {news && (
        <div
          className={`transition-opacity mt-4 duration-500 top-0 left-0 w-full ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EditNews news={news} />
        </div>
      )}
    </div>
  );
}