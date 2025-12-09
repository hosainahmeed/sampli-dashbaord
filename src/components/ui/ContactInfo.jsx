import React from 'react';
import { Button, Typography } from 'antd';
import 'antd/dist/reset.css';
import Logo from '../../components/ui/Logo';
import InputField from '../../components/ui/InputField';
import FormWrapper from '../../components/ui/FormWrapper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAddComplianceInfoMutation } from '../../Redux/businessApis/complianceApi';

const { Title } = Typography;

const ContactInfo = () => {
  const router = useNavigate();
  const [addComplianceInfo, { isLoading }] = useAddComplianceInfoMutation()
  const onFinish = async (values) => {
    try {
      await addComplianceInfo(values).unwrap().then((res) => {
        if (res.success) {
          toast.success(res.message)
          router('/compliance-info')
        } else {
          throw new Error(res.message)
        }
      })
    } catch (error) {
      toast.error(error?.message || "Something went wrong")
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={2} className="text-start mb-1">
            Primary Contact and Compliance Information
          </Title>
          <h1 className="text-start text-[var(--body-text)]">
            Share your primary contact details along with any relevant
            compliance information.
          </h1>
        </div>

        <FormWrapper onFinish={onFinish}>
          <InputField
            className="text-start"
            label="Contact Name"
            name="contactName"
            rules={[{ required: true, message: 'Please enter your name!' }]}
            placeholder="Contact Name"
          />
          <InputField
            className="text-start"
            label="Contact role"
            name="contactRole"
            rules={[{ required: true, message: 'Please enter your role!' }]}
            placeholder="Contact role"
          />
          <InputField
            type="number"
            className="text-start"
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
            ]}
            placeholder="Phone number"
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ marginTop: 10 }}
            loading={isLoading}
            disabled={isLoading}
          >
            Continue
          </Button>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ContactInfo;
