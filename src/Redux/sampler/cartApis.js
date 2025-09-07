import { baseApis } from "../main/baseApis";

const cartApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/add-to-cart`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApis;
