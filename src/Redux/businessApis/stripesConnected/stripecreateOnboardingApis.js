import { baseApis } from "../../main/baseApis";

const stripecreateOnboardingApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createOnboarding: builder.mutation({
      query: () => ({
        url: "/stripe/create-onboarding-link",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateOnboardingMutation } = stripecreateOnboardingApis;
