import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Divider,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import InputField from './InputField';
import SelectField from '../page-Component/SelectField';
import Logo from './Logo';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;
const { Option } = Select;

const BusinessInfoForm = () => {
  const options = [
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'private_limited_company', label: 'Private Limited Company' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'sme', label: 'Small Business Enterprise (SME)' },
    { value: 'startup', label: 'Startup' },
    { value: 'online_retailer', label: 'Online Retailer/E-commerce' },
    { value: 'manufacturing_company', label: 'Manufacturing Company' },
  ];
  const SectorOptions = [
    { value: 'beauty', label: 'Beauty' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'personal_care', label: 'Personal Care' },
    { value: 'home_appliances', label: 'Home Appliances' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'pets', label: 'Pets' },
    { value: 'kids_baby', label: 'Kids & Baby' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'women', label: 'Women' },
    { value: 'men', label: 'Men' },
  ];
  const router = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    toast.success('Form submitted successfully!');
    router('/user-info');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
            label={'Trade name (Optional)'}
            name="tradeName"
            placeholder="Enter your trade name"
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

          <Button type="primary" htmlType="submit" className="w-full">
            Continue
          </Button>
        </FormWrapper>

        <Divider />
        <div className="mt-4 text-gray-500">
          <Link to="/help" className="mr-3">
            Help
          </Link>
          <Link to="/privacy" className="mr-3">
            Privacy
          </Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
