import {EditNews} from "@/features/news/edit-news";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {AdminEndPageHeader} from "@/widgets/admin-page-header";


export default function Page() {
  return (
    <div>
      <AdminEndPageHeader
        title={"Редагування новини"}
        backUrl={ADMIN_PAGES.NEWS}
      />
      <EditNews />
    </div>
  )
}