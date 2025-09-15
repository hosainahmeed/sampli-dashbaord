import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useAddShippingAddressMutation,
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
  //   useDeleteShippingAddressMutation,
} from "../../../../../Redux/sampler/shippingAddressApis";
import { Country } from "country-state-city";

const ContactAndShipping = () => {
  const { data: shippingAddresses, isLoading } = useGetShippingAddressQuery();
  const [updateShipping, { isLoading: isUpdating }] =
    useUpdateShippingAddressMutation();
  const [addShipping, { isLoading: isAdding }] =
    useAddShippingAddressMutation();
  //   const [deleteShipping, { isLoading: isDeleting }] =
  //     useDeleteShippingAddressMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form, setForm] = useState({
    name: "",
    street1: "",
    street2: "",
    company: "",
    country: "",
    zip: "",
    city: "",
    state: "",
    phone: "",
    alternativePhoneNumber: "",
    email: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      street1: "",
      street2: "",
      company: "",
      country: "",
      zip: "",
      city: "",
      state: "",
      phone: "",
      alternativePhoneNumber: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    resetForm();
    setEditingAddress(null);
    setIsModalVisible(true);
  };

  const handleEditAddress = (address) => {
    setForm(address);
    setEditingAddress(address);
    setIsModalVisible(true);
  };

  const handleSaveAddress = async () => {
    try {
      if (editingAddress) {
        await updateShipping({
          id: editingAddress._id,
          data: form,
        }).unwrap();
        toast.success("Address updated successfully!");
      } else {
        await addShipping({ data: form }).unwrap();
        toast.success("Address added successfully!");
      }
      setIsModalVisible(false);
      resetForm();
    } catch (err) {
      toast.error(
        editingAddress ? "Failed to update address." : "Failed to add address."
      );
    }
  };

  const handleDeleteAddress = async (addressId) => {
    //     if (window.confirm("Are you sure you want to delete this address?")) {
    //       try {
    //         await deleteShipping(addressId).unwrap();
    //         toast.success("Address deleted successfully!");
    //       } catch (err) {
    //         toast.error("Failed to delete address.");
    //       }
    //     }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
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
        {shippingAddresses?.data && shippingAddresses.data.length > 0 ? (
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
                    {/* <Button
                      type="link"
                      onClick={() => handleDeleteAddress(address._id)}
                      loading={isDeleting}
                      className="text-red-600 p-0"
                    >
                      Delete
                    </Button> */}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Street 1: </span>
                    <span className="text-gray-800">{address.street1}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Street 2: </span>
                    <span className="text-gray-800">{address.street2}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">City: </span>
                    <span className="text-gray-800">{address.city}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">State: </span>
                    <span className="text-gray-800">{address.state}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Country: </span>
                    <span className="text-gray-800">{address.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ZIP Code: </span>
                    <span className="text-gray-800">{address.zip}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone: </span>
                    <span className="text-gray-800">{address.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email: </span>
                    <span className="text-gray-800">{address.email}</span>
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

      {/* Add/Edit Address Modal */}
      <Modal
        title={
          editingAddress ? "Edit Shipping Address" : "Add New Shipping Address"
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div className="space-y-4 mt-4">
          {/* Address */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Street1</p>
            <Input
              name="street1"
              value={form?.street1}
              onChange={handleChange}
              type="text"
              className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
              placeholder="Enter full address"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Street2</p>
            <Input
              name="street2"
              value={form?.street2}
              onChange={handleChange}
              type="text"
              className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
              placeholder="Enter full address"
            />
          </div>

          {/* Country & ZIP */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Country</p>

              <Select
                showSearch
                name="country"
                value={form?.country}
                placeholder="Country"
                optionFilterProp="children"
                onChange={(value) =>
                  handleChange({ target: { name: "country", value } })
                }
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase())
                }
                options={Country.getAllCountries().map((c) => ({
                  value: c.isoCode,
                  label: c.name,
                }))}
                className="!w-full custom-select !h-[40px]"
              />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">ZIP/Postal Code</p>
              <Input
                name="zipCode"
                value={form?.zip}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                placeholder="ZIP code"
              />
            </div>
          </div>

          {/* City & State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">City</p>

              <Input
                name="city"
                value={form?.city}
                onChange={handleChange}
                type="tel"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                placeholder="City"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">State</p>

              <Input
                name="state"
                value={form?.state}
                onChange={handleChange}
                type="tel"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                placeholder="State"
              />
            </div>
          </div>

          {/* Phone numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Phone number</p>
              <Input
                name="phoneNumber"
                value={form?.phoneNumber}
                onChange={handleChange}
                type="tel"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                placeholder="Primary phone"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Alternate Phone number
              </p>
              <Input
                name="alternativePhoneNumber"
                value={form?.alternativePhoneNumber}
                onChange={handleChange}
                type="tel"
                className="w-full p-2 border rounded-md border-gray-200 outline-none h-[40px]"
                placeholder="Alternative phone (optional)"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
          <Button onClick={handleCancel} disabled={isAdding || isUpdating}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSaveAddress}
            loading={isAdding || isUpdating}
            className="!text-white"
          >
            {editingAddress ? "Update Address" : "Add Address"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactAndShipping;
