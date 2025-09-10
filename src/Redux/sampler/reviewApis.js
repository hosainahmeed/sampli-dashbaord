import { baseApis } from "../main/baseApis";

const reviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: (params) => ({
        url: "/review/get-all-review",
        method: "GET",
        params,
      }),
      providesTags: ["Review"],
    }),
    getReviewerLikers: builder.query({
      query: ({ id }) => ({
        url: `/review/get-review-likers/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    createComment: builder.mutation({
      query: ({ data }) => ({
        url: `/comment/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    changeLikes: builder.mutation({
      query: ({ id }) => ({
        url: `/review/like-unlike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Review"],
    }),

    getReviewerComments: builder.query({
      query: ({ id }) => ({
        url: `/comment/get-review-comments/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useGetReviewerLikersQuery,
  useCreateCommentMutation,
  useChangeLikesMutation,
  useGetReviewerCommentsQuery,
} = reviewApis;
