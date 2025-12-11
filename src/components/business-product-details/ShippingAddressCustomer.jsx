import { Card, Typography, Space, Button } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { FiMap, FiMapPin, FiPhoneCall } from 'react-icons/fi';
import React from 'react';
import { LuUserRound } from 'react-icons/lu';

const { Title, Text } = Typography;

function ShippingAddressCustomer({ order , isLoading }) {
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
      <Card loading={isLoading} className="shadow p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <Title level={4} className="mt-0">
            Shipping Address
          </Title>
        </div>

        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <LuUserRound />
            </div>
            <Text strong>{address.name}</Text>
          </div>

          {address.company && (
            <Text type="secondary">{address.company}</Text>
          )}

          <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
            <FiMapPin />
            <Text type="secondary">{fullAddress}</Text>
          </div>
          <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
            <FiPhoneCall />
            <Text type="secondary">{address.phone}</Text>
          </div>
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
