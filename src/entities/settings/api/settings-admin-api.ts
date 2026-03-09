import { baseAdminApi } from '@/shared/api';
import { SettingsAdminDTO, UpdateSettingsDTO } from '../model/types';

export const settingAdminApi = baseAdminApi.injectEndpoints({
  endpoints: (build) => ({

    getSettings: build.query<SettingsAdminDTO, void>({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    updateSettings: build.mutation<UpdateSettingsDTO, FormData>({
      query: (formData) => ({
        url: "/settings",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Settings"],
    }),

    updateSettingsRoute: build.mutation<void, { routeId: string; routeTitle: string; routeIsActive: boolean }>({
      query: (routeData) => ({
        url: "/settings/routes",
        method: "PATCH",
        body: routeData,
      }),
      invalidatesTags: ["Settings"],
    }),


  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUpdateSettingsRouteMutation
} = settingAdminApi;
