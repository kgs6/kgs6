import {createApi} from "@reduxjs/toolkit/query/react";
import {rawBaseQuery} from "@/shared/api/base-query";
import { Settings } from "lucide-react";

export const basePublicApi = createApi({
  reducerPath: "apiPublic",
  baseQuery: rawBaseQuery,
  tagTypes: ["News", "Objects", "Settings"],
  endpoints: () => ({}),
});

export const {usePrefetch} = basePublicApi;