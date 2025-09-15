import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const EmailChangeModal = ({ visible, onCancel, onContinue }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    toast.dismiss()
    toast.success("Form submitted successfully!");
    onContinue();
  };
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="text-center"
    >
      <Title level={3}>Email address</Title>
      <Text>Re-enter your password to continue.</Text>
      <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Password"
          name="newPass"
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
        >
          <Input.Password
            className="h-8"
            placeholder="Enter your new password"
          />
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
