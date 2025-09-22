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
    getEarningsReviewer: builder.query({
      query: () => ({
        url: `/meta/get-reviewer-earning-meta-data`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOverviewQuery, useGetEarningsReviewerQuery } =
  overviewApis;
