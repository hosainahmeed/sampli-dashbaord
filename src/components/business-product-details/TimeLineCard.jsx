import { Card, Divider, Space, Timeline, Typography } from 'antd';
import React from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

const { Text } = Typography;

const ORDER_STATUS_MAP = {
  PENDING: { status: 'Order processed', color: 'gray' },
  PROCESSING: { status: 'Payment Confirmed', color: 'gray' },
  SHIPPED: { status: 'Item shipped', color: 'gray' },
  DELIVERED: { status: 'Delivered', color: 'gray' },
};

function TimeLineCard({ status, order }) {
  const { timeline } = order;

  const getTimelineState = () => {
    const statusOrder = Object.keys(ORDER_STATUS_MAP);
    const currentStatusIndex = statusOrder.indexOf(status);

    return statusOrder.map((key, index) => {
      const isCompleted = index <= currentStatusIndex;
      return {
        status: ORDER_STATUS_MAP[key].status,
        color: isCompleted ? 'green' : 'gray',
        completed: isCompleted,
      };
    });
  };

  const timelineState = getTimelineState();

  // Calculate the total as the sum of shipping and subtotal
  const calculatedTotal = order.subtotal + order.shipping;

  return (
    <div className="">
      <Card
        title={
          <div className="w-full py-4 flex-col items-start justify-between">
            <div className="w-full flex items-center justify-between mb-4">
              <Space>
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex flex-col ">
                  <Text strong>{order.name}</Text>
                  <Text type="secondary">{order.variant}</Text>
                </div>
              </Space>
              <Text strong>
                ${order.price} × {order.quantity}
              </Text>
              <Text strong>${order.price * order.quantity}</Text>
            </div>
            <Divider />
            <div className="w-full flex flex-col justify-between">
              <Space className="w-full justify-between">
                <Text type="secondary">Subtotal</Text>
                <Text type="secondary">{order.quantity} items</Text>
                <Text>${order.subtotal}</Text>
              </Space>
              <Space className="w-full justify-between mt-2">
                <Text type="secondary">Shipping</Text>
                <Text type="secondary">Door delivery</Text>
                <Text>${order.shipping}</Text>
              </Space>
              <Space className="w-full justify-between mt-2">
                <Text strong>Total</Text>
                <Text strong>${calculatedTotal}</Text>
              </Space>
            </div>
          </div>
        }
        className="shadow p-4"
      >
        <div>
          <Timeline>
            {timelineState.map((event, index) => (
              <Timeline.Item
                key={index}
                dot={
                  event.completed ? (
                    <FaCircleCheck style={{ color: event.color }} />
                  ) : (
                    <FaRegCircle />
                  )
                }
                color={event.color}
              >
                <Text>{event.status}</Text>
                <br />
                <Text type="secondary">
                  {timeline.find((e) => e.status === event.status)?.date ||
                    'Pending'}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </Card>
    </div>
  );
}

export default TimeLineCard;
