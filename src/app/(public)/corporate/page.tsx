"use client";

import { useEffect } from "react";
import { useGetAllYearsQuery } from "@/store/api/public-api";
import { useRouter } from "next/navigation";
import { PAGES } from "@/shared/config/pages.config";

export default function StockInfoPage() {
  const router = useRouter();
  const { data: yearList, isLoading } = useGetAllYearsQuery();

  console.log(yearList, isLoading);

  useEffect(() => {
    if (!isLoading && yearList && yearList.length > 0) {
      router.replace(PAGES.STOCK_INFO_FOR_YEAR(yearList[0].year));
    }
  }, [yearList, isLoading, router]);

  if (isLoading || (yearList && yearList.length > 0)) {
    return (
      <div className="mt-12 w-full text-center">
        <h1 className="text-3xl font-bold">Інформація про запаси</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full text-center">
      <h1 className="text-3xl font-bold">Інформація про запаси</h1>
      <p className="text-muted-foreground">На жаль, записи наразі відсутні</p>
    </div>
  );
}