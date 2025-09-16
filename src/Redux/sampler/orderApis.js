import { baseApis } from "../main/baseApis";

const orderApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query({
      query: (params) => ({
        url: `/order/get-my-orders`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetOrderListQuery } = orderApis;
