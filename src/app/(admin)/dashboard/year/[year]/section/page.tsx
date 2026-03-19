"use client";

import {AdminPageHeader} from "@/widgets/admin-page-header";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {SectionList} from "@/features/section/section-list";
import { CreateSection } from "@/features/section/create-section";
import { useParams } from "next/navigation";

export default function Page() {
  const year = useParams().year as string;

  
  return (
    <div>
      <AdminPageHeader
        title={`${year}: Розділи`}
        backUrl={ADMIN_PAGES.YEARS}
        actionButton={<CreateSection />}
      />
      <SectionList />
    </div>
  );
}