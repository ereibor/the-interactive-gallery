// redux/unsplashApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const unsplashApi = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.unsplash.com/',
  }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => 
        `search/photos?query=${query}&page=${page}&client_id=${ACCESS_KEY}`,
    }),
    getImageById: builder.query({
      query: (id: string) => `photos/${id}?client_id=${ACCESS_KEY}`,
    }),
  }),
});

export const { useGetImagesQuery, useGetImageByIdQuery } = unsplashApi;
