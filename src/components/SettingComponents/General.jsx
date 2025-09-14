import React, { useEffect, useState } from 'react';
import FormWrapper from '../ui/FormWrapper';
import InputField from '../ui/InputField';
import TextArea from 'antd/es/input/TextArea';
import { Button, Card, Form, Modal, Typography } from 'antd';
import SelectField from '../page-Component/SelectField';
import { Country, State, City } from 'country-state-city';
import toast from 'react-hot-toast';
import { useGetProfileQuery } from '../../Redux/businessApis/business _profile/getprofileApi';
import { useGetBusinessStoreQuery, useUpdateBusinessStoreMutation } from '../../Redux/businessApis/business_store/businessStoreApis';
import { PlusOutlined } from '@ant-design/icons';
import CompanyInfoForm from './components/CompanyInfoForm';
const { Title } = Typography;
function General() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [showStoreForm, setShowStoreForm] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const { data: profile, isLoading: isBusinessLoading } = useGetProfileQuery();
  const { data: businessStore, isLoading: isBusinessStoreLoading } = useGetBusinessStoreQuery(profile?.data?._id,
    { skip: !profile?.data?._id });
  const [updateBusinessStore] = useUpdateBusinessStoreMutation();
  // console.log(Country.getAllCountries());
  // console.log(City.getAllCities());
  // console.log(State.getAllStates());
  const businessStoreData = businessStore?.data?.[0];
  console.log(businessStoreData);
  // console.log(selectedCountry);

  useEffect(() => {
    if (businessStoreData) {
      form1.setFieldsValue(businessStoreData);
    }
  }, [businessStoreData]);

  const onFinishForm1 = async () => {
    try {
      if (!profile?.data?._id) {
        throw new Error("Business not found!")
      }
      await updateBusinessStore({
        id: profile?.data?._id,
        data: form1.getFieldsValue(),
      }).unwrap().then((res) => {
        if (res?.success) {
          toast.dismiss()
          toast.success(res?.message || "Business updated successfully!")
          form1.resetFields();
        }
      })
    } catch (error) {
      toast.dismiss()
      toast.error(error?.data?.message || error?.message || "Something went wrong!")
    }
  };

  const onFinishForm2 = () => {
    console.log(form2.getFieldsValue());

    toast.success('Second form submitted successfully!');
    form2.resetFields();
  };

  return (
    <>
      <div className="max-w-screen-lg  flex flex-col gap-4">
        <div className=" w-full">
          <Title level={3}>General</Title>
          <Card loading={isBusinessStoreLoading || isBusinessLoading} className="w-full ">
            {businessStore?.data?.length > 0 ? <FormWrapper
              form={form1}
              onFinish={onFinishForm1}
              className="grid grid-cols-2 gap-x-2"
            >
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter your store name!' },
                ]}
                placeholder="Enter your store name"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Phone"
                name="phone"
                rules={[
                  { required: true, message: 'Please enter your store phone!' },
                ]}
                placeholder="Enter your store phone"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your store email!' },
                ]}
                placeholder="Enter your store email"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Tagline"
                name="tagline"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your store tagline!',
                  },
                ]}
                placeholder="Enter your store tagline"
              />
              <Form.Item
                label="Store Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter store description!',
                  },
                ]}
                className="col-span-2"
              >
                <TextArea rows={6} placeholder="Enter store description" />
              </Form.Item>
              <Form.Item className="col-span-2">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </FormWrapper> :
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-center text-gray-500 text-2xl'>Store Information is not provided</h1>
                <p className='text-center text-gray-500 text-sm'>Please provide store information first</p>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                  setShowStoreForm(true)
                }}>Provide Store Information</Button>
              </div>}
          </Card>
        </div>

        <div className="w-full flex-1">
          <Card loading={isBusinessStoreLoading || isBusinessLoading}>
            <h1>Store Information</h1>
            <FormWrapper
              form={form2}
              onFinish={onFinishForm2}
              className="grid grid-cols-2 gap-x-2"
            >
              <InputField
                className="col-span-2 md:col-span-1"
                label="Legal Business Name"
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your legal business name!',
                  },
                ]}
                placeholder="Enter your legal business name"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Address"
                name="address"
                rules={[
                  { required: true, message: 'Please enter your address!' },
                ]}
                placeholder="Enter your address"
              />
              <SelectField
                label="Country"
                name="country"
                placeholder="Select your country"
                rules={[
                  { required: true, message: 'Please select your country!' },
                ]}
                options={Country.getAllCountries().map((c) => ({
                  value: c.isoCode,
                  label: c.name,
                }))}
                onChange={(val) => {
                  setSelectedCountry(val);
                  setSelectedState(null);
                  form2.setFieldsValue({ state: undefined, city: undefined });
                }}
                className="w-full col-span-2 md:col-span-1"
              />
              <SelectField
                label="State"
                name="state"
                placeholder="Select your state"
                options={
                  selectedCountry
                    ? State.getStatesOfCountry(selectedCountry).map((s) => ({
                      value: s.isoCode,
                      label: s.name,
                    }))
                    : []
                }
                disabled={!selectedCountry}
                onChange={(val) => {
                  setSelectedState(val);
                  form2.setFieldsValue({ city: undefined });
                }}
                className="w-full col-span-2 md:col-span-1"
              />
              <SelectField
                label="City"
                name="city"
                placeholder="Select your city"
                options={
                  selectedState
                    ? City.getCitiesOfState(selectedCountry, selectedState).map(
                      (c) => ({ value: c.name, label: c.name })
                    )
                    : []
                }
                disabled={!selectedState}
                className="w-full col-span-2 md:col-span-1"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="ZIP/Postal Code"
                name="postalCode"
                placeholder="Enter your ZIP/Postal Codes"
              />
              <Form.Item className="col-span-2">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </FormWrapper>
          </Card>
        </div>
        <Modal
          open={showStoreForm && businessStore?.data?.length === 0}
          onCancel={() => setShowStoreForm(false)}
          footer={null}
          width={800}
          destroyOnClose
        >
          <CompanyInfoForm />
        </Modal>
      </div>
    </>
  );
}

export default General;
