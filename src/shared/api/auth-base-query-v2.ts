import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQueryV2 = fetchBaseQuery({
  baseUrl: "http://localhost:3000/admin/api",
  credentials: "include",
});

let refreshPromise: Promise<ReturnType<typeof rawBaseQueryV2>> | null = null;

export const baseQueryWithReauthV2: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const url = typeof args === "string" ? args : args.url;
    let result = await rawBaseQueryV2(args, api, extraOptions);

    if (url?.includes("/auth/refresh-token")) return result;

    if (result.error?.status === 401) {
      const alreadyRetried = (extraOptions as any)?._retry;
      if (alreadyRetried) {
        return result;
      }

      const retryExtraOptions = { ...(extraOptions as any), _retry: true };

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            return await rawBaseQueryV2({ url: "/auth/refresh-token", method: "POST" }, api, retryExtraOptions);
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const refreshResult = await refreshPromise;

      if (!refreshResult.error) {
        result = await rawBaseQueryV2(args, api, retryExtraOptions);
        if (result.error?.status === 401) return result;
      } else {
        return refreshResult;
      }
    }

    return result;
  };
