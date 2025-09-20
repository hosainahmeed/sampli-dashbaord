import { baseApis } from "../main/baseApis";

const overviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: (params) => ({
        url: `/meta/get-reviewer-meta-data`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApis;
