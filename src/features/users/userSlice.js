
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = "http://localhost:8080";
export const userSlice = createApi({
  reducerPath: 'userSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    postUser: builder.query({
        query: () => '/{}'
        providesTags: ['User'],
      }),
  }),
  
})
export const { useGetPostsQuery } = userSlice