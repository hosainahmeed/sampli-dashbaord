import { baseApis } from '../main/baseApis'

const authSectionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    authSectionSignup: builder.mutation({
      query: (data) => ({
        url: '/user/register-reviewer',
        method: 'POST',
        body: data,
      }),
    }),
    authSectionVerifyCode: builder.mutation({
      query: (data) => ({
        url: '/user/verify-code',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useAuthSectionSignupMutation,
  useAuthSectionVerifyCodeMutation,
} = authSectionApis
