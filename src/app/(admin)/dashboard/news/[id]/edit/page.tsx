import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {AdminEndPageHeader} from "@/widgets/admin-page-header";
import EditNewsWidget from "@/widgets/edit-news-widget/edit-news-widget";

export default function Page() {
  return (
    <div>
      <AdminEndPageHeader
        title={"Редагування новини"}
        backUrl={ADMIN_PAGES.NEWS}
      />
      <EditNewsWidget />
    </div>
  )
}