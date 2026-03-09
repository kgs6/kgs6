import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
});
