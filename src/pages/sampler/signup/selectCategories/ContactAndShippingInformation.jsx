import { Form, Input, Select } from "antd";
import { Country } from "country-state-city";
import React from "react";
import { useAddShippingAddressReviewerMutation } from "../../../../Redux/sampler/authSectionApis";
import toast from "react-hot-toast";

const ContactAndShippingInformation = ({ prev, next }) => {
  const [addShipping, { isLoading }] = useAddShippingAddressReviewerMutation();
  const handleFormSubmit = async (values) => {
    try {
      const res = await addShipping({
        company: values.company,
        name: values.name,
        street1: values.street1,
        street2: values.street2,
        country: values.country,
        zip: values.postalCode,
        city: values.city,
        phone: values.phone,
        state: values.state,
        email: values.email,
        alternativePhoneNumber: values.altPhone,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        next();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <p className="pb-5 text-2xl text-center font-semibold">
        Contact & Shipping Information
      </p>

      <Form
        layout="vertical"
        className="p-6"
        onFinish={handleFormSubmit}
        requiredMark={false}
      >
        <div className="!flex !flex-col !justify-between h-auto">
          <div>
            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="w-full"
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              {/* <Form.Item
                label="Company name"
                name="company"
                rules={[
                  {
                    required: false,
                    message: "Please enter your company name",
                  },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your company name" />
              </Form.Item> */}
            </div>
            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
                className="w-full"
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Street 1"
                name="street1"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your address" />
              </Form.Item>
              <Form.Item
                label="Street 2"
                name="street2"
                rules={[
                  { required: false, message: "Please enter your address" },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your address" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
                className="w-full"
              >
                <Select
                  showSearch
                  placeholder="Select your country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().includes(input.toLowerCase())
                  }
                  options={Country.getAllCountries().map((c) => ({
                    value: c.isoCode,
                    label: c.name,
                  }))}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label="Postal Code"
                name="postalCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your ZIP/Postal code",
                  },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your ZIP/Postal code" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please select your city" }]}
                className="w-full"
              >
                <Input placeholder="Enter your city" />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  { required: true, message: "Please select your state" },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your state" />
              </Form.Item>
            </div>

            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Phone number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
                className="w-full"
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
              <Form.Item
                label="Alternate Phone number"
                name="altPhone"
                className="w-full"
              >
                <Input placeholder="Enter your alternate phone number" />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-between text-[16px]">
            <button
              onClick={prev}
              className="cursor-pointer hover:!text-blue-500"
            >
              Back
            </button>
            <button
              type="submit"
              className="cursor-pointer hover:!text-blue-500"
            >
              {isLoading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContactAndShippingInformation;
