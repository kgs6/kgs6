"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FieldGroup } from "@/components/ui/field";

export default function ContactSettingsSkeleton() {
  return (
    <div className="h-full w-full animate-pulse mt-4">
      <div className="mb-4 h-8 w-1/3 bg-muted rounded" /> {/* заголовок */}

      <form>
        <FieldGroup>
          {/* Адрес */}
          <div className="mb-4">
            <div className="h-4 w-1/4 bg-muted rounded mb-2" /> {/* label */}
            <Skeleton className="h-10 w-full rounded" />
          </div>

          {/* Телефон */}
          <div className="mb-4">
            <div className="h-4 w-1/4 bg-muted rounded mb-2" /> {/* label */}
            <Skeleton className="h-10 w-full rounded" />
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="h-4 w-1/4 bg-muted rounded mb-2" /> {/* label */}
            <Skeleton className="h-10 w-full rounded" />
          </div>

          {/* Maps URL */}
          <div className="mb-4">
            <div className="h-4 w-1/4 bg-muted rounded mb-2" /> {/* label */}
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}