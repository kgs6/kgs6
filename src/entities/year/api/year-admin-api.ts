import {baseAdminApi} from "@/shared/api";
import {YearDTO} from "@/entities/year";


export const yearAdminApi = 
  baseAdminApi.injectEndpoints({
    endpoints: (build) =>({
      getYear: build.query<YearDTO[], void>({
        query: () => ({
          url: "/year",
          method: "GET",
        }),
        providesTags: ["Years"],
      }),
      
      createYear: build.mutation<void, number>({
        query: (year) => ({
          url: "/year",
          method: "POST",
          body: { year },
        }),
        invalidatesTags: ["Years"],
      }),

      deleteYear: build.mutation<void, string>({
        query: (id) => ({
          url: `/year/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Years"],
      }),

      toggleYearActive: build.mutation<void, string>({
        query: (id) => ({
          url: `/year/${id}/toggle-active`,
          method: "PATCH",
        }),
        invalidatesTags: ["Years"],
      })
      
    })
  })

export const {
  useGetYearQuery,
  useCreateYearMutation,
  useDeleteYearMutation,
  useToggleYearActiveMutation,
} = yearAdminApi