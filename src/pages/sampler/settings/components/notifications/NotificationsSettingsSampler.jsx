import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationMutation,
} from "../../../../../Redux/sampler/notificationsApis";

const NotificationsSettingsSampler = () => {
  const { data: getAllNotifications } = useGetAllNotificationsQuery();
  const [updateNotifications] = useUpdateNotificationMutation();
  const [updatingKey, setUpdatingKey] = useState(null);

  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (getAllNotifications?.data) {
      const api = getAllNotifications.data;

      setSettings({
        general: {
          pushNotification: api.pushNotification ?? false,
        },
        activity: {
          mention: api.mention ?? false,
          commentOnPost: api.commentOnPost ?? false,
          likeOnPost: api.likeOnPost ?? false,
          likeOnComment: api.likeOnComment ?? false,
          newFollower: api.newFollower ?? false,
          postYouFollow: api.postYouFollow ?? false,
        },
        recommendations: {
          trendingPost: api.trendingPost ?? false,
          newPost: api.newPost ?? false,
          postFromFollower: api.postFromFollower ?? false,
        },
      });
    }
  }, [getAllNotifications]);

  const handleToggle = async (category, name, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: !value,
      },
    }));
    try {
      const data = { [name]: !value };
      const res = await updateNotifications({ data });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingKey(null);
    }
  };

  const NotificationSection = ({ title, items, category }) => (
    <div className="mb-8 border border-gray-200 p-5 rounded-2xl">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {items &&
          Object?.entries(items)?.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <Switch
                checked={value}
                loading={updatingKey === key}
                onChange={() => handleToggle(category, key, value)}
                style={{
                  backgroundColor: value ? "#36D96F" : "gray",
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="!h-[95vh] overflow-y-auto scrollbar-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>

      <NotificationSection
        title="General"
        items={settings.general}
        category="general"
      />
      <NotificationSection
        title="Activity"
        items={settings.activity}
        category="activity"
      />
      <NotificationSection
        title="Recommendations"
        items={settings.recommendations}
        category="recommendations"
      />
    </div>
  );
};

export default NotificationsSettingsSampler;
