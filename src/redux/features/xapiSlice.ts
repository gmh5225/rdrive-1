import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graph.microsoft.com/drive' }),
  endpoints: (builder) => ({
    getDriveData: builder.query({
      query: () => '/drive',
    }),
  }),
});

export const { useGetDriveDataQuery } = api;
