import {Skeleton} from "@/components/ui/skeleton";


export default function AdminFilterSkeleton() {
  return (
    <div>
      <div className={"flex gap-2"}>
        <Skeleton className={"w-1/5 h-8"}/>
        <Skeleton className={"w-3/5 h-8"}/>
        <Skeleton className={"w-1/5 h-8"}/>
      </div>
    </div>
  )
}