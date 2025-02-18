import React from "react";
import { Modal, Form, Input, Button, Typography, message } from "antd";

const { Title, Text } = Typography;

const NewEmainModal = ({ visible, onCancel, onContinue }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem("email", values.email);
    message.success("Form submitted successfully!");
    onContinue();
  };
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      className="text-center"
    >
      <Title level={3}>New Email address</Title>
      <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="New Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email address!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="newPass"
          rules={[
            { required: true, message: "Please enter your new password!" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password
            className="h-8"
            placeholder="Enter your new password"
          />
        </Form.Item>
        <Form.Item className="flex items-center justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewEmainModal;
