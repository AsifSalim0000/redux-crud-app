import { apiSlice } from './apiSlice';
const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: 'POST',
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'] 
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_URL}/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'] 
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'] 
    }),
    listUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: 'GET',
      }),
      providesTags: ['User'] // Provide tags for caching
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useListUsersQuery, 
} = adminApiSlice;
