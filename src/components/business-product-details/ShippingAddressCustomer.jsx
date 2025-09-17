import { Card, Typography, Space, Button } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { FiMap } from 'react-icons/fi';
import React from 'react';

const { Title, Text } = Typography;

function ShippingAddressCustomer({ order }) {
  const address = order?.shippingAddress;

  if (!address) return null;

  const fullAddress = `${address.street1 || ''}, ${address.street2 || ''}, ${address.city || ''}, ${address.state || ''} ${address.zip || ''}, ${address.country || ''}`;

  const handleViewMap = () => {
    const encoded = encodeURIComponent(fullAddress);
    const url = `https://www.google.com/maps?q=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <Card className="shadow p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <Title level={4} className="mt-0">
            Shipping Address
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
            <Text strong>{address.name}</Text>
          </div>

          {address.company && (
            <Text type="secondary">{address.company}</Text>
          )}

          <Text type="secondary">{fullAddress}</Text>

          <Text type="secondary">{address.phone}</Text>
          {address.alternativePhoneNumber && (
            <Text type="secondary">{address.alternativePhoneNumber}</Text>
          )}

          <Button
            type="link"
            className="mt-2 p-0 flex items-center gap-1"
            onClick={handleViewMap}
          >
            <FiMap /> View Map
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default ShippingAddressCustomer;
