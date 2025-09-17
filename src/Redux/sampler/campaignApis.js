import { baseApis } from "../main/baseApis";

const campaignApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignList: builder.query({
      query: (params) => ({
        url: `/campaign/get-campaign`,
        method: "GET",
        params,
      }),
      providesTags: ["campaignOffer"],
    }),
    getOneCampaign: builder.query({
      query: ({ id }) => ({
        url: `/campaign/get-single-campaign/${id}`,
        method: "GET",
      }),
      providesTags: ["campaignOffer"],
    }),
    getSingleOfferCampaign: builder.query({
      query: ({ id }) => ({
        url: `/campaign-offer/get-single-campaign-offer/${id}`,
        method: "GET",
      }),
      providesTags: ["campaignOffer"],
    }),
    getMyCampaignOffer: builder.query({
      query: (params) => ({
        url: `/campaign-offer/get-my-campaign-offer`,
        method: "GET",
        params,
      }),
      providesTags: ["campaignOffer"],
    }),
    acceptCampaignOffer: builder.mutation({
      query: (data) => ({
        url: `/campaign-offer/accept-campaign-offer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["campaignOffer"],
    }),
  }),
});

export const {
  useGetCampaignListQuery,
  useGetOneCampaignQuery,
  useGetMyCampaignOfferQuery,
  useGetSingleOfferCampaignQuery,
  useAcceptCampaignOfferMutation,
} = campaignApis;
