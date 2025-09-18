import { baseApis } from "../../main/baseApis";

const campaignProceedDeliveryApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    confirmShipping: builder.mutation({
      query: (data) => ({
        url: "/campaign-offer/proceed-delivery",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useConfirmShippingMutation } = campaignProceedDeliveryApis;
