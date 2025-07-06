// redux/apis/backendApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
  tagTypes: ['Comment', 'Like'],
  
  endpoints: (builder) => ({
    postComment: builder.mutation<void, { imageId: string; content: string; username: string }>({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Comment', id: imageId }],
    }),

    likeImage: builder.mutation<void, { imageId: string }>({
      query: (body) => ({
        url: '/likes',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Like', id: imageId }],
    }),

    getCommentsByImageId: builder.query<any[], string>({
      query: (imageId) => `/comments/${imageId}`,
      providesTags: (result, error, imageId) => [{ type: 'Comment', id: imageId }],
    }),

    getLikesByImageId: builder.query<number, string>({
      query: (imageId) => `/likes/${imageId}`,
      providesTags: (result, error, imageId) => [{ type: 'Like', id: imageId }],
    }),
  }),
});

export const {
  usePostCommentMutation,
  useLikeImageMutation,
  useGetCommentsByImageIdQuery,
  useGetLikesByImageIdQuery,
} = backendApi;
