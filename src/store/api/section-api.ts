import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/api/base-query";
import SectionDto from "@/types/DTOs/admin/section-dto";

export const sectionApi = createApi({
    reducerPath: "sectionApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["disclosureSectionYear"],
    endpoints: (builder) => ({
        getDisclosureSection: builder.query<SectionDto, { name: string }>({
            query: ({ name }) => ({
                url: `/info/section/by-name/${name}`,
                method: "GET",
            }),
            providesTags: ["disclosureSectionYear"],
        }),

        createSectionYear: builder.mutation<void, { year: number; title: string }>({
            query: ({ year, title }) => ({
                url: "/info/section",
                method: "POST",
                body: { year: year, title: title },
            }),
            invalidatesTags: ["disclosureSectionYear"]
        }),

        deleteSectionYear: builder.mutation<void, { id: string}>({
            query: ({ id }) => ({
                url: `/info/section/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["disclosureSectionYear"],
        }),

        toggleSectionYearActive: builder.mutation<void, { id: string; isActive: boolean }>({
            query: ({ id, isActive }) => ({
                url: `/info/section/${id}`,
                method: "PATCH",
                body: { isActive },
            }),
            invalidatesTags: ["disclosureSectionYear"],
        }),

        updateSectionsOrder: builder.mutation<void, { id: string; orderNo: number }[]>({
            query: (sections) => ({
                url: "/info/section/order",
                method: "PATCH",
                body: sections,
            }),
            invalidatesTags: ["disclosureSectionYear"],
        }),
         
    }),
});

export const { 
    useGetDisclosureSectionQuery,
    useCreateSectionYearMutation,
    useDeleteSectionYearMutation,
    useToggleSectionYearActiveMutation,
    useUpdateSectionsOrderMutation
 } = sectionApi;
