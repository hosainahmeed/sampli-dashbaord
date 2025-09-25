import { baseApis } from "../../main/baseApis";

const campaignPurchaseApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignPurchase: builder.query({
      query: (params) => ({
        url: "/campaign-offer/get-my-campaign-offer",
        method: "GET",
        params,
      }),
      providesTags: ["campaignPurchase"],
    }),
    getCampaignPurchaseById: builder.query({
      query: (id) => ({
        url: `/campaign-offer/get-single-campaign-offer/${id}`,
        method: "GET",
      }),
      providesTags: ["campaignPurchase"],
    }),
  }),
});

export const { useGetCampaignPurchaseQuery, useGetCampaignPurchaseByIdQuery } =
  campaignPurchaseApis;
