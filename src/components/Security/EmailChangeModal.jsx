import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

const EmailChangeModal = ({ visible, onCancel, onContinue }) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="text-center"
    >
      <Title level={3}>Change Email address</Title>
      <Text>Re-enter your password to continue.</Text>
      <Form requiredMark={false} layout="vertical" onFinish={onContinue}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item className="flex items-center justify-end">
          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmailChangeModal;
