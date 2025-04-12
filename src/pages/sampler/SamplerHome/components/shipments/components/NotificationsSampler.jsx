import React from 'react'
import { FaRegComment, FaTruck } from 'react-icons/fa'
import { FiDollarSign } from 'react-icons/fi'
import { GrGift } from 'react-icons/gr'
import { IoIosStarOutline } from 'react-icons/io'
import productImage from '/public/product_image.svg'

const notificationData = [
  {
    id: 1,
    type: 'Review Product Shipped',
    category: 'Review program',
    message:
      'Your free review product (Apple Watch Series 9) has been shipped! Expected delivery: Dec 16',
    product: 'BENGOO G9000 Stereo Gaming Headset',
    qty: 2,
    image: productImage,
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
    image: productImage,
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
    image: productImage,

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

const icons = {
  'Review Product Shipped': <GrGift className=" w-5 mr-2 mt-1" />,
  'Review Request': <IoIosStarOutline className=" w-5 mr-2 mt-1" />,
  'Order Shipped': <FaTruck className=" w-5 mr-2 mt-1" />,
  'Payment Received': <FiDollarSign className=" w-5 mr-2 mt-1" />,
  'New Comment': <FaRegComment className=" w-5 mr-2 mt-1" />,
}

const NotificationCard = ({ notification }) => {
  return (
    <div className="flex justify-between  border border-gray-200 p-4 rounded-lg mb-4 text-gray-700">
      {icons[notification.type] || null}

      <div className="flex-1">
        <section className="flex justify-between  ">
          <div className="flex items-center justify-center gap-3 ">
            <div>{notification.type}</div>
            {notification.category && (
              <div
                className={` p-1 text-[14px] rounded-md ${
                  notification.category == 'Review program'
                    ? 'bg-red-50 text-red-400'
                    : 'bg-blue-50 text-blue-400'
                }`}
              >
                {notification.category}
              </div>
            )}
          </div>
          <div className="text-gray-500  ">{notification.time}</div>
        </section>

        <div className="flex justify-between  items-start mt-3">
          <section className="text-gray-500 max-w-[400px] w-full text-[14px]">
            {notification.message}
          </section>
          {!notification.image && (
            <div className="border border-blue-500 w-[120px] flex items-center justify-center text-blue-500 p-2 rounded-md text-[14px] cursor-pointer hover:bg-gray-100">
              {notification.button}
            </div>
          )}
        </div>
        {notification.image && (
          <div className="flex items-center justify-between border p-2 mt-3 border-gray-200 rounded-md">
            <div className="flex items-center gap-2 ">
              <img
                src={notification.image}
                className="w-16 h-16 border "
                alt={notification.category}
              />
              <div>{notification.product} </div>
            </div>
            <div className="border flex items-center justify-center border-blue-500 w-[120px] text-blue-500 p-2 rounded-md text-[14px] cursor-pointer hover:bg-gray-100">
              {notification.button}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const NotificationsSampler = () => {
  return (
    <div className="h-[94vh] overflow-auto scroll-y-auto scrollbar-none">
      <h1 className="text-xl font-semibold mb-6">Notifications</h1>
      <div>
        {notificationData.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  )
}

export default NotificationsSampler
