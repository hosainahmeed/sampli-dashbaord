import { baseApis } from "../main/baseApis";

const followUnfollowApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postFollowUnfollow: builder.mutation({
      query: (id) => ({
        url: `/follow/follow-unfollow/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { usePostFollowUnfollowMutation } = followUnfollowApis;
