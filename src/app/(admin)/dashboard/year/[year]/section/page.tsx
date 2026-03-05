import {AdminPageHeader} from "@/widgets/admin-page-header";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {SectionList} from "@/features/section/section-list";
import { CreateSection } from "@/features/section/create-section";

export default function Page() {
  return (
    <div>
      <AdminPageHeader
        title={"Розділи"}
        backUrl={ADMIN_PAGES.YEARS}
        actionButton={<CreateSection />}
      />
      <SectionList />
    </div>
  );
}