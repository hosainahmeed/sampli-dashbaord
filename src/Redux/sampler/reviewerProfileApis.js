import { baseApis } from "../main/baseApis";

const reviewerProfileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getReviewerProfile: builder.query({
      query: () => ({
        url: "/reviewer/get-profile",
        method: "GET",
      }),
      providesTags: ["Reviewer"],
    }),
    updateReviewerProfile: builder.mutation({
      query: ({ data }) => ({
        url: "/reviewer/update-reviewer-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Reviewer"],
    }),
  }),
});

export const { useGetReviewerProfileQuery, useUpdateReviewerProfileMutation } =
  reviewerProfileApis;
