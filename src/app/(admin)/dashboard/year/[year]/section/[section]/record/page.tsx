"use client";

import { RecordList } from "@/features/record/record-list";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminPageHeader } from "@/widgets/admin-page-header";
import { useParams } from "next/navigation";


export default function Page() {
  const { year, section } = useParams() as { year: string, section: string };

  return (
    <div>
      <AdminPageHeader 
        title={`${year}: Записи`}
        backUrl={ADMIN_PAGES.SECTIONS(year)}
        forwardAction={{
          url: ADMIN_PAGES.CREATE_RECORD(year, section),
          label: "Створити запис",
        }}
      />
      <RecordList />
    </div>
  )
}