import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { disclosureApi } from "./api/year-api";
import { sectionApi } from "./api/section-api";
import { recordApi } from "./api/record-api";
import { publicApi } from "@/store/api/public-api";
import { baseAdminApi } from "@/shared/api";
import {basePublicApi} from "@/shared/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [disclosureApi.reducerPath]: disclosureApi.reducer,
    [sectionApi.reducerPath]: sectionApi.reducer,
    [recordApi.reducerPath]: recordApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [baseAdminApi.reducerPath]: baseAdminApi.reducer,
    [basePublicApi.reducerPath]: basePublicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      disclosureApi.middleware,
      sectionApi.middleware,
      recordApi.middleware,
      publicApi.middleware,
      baseAdminApi.middleware,
      basePublicApi.middleware
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
