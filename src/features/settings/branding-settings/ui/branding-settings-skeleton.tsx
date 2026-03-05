import { Skeleton } from "@/components/ui/skeleton";

export default function BrandingSettingsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <Skeleton className="h-8 w-48 mb-4 rounded-md" />

      <div className="mb-6">
        <Skeleton className="w-40 h-40 rounded-xl" />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}