
import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithReauth} from "@/store/api/base-query";
import YearDto from "@/types/DTOs/admin/year-dto";

export const disclosureApi = createApi({
    reducerPath: "disclosureApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["DisclosureYear"],
    endpoints: (builder) => ({

        createYear: builder.mutation<void, number>({
            query: (year) => ({
                url: "/info/year",
                method: "POST",
                body: { year },
            }),
            invalidatesTags: ["DisclosureYear"],
        }),

        getYear: builder.query<YearDto[], void>({
            query: () => ({
                url: "/info/year",
                method: "GET",
            }),
            providesTags: ["DisclosureYear"],
        }),

        deleteYear: builder.mutation<void, string>({
            query: (id) => ({
                url: `/info/year/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DisclosureYear"],
        }),

        toggleYearActive: builder.mutation<void, { id: string; isActive: boolean }>({
            query: ({ id, isActive }) => ({
                url: `/info/year/${id}`,
                method: "PATCH",
                body: { isActive },
            }),
            invalidatesTags: ["DisclosureYear"],
        }),

        getYearById: builder.query<YearDto, string>({
            query: (id) => ({
                url: `/info/year/${id}`,
                method: "GET",
            }),
            providesTags: ["DisclosureYear"],
        }),

        getYearByYear: builder.query<YearDto, number>({
            query: (year) => ({
                url: `/info/year/by-year/${year}`,
                method: "GET",
            }),
            providesTags: ["DisclosureYear"],

        }),
    }),
});

export const { useCreateYearMutation,
    useGetYearQuery,
    useDeleteYearMutation,
    useToggleYearActiveMutation,
    useGetYearByIdQuery,
    useGetYearByYearQuery
} = disclosureApi;
