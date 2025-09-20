import { baseApis } from "../../main/baseApis";

const bussinessMetaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessMeta: builder.query({
      query: () => ({
        url: "/meta/get-bussiness-meta-data",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBusinessMetaQuery } = bussinessMetaApis;
