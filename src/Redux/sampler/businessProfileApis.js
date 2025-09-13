import { baseApis } from "../main/baseApis";

const businessProfileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBusinessProfile: builder.query({
      query: ({ id }) => ({
        url: `/bussiness/get-business-profile/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleBusinessProfileQuery } = businessProfileApis;
