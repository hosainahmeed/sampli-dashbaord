import { Form, Input, Select } from 'antd'
import { Country } from 'country-state-city'
import React from 'react'

const ContactAndShippingInformation = ({ prev, next }) => {
  const handleFormSubmit = (values) => {
    console.log('Submitted Values:', values)
    next()
  }

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
        <div className="!flex !flex-col !justify-between h-[425px]">
          <div>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
              className="w-full"
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
            <div className="flex w-full gap-5 items-center justify-between">
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: 'Please select your country' },
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
                    message: 'Please enter your ZIP/Postal code',
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
                rules={[{ required: true, message: 'Please select your city' }]}
                className="w-full"
              >
                <Input placeholder="Enter your city" />
              </Form.Item>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  { required: true, message: 'Please select your state' },
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
                  { required: true, message: 'Please enter your phone number' },
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
              Next
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default ContactAndShippingInformation
