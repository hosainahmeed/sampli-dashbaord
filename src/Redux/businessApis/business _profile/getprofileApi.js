import { baseApis } from "../../main/baseApis";

const getProfileApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/bussiness/get-profile",
        method: "GET",
        providesTags: ["businessProfile"],
      }),
    }),
  }),
});

export const { useGetProfileQuery } = getProfileApi;
