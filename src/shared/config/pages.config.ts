export const PAGES = {
  ABOUT: "/about",
  NEWS: "/news",
  OBJECTS: "/objects",
  STOCK_INFO: "/corporate",
  STOCK_INFO_FOR_YEAR: (year: number) => `/corporate/${year}`,
  CONTACTS: "/contacts",
}

export const ADMIN_PAGES = {
  DASHBOARD: "/dashboard",

  NEWS: "/dashboard/news",
  CREATE_NEWS: "/dashboard/news/create",
  EDIT_NEWS: (id: string) => `/dashboard/news/${id}/edit`,

  YEARS: "/dashboard/year",
  SECTIONS: (year: string) =>  `/dashboard/year/${year}/section`,
  RECORDS: (year: string, section: string) => `/dashboard/year/${year}/section/${section}/record`,
  CREATE_RECORD: (year: string, section: string) => `/dashboard/year/${year}/section/${section}/record/create`,
  EDIT_RECORD: (year: string, section: string, recordId: string) => `/dashboard/year/${year}/section/${section}/record/${recordId}/edit`,

  OBJECTS: "/dashboard/objects",
  CREATE_OBJECTS: "/dashboard/objects/create",
  EDIT_OBJECTS: (id: string) => `/dashboard/objects/edit/${id}`,

  USERS: "/dashboard/users",


  // ? Site settings
  SETTINGS: "/dashboard/settings",

}