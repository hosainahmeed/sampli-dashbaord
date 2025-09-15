import { baseApis } from "../main/baseApis";

const orderApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query({
      query: () => ({
        url: `/order/get-my-orders`,
      }),
    }),
  }),
});

export const { useGetOrderListQuery } = orderApis;
