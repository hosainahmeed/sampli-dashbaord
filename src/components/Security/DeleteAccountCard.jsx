import { Button, Card, Typography, Modal, Form, Input, Checkbox } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function DeleteAccountCard() {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const handleDelete = () => {
    if (!email || !password || !check) {
      toast.dismiss()
      toast.error(
        'Please fill in both Reason and password and confirm that you understand!'
      );
      return;
    }
    toast.dismiss()
    toast.success('Account deleted successfully!');
    // Implement delete logic here
    navigate('/login');
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleCheck = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <Card>
      <div className="!flex !justify-between items-center">
        <div>
          <Title level={3}>Delete Account</Title>
          <Text>Would you like to delete your account?</Text>
        </div>
        <div>
          <Button type="primary" danger onClick={() => setModal(true)}>
            Delete Account
          </Button>
        </div>
      </div>
      <Modal
        visible={modal}
        // onOk={handleDelete}
        // okText="Delete"
        onCancel={handleCancel}
        footer={null}
        okButtonProps={{ disabled: !check }}
      >
        <h1 className="!text-center text-xl font-semibold">Delete account</h1>
        <h3 className="!text-center text-[#6D7486]">
          Once you delete your account, your profile and username are
          permanently removed from Reddit and your posts, comments, and messages
          are disassociated (not deleted) from your account unless you delete
          them beforehand.
        </h3>
        <Form className="!mt-5" requiredMark={true} layout="vertical">
          <Form.Item
            label={<h1 className="text-[#6D7486]">Reason for leaving</h1>}
            name="reason"
            rules={[{ required: true, message: 'Please input your reason!' }]}
          >
            <Input.TextArea
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your reason"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label={<h1 className="text-[#6D7486]">Password</h1>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item
            name="confirmUnderstand"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Please confirm that you understand!'),
              },
            ]}
          >
            <Checkbox
              className="!text-[#6D7486]"
              checked={check}
              onChange={handleCheck}
            >
              I understand that deleted accounts aren&apos;t recoverable
            </Checkbox>
          </Form.Item>
          <div className="flex items-center justify-center w-full gap-3">
            <Button
              className="!w-full"
              type="primary"
              onClick={handleDelete}
              disabled={!check}
            >
              Continue
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
}

export default DeleteAccountCard;
