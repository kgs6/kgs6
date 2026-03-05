"use client";

import { EditRecord } from "@/features/record/create-record";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminEndPageHeader } from "@/widgets/admin-page-header";
import { useParams } from "next/navigation";

export default function Page() {
  const { year, section } = useParams() as { year: string, section: string };

  return (
    <div>
      <AdminEndPageHeader 
        title="Редагувати запис"
        backUrl={ADMIN_PAGES.RECORDS(year, section)}
      />
      <EditRecord />
    </div>
  )
}