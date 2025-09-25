import { baseApis } from "../../main/baseApis";

const notificationPageApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    notificationPage: builder.query({
      query: ({ limit, type }) => ({
        url: "/notification/get-notifications",
        method: "GET",
        params: {
          limit,
          type,
        },
      }),
      providesTags: ["businessNotification"],
    }),
  }),
});

export const { useNotificationPageQuery } = notificationPageApis;
