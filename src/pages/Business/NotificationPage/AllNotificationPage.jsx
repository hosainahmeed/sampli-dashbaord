import React, { useState } from "react";
import {
  FaBell,
  FaStar,
  FaBullhorn,
  FaDollarSign,
  FaShoppingCart,
  FaTruck,
  FaVideo,
  FaThumbsUp,
} from "react-icons/fa";
import { Button, Card } from "antd";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";

// Dummy data (following backend INotification type)
const dummyNotifications = [
  {
    receiver: "user123",
    type: "likeOnPost",
    title: "Someone liked your post",
    message: "John liked your review on 'Summer Dress A-Line'",
    data: { reviewId: "123456" },
    isRead: false,
    time: "10 min ago",
  },
  {
    receiver: "user123",
    type: "review",
    title: "New Product Review Posted",
    message: 'Sarah K. posted a video review for "Summer Dress A-Line"',
    data: { reviewId: "654321" },
    isRead: false,
    time: "1 hour ago",
  },
  {
    receiver: "user123",
    type: "payment",
    title: "Payment Processed",
    message: "Monthly reviewer payments processed successfully",
    data: { amount: 200 },
    isRead: true,
    time: "2 hours ago",
  },
  {
    receiver: "user123",
    type: "orderNotification",
    title: "New Store Order",
    message: "Order #12345 received for 3 items worth $150",
    data: {
      orderId: "999",
      product: { id: "111", name: "T-shirt", quantity: 3 },
    },
    isRead: false,
    time: "3 hours ago",
  },
];

// helper: map type → icon
const getIcon = (type) => {
  switch (type) {
    case "likeOnPost":
      return <FaThumbsUp className="text-blue-500" />;
    case "review":
      return <FaVideo className="text-orange-500" />;
    case "payment":
      return <FaDollarSign className="text-green-500" />;
    case "orderNotification":
      return <FaShoppingCart className="text-purple-500" />;
    case "shipping":
      return <FaTruck className="text-gray-500" />;
    case "general":
      return <FaBullhorn className="text-yellow-500" />;
    default:
      return <FaBell className="text-gray-500" />;
  }
};

// helper: map type → actions
const getActions = (type) => {
  switch (type) {
    case "likeOnPost":
      return ["View Stats", "Mark as read"];
    case "review":
      return ["Watch Review", "Mark as read"];
    case "orderNotification":
      return ["View Order", "Mark as read"];
    case "payment":
      return ["See details"];
    default:
      return ["Mark as read"];
  }
};

const AllNotificationPage = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  // mark all likes as read
  const markLikesAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.type === "likeOnPost" ? { ...n, isRead: true } : n
      )
    );
  };

  const categories = [
    { icon: <FaBell size={18} />, label: "All" },
    { icon: <FaStar size={18} />, label: "Reviews" },
    { icon: <FaBullhorn size={18} />, label: "Campaign" },
    { icon: <FaDollarSign size={18} />, label: "Payments" },
    { icon: <FaShoppingCart size={18} />, label: "Orders" },
    { icon: <FaTruck size={18} />, label: "Shipping" },
  ];

  return (
    <div className="w-full container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="flex gap-2">
          <Button variant="link" className="text-blue-500" onClick={markLikesAsRead}>
            Mark all Likes as read
          </Button>
          <Link to={"/settings"} state={{ tab: "notifications" }}>
            <Button variant="outline" className="flex items-center gap-2">
              <CiSettings size={18} />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            {category.icon}
            <span>{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Notifications list */}
      <Card className="p-4">
        <div className="divide-y divide-gray-200">
          {notifications.map((item, index) => (
            <div
              key={index}
              className={`py-4 flex items-start gap-4 ${item.isRead ? "opacity-60" : ""
                }`}
            >
              <div className="text-xl flex-shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600">{item.message}</p>

                <div className="flex gap-2">
                  {getActions(item.type).map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="link"
                      className="text-blue-500 h-auto p-0"
                      onClick={() => {
                        if (action === "Mark as read") {
                          setNotifications((prev) =>
                            prev.map((n, i) =>
                              i === index ? { ...n, isRead: true } : n
                            )
                          );
                        }
                      }}
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
  );
};

export default AllNotificationPage;
