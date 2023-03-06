import { authApi } from "./apiSlice";

export const passwordAPI = authApi.injectEndpoints({
  tagtypes: ["passwordlist", "domainPassword"],
  endpoints: (builder) => ({
    saveCreds: builder.mutation({
      query: (creds) => ({
        url: "/api/password",
        method: "POST",
        body: creds,
      }),
      invalidatesTags: ["passwordlist"],
    }),
    updateCreds: builder.mutation({
      query: (creds) => ({
        url: "/api/password",
        method: "PUT",
        body: creds,
      }),
      invalidatesTags: ["domainPassword"],
    }),
    deleteCreds: builder.mutation({
      query: (creds) => ({
        url: `/api/password?domain=${creds.domain}&username=${creds.username}`,
        method: "DELETE",
      }),
      invalidatesTags: ["passwordlist"],
    }),
    listCreds: builder.query({
      query: () => "/api/password/list",
      transformResponse: (response) => response.reverse(),
      providesTags: ["passwordlist"],
    }),
    getCreds: builder.query({
      query: ({ domain, username }) =>
        `/api/password?domain=${domain}&username=${username}`,
      providesTags: ["domainPassword"],
    }),
  }),
});

export const {
  useSaveCredsMutation,
  useUpdateCredsMutation,
  useDeleteCredsMutation,
  useListCredsQuery,
  useGetCredsQuery,
} = passwordAPI;
