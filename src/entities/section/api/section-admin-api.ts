import {baseAdminApi} from "@/shared/api";
import {SectionDTO} from "@/entities/section";


export const sectionAdminApi =
  baseAdminApi.injectEndpoints({
    endpoints: (build) =>({
      getSections: build.query<SectionDTO[], string>({
        query: (year: string) => ({
          url: `/section/${year}`,
          method: "GET",
        }),
        providesTags: ["Sections"],
      }),

      updateSectionsOrder: build.mutation<void, { id: string; orderNo: number }[]>({
        query: (sections) => ({
          url: "/section/reorder",
          method: "PATCH",
          body: sections,
        }),
        invalidatesTags: ["Sections"],
      }),

      toggleSectionActive: build.mutation<void, string>({
        query: (id) => ({
          url: `/section/toogle-active/${id}/`,
          method: "PATCH",
        }),
        invalidatesTags: ["Sections"],
      }),

      deleteSection: build.mutation<void, string>({
        query: (id) => ({
          url: `/section/delete/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: ["Sections"],
      }),

      crateSection: build.mutation<void, { year: string; title: string}>({
        query: ({year, title}) => ({
          url: "/section",
          method: "POST",
          body: { year, title },
        }),
        invalidatesTags: ["Sections"],
      })


    })
  })

export const {
  useGetSectionsQuery,
  useUpdateSectionsOrderMutation,
  useToggleSectionActiveMutation,
  useDeleteSectionMutation,
  useCrateSectionMutation
} = sectionAdminApi;

