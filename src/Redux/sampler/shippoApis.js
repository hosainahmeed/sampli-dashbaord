import { baseApis } from "../main/baseApis";

const shippoApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postShippingRates: builder.mutation({
      query: ({ data }) => ({
        url: `/shippo/get-shipping-rates`,
        method: "POST",
        body: data,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ data }) => ({
        url: `/order/create-order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostShippingRatesMutation, useCreateOrderMutation } =
  shippoApis;
