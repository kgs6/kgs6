"use client";

import Footer from "@/components/shared/footer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ObjectItem } from "@/entities/object";
import { useGetPublicObjectsQuery } from "@/entities/object/api/object-public-api";

export default function ObjectFeed() {
  const { data: objects, isLoading } = useGetPublicObjectsQuery();


  return (
    <div className="min-h-screen flex flex-col">
      <header className={"mt-4"}>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 wrap-break-words">
          Об&#39;єкти
        </h1>
        <p className="sm:text-base text-muted-foreground">
          Об&#39;єкти Приватне акціонерне товариство &#34;ТРЕСТ КИЇВМІСЬКБУД-6&#34;
        </p>
        <Separator className="mt-6 mb-6" />
      </header>

      <main className="grow">
        {isLoading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col md:flex-row gap-2 lg:gap-12 mb-4 p-4">
              <Skeleton className="h-64 aspect-video" />
              <div className="flex flex-col  md:flex-col gap-4 w-full h-full">
                <Skeleton className="h-8 w-full" />
                <div className="w-full flex flex-col gap-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-3/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : objects && objects.length > 0 ? (

          <div className={"h-full flex flex-col gap-6 w-full"}>
            {objects.map((item, index) => (
              <div key={index} className="w-full">
                <ObjectItem  object={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className={"w-full text-center"}>Новин не знайдено.</p>
        )}
      </main>


      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}