import { baseApis } from "../main/baseApis";

const campaignApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignList: builder.query({
      query: (params) => ({
        url: `/campaign/get-campaign`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetCampaignListQuery } = campaignApis;
