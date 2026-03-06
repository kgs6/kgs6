import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseAdminApi } from "@/shared/api";
import {basePublicApi} from "@/shared/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseAdminApi.reducerPath]: baseAdminApi.reducer,
    [basePublicApi.reducerPath]: basePublicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseAdminApi.middleware,
      basePublicApi.middleware
    ),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
