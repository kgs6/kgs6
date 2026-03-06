'use client';

import { useGetPublicNewsQuery } from '@/entities/news/api/news-public-api';
import { Skeleton } from '@/components/ui/skeleton';
import { NewsItem } from '@/entities/news';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/shared/footer';
import { useGetPublicSettingsQuery } from '@/entities/settings/api/settings-public-api';

export default function NewsFeed() {
  const { data: news, isLoading: isLoadingNews } = useGetPublicNewsQuery();
  const { data: settings } = useGetPublicSettingsQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <header className={'mt-4'}>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 wrap-break-words">
          Новини
        </h1>
        {settings ? (
          <p className="sm:text-base text-muted-foreground">
            Нещодавні події у {settings.companyName}
          </p>
        ) : (
          <Skeleton className='h-6 w-1/2'/>
        )}
        <Separator className="mt-6 mb-6" />
      </header>

      <main className="grow">
        {isLoadingNews ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="mb-4 p-4 animate-pulse">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        ) : news && news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className={'mb-2'}>
              <NewsItem news={item} />
            </div>
          ))
        ) : (
          <p className={'w-full text-center'}>Новин не знайдено.</p>
        )}
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
