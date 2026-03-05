import { baseAdminApi } from "@/shared/api";
import RecordAdminDTO, { RecordDTO } from "../model/types";



export const recordAdminApi = 
  baseAdminApi.injectEndpoints({
    endpoints: (build) => ({
      getRecords: build.query<RecordDTO[], string>({
        query: (section: string) => ({
          url: `/record/${section}`,
          method: "GET",
        }),
        providesTags: ["Records"],
      }),

      getRecordById: build.query<RecordAdminDTO, string>({
        query: (id: string) => ({
          url: `/record/by-id/${id}`,
          method: "GET",
        }),
        providesTags: ["Records"],
      }),

      createRecord: build.mutation({
            query: (data) => ({
                url: "/record",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Records"],
        }),

      toggleRecordActive: build.mutation<void, string>({
        query: (id: string) => ({
          url: `/record/toggle-active/${id}`,
          method: "PATCH",
        }),
        invalidatesTags: ["Records"],
      }),

      reorderRecord: build.mutation<void, { id: string; orderNo: number }[]>({
        query: (records) => ({
          url: `/record/reorder`,
          method: "PATCH",
          body: records,
        }),
        invalidatesTags: ["Records"],
      }),

      deleteRecord: build.mutation<void, string>({
        query: (id: string) => ({
          url: `/record/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Records"],
      }),

      editRecord: build.mutation<void, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
          url: `/record/by-id/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Records"],
      })

    })
  })

export const {
  useGetRecordsQuery,
  useGetRecordByIdQuery,
  useCreateRecordMutation,
  useToggleRecordActiveMutation,
  useReorderRecordMutation,
  useDeleteRecordMutation,
  useEditRecordMutation,
} = recordAdminApi;