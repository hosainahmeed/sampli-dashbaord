import React from 'react';
import { Card, Typography } from 'antd';
const { Title, Text } = Typography;

function ContactInformationCustomer({ order }) {
  return (
    <div>
      <Card className="shadow p-4">
        <div className="flex items-center justify-between">
          <Title level={3} className="mt-6">
            Contact Information
          </Title>
        </div>
        <>
          <Text>{order?.shippingAddress?.email || 'No Email'}</Text>
          <br />
          <Text type="secondary">{order?.shippingAddress?.phone || 'No Phone number'}</Text>
        </>
      </Card>
    </div>
  );
}

export default ContactInformationCustomer;
