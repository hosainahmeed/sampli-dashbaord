import { baseApis } from "../../main/baseApis";

const notificationPageApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    notificationPage: builder.query({
      query: ({ limit }) => ({
        url: "/notification/get-notifications",
        method: "GET",
        params: {
          limit,
        },
      }),
      providesTags: ["businessNotification"],
    }),
  }),
});

export const { useNotificationPageQuery } = notificationPageApis;
