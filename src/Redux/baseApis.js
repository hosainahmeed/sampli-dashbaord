import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.20.9:3500",
    headers: {
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export default baseApis;
