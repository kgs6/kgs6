import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauthV2} from "@/shared/api/auth-base-query-v2";

export const baseAdminApi = createApi({
  reducerPath: "apiAdmin",
  baseQuery: baseQueryWithReauthV2,
  tagTypes: ["News", "Years", "Sections", "Records", "Objects", "Settings", "Users"],
  endpoints: () => ({}),
});

 export const {usePrefetch} = baseAdminApi;