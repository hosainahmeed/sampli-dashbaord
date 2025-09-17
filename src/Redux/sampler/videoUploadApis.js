import { baseApis } from "../main/baseApis";

const videoUploadApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createUploadApis: builder.mutation({
      query: ({ data }) => ({
        url: `/generate-presigned-url`,
        method: "POST",
        body: data,
      }),
    }),
    createReview: builder.mutation({
      query: (formData) => ({
        url: `/review/create-review`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateUploadApisMutation, useCreateReviewMutation } =
  videoUploadApis;
