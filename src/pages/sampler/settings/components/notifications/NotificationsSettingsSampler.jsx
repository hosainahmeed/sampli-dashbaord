import React, { useState } from 'react'
import { Switch } from 'antd'

const NotificationsSettingsSampler = () => {
  const [settings, setSettings] = useState({
    general: {
      pushNotifications: false,
    },
    activity: {
      mentions: true,
      comments: false,
      likes: false,
      likesOnComments: true,
      newFollowers: false,
      postsYouFollow: false,
    },
    recommendations: {
      trendingPosts: false,
      newPosts: false,
      postsFromFollowers: false,
    },
  })

  const handleToggle = (category, setting) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }))
  }

  const NotificationSection = ({ title, items, category }) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {Object.entries(items).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <Switch
              checked={value}
              onChange={() => handleToggle(category, key)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
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

      <div className="border-t border-gray-200 mt-8 pt-6">
        <p className="text-sm text-gray-500">
          You can manage your notification preferences here. Changes are saved
          automatically.
        </p>
      </div>
    </div>
  )
}

export default NotificationsSettingsSampler
