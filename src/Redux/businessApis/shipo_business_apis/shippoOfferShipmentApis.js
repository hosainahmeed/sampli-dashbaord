import { baseApis } from "../../main/baseApis";

const shippoOfferShipmentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getShippingRatesForOfferShipment: builder.mutation({
      query: (params) => ({
        url: `/shippo/get-shipping-rates-for-offer-shipment/${params?.id}`,
        method: "POST",
      }),
    }),
  }),
});
export const { useGetShippingRatesForOfferShipmentMutation } =
  shippoOfferShipmentApis;
