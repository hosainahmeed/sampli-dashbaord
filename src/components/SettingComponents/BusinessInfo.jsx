import { Button, Card, Form, message, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import FormWrapper from '../ui/FormWrapper';
import InputField from '../ui/InputField';
import SelectField from '../page-Component/SelectField';
import PrimaryContactInformation from './PrimaryContactInformation';
import Documentation from './Documentation';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../Redux/businessApis/business _profile/getprofileApi';
import { options, SectorOptions } from '../ui/BusinessInfoForm';
import toast from 'react-hot-toast';
const { Title } = Typography;
function BusinessInfo() {
  const { data, isLoading: isBusinessLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      businessName: data?.data?.bussinessName,
      tradeName: data?.data?.tradeName,
      industryType: data?.data?.industryType,
      bussinessType: data?.data?.bussinessType,
      bussinessAddress: data?.data?.bussinessAddress,
      phoneNumber: data?.data?.phoneNumber,
      taxtIndentificationNumber: data?.data?.taxtIndentificationNumber,
      einNumber: data?.data?.einNumber,
    })
  }, [data])
  const onFinishForm = async (values) => {
    try {
      await updateProfile(values).unwrap().then((res) => {
        if (res?.success) {
          toast.dismiss()
          toast.success(res?.message || "Business updated successfully!")
        }
      })
    } catch (error) {
      toast.dismiss()
      toast.error(error?.data?.message || error?.message || "Something went wrong!")
    }
  };
  return (
    <>
      <Title level={3}>Business</Title>
      <div className="flex flex-col lg:flex-row gap-4">
        <Card loading={isBusinessLoading} className="w-full !flex-1">
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
              label="Tax ID"
              name="taxtIndentificationNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter your tax identification number!',
                },
              ]}
              placeholder="Enter tax ID"
              className="col-span-1"
            />
            <InputField
              label="EIN"
              name="einNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter your EIN!',
                },
              ]}
              placeholder="Enter EIN"
              className="col-span-1"
            />
            <Form.Item className="col-span-2 flex justify-end">
              <Button type="primary" loading={updateProfileLoading} htmlType="submit" className="bg-gray-300">
                Save
              </Button>
            </Form.Item>
          </FormWrapper>
        </Card>
        <div className="w-full flex-1">
          <Documentation data={data?.data} />
        </div>
      </div>
      <div className='w-full mt-4'>
        <Title level={3}>Bio Information</Title>
        <PrimaryContactInformation data={data?.data} />
      </div>
    </>
  );
}

export default BusinessInfo;
