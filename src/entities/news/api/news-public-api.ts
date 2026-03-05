import {basePublicApi} from "@/shared/api";
import {NewsPublicDTO} from "@/entities/news";


export const newsPublicApi =
  basePublicApi.injectEndpoints({
    endpoints: (build) => ({
      // ? api/news
      getPublicNews: build.query<NewsPublicDTO[], void>({
        query: () => ({
          url: "/news/all",
          method: "GET",
        }),
        providesTags: ["News"],
      }),
    })
  })

export const {
  useGetPublicNewsQuery,
} = newsPublicApi;