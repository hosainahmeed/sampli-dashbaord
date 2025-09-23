import { baseApis } from "../main/baseApis";

const withDrawApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    withdrawPost: builder.mutation({
      query: (data) => ({
        url: "/payment/make-withdraw",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviewer"],
    }),
  }),
});

export const { useWithdrawPostMutation } = withDrawApis;
