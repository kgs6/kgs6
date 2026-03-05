
import EditObject from "@/features/object/edit-object/ui/edit-object";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminEndPageHeader } from "@/widgets/admin-page-header";


export default function Page() {
  return (
    <div>
      <AdminEndPageHeader
        title="Редагування обʼєкта"
        backUrl={ADMIN_PAGES.OBJECTS}
      />
      <EditObject />
    </div>
  );
}