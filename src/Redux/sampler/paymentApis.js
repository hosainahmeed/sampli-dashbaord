import { baseApis } from "../main/baseApis";

const paymentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postPayment: builder.mutation({
      query: () => ({
        url: `/stripe/create-onboarding-link`,
        method: "POST",
      }),
    }),
  }),
});

export const { usePostPaymentMutation } = paymentApis;
