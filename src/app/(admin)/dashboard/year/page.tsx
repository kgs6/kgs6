import {YearList} from "@/features/year/year-list";
import {AdminPageHeader} from "@/widgets/admin-page-header";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {CreateYear} from "@/features/year/create-year";


export default function Page() {
  return(
    <div>
      <AdminPageHeader
        title={"Інформація для акціонерів та стейкхолдерів"}
        backUrl={ADMIN_PAGES.DASHBOARD}
        actionButton={<CreateYear />}
        />
      <YearList />
    </div>
  )
}