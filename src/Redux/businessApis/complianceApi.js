import { baseApis } from "../main/baseApis";

const complianceApi = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addComplianceInfo: builder.mutation({
      query: (data) => ({
        url: "/compliance-info/create-compliance-info",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddComplianceInfoMutation } = complianceApi;
