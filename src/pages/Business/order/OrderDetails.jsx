import { Button, Card, Timeline, Typography, Space } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CiUser } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";

const { Text, Title } = Typography;

const order = {
  id: "#8838837",
  status: "Processing",
  date: "December 3, 2024 at 3:40 am",
  image:
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
  name: "JBL Maximum Speaker",
  variant: "Medium Black",
  price: 50.0,
  quantity: 1,
  subtotal: 50.0,
  shipping: 50.0,
  total: 50.0,
  timeline: [
    { status: "Order processed", date: "23, Oct 2023", completed: true },
    { status: "Payment Confirmed", date: "23, Oct 2023", completed: true },
    { status: "Item shipped", date: "23, Oct 2023", completed: false },
    { status: "Delivered", date: "23, Oct 2023", completed: false },
  ],
  customer: "Michael Scott",
  email: "MichaelScott@gmail.com",
  phone: "No Phone number",
  shippingAddress: {
    name: "Michael Scott",
    address:
      "Dunder Mifflin Paper Production, House 45, Menlo Park, CA 989, United States",
    phone: "+16278847",
  },
};

function OrderDetails() {
  const navigate = useNavigate();
  return (
    <div className=" p-6">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <Text className="text-lg">Back</Text>
      </div>
      <div className="flex justify-between border-b pb-4 border-gray-200 mt-4">
        <div>
          <div className="flex items-center gap-2">
            <Title level={3} className="m-0">
              Order ID: {order.id}
            </Title>
            <span className="px-2 py-1 text-[10px] bg-purple-100 text-purple-600 rounded border border-purple-300">
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 mt-2">{order.date}</p>
        </div>
        <div className="flex gap-2">
          <Button>Go to item</Button>
          <Button type="primary">Track Item</Button>
        </div>
      </div>
      <Title className="!mt-4" level={4}>
        Order Item
      </Title>
      <div className="flex !mt-12 justify-between items-start gap-4">
        <div className="flex-1">
          <div className="">
            <Card
              title={
                <Space className="w-full py-4 justify-between">
                  <Space>
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <Space direction="vertical">
                      <Text strong>{order.name}</Text>
                      <Text type="secondary">{order.variant}</Text>
                    </Space>
                  </Space>
                  <Text strong>
                    ${order.price} × {order.quantity}
                  </Text>
                </Space>
              }
              className="shadow p-4"
            >
              <Space className="w-full justify-between">
                <Text type="secondary">Subtotal</Text>
                <Text>${order.subtotal}</Text>
              </Space>
              <Space className="w-full justify-between mt-2">
                <Text type="secondary">Shipping</Text>
                <Text>${order.shipping}</Text>
              </Space>
              <Space className="w-full justify-between mt-2">
                <Text strong>Total</Text>
                <Text strong>${order.total}</Text>
              </Space>
            </Card>
          </div>

          <Title level={5} className="mt-6">
            Timeline
          </Title>
          <Timeline>
            {order.timeline.map((event, index) => (
              <Timeline.Item
                key={index}
                dot={
                  event.completed ? (
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                  ) : null
                }
                color={event.completed ? "green" : "gray"}
              >
                <Text>{event.status}</Text>
                <br />
                <Text type="secondary">{event.date}</Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <Card className="shadow p-4">
            <Title level={3} className="mt-6">
              Customer
            </Title>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <CiUser />
              <h1 className="!mt-2">{order.customer}</h1>
            </div>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <FiShoppingBag />
              <h1 className="!mt-2">1 order</h1>
            </div>
          </Card>

          <Card className="shadow p-4">
            <Title level={3} className="mt-6">
              Contact Information
            </Title>
            <Text>{order.email}</Text>
            <br />
            <Text type="secondary">{order.phone}</Text>
          </Card>

          <Card className="shadow p-4">
            <Title level={3} className="mt-6">
              Shipping Address
            </Title>
            <Text>{order.shippingAddress.name}</Text>
            <br />
            <Text type="secondary">{order.shippingAddress.address}</Text>
            <br />
            <Text type="secondary">{order.shippingAddress.phone}</Text>
          </Card>

          <Title level={5} className="mt-6">
            Billing Address
          </Title>
          <Card className="shadow p-4">
            <Text>Same as shipping address</Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
