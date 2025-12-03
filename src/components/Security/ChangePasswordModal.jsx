import React from "react";
import { Modal, Form, Input, Button } from "antd";

const ChangePasswordModal = ({ open, onCancel, onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const fieldErrors = await onSubmit(values);
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([field, message]) => {
        form.setFields([{ name: field, errors: [message] }]);
      });
    } else {
      form.resetFields();
    }
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={true}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please enter your old password" }]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter a new password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
