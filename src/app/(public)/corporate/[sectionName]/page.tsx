'use client';

// import React, {useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import {
  useGetAllYearsQuery,
  useGetYearByNumberQuery,
} from '@/store/api/public-api';

import { Separator } from '@/components/ui/separator';
import Footer from '@/components/shared/footer';
import YearNavigation from './_widgets/year-navigation';
import SelectYear from './_widgets/select-year';
import MainInfo from './_widgets/main-info';
import { PageAnimatePresence } from '@/components/shared/page-animate-presence';

export default function StockInfoPage() {
  const pathname = usePathname();
  const yearFromPath = pathname.split('/')[2];

  const { data: yearsList, isLoading: isListLoading } = useGetAllYearsQuery();
  const { data: yearData, isLoading: isContentLoading } =
    useGetYearByNumberQuery(parseInt(yearFromPath));

  if (isListLoading)
    return <div className="p-10 text-center">Завантаження...</div>;

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-10">
        <aside className="hidden sm:block md:col-span-1 mt-26">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Роки
            </h3>
            <YearNavigation
              years={yearsList || []}
              activeYear={parseInt(yearFromPath)}
            />
          </div>
        </aside>

        <main className="col-span-1 sm:col-span-3 md:col-span-4 min-w-0 w-full overflow-hidden">
          <PageAnimatePresence>
            {yearsList && (
              <SelectYear
                years={yearsList.map((y) => y.year).sort((a, b) => b - a)}
                selectedYear={parseInt(yearFromPath)}
              />
            )}

            <header className={'mt-4'}>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 wrap-break-words">
                Звітність за {yearFromPath} рік
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Архів офіційної документації та фінансової звітності.
              </p>
              <Separator className="mt-6 mb-6" />
            </header>

            {isContentLoading ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-40 bg-slate-100 rounded-lg w-full"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full min-w-0">
                <MainInfo sections={yearData?.sections || []} />
              </div>
            )}
          </PageAnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
}
