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
      invalidatesTags: ["campaign"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useChangeCampaignStatusMutation,
} = campaignApis;
