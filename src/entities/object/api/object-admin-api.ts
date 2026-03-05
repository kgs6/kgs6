import { baseAdminApi } from "@/shared/api/base-admin-api";
import { ObjectDTO } from "../model/types";

export const objectAdminApi = 
  baseAdminApi.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation({
      query: (data) => ({
        url: "/object",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Objects"],
    }),

    getObjects: build.query<ObjectDTO[], void>({
      query: () => ({
        url: "/object",
        method: "GET",
      }),
      providesTags: ["Objects"],
    }),

    getObjectById: build.query<ObjectDTO, string>({
      query: (id) => ({
        url: `/object/${id}`,
        method: "GET",
      }),
      providesTags: ["Objects"],
    }),

    toggleObjectActive: build.mutation<void, string>({
      query: (id) => ({
        url: `/object/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Objects"],
    }),

    deleteObject: build.mutation<void, string>({
      query: (id) => ({
        url: `/object/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Objects"],
    }),

    updateObject: build.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/object/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Objects"],
    }),

  }),
});


export const {
  useCreateObjectMutation,
  useGetObjectsQuery,
  useGetObjectByIdQuery,
  useToggleObjectActiveMutation,
  useDeleteObjectMutation,
  useUpdateObjectMutation
} = objectAdminApi
