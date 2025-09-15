import { baseApis } from "../../main/baseApis";

const getProfileApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/bussiness/get-profile",
        method: "GET",
      }),
      providesTags: ["businessProfile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/bussiness/update-bussiness-info",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["businessProfile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = getProfileApi;
