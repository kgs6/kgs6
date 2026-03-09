'use client';

import { useGetRecordByIdQuery } from '@/entities/record/api/record-admin-api';
import { EditRecord } from '@/features/record/create-record';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditObjectWidget() {
  const params = useParams();
  const id = params.id as string;
  const { data: record, isLoading } = useGetRecordByIdQuery(id);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading && record) {
      const timeout = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, record]);

  return (
    <div className="mt-4">
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >

      </div>

      {record && (
        <div
          className={`transition-opacity duration-500 top-0 left-0 w-full mb-4 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <EditRecord record={record} />
        </div>
      )}
    </div>
  );
}
