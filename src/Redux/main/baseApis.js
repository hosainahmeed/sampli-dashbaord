import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "./server";

export const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  }),
  tagTypes: [
    "Bookmark",
    "Cart",
    "ShippingAddress",
    "Reviewer",
    "product",
    "businessProfile",
  ],
  endpoints: () => ({}),
});
