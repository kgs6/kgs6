import { Skeleton } from "@/components/ui/skeleton";



export default function EditObjectSkeleton() {
  return (
    <div>
      <div className="mt-4">
        <Skeleton className="h-6 w-1/5"/>
        <Skeleton className="h-9 w-full mt-2" />
      </div>
      <div className="mt-6">
        <Skeleton className="h-6 w-1/5"/>
        <Skeleton className="h-64 w-full mt-2" />
      </div>
      <div className="mt-8">
        <Skeleton className="h-64 w-full mt-2" />
      </div>
    </div>
  ) 
}