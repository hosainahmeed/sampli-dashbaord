import { baseApis } from "../main/baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileApis: builder.mutation({
      query: (data) => ({
        url: "/reviewer/update-reviewer-profile",
        method: "PATCH",
        body: data,
      }),
    }),
    getProfileApis: builder.query({
      query: () => ({
        url: "/reviewer/get-profile",
        method: "GET",
      }),
    }),
    getMyReviews: builder.query({
      query: (params) => ({
        url: "/review/get-my-reviews",
        method: "GET",
        params,
      }),
    }),
    getMyComments: builder.query({
      query: (params) => ({
        url: "/comment/get-my-comments",
        method: "GET",
        params,
      }),
    }),
    getMyLikes: builder.query({
      query: (params) => ({
        url: "/comment/get-my-likes",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useUpdateProfileApisMutation,
  useGetProfileApisQuery,
  useGetMyReviewsQuery,
  useGetMyCommentsQuery,
  useGetMyLikesQuery,
} = profileApis;
