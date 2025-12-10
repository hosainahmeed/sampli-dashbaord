import React from 'react';
import { Card, Typography } from 'antd';
import { FiMail, FiPhoneCall } from 'react-icons/fi';
const { Title, Text } = Typography;

function ContactInformationCustomer({ order, isLoading }) {
  return (
    <div>
      <Card loading={isLoading} className="shadow p-4">
        <div className="flex items-center justify-between">
          <Title level={3} className="mt-6">
            Contact Information
          </Title>
        </div>
        <>

          <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
            <FiMail />
            <Text>{order?.shippingAddress?.email || 'No Email'}</Text>
          </div>

          <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
            <FiPhoneCall />
            <Text type="secondary">{order?.shippingAddress?.phone || 'No Phone number'}</Text>
          </div>
        </>
      </Card>
    </div>
  );
}

export default ContactInformationCustomer;
