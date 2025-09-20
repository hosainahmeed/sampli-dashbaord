import { baseApis } from "../main/baseApis";

const oAuthApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: ({ data }) => ({
        url: "/oauth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGoogleLoginMutation } = oAuthApis;
