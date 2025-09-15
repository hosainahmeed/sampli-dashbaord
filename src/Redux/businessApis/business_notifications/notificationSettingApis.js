import { baseApis } from "../../main/baseApis";

const notificationSettingApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    notificationSetting: builder.query({
      query: () => ({
        url: "/notification-setting/get-notification-setting",
        method: "GET",
      }),
      providesTags: ["notificationSetting"],
    }),
    updateNotificationSetting: builder.mutation({
      query: (data) => ({
        url: "/notification-setting/update-notification-setting",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["notificationSetting"],
    }),
  }),
});

export const {
  useNotificationSettingQuery,
  useUpdateNotificationSettingMutation,
} = notificationSettingApis;
