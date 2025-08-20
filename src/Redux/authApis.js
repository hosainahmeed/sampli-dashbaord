import { baseApis } from "./main/baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerAsBusiness: builder.mutation({
      query: ({data}) => ({
        url: "/user/register-bussiness",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterAsBusinessMutation } = authApis;
