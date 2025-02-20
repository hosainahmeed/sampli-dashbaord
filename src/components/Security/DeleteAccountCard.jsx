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
      toast.error(
        'Please fill in both Reason and password and confirm that you understand!'
      );
      return;
    }
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
        title="Delete Account Confirmation"
        visible={modal}
        onOk={handleDelete}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !check }}
      >
        <Title level={3}>Delete account</Title>
        <Text>
          Once you delete your account, your profile and username are
          permanently removed from Reddit and your posts, comments, and messages
          are disassociated (not deleted) from your account unless you delete
          them beforehand.
        </Text>
        <Form className="!mt-5" requiredMark={false} layout="vertical">
          <Form.Item
            label="Reason for leaving"
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
            label="Password"
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
            <Checkbox checked={check} onChange={handleCheck}>
              I understand that deleted accounts aren't recoverable
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default DeleteAccountCard;
