import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api`,
  credentials: "include",
});

let refreshPromise: Promise<ReturnType<typeof rawBaseQuery>> | null = null;

function redirectToLogin() {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/login-form") window.location.href = "/login-form";
}

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    const url = typeof args === "string" ? args : args.url;
    let result = await rawBaseQuery(args, api, extraOptions);

    if (url?.includes("/auth/refresh-token")) return result;

    if (result.error?.status === 401) {
      const alreadyRetried = (extraOptions as any)._retry;
      if (alreadyRetried) {
        redirectToLogin();
        return result;
      }

      const retryExtraOptions = { ...(extraOptions as any), _retry: true };

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            return await rawBaseQuery({ url: "/auth/refresh-token", method: "POST" }, api, retryExtraOptions);
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const refreshResult = await refreshPromise;

      if (!refreshResult.error) {
        result = await rawBaseQuery(args, api, retryExtraOptions);
        if (result.error?.status === 401) redirectToLogin();
      } else {
        redirectToLogin();
      }
    }

    return result;
  };
