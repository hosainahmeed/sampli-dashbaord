import { baseApis } from "../../main/baseApis";

const productReviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    productReviewById: builder.query({
      query: (id) => ({
        url: `/review/get-single-product-review/${id}`,
        method: "GET",
      }),
      providesTags: ["productReview"],
    }),
  }),
});

export const { useProductReviewByIdQuery } = productReviewApis;
