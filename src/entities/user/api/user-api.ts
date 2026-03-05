import {baseAdminApi} from "@/shared/api";
import {LoginDTO, UserDTO} from "@/entities/user/model/types";

export const userApi =
  baseAdminApi.injectEndpoints({
    endpoints: (build) => ({
      login: build.mutation<void, LoginDTO>({
        query: (data) => ({
          url: "/auth/login",
          method: "POST",
          body: data
        }),
      }),

      me: build.query<UserDTO, void>({
        query: () => "/auth/me",
      }),

      logout: build.mutation<{ message: string }, void>({
        query: () => ({
          url: "/auth/logout",
          method: "POST",
        }),
      }),
      

    }),
  })

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} = userApi;