import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

const PasswordChangeModal = ({ visible, onCancel, onContinue }) => {
  return (
    <Modal open={visible} onCancel={onCancel} footer={null} className="text-center">
      <Title level={3}>Enter password</Title>
      <Text>Enter your new password</Text>
      <Form requiredMark={false} layout="vertical" onFinish={onContinue}>
        <Form.Item
          label="Password"
          name="newPass"
          rules={[{ required: true, message: "Please enter your new password!" }]}
        >
          <Input.Password className="h-8" placeholder="Enter your new password" />
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

export default PasswordChangeModal;