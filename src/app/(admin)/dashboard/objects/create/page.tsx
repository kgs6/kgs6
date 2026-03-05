import { CreateObject } from "@/features/object/create-object";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminEndPageHeader } from "@/widgets/admin-page-header";


export default function Page() {
  return (
    <div>
      <AdminEndPageHeader
        title="Створення обʼєкта"
        backUrl={ADMIN_PAGES.OBJECTS}
      />
      <CreateObject />
    </div>
  );
}