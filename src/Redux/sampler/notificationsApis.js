import { baseApis } from "../main/baseApis";

const notificationsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notification-setting/get-notification-setting",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getProductsNotifications: builder.query({
      query: () => ({
        url: "/notification/get-notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    updateNotification: builder.mutation({
      query: ({ data }) => ({
        url: `/notification-setting/update-notification-setting`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetProductsNotificationsQuery,
  useUpdateNotificationMutation,
} = notificationsApis;
