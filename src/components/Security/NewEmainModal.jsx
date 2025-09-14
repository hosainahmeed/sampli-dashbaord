import React from "react";
import { Modal, Form, Input, Button, Typography } from "antd";
import toast from "react-hot-toast";

const { Title } = Typography;

const NewEmainModal = ({ visible, onCancel, onContinue }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    localStorage.setItem("email", values.email);
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
