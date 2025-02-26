import React from 'react'

import {
  FaBell,
  FaStar,
  FaBullhorn,
  FaDollarSign,
  FaShoppingCart,
  FaTruck,
  FaVideo,
} from 'react-icons/fa'

import { Button, Card } from 'antd'
import { CiSettings } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const AllNotificationsSampler = () => {
  const notifications = [
    {
      icon: <FaVideo className="text-orange-500" />,
      title: 'New Product Review Posted',
      description: 'Sarah K. posted a video review for "Summer Dress A-Line"',
      actions: ['Watch Review', 'Mark as read'],
      time: '1 hour ago',
    },
    {
      icon: <FaStar className="text-gray-500" />,
      title: 'Campaign Milestone Reached',
      description:
        'Your "Summer Collection" campaign has reached 80% completion',
      actions: ['View Stats', 'Mark as read'],
      time: '1 hour ago',
    },
    {
      icon: <FaShoppingCart className="text-gray-500" />,
      title: 'New Store Order',
      description: 'Order #12345 received for 3 items worth $150',
      actions: ['Watch Review', 'Mark as read'],
      time: '1 hour ago',
    },
    {
      icon: <FaDollarSign className="text-gray-500" />,
      title: 'Payment Processing',
      description: 'Monthly reviewer payments processed successfully',
      actions: ['See details'],
      time: '1 hour ago',
    },
  ]

  const categories = [
    { icon: <FaBell size={18} />, label: 'All' },
    { icon: <FaStar size={18} />, label: 'Posts' },
  ]

  return (
    <div className="h-screen responsive-width">
      <div className="w-full  mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <div className="flex gap-2">
            <Button variant="link" className="text-blue-500">
              Mark all as read
            </Button>
            <Link to={'/sampler/settings/notifications-settings-sampler'} state={{ tab: 'notifications' }}>
              <Button variant="outline" className="flex items-center gap-2">
                <CiSettings size={18} />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-4">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span>{category.label}</span>
            </Button>
          ))}
        </div>

        <Card className="p-4">
          <div className="divide-y divide-gray-200">
            {notifications.map((item, index) => (
              <div key={index} className="py-4 flex items-start gap-4">
                <div className="text-xl flex-shrink-0">{item.icon}</div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>

                  <div className="flex gap-2">
                    {item.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant="link"
                        className="text-blue-500 h-auto p-0"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="link" className="text-blue-500">
              Load more notifications
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AllNotificationsSampler
