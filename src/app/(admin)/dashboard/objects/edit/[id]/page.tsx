
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminEndPageHeader } from "@/widgets/admin-page-header";
import EditObjectWidget from "@/widgets/edit-object-widget/edit-object-widget";


export default function Page() {
  return (
    <div>
      <AdminEndPageHeader
        title="Редагування обʼєкта"
        backUrl={ADMIN_PAGES.OBJECTS}
      />
      <EditObjectWidget />
    </div>
  );
}