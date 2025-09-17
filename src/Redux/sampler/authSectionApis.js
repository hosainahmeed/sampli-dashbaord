import { baseApis } from "../main/baseApis";

const authSectionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    authSectionSignup: builder.mutation({
      query: (data) => ({
        url: "/user/register-reviewer",
        method: "POST",
        body: data,
      }),
     
    }),
    authSectionVerifyCode: builder.mutation({
      query: (data) => ({
        url: "/user/verify-code",
        method: "POST",
        body: data,
      }),
    }),
    resendVerifyCode: builder.mutation({
      query: (data) => ({
        url: "/user/resend-verify-code",
        method: "POST",
        body: data,
      }),
    }),
    addAddressReviewer: builder.mutation({
      query: (data) => ({
        url: "/reviewer/add-address",
        method: "POST",
        body: data,
      }), 
    }),
    addPersonalInfoReviewer: builder.mutation({
      query: (data) => ({
        url: "/reviewer/add-personal-info",
        method: "POST",
        body: data,
      }),
    }),
    addInterestedCategoryReviewer: builder.mutation({
      query: (data) => ({
        url: "/reviewer/add-interested-category",
        method: "POST",
        body: data,
      }),
    }),
    addCurrentlyShareReviewer: builder.mutation({
      query: (data) => ({
        url: "/reviewer/add-currently-share-review",
        method: "POST",
        body: data,
      }),
    }),
    addShippingAddressReviewer: builder.mutation({
      query: (data) => ({
        url: "/shipping-address/create-shipping-address",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAuthSectionSignupMutation,
  useAuthSectionVerifyCodeMutation,
  useResendVerifyCodeMutation,
  useAddAddressReviewerMutation,
  useAddPersonalInfoReviewerMutation,
  useAddInterestedCategoryReviewerMutation,
  useAddCurrentlyShareReviewerMutation,
  useAddShippingAddressReviewerMutation,
} = authSectionApis;
