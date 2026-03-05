import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/api/base-query";


export const recordApi = createApi({
    reducerPath: "recordApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["SectionRecord"],
    endpoints: (builder) => ({

        createSectionRecord: builder.mutation({
            query: (data) => ({
                url: "/info/section/record",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SectionRecord"],
        }),

        updateRecordOrder: builder.mutation<void, { id: string; orderNo: number }[]>({
            query: (records) => ({
                url: "/info/section/record/reorder",
                method: "PATCH",
                body: records,
            }),
            invalidatesTags: ["SectionRecord"],
        }),

        toggleRecordActive: builder.mutation<void, { id: string; isActive: boolean }>({
            query: ({id, isActive}) => ({
                url: `/info/section/record/${id}`,
                method: "PATCH",
                body: {isActive},
            }),
            invalidatesTags: ["SectionRecord"],
        }),

        deleteRecord: builder.mutation<void, { id: string }>({
            query: ({id}) => ({
                url: `/info/section/record/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SectionRecord"],
        }),

        getSectionRecord: builder.query({
            query: (id) => ({
                url: `/info/section/record/${id}`,
                method: "GET",
            }),
             providesTags: (result, error, id) => [{ type: "SectionRecord", id }],
        }),

        updateSectionRecord: builder.mutation({
            query: ({id, data}) => ({
                url: `/info/section/record/${id}`,
                method: "PUT",
                body: data,
            }),
             invalidatesTags: (result, error, {id}) => [{ type: "SectionRecord", id }],
        })

    }),
})

export const {
    useCreateSectionRecordMutation,
    useUpdateRecordOrderMutation,
    useToggleRecordActiveMutation,
    useDeleteRecordMutation,
    useGetSectionRecordQuery,
    useUpdateSectionRecordMutation,
} = recordApi;