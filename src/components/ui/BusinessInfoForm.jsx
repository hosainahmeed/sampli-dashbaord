import React from 'react';
import {
  Button,
  Typography,
  Divider,
} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import InputField from './InputField';
import SelectField from '../page-Component/SelectField';
import Logo from './Logo';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;
export const options = [
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Private Limited Company', label: 'Private Limited Company' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Limited Liability Partnership (LLP)', label: 'Limited Liability Partnership (LLP)' },
  { value: 'Corporation', label: 'Corporation' },
  { value: 'Small Business Enterprise (SME)', label: 'Small Business Enterprise (SME)' },
  { value: 'Startup', label: 'Startup' },
  { value: 'Online Retailer/E-commerce', label: 'Online Retailer/E-commerce' },
  { value: 'Manufacturing Company', label: 'Manufacturing Company' },
];
export const SectorOptions = [
  { value: 'Beauty', label: 'Beauty' },
  { value: 'Apparel', label: 'Apparel' },
  { value: 'Footwear', label: 'Footwear' },
  { value: 'Personal Care', label: 'Personal Care' },
  { value: 'Home appliances', label: 'Home appliances' },
  { value: 'Food & Beverage', label: 'Food & Beverage' },
  { value: 'Pets', label: 'Pets' },
  { value: 'Kids & Baby', label: 'Kids & Baby' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Women', label: 'Women' },
  { value: 'Men', label: 'Men' },
];


const BusinessInfoForm = () => {
  const location = useLocation()
  const router = useNavigate();
  const onFinish = (values) => {
    localStorage.setItem('businessInfo', JSON.stringify({ ...values, email: location?.state?.email }));
    toast.success('Form submitted successfully!');
    router('/user-info');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 gradient-container">
      <div className="gradient-ellipse "></div>
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          <Logo />
        </Title>
        <div className="flex flex-col items-start">
          <Title level={3} className="mb-6">
            Please provide your business info
          </Title>
          <Text className="mb-4">Share key details about your business.</Text>
        </div>
        <FormWrapper onFinish={onFinish}>
          <InputField
            label={'Legal Business name'}
            name="legalBusinessName"
            rules={[
              {
                required: true,
                message: 'Please enter your legal business name!',
              },
            ]}
            placeholder="Enter your legal business name"
            className="text-start"
          ></InputField>
          <InputField
            label={'DBA (Doing Business As)'}
            name="tradeName"
            placeholder="Enter your DBA"
          ></InputField>
          <div className="flex gap-4 items-center justify-between">
            <SelectField
              rules={[
                {
                  required: true,
                  message: 'Please select the type of business!',
                },
              ]}
              name="businessType"
              label={'Business Type'}
              options={options}
              className="w-full text-start"
              placeholder={'Select type of business'}
            />
            <SelectField
              rules={[
                {
                  required: true,
                  message: 'Please select the type of business!',
                },
              ]}
              name="businessSector"
              label={'Business Sector'}
              options={SectorOptions}
              className="w-full text-start"
              placeholder={'Select type of business'}
            />
          </div>
          <InputField
            label={'Business address'}
            name="businessAddress"
            rules={[
              {
                required: true,
                message: 'Please enter your business address!',
              },
            ]}
            placeholder="Enter your business address"
            className="text-start"
          ></InputField>

          <Button size='large' type="primary" htmlType="submit" className="w-full">
            Continue
          </Button>
        </FormWrapper>

        {/* <Divider />
        <div className="mt-4 text-gray-500">
          <Link to="/help" className="mr-3">
            Help
          </Link>
          <Link to="/privacy" className="mr-3">
            Privacy
          </Link>
          <Link to="/terms">Terms</Link>
        </div> */}
      </div>
    </div>
  );
};

export default BusinessInfoForm;
