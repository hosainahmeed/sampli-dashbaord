import { baseApis } from "../../main/baseApis";

const campaignAnalysisApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignMetaData: builder.query({
      query: ({ dateRange }) => ({
        url: `/meta/get-campaign-meta-data`,
        method: "GET",
        params: { dateRange },
      }),
      providesTags: ["campaignAnalysis"],
    }),
  }),
});
export const { useGetCampaignMetaDataQuery } = campaignAnalysisApis;
