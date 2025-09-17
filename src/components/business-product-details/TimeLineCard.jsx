import { Card, Divider, Space, Timeline, Typography } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

const { Text } = Typography;

const DELIVERY_STEP_MAP = ["Order Placed", "Payment Confirmed", "Item Shipped", "Delivered"];

const DELIVERY_STATUS_MAP = {
  "Waiting to be shipped": 0,
  "Payment Confirmed": 1,
  Shipped: 2,
  Delivered: 3,
};

function TimeLineCard({ status, order }) {
  const deliveryStatus = status || order?.deliveryStatus || "Waiting to be shipped";
  const [currentImg, setCurrentImg] = useState(order?.product?.images?.[0] || "");
 
  const currentStepIndex = useMemo(() => DELIVERY_STATUS_MAP[deliveryStatus] ?? 0, [deliveryStatus]);
 
  const timelineState = useMemo(
    () =>
      DELIVERY_STEP_MAP.map((step, index) => ({
        step,
        completed: index <= currentStepIndex,
      })),
    [currentStepIndex]
  );

  const subtotal = order?.amount || 0;
  const shipping = 10;
  const total = subtotal + shipping;
 
  useEffect(() => {
    if (!order?.product?.images?.length) return;

    const images = order.product.images;
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImg(images[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [order?.product?.images]);

  return (
    <Card
      title={
        <div className="w-full py-4 flex-col items-start justify-between">
          <div className="w-full flex items-center justify-between mb-4">
            <Space>
              <img
                src={currentImg}
                alt={order?.product?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <Text strong>{order?.product?.name}</Text>
                <Text type="secondary">{order?.campaign?.name}</Text>
              </div>
            </Space>
            <Text strong>${order?.amount}</Text>
          </div>

          <Divider />

          <div className="flex flex-col gap-2">
            <Space className="w-full justify-between">
              <Text type="secondary">Subtotal</Text>
              <Text type="secondary">1 item</Text>
              <Text>${subtotal}</Text>
            </Space>
            <Space className="w-full justify-between">
              <Text type="secondary">Shipping</Text>
              <Text type="secondary">Door delivery</Text>
              <Text>${shipping}</Text>
            </Space>
            <Space className="w-full justify-between">
              <Text strong>Total</Text>
              <Text strong>${total}</Text>
            </Space>
          </div>
        </div>
      }
      className="shadow p-4"
    >
      <Timeline>
        {timelineState.map((event, i) => (
          <Timeline.Item
            key={i}
            dot={event.completed ? <FaCircleCheck style={{ color: "green" }} /> : <FaRegCircle />}
            color={event.completed ? "green" : "gray"}
          >
            <Text>{event.step}</Text>
            <br />
            <Text type="secondary">
              {event.completed && order?.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "Pending"}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
}

export default TimeLineCard;
