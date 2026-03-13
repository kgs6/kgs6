import { CreateUser } from "@/features/user/create-user";
import { UserList } from "@/features/user/user-list";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminPageHeader } from "@/widgets/admin-page-header";


export default function Page() {
  return (
    <div>
      <AdminPageHeader 
        title="Користувачі" 
        backUrl={ADMIN_PAGES.DASHBOARD}
        actionButton={<CreateUser />}
      />
      <UserList />
    </div>
  )
}