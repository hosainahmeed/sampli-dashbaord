import { Button, Card, Form, message, Typography } from 'antd';
import React, { useEffect } from 'react';
import FormWrapper from '../ui/FormWrapper';
import InputField from '../ui/InputField';
import SelectField from '../page-Component/SelectField';
import PrimaryContactInformation from './PrimaryContactInformation';
import Documentation from './Documentation';
import { useGetProfileQuery } from '../../Redux/businessApis/business _profile/getprofileApi';
import { options, SectorOptions } from '../ui/BusinessInfoForm';
const { Title } = Typography;
function BusinessInfo() {
  const { data, isLoading: isBusinessLoading } = useGetProfileQuery();
  console.log(data?.data?.businessName)
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      businessName: data?.data?.bussinessName,
      tradeName: data?.data?.tradeName,
      industryType: data?.data?.industryType,
      bussinessType: data?.data?.bussinessType,
      bussinessAddress: data?.data?.bussinessAddress,
      phoneNumber: data?.data?.phoneNumber,
      website: data?.data?.website,
      taxtIndentificationNumber: data?.data?.taxtIndentificationNumber,
    })
  }, [data])
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
            form={form}
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
              name="bussinessType"
              placeholder="Select business type"
              rules={[
                {
                  required: true,
                  message: 'Please select your business type!',
                },
              ]}
              options={options.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              className="w-full"
            />
            <SelectField
              label="Industry/Sector"
              name="industryType"
              placeholder="Select industry"
              rules={[
                { required: true, message: 'Please select your industry!' },
              ]}
              options={SectorOptions.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              className="w-full"
            />
            <InputField
              label="Business Address"
              name="bussinessAddress"
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
              name="taxtIndentificationNumber"
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
          <PrimaryContactInformation data={data?.data} />
          <Documentation data={data?.data} />
        </div>
      </div>
    </>
  );
}

export default BusinessInfo;
