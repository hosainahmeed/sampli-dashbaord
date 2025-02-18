import React from 'react'
import { FiCodesandbox } from 'react-icons/fi'

const notificationData = [
  {
    id: 1,
    type: 'Review Product Shipped',
    category: 'Review program',
    message:
      'Your free review product (Apple Watch Series 9) has been shipped! Expected delivery: Dec 16',
    product: 'BENGOO G9000 Stereo Gaming Headset',
    qty: 2,
    action: 'See details',
    time: '1 hour ago',
    button: 'See details',
  },
  {
    id: 2,
    type: 'Review Request',
    category: 'Review program',
    message:
      'Your Samsung Galaxy Buds have been delivered. Submit your review to earn $15!',
    product: 'BENGOO G9000 Stereo Gaming Headset',
    qty: 2,
    action: 'Submit review',
    time: '1 hour ago',
    image: `https://picsum.photos/seed/${Math.random() * 1000}/150`,
    button: 'Submit review',
  },
  {
    id: 3,
    type: 'Order Shipped',
    category: 'Purchase',
    message:
      'Your order #45678 (Wireless Charger) has been shipped! Expected delivery: Dec 15',
    product: 'BENGOO G9000 Stereo Gaming Headset',
    qty: 2,
    action: 'Submit review',
    time: '1 hour ago',
    button: 'Submit review',
  },
  {
    id: 4,
    type: 'Payment Received',
    category: '',
    message: 'You earned $20 for your Sony Headphones review',
    product: '',
    qty: 0,
    action: 'See details',
    time: '1 hour ago',
    button: 'See details',
  },
  {
    id: 5,
    type: 'New Comment',
    category: '',
    message:
      'Jane commented on your iPhone case review: "Great detailed review!"',
    product: '',
    qty: 0,
    action: 'Reply',
    time: '1 hour ago',
    button: 'Reply',
  },
]

const NotificationCard = ({ notification }) => {
  return (
    <div className="flex justify-between  border border-gray-200 p-4 rounded-lg shadow-md mb-4">
      <FiCodesandbox className=" w-5 mr-2 mt-1" />

      <div className="flex-1">
        <section className="flex justify-between  ">
          <div className="flex items-center justify-center gap-3 ">
            <div>{notification.type}</div>
            {notification.category && (
              <div
                className={` p-1 text-[14px] rounded-md ${
                  notification.category == 'Review program'
                    ? 'bg-red-100 text-red-400'
                    : 'bg-blue-100 text-blue-400'
                }`}
              >
                {notification.category}
              </div>
            )}
          </div>
          <div className="text-gray-500  ">{notification.time}</div>
        </section>

        <div className="flex justify-between  items-start mt-3">
          <section className="text-gray-500 max-w-[400px] w-full">
            {notification.message}
          </section>
          {!notification.image && (
            //   <img src={notification.image} alt={notification.category} />
            <div className="border border-blue-500 text-blue-500 p-2 rounded-md">
              {notification.button}
            </div>
          )}
        </div>

        <section></section>
      </div>
    </div>
  )
}

const NotificationsSampler = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
      <div>
        {notificationData.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}

export default NotificationsSampler
