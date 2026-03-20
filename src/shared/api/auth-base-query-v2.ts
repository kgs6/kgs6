import { Mutex } from 'async-mutex';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const mutex = new Mutex();

const rawBaseQueryV2 = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api`,
  credentials: 'include',
});

export const baseQueryWithReauthV2: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { _retry?: boolean }
> = async (args, api, extraOptions = {}) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQueryV2(args, api, extraOptions);

  if (result.error?.status === 401 && !extraOptions._retry) {
    
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      
      try {
        const refreshResult = await rawBaseQueryV2(
          { url: '/auth/refresh-token', method: 'POST' },
          api,
          extraOptions
        );

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
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await rawBaseQueryV2(args, api, {
        ...extraOptions,
        _retry: true,
      });
    }
  }

  return result;
};