import { Skeleton } from '@/components/ui/skeleton';

export default function EditRecordSkeleton() {
  return (
    <div className="mt-2">
      <div>
        <Skeleton className="h-4 w-1/4 mb-3" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div className='mt-8'>
        <Skeleton className="h-4 w-1/4 mb-3" />
        <Skeleton className="h-14 w-full mb-4" />
      </div>
      <div className='mt-8'>
        <Skeleton className="h-4 w-1/4 mb-3" />
        <div className='flex gap-6'>
          <Skeleton className="h-9 w-1/5 mb-4" />
          <Skeleton className="h-9 w-1/5 mb-4" />
        </div>
      </div>
      <div className='mt-5'>
        <Skeleton className="h-68 w-full mb-4" />
      </div>
    </div>
  );
};