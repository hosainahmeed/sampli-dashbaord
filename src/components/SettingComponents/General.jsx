import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button, Card, Form, Modal, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";
import SelectField from "../page-Component/SelectField";
import CompanyInfoForm from "./components/CompanyInfoForm";

import { Country, State, City } from "country-state-city";
import { useGetProfileQuery } from "../../Redux/businessApis/business _profile/getprofileApi";
import { useGetBusinessStoreQuery, useUpdateBusinessStoreMutation } from "../../Redux/businessApis/business_store/businessStoreApis";

const { Title } = Typography;

function General() {
  const [form] = Form.useForm();
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedState, setSelectedState] = useState(null);

  const { data: profile, isLoading: isBusinessLoading } = useGetProfileQuery();
  const { data: businessStore, isLoading: isBusinessStoreLoading } = useGetBusinessStoreQuery(profile?.data?._id, {
    skip: !profile?.data?._id,
  });
  const [updateBusinessStore, { isLoading: isUpdateBusinessStoreLoading }] = useUpdateBusinessStoreMutation();

  const businessStoreData = businessStore?.data?.[0];

  useEffect(() => {
    if (!businessStoreData) return;

    form.setFieldsValue({
      name: businessStoreData.name,
      phone: businessStoreData.phone,
      email: businessStoreData.email,
      tagline: businessStoreData.tagline,
      description: businessStoreData.description,
      businessName: businessStoreData.company,
      street1: businessStoreData.street1,
      street2: businessStoreData.street2,
      country: businessStoreData.country,
      state: businessStoreData.state,
      city: businessStoreData.city,
      postalCode: businessStoreData.zip,
    });

    setSelectedCountry(businessStoreData.country);
    setSelectedState(businessStoreData.state);
  }, [businessStoreData, form]);

  const countryOptions = useMemo(
    () => Country.getAllCountries().map(c => ({ value: c?.isoCode, label: c?.name })),
    []
  );

  const stateOptions = useMemo(
    () => selectedCountry ? State.getStatesOfCountry(selectedCountry).map(s => ({ value: s.isoCode, label: `${s.name} (${s.isoCode})` })) : [],
    [selectedCountry]
  );

  const cityOptions = useMemo(
    () => selectedState ? City.getCitiesOfState(selectedCountry, selectedState).map(c => ({ value: c.name, label: c.name })) : [],
    [selectedCountry, selectedState]
  );

  const handleUpdateAllInfo = useCallback(async () => {
    try {
      if (!businessStoreData?._id) throw new Error("Business not found!");

      const values = form.getFieldsValue();
      const payload = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        tagline: values.tagline,
        description: values.description,
        company: values.businessName,
        street1: values.street1,
        street2: values.street2,
        country: values.country,
        state: values.state,
        city: values.city,
        zip: values.postalCode,
      };

      const res = await updateBusinessStore({ id: businessStoreData._id, data: payload }).unwrap();

      if (res?.success) {
        toast.dismiss();
        toast.success(res?.message || "Business information updated successfully!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error?.data?.message || error?.message || "Something went wrong!");
    }
  }, [form, businessStoreData?._id, updateBusinessStore]);

  const isLoading = isBusinessStoreLoading || isBusinessLoading;

  return (
    <div className="max-w-screen-lg flex flex-col gap-4">
      <Card loading={isLoading}>
        {businessStore?.data?.length > 0 ? (
          <>
            <Title level={3}>Business & Store Information</Title>
            <FormWrapper form={form} onFinish={handleUpdateAllInfo} className="grid grid-cols-2 gap-x-2">
              {/* General Info */}
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Name"
                name="name"
                rules={[{ required: true, message: "Please enter your store name!" }]}
                placeholder="Enter your store name"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Phone"
                name="phone"
                rules={[{ required: true, message: "Please enter your store phone!" }]}
                placeholder="Enter your store phone"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Email"
                name="email"
                rules={[{ required: true, message: "Please enter your store email!" }]}
                placeholder="Enter your store email"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Store Tagline"
                name="tagline"
                rules={[{ required: true, message: "Please enter your store tagline!" }]}
                placeholder="Enter your store tagline"
              />
              <Form.Item
                label="Store Description"
                name="description"
                rules={[{ required: true, message: "Please enter store description!" }]}
                className="col-span-2"
              >
                <TextArea rows={6} placeholder="Enter store description" />
              </Form.Item>

              {/* Store Info */}
              <InputField
                className="col-span-2"
                label="Legal Business Name"
                name="businessName"
                rules={[{ required: true, message: "Please enter your legal business name!" }]}
                placeholder="Enter your legal business name"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="Street Address Line"
                name="street1"
                rules={[{ required: true, message: "Please enter your street address!" }]}
                placeholder="Enter your street address"
              />
              <SelectField
                label="Country"
                name="country"
                placeholder="Select your country"
                rules={[{ required: true, message: "Please select your country!" }]}
                options={[{ value: 'US', label: 'United States' }]}
                defaultValue="US"
                className="w-full col-span-2 md:col-span-1"
              />
              <SelectField
                label="State"
                name="state"
                placeholder="Select your state"
                options={stateOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) => 
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                disabled={!selectedCountry}
                onChange={(val) => {
                  setSelectedState(val);
                  form.setFieldsValue({ city: undefined });
                }}
                className="w-full col-span-2 md:col-span-1"
              />
              <SelectField
                label="City"
                name="city"
                placeholder="Select your city"
                options={cityOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) => 
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                disabled={!selectedState}
                className="w-full col-span-2 md:col-span-1"
              />
              <InputField
                className="col-span-2 md:col-span-1"
                label="ZIP/Postal Code"
                name="postalCode"
                placeholder="Enter your ZIP/Postal Code"
              />

              {/* Single Update Button */}
              <Form.Item className="col-span-2">
                <Button
                  loading={isUpdateBusinessStoreLoading}
                  disabled={isUpdateBusinessStoreLoading}
                  type="primary" htmlType="submit">
                  Update Information
                </Button>
              </Form.Item>
            </FormWrapper>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-gray-500 text-2xl">
              Store Information is not provided
            </h1>
            <p className="text-center text-gray-500 text-sm">
              Please provide store information first
            </p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowStoreForm(true)}
            >
              Provide Store Information
            </Button>
          </div>
        )}
      </Card>

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
  );
}

export default General;
