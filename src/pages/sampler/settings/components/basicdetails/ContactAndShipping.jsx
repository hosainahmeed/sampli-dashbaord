import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
} from "../../../../../Redux/sampler/shippingAddressApis";
import { City, State } from "country-state-city";

const ContactAndShipping = () => {
  const { data: shippingAddresses, isLoading } = useGetShippingAddressQuery();
  const [updateShipping, { isLoading: isUpdating }] =
    useUpdateShippingAddressMutation();
  const [addShipping, { isLoading: isAdding }] =
    useAddShippingAddressMutation();

  const states = State.getStatesOfCountry("US");

  const [selectedState, setSelectedState] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [formRef] = Form.useForm();

  const handleAddAddress = () => {
    formRef.resetFields();
    setSelectedState(null);
    setFilteredCities([]);
    setEditingAddress(null);
    setIsModalVisible(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setSelectedState(address.state || null);
    const cities = address.state
      ? City.getCitiesOfState("US", address.state)
      : [];
    setFilteredCities(cities);

    formRef.setFieldsValue({
      name: address.name,
      // company: address.company,
      street1: address.street1,
      street2: address.street2,
      country: address.country || "US",
      zip: address.zip,
      state: address.state,
      city: address.city,
      phone: address.phone,
      alternativePhoneNumber: address.alternativePhoneNumber,
      email: address.email,
    });
    setIsModalVisible(true);
  };

  const handleSaveAddress = async (values) => {
    try {
      if (editingAddress) {
        await updateShipping({
          id: editingAddress._id,
          data: values,
        }).unwrap();
        toast.success("Address updated successfully!");
      } else {
        await addShipping({ data: values }).unwrap();
        toast.success("Address added successfully!");
      }
      setIsModalVisible(false);
      formRef.resetFields();
      setSelectedState(null);
      setFilteredCities([]);
    } catch (err) {
      console.log(err)
      toast.error(
        editingAddress ? err?.data?.message :err?.data?.message
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    formRef.resetFields();
    setSelectedState(null);
    setFilteredCities([]);
    setEditingAddress(null);
  };

  if (isLoading) {
    return <p>Loading shipping addresses...</p>;
  }

  return (
    <div className="border border-gray-200 p-5 mt-5">
      <div className="border-b border-gray-200 flex justify-between items-center pb-5">
        <h2 className="text-lg font-medium">Contact & Shipping Information</h2>
        <Button
          type="default"
          onClick={handleAddAddress}
          className="text-sm border rounded-3xl px-5 py-3"
        >
          Add Shipping Address
        </Button>
      </div>

      <div className="mt-5">
        {shippingAddresses?.data?.length > 0 ? (
          <div className="space-y-4">
            {shippingAddresses.data.map((address, index) => (
              <div
                key={address._id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-800">
                    Address {index + 1}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      type="link"
                      onClick={() => handleEditAddress(address)}
                      className="text-blue-600 p-0"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Street : </span>
                    {address.street1}
                  </div>
                  {/* <div>
                    <span className="text-gray-600">Street 2: </span>
                    {address.street2}
                  </div> */}
                  <div>
                    <span className="text-gray-600">City: </span>
                    {address.city}
                  </div>
                  <div>
                    <span className="text-gray-600">State: </span>
                    {address.state}
                  </div>
                  <div>
                    <span className="text-gray-600">Country: </span>
                    {address.country}
                  </div>
                  <div>
                    <span className="text-gray-600">ZIP Code: </span>
                    {address.zip}
                  </div>
                  <div>
                    <span className="text-gray-600">Phone: </span>
                    {address.phone}
                  </div>
                  <div>
                    <span className="text-gray-600">Email: </span>
                    {address.email}
                  </div>
                  {address.alternativePhoneNumber && (
                    <div>
                      <span className="text-gray-600">Alt Phone: </span>
                      <span className="text-gray-800">
                        {address.alternativePhoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No shipping addresses found.</p>
            <Button type="primary" onClick={handleAddAddress} className="mt-3">
              Add Your First Address
            </Button>
          </div>
        )}
      </div>

      <Modal
        title={
          editingAddress ? "Edit Shipping Address" : "Add New Shipping Address"
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          form={formRef}
          onFinish={handleSaveAddress}
          requiredMark={false}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          {/* Company */}
          {/* <Form.Item label="Company" name="company">
            <Input placeholder="Enter your company" />
          </Form.Item> */}

          {/* Street */}
          <Form.Item
            label="Street"
            name="street1"
            rules={[
              { required: true, message: "Please enter your street address" },
            ]}
          >
            <Input placeholder="Enter street address" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Country & State */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Country" name="country" initialValue="US">
              <Select disabled>
                <Select.Option value="US">United States</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please select your state!" }]}
            >
              <Select
                showSearch
                placeholder="Select state"
                onChange={(value) => {
                  setSelectedState(value);
                  const cities = City.getCitiesOfState("US", value);
                  setFilteredCities(cities);
                  formRef.setFieldsValue({ city: undefined }); // reset city
                }}
              >
                {states.map((state) => (
                  <Select.Option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* City & ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please select your city!" }]}
            >
              <Select
                showSearch
                placeholder={
                  selectedState ? "Select city" : "Select state first"
                }
                disabled={!selectedState}
              >
                {filteredCities.map((city) => (
                  <Select.Option key={city.name} value={city.name}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="ZIP Code"
              name="zip"
              rules={[{ required: true, message: "Please enter zip code" }]}
            >
              <Input placeholder="ZIP code" />
            </Form.Item>
          </div>

          {/* Phone numbers */}
          <div className=" gap-4">
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Primary phone" />
            </Form.Item>

            {/* <Form.Item
              label="Alternate Phone number"
              name="alternativePhoneNumber"
            >
              <Input placeholder="Alternative phone (optional)" />sss
            </Form.Item> */}
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
            <Button onClick={handleCancel} disabled={isAdding || isUpdating}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isAdding || isUpdating}
              className="!text-white"
            >
              {editingAddress ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactAndShipping;
