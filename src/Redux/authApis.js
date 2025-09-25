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
      query: ({ data }) => ({
        url: "/user/register-bussiness",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    authForgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    authVerifyResetOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-reset-otp",
        method: "POST",
        body: data,
      }),
    }),
    authResetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterAsBusinessMutation,
  useUpdatePasswordMutation,
  useAuthForgetPasswordMutation,
  useAuthVerifyResetOtpMutation,
  useAuthResetPasswordMutation,
} = authApis;
