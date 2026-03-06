'use client';

import { useGetObjectByIdQuery } from '@/entities/object/api/object-admin-api';
import { EditObject, EditObjectSkeleton } from '@/features/object/edit-object';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditObjectWidget() {
  const params = useParams();
  const obejctId = params.id as string;
  const { data: object, isLoading } = useGetObjectByIdQuery(obejctId);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && object) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, object]);

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <EditObjectSkeleton />
      </div>

      {object && (
        <div
          className={`transition-opacity duration-500 absolute top-0 left-0 w-full ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EditObject object={object} />
        </div>
      )}
    </div>
  );
}
