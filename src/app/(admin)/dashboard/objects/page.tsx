import { ObjectList } from "@/features/object/object-list";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { AdminPageHeader } from "@/widgets/admin-page-header";


function ObjectsPage() {
    return ( 
        <div>
            <AdminPageHeader 
                title="Обʼєкти"
                backUrl={ADMIN_PAGES.DASHBOARD}
                forwardAction={{
                    label: "Додати обʼєкт",
                    url: ADMIN_PAGES.CREATE_OBJECTS
                }} 
            />
            <ObjectList />
        </div>
     );
}

export default ObjectsPage;