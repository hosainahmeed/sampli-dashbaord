import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./server";

export const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Bookmark",
    "Cart",
    "ShippingAddress",
    "Reviewer",
    "Review",
    "Comments",
    "RepliesComments",
    "product",
    "businessProfile",
    "campaign",
    "businessStore",
    "notificationSetting",
    "campaignOffer",
    "campaignPurchase",
    "campaignStats",
    "businessNotification",
  ],
  endpoints: () => ({}),
});
