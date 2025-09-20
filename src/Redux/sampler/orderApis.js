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
    getOrderDetailsById: builder.query({
      query: (id) => ({
        url: `/order/get-single-order/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrderListQuery, useGetOrderDetailsByIdQuery } = orderApis;
