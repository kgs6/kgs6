import {AdminPageHeader} from "@/widgets/admin-page-header";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {NewsList} from "@/features/news/news-list";

function NewsPage() {
  return (
    <div>
      <AdminPageHeader
        title={"Новини"}
        backUrl={ADMIN_PAGES.DASHBOARD}
        forwardAction={{url: ADMIN_PAGES.CREATE_NEWS, label: "Створити новину"}}
      />
      <NewsList/>
    </div>
  );
}

export default NewsPage;