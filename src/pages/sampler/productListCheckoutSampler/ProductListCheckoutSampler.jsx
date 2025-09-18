import React, { useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  Space,
  Empty,
  Typography,
  Divider,
  Modal,
} from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import productImage from "/public/product_image.svg";
import {
  useDecreaseItemMutation,
  useDeleteCartMutation,
  useGetAllCartItemsQuery,
  useIncreaseItemMutation,
  useRemoveCartMutation,
} from "../../../Redux/sampler/cartApis";
import { useGetShippingAddressQuery } from "../../../Redux/sampler/shippingAddressApis";
import {
  useCreateOrderMutation,
  usePostShippingRatesMutation,
} from "../../../Redux/sampler/shippoApis";

const { Title, Text } = Typography;

const SoloStoveCart = () => {
  const { data: shippingAddresses, isLoading: shippingAddressesLoading } =
    useGetShippingAddressQuery();
  const { data: cartItems, isLoading, refetch } = useGetAllCartItemsQuery();
  const [shippingRates, { isLoading: shippingRatesLoading }] =
    usePostShippingRatesMutation();
  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();
  const [increasedQuantity] = useIncreaseItemMutation();
  const [decreasedQuantity] = useDecreaseItemMutation();
  const [deleteQuantity] = useDeleteCartMutation();
  const [removeCartItem] = useRemoveCartMutation();
  const [providerList, setProviderList] = useState([]);
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedRateId, setSelectedRateId] = useState("");
  const [shipmentId, setShipment] = useState("");

  const cart = cartItems?.data;
  const cartData = cartItems?.data?.items;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenProvider, setIsModalOpenProvider] = useState(false);

  const showModalProvider = async () => {
    setIsModalOpenProvider(true);
  };
  const handleOkProvider = async () => {
    try {
      const data = {
        shippingAddress: shippingAddressId,
        paymentMethod: paymentMethod,
        selectedRateId: selectedRateId,
        shipmentId: shipmentId,
      };
      console.log(data);
      const res = await createOrder({ data });
      window.open(res?.data?.data?.url, "_blank");
      setIsModalOpenProvider(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelProvider = () => {
    setIsModalOpenProvider(false);
  };
  const showModal = async () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (!shippingAddressId) return;
    console.log(shippingAddressId);
    try {
      const data = {
        shippingAddressId: shippingAddressId,
      };
      const res = await shippingRates({ data });
      setProviderList(res?.data?.data);
      console.log(res?.data?.data);
      setIsModalOpen(false);
      showModalProvider();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const increaseQuantity = async (itemId, variantId = null) => {
    try {
      const data = {
        productId: itemId,
        variantId,
      };
      const res = await increasedQuantity({
        data,
      });
      if (res?.data?.success) {
        refetch();
        // toast.success("Quantity increased!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to increase quantity");
    }
  };

  const decreaseQuantity = async (itemId, variantId = null) => {
    try {
      const data = {
        productId: itemId,
        variantId,
      };
      const res = await decreasedQuantity({
        data,
      });
      if (res?.data?.success) {
        refetch();
        // toast.success("Quantity decreased!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to decrease quantity");
    }
  };

  const removeItem = async (itemId, variantId = null) => {
    try {
      const data = {
        productId: itemId,
        variantId,
      };
      const res = await removeCartItem({
        data,
      });
      if (res?.data?.success) {
        refetch();
        // toast.success("Item removed from cart!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const columns = [
    {
      title: "Item",
      dataIndex: "product",
      key: "item",
      width: 300,
      render: (product, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={product?.images?.[0] || productImage}
            alt={product?.name || "Product"}
            style={{
              width: 64,
              height: 64,
              marginRight: 16,
              objectFit: "contain",
            }}
          />
          <Text strong>{product?.name || "Unknown Product"}</Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
      render: (price) => `$${price?.toFixed(2) || "0.00"}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      align: "center",
      render: (quantity, record) => (
        <Space>
          <Button
            onClick={() =>
              decreaseQuantity(record.product._id, record?.variant?._id)
            }
            disabled={quantity <= 1}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={quantity}
            style={{ width: 50, textAlign: "center" }}
            readOnly
          />
          <Button
            onClick={() =>
              increaseQuantity(record.product._id, record?.variant?._id)
            }
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Total",
      key: "total",
      width: 120,
      align: "right",
      render: (record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: 8 }}>
            ${((record.price || 0) * (record.quantity || 0)).toFixed(2)}
          </span>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => removeItem(record.product._id, record?.variant?._id)}
            danger
          />
        </div>
      ),
    },
  ];

  const handleSetAddressId = (addressId) => {
    console.log(addressId);
    setShippingAddressId(addressId);
  };

  return (
    <div className="responsive-width">
      <div
        className=" mx-auto "
        style={{ margin: "20px 0 128px", overflow: "auto" }}
      >
        <Title level={2} style={{ marginBottom: 20 }}>
          Cart Items
        </Title>

        {cart?.items?.length > 0 ? (
          <>
            <Table
              columns={columns}
              dataSource={cartData}
              rowKey="_id"
              pagination={false}
              scroll={{ x: 700 }}
              summary={() => (
                <Table.Summary>
                  {/* Row 1 - Subtotal */}
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong style={{ fontSize: 16 }}>
                        Sub Total:
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong style={{ fontSize: 20 }}>
                        ${cart?.subTotal?.toFixed(2) || "0.00"}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  {/* Row 2 - Delivery Fee */}
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong style={{ fontSize: 16 }}>
                        Delivery Fee:
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong style={{ fontSize: 20 }}>
                        ${cart?.deliveryFee?.toFixed(2) || "0.00"}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>

                  {/* Row 3 - Grand Total */}
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong style={{ fontSize: 18 }}>
                        Grand Total:
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong style={{ fontSize: 22, color: "green" }}>
                        ${cart?.totalPrice?.toFixed(2) || "0.00"}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => showModal()}
                style={{ height: 50 }}
              >
                Check out
              </Button>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "400px",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Empty
              image={<ShoppingOutlined style={{ fontSize: 64 }} />}
              description={
                <div style={{ textAlign: "center" }}>
                  <Title level={3}>Your cart is empty</Title>
                  <Divider
                    style={{
                      width: 64,
                      minWidth: 64,
                      backgroundColor: "#f5a623",
                      margin: "16px auto",
                    }}
                  />
                  <Text type="secondary">
                    Looks like you haven&apos;t added any items to your cart
                    yet.
                  </Text>
                </div>
              }
            >
              <Link to="/sampler/shop">
                <Button type="primary" size="large">
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </div>
        )}
      </div>

      <Modal
        title="Which address do you want to use?"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={
          shippingAddresses?.data?.length === 0 ? { disabled: true } : {}
        }
        confirmLoading={shippingRatesLoading}
        onCancel={handleCancel}
        centered
      >
        <div>
          <div>
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
                          onClick={() => setShippingAddressId(address._id)}
                          className="text-blue-600 p-0"
                        >
                          {shippingAddressId === address._id ? (
                            <span className="bg-blue-500 text-white px-2 rounded-md">
                              Selected Address
                            </span>
                          ) : (
                            <Button
                              type="link"
                              onClick={() => handleSetAddressId(address._id)}
                              className="text-blue-600 p-0"
                            >
                              Select this address
                            </Button>
                          )}
                        </Button>
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
              <div className="text-center">
                <Title level={5}>No shipping addresses found.</Title>
                <div className="flex items-center justify-center">
                  <Link
                    to="/sampler/settings/basic-details-settings-sampler"
                    className="text-blue-600 px-10 py-2 border border-gray-200 rounded-3xl mx-auto "
                  >
                    Go to shipping address
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        title="Please select a shipping provider"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenProvider}
        onOk={handleOkProvider}
        confirmLoading={createOrderLoading}
        onCancel={handleCancelProvider}
        centered
      >
        <div>
          <div>
            {providerList?.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Shipping Options:
                </h3>
                <div className="space-y-3">
                  {providerList.map((provider) => (
                    <div
                      key={provider.objectId}
                      className={`flex items-center p-3 cursor-pointer  rounded-md hover:shadow ${
                        selectedRateId === provider?.objectId
                          ? "border-2 border-blue-700 text-black"
                          : "border-2 border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedRateId(provider?.objectId);
                        setShipment(provider?.shipment);
                      }}
                    >
                      <img
                        src={provider.providerImage200}
                        alt={provider.provider}
                        className="w-12 h-12 mr-4 object-cover object-center rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {provider.servicelevel.name}
                        </p>
                        <p className="font-medium text-gray-600">
                          Estimated Delivery: {provider.estimatedDays} days
                        </p>
                        <p className="text-sm text-gray-500">
                          {provider.durationTerms}
                        </p>
                        {provider.attributes.length > 0 && (
                          <p className="text-xs text-blue-600">
                            {provider.attributes.join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="font-semibold">
                        {provider.currency} {provider.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">Provider List:</h3>
                <p className="text-sm text-gray-500">
                  No provider is available for this address. Please check your
                  address.
                </p>
                <div className="flex items-center justify-center">
                  <Link
                    to="/sampler/settings/basic-details-settings-sampler"
                    className="text-blue-600 px-10 py-2 border border-gray-200 rounded-3xl mx-auto "
                  >
                    Go to shipping address
                  </Link>
                </div>
              </div>
            )}

            {providerList?.length > 0 && (
              <div className="flex items-center mt-4 mx-auto gap-5 justify-center">
                <div
                  className={`border border-gray-200 rounded-lg p-4 cursor-pointer ${
                    paymentMethod === "Stripe" ? "!bg-blue-500 !text-white" : ""
                  }`}
                  onClick={() => setPaymentMethod("Stripe")}
                >
                  Stripe
                </div>
                <div
                  className={`border border-gray-200 rounded-lg p-4  cursor-pointer ${
                    paymentMethod === "Paypal" ? "!bg-blue-500 !text-white" : ""
                  }`}
                  onClick={() => setPaymentMethod("Paypal")}
                >
                  Paypal
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SoloStoveCart;
