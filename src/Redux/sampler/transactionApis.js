import { baseApis } from "../main/baseApis";

const transactionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransaction: builder.query({
      query: (params) => ({
        url: `/transaction/get-my-transaction`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetMyTransactionQuery } = transactionApis;
