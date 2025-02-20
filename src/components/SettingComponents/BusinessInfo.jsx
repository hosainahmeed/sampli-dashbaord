import { Button, Card, Form, message, Typography } from 'antd';
import React from 'react';
import FormWrapper from '../ui/FormWrapper';
import InputField from '../ui/InputField';
import SelectField from '../page-Component/SelectField';
import PrimaryContactInformation from './PrimaryContactInformation';
import Documentation from './Documentation';
const { Title } = Typography;
function BusinessInfo() {
  const onFinishForm = (values) => {
    console.log(values);
  };
  return (
    <>
      <Title level={3}>Business</Title>
      <div className=" grid sm:grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="w-full shadow-md flex-1">
          <FormWrapper
            onFinish={onFinishForm}
            className="grid grid-cols-2 gap-x-4 gap-y-4"
          >
            <InputField
              label="Legal Business Name"
              name="businessName"
              rules={[
                { required: true, message: 'Please enter your business name!' },
              ]}
              placeholder="Enter legal business name"
              className="col-span-2"
            />
            <InputField
              label="Trade Name (Optional)"
              name="tradeName"
              placeholder="Enter trade name"
              className="col-span-2"
            />
            <SelectField
              label="Type of Business"
              name="businessType"
              placeholder="Select business type"
              rules={[
                {
                  required: true,
                  message: 'Please select your business type!',
                },
              ]}
              options={[
                { value: 'retail', label: 'Retail' },
                { value: 'wholesale', label: 'Wholesale' },
                { value: 'services', label: 'Services' },
              ]}
              className="w-full"
            />
            <SelectField
              label="Industry/Sector"
              name="industry"
              placeholder="Select industry"
              rules={[
                { required: true, message: 'Please select your industry!' },
              ]}
              options={[
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'finance', label: 'Finance' },
                { value: 'technology', label: 'Technology' },
              ]}
              className="w-full"
            />
            <InputField
              label="Business Address"
              name="businessAddress"
              rules={[
                {
                  required: true,
                  message: 'Please enter your business address!',
                },
              ]}
              placeholder="Enter business address"
              className="col-span-2"
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
              ]}
              placeholder="Enter phone number"
            />
            <InputField
              label="Website"
              name="website"
              placeholder="Enter website URL"
              rules={[
                {
                  required: true,
                  message: 'please enter your website link',
                },
              ]}
            />
            <InputField
              label="Tax Identification Number"
              name="taxId"
              rules={[
                {
                  required: true,
                  message: 'Please enter your tax identification number!',
                },
              ]}
              placeholder="Enter tax ID"
              className="col-span-2"
            />
            <Form.Item className="col-span-2 flex justify-end">
              <Button type="primary" htmlType="submit" className="bg-gray-300">
                Save
              </Button>
            </Form.Item>
          </FormWrapper>
        </Card>
        <div className="space-y-4">
          <PrimaryContactInformation />
          <Documentation />
        </div>
      </div>
    </>
  );
}

export default BusinessInfo;
