import { Card, Typography, Space, Button } from 'antd';
import { CiEdit } from 'react-icons/ci';
import React from 'react';
const { Title, Text } = Typography;

function BillingAddressCustomer({ order }) {
  const handleViewMap = () => {
    const address = encodeURIComponent(order.shippingAddress.address);
    const url = `https://www.google.com/maps?q=${address}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <Card className="shadow p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <Title level={4} className="mt-0">
            Billing Address
          </Title>
          <Button className="!border-none">
            <CiEdit className="text-xl" />
          </Button>
        </div>
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-white">👤</span>
            </div>
            <Text strong>{order.shippingAddress.name}</Text>
          </div>
          <Text type="secondary">{order.shippingAddress.address}</Text>
          <Text type="secondary">{order.shippingAddress.phone}</Text>
          <Button type="link" className="mt-2 p-0" onClick={handleViewMap}>
            View Map
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default BillingAddressCustomer;
