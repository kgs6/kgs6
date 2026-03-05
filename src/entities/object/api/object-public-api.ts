import { basePublicApi } from "@/shared/api";
import { ObjectDTO } from "../model/types";


export const objectPublicApi =
  basePublicApi.injectEndpoints({
    endpoints: (build) => ({
      getPublicObjects: build.query<ObjectDTO[], void>({
        query: () => ({
          url: "/objects",
          method: "GET",
        }),
        providesTags: ["Objects"],
      }),
    }),
  });

export const {
  useGetPublicObjectsQuery,
} = objectPublicApi;