import { baseApis } from "../../main/baseApis";

const campaignApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (params) => ({
        url: "/campaign/get-my-campaigns",
        method: "GET",
        params,
      }),
      providesTags: ["campaign"],
    }),
    getCampaignById: builder.query({
      query: (id) => ({
        url: `/campaign/get-single-campaign/${id}`,
        method: "GET",
      }),
      providesTags: ["campaign"],
    }),
    createCampaign: builder.mutation({
      query: (data) => ({
        url: "/campaign/create-campaign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["campaign"],
    }),
    updateCampaign: builder.mutation({
      query: ({ id, data }) => ({
        url: `/campaign/update-campaign/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["campaign"],
    }),
    changeCampaignStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/campaign/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["campaign","campaignStats","campaignAnalysis"],
    }),
    getCampaignStatus: builder.query({
      query: () => ({
        url: `/campaign/get-campaign-stats`,
        method: "GET",
      }),
      providesTags: ["campaignStats"],
    }),
    getCampaignSummary: builder.query({
      query: (id) => ({
        url: `/campaign/get-campaign-summary/${id}`,
        method: "GET",
      }),
      providesTags: ["campaignStats","campaign"],
    }),
    getCampaignPerformance: builder.query({
      query: ({ id, filter }) => ({
        url: `/campaign/get-campaign-performance/${id}`,
        method: "GET",
        params: { filter },
      }),
      providesTags: ["campaignStats"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useChangeCampaignStatusMutation,
  useGetCampaignStatusQuery,
  useGetCampaignSummaryQuery,
  useGetCampaignPerformanceQuery,
} = campaignApis;
