import { baseApis } from "../../main/baseApis";

const bussinessMetaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessMeta: builder.query({
      query: () => ({
        url: "/meta/get-bussiness-meta-data",
        method: "GET",
      }),
    }),
    getBusinessSalesMeta: builder.query({
      query: (params) => ({
        url: "/meta/get-business-sales-meta-data",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetBusinessMetaQuery, useGetBusinessSalesMetaQuery } =
  bussinessMetaApis;
