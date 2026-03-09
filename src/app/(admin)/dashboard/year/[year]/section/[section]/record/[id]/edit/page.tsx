"use client";
import { ADMIN_PAGES } from '@/shared/config/pages.config';
import { AdminEndPageHeader } from '@/widgets/admin-page-header';
import EditRecordWidget from '@/widgets/edit-record-widget/edit-record-widget';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const year = params.year as string;
  const section = params.section as string;

  return (
    <div>
      <AdminEndPageHeader
        title="Редагування обʼєкта"
        backUrl={ADMIN_PAGES.RECORDS(year, section)}
      />
      <EditRecordWidget />
    </div>
  );
}
