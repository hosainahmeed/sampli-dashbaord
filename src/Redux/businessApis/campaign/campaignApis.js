import { baseApis } from "../../main/baseApis";

const campaignApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: () => ({
        url: "/campaign/get-my-campaigns",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCampaignsQuery } = campaignApis;
