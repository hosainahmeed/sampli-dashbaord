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
      query: (data) => ({
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
      query: ({ id, limit }) => ({
        url: `/comment/get-review-comments/${id}`,
        method: "GET",
        params: { limit },
      }),
      providesTags: ["Comments", "Review"],
    }),

    postCommentLikes: builder.mutation({
      query: ({ id }) => ({
        url: `/comment/like-unlike/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Comments"],
    }),

    getCommentsReplies: builder.query({
      query: ({ id }) => ({
        url: `/comment/get-replies/${id}`,
        method: "GET",
      }),
      providesTags: ["Comments", "Review", "RepliesComments"],
    }),
    postCommentReplies: builder.mutation({
      query: ({ data }) => ({
        url: `/comment/create-reply`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments", "Review", "RepliesComments"],
    }),

    getSingleProductReview: builder.query({
      query: ({ id }) => ({
        url: `/review/get-single-product-review/${id}`,
        method: "GET",
      }),
      providesTags: ["Comments", "Review", "RepliesComments"],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: `/comment/delete-comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments", "Review", "RepliesComments"],
    }),
    getCommentLikers: builder.query({
      query: (id) => ({
        url: `/comment/get-likers/${id}`,
        method: "GET",
      }),
      providesTags: ["Comments", "Review"],
    }),
    reviewView: builder.mutation({
      query: ({ _id }) => ({
        url: `/review/view/${_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Review","ReviewerProfile"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useGetReviewerLikersQuery,
  useCreateCommentMutation,
  useChangeLikesMutation,
  useGetReviewerCommentsQuery,
  usePostCommentLikesMutation,
  useGetCommentsRepliesQuery,
  usePostCommentRepliesMutation,
  useGetSingleProductReviewQuery,
  useDeleteCommentMutation,
  useGetCommentLikersQuery,
  useReviewViewMutation,
} = reviewApis;
