import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (creds) => ({
        url: "/api/login",
        method: "POST",
        body: creds,
      }),
    }),
    signup: builder.mutation({
      query: (info) => ({
        url: "/api/signup",
        method: "POST",
        body: info,
      }),
    }),
    generatePassword: builder.query({
      query: () => "/api/generate",
      keepUnusedDataFor: 0,
    }),
    getUserName : builder.query({
      query: () => "/api/user"
    })
  }),
});

export const { useLoginMutation, useSignupMutation, useGeneratePasswordQuery, useGetUserNameQuery } =
  authApi;
