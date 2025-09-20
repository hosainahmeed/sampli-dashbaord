import { baseApis } from "../../main/baseApis";

const transactionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionForBusiness: builder.query({
      query: ({ paymentType }) => ({
        url: "/transaction/get-my-transaction",
        method: "GET",
        params: { transactionReason: paymentType },
      }),
    }),
  }),
});

export const { useGetTransactionForBusinessQuery } = transactionApis;
