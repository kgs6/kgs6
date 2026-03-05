import React from 'react';
import {AdminEndPageHeader} from "@/widgets/admin-page-header";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {CreateNews} from "@/features/news/create-news";


export default function Page() {
  return (
    <div className={"flex flex-col gap-4"}>
      <AdminEndPageHeader
        title={"Створення новини"}
        backUrl={ADMIN_PAGES.NEWS}
      />
      <CreateNews />
    </div>
  );
};
