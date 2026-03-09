import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQueryV2 = fetchBaseQuery({
  baseUrl: "http://localhost:3000/admin/api",
  credentials: "include",
});

let refreshPromise: Promise<ReturnType<typeof rawBaseQueryV2>> | null = null;

interface ExtraOptionsWithRetry {
  _retry?: boolean;
  [key: string]: unknown;
}

export const baseQueryWithReauthV2: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  let result = await rawBaseQueryV2(args, api, extraOptions);

  if (url?.includes("/auth/refresh-token")) return result;

  // Если 401
  if (result.error?.status === 401) {
    const alreadyRetried = (extraOptions as ExtraOptionsWithRetry)?._retry;
    if (alreadyRetried) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return result;
    }

    const retryExtraOptions: ExtraOptionsWithRetry = { ...(extraOptions as ExtraOptionsWithRetry), _retry: true };

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
      if (result.error?.status === 401 && typeof window !== "undefined") {
        window.location.href = "/login"; // редирект если снова 401
      }
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return refreshResult;
    }
  }

  return result;
};