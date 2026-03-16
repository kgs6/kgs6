import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQueryV2 = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api`,
  credentials: "include",
});

// Храним промис рефреша вне функции
let refreshPromise: Promise<any> | null = null;

export const baseQueryWithReauthV2: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  
  // 1. Выполняем основной запрос
  let result = await rawBaseQueryV2(args, api, extraOptions);

  // Не пытаемся рефрешить, если это сам запрос рефреша или логина
  if (url?.includes("/auth/refresh-token") || url?.includes("/auth/login")) {
    return result;
  }

  // 2. Если получили 401 (Unauthorized)
  if (result.error?.status === 401) {
    
    // Если мы уже пытались рефрешнуть этот конкретный запрос (защита от зацикливания)
    if ((extraOptions as any)?._retry) {
      return result; 
    }

    if (!refreshPromise) {
      refreshPromise = (async () => {
        const refreshResult = await rawBaseQueryV2(
          { url: "/auth/refresh-token", method: "POST" },
          api,
          extraOptions
        );

        // Даем небольшую паузу (200мс) перед очисткой, чтобы все "стоящие в очереди" 
        // запросы успели получить результат этого промиса
        setTimeout(() => { refreshPromise = null; }, 200);

        return refreshResult;
      })();
    }

    const refreshResult = await refreshPromise;

    if (!refreshResult.error) {
      // 3. Рефреш успешен! Повторяем исходный запрос с флагом _retry
      result = await rawBaseQueryV2(args, api, { ...extraOptions, _retry: true });
    } else {
      // 4. Рефреш реально сдох (или его нет в куках)
      if (typeof window !== "undefined") {
        // Очищаем стор (опционально) и редиректим
        // api.dispatch(logoutAction()); 
        window.location.href = "/login";
      }
    }
  }

  return result;
};