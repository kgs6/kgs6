'use client';

import Footer from '@/components/shared/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPublicSettingsQuery } from '@/entities/settings/api/settings-public-api';

function About() {
  const { data: settings, isLoading } = useGetPublicSettingsQuery();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="px-10 py-4 w-full lg:max-w-7xl mx-auto">
        {isLoading ? (
          <div className="w-full flex flex-col gap-1">
            {[1, 2, 3].map((index) => (
              <div key={index} className="space-y-1.5 mb-4">
                <Skeleton className="h-7 w-[92%]" />{' '}
                <Skeleton className="h-7 w-[85%]" />
                <Skeleton className="h-7 w-[97%]" />
                <Skeleton className="h-7 w-[78%]" />
                <Skeleton className="h-7 w-[88%]" />
                <Skeleton className="h-7 w-[69%]" />
                <Skeleton className="h-7 w-[43%]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1 text-xl whitespace-pre-wrap">
            {settings?.description}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default About;
