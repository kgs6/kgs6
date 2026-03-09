import { SettingsList } from "@/features/settings/settings-list";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminEndPageHeader } from "@/widgets/admin-page-header";


export default function Page() {
  return (
    <div>
      <AdminEndPageHeader 
        backUrl={ADMIN_PAGES.DASHBOARD}
        title="Налаштування"
      />
      <SettingsList />
    </div>
  )
}