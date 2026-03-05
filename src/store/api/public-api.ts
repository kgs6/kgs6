import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {YearDTO} from "@/types/DTOs/public/year-dto";
import {FullYearDTO} from "@/types/DTOs/public/full-year-dto";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
});

export const publicApi = createApi({
  reducerPath: "postsApi",
  baseQuery: publicBaseQuery,
  tagTypes: ["publicApi"],
  endpoints: (builder) => ({

    getAllYears: builder.query<YearDTO[], void>({
      query: () => "/year",
      providesTags: ["publicApi"],
    }),

    getYearByNumber: builder.query<FullYearDTO, number>({
      query: (year) => `/year/${year}`,
      providesTags: ["publicApi"],
    }),

  }),
})

export const {
  useGetAllYearsQuery,
  useGetYearByNumberQuery,
} = publicApi;

