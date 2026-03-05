import {baseAdminApi} from "@/shared/api";
import {NewsCreateDTO, NewsDTO, NewsEditDTO} from "@/entities/news";


export const newsAdminApi =
  baseAdminApi.injectEndpoints({
    endpoints: (build) => ({
      getNews: build.query<NewsDTO[], void>({
        query: () => ({
          url: "/news",
          method: "GET",
        }),
        providesTags: ["News"],
      }),

      getNewsById: build.query<NewsDTO, string>({
        query: (id) => ({
          url: `/news/${id}`,
          method: "GET",
        }),
        providesTags: ["News"],
      }),

      createNews: build.mutation<void, NewsCreateDTO>({
        query: (news) => ({
          url: "/news",
          method: "POST",
          body: news,
        }),
        invalidatesTags: ["News"],
      }),

       updateNews: build.mutation<void, {id: string, data: NewsEditDTO}>({
         query: ({id, data}) => ({
           url: `/news/${id}`,
           method: "PATCH",
           body: data,
         }),
         invalidatesTags: ["News"],
       }),

       deleteNews: build.mutation<void, string>({
         query: (id) => ({
           url: `/news/${id}`,
           method: "DELETE",
         }),
         invalidatesTags: ["News"],
       }),

       toggleNewsActive: build.mutation<void, string>({
         query: (id) => ({
           url: `/news/${id}/toggle-active`,
           method: "PATCH",
         }),
         invalidatesTags: ["News"],
       }),
    })
  });

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useToggleNewsActiveMutation,
  useUpdateNewsMutation,
} = newsAdminApi;