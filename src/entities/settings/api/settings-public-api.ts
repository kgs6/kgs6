import { basePublicApi } from '@/shared/api';
import { SettingsPublicDTO } from '../model/types';

export const settingPublicApi = basePublicApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicSettings: build.query<SettingsPublicDTO, void>({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),



  }),
});

export const {
  useGetPublicSettingsQuery,
} = settingPublicApi;
