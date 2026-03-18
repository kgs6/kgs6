import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

interface CustomExtraOptions {
  _retry?: boolean;
}

const rawBaseQueryV2 = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api`,
  credentials: 'include',
});

let refreshPromise: Promise<{
  data?: unknown;
  error?: FetchBaseQueryError;
}> | null = null;

export const baseQueryWithReauthV2: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  CustomExtraOptions // Добавляем типизацию сюда
> = async (args, api, extraOptions = {}) => {
  const url = typeof args === 'string' ? args : args.url;

  let result = await rawBaseQueryV2(args, api, extraOptions);

  if (url?.includes('/auth/refresh-token') || url?.includes('/auth/login')) {
    return result;
  }

  if (result.error?.status === 401) {
    if (extraOptions._retry) {
      return result;
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const refreshResult = await rawBaseQueryV2(
            { url: '/auth/refresh-token', method: 'POST' },
            api,
            extraOptions,
          );
          return refreshResult;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const refreshResult = await refreshPromise;

    if (!refreshResult.error) {
      result = await rawBaseQueryV2(args, api, {
        ...extraOptions,
        _retry: true,
      });
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  return result;
};
