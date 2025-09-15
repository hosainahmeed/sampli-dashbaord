import { Button, Card, Input, Typography } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CiEdit } from 'react-icons/ci';
const { Title, Text } = Typography;

function ContactInformationCustomer({ order }) {
  const [isEdit, setIsEdit] = useState(false);
  const [email] = useState(order.email);
  const [phone, setPhone] = useState(order.phone);

  const handleSave = () => {
    console.log('Updated phone:', phone);
    toast.dismiss()
    toast.success('Phone number updated successfully!');
  };

  return (
    <div>
      <Card className="shadow p-4">
        <div className="flex items-center justify-between">
          <Title level={3} className="mt-6">
            Contact Information
          </Title>
          <Button onClick={() => setIsEdit(!isEdit)} className="!border-none">
            <CiEdit className="text-2xl" />
          </Button>
        </div>
        {isEdit ? (
          <>
            <Input
              value={email}
              disabled
              style={{ cursor: 'not-allowed' }}
              className="!mb-2"
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="!mb-2"
            />
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text>{email}</Text>
            <br />
            <Text type="secondary">{phone || 'No Phone number'}</Text>
          </>
        )}
      </Card>
    </div>
  );
}

export default ContactInformationCustomer;
