import React, { useState } from "react";
import FormWrapper from "../ui/FormWrapper";
import InputField from "../ui/InputField";
import TextArea from "antd/es/input/TextArea";
import { Button, Card, Form, message } from "antd";
import SelectField from "../page-Component/SelectField";
import { Country, State, City } from "country-state-city";

function General() {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  // console.log(Country.getAllCountries());
  // console.log(City.getAllCities());
  // console.log(State.getAllStates());
  // console.log(selectedCountry);

  const onFinishForm1 = () => {
    message.success("First form submitted successfully!");
    form1.resetFields();
  };

  const onFinishForm2 = () => {
    console.log(form2.getFieldsValue());

    message.success("Second form submitted successfully!");
    form2.resetFields();
  };

  return (
    <>
      <div className="flex items-start xl:flex-row sm:flex-col justify-between gap-4">
        <div className="flex-1 w-full">
          <h1>General</h1>
          <Card className="w-full flex-1">
            <FormWrapper
              form={form1}
              onFinish={onFinishForm1}
              className="grid grid-cols-2 gap-x-2"
            >
              <InputField
                label="Store Name"
                name="storeName"
                rules={[
                  { required: true, message: "Please enter your store name!" },
                ]}
                placeholder="Enter your store name"
              />
              <InputField
                label="Store Phone"
                name="storePhone"
                rules={[
                  { required: true, message: "Please enter your store phone!" },
                ]}
                placeholder="Enter your store phone"
              />
              <InputField
                label="Store Email"
                name="storeEmail"
                rules={[
                  { required: true, message: "Please enter your store email!" },
                ]}
                placeholder="Enter your store email"
              />
              <InputField
                label="Store Tagline"
                name="storeTagline"
                rules={[
                  {
                    required: true,
                    message: "Please enter your store tagline!",
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
                    message: "Please enter store description!",
                  },
                ]}
                className="col-span-2"
              >
                <TextArea rows={6} placeholder="Enter store description" />
              </Form.Item>
              <Form.Item className="col-span-2">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </FormWrapper>
          </Card>
        </div>

        <div className="w-full flex-1">
          <h1>Store Information</h1>
          <Card>
            <FormWrapper
              form={form2}
              onFinish={onFinishForm2}
              className="grid grid-cols-2 gap-x-2"
            >
              <InputField
                label="Legal Business Name"
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your legal business name!",
                  },
                ]}
                placeholder="Enter your legal business name"
              />
              <InputField
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address!" },
                ]}
                placeholder="Enter your address"
              />
              <SelectField
                label="Country"
                name="country"
                placeholder="Select your country"
                rules={[
                  { required: true, message: "Please select your country!" },
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
                className="w-full"
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
                className="w-full"
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
                className="w-full"
              />
              <InputField
                label="ZIP/Postal Code"
                name="postalCode"
                placeholder="Enter your ZIP/Postal Code"
              />
              <Form.Item className="col-span-2">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </FormWrapper>
          </Card>
        </div>
      </div>
    </>
  );
}

export default General;
