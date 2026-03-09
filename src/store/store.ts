import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseAdminApi } from "@/shared/api";
import {basePublicApi} from "@/shared/api";
import { publicApi } from "./api/public-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [baseAdminApi.reducerPath]: baseAdminApi.reducer,
    [basePublicApi.reducerPath]: basePublicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      publicApi.middleware,
      baseAdminApi.middleware,
      basePublicApi.middleware
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
