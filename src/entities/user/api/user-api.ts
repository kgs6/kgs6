import {
  LoginDTO,
  RegisterDTO,
  UserAdminDTO,
  UserDTO,
} from '@/entities/user/model/types';
import { baseAdminApi } from '@/shared/api';

export const userApi = baseAdminApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, LoginDTO>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    me: build.query<UserDTO, void>({
      query: () => '/auth/me',
      providesTags: ['Users'],
    }),

    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/log-out',
        method: 'POST',
      }),
      invalidatesTags: ['Users'],
    }),

    register: build.mutation<void, RegisterDTO>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),

    getUsers: build.query<UserAdminDTO[], void>({
      query: () => '/auth/users',
      providesTags: ['Users'],
    }),

    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userApi;
