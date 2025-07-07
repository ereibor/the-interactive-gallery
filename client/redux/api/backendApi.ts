import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL }), // Adjust the base URL as needed
  tagTypes: ['Comment', 'Like', 'Image'],
  
  endpoints: (builder) => ({
    postComment: builder.mutation<void, { imageId: string; content: string; username: string }>({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Comment', id: imageId }],
    }),

    likeImage: builder.mutation<void, { imageId: string, username: string }>({
      query: ({ imageId, username }) => ({
        url: '/likes',
        method: 'POST',
        body: { imageId, username },
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Like', id: imageId }],
    }),

    getCommentsByImageId: builder.query<{ id: string; content: string; username: string }[], string>({
      query: (imageId) => `/comments/${imageId}`,
      providesTags: (result, error, imageId) => [{ type: 'Comment', id: imageId }],
    }),

    getLikesByImageId: builder.query<{ count: number }, string>({
      query: (imageId) => `/likes/count/${imageId}`,
      providesTags: (result, error, imageId) => [{ type: 'Like', id: imageId }],
    }),

     checkUserLikeStatus: builder.query<{ exists: boolean }, { imageId: string; username: string }>({
      query: ({ imageId, username }) => `/likes/check/${imageId}/${username}`,
      providesTags: (result, error, { imageId }) => [{ type: 'Like', id: imageId }],
    }),

    deleteLike: builder.mutation<void, { imageId: string; username: string }>({
      query: ({ imageId, username }) => ({
        url: `/likes/${imageId}/${username}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Like', id: imageId }],
    }),
  }),
});

export const {
  usePostCommentMutation,
  useLikeImageMutation,
  useGetCommentsByImageIdQuery,
  useGetLikesByImageIdQuery,
  useCheckUserLikeStatusQuery,
  useDeleteLikeMutation
} = backendApi;
