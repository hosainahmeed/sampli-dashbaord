import React, { useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  Space,
  Empty,
  Typography,
  Divider,
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

const { Title, Text } = Typography;

const SoloStoveCart = () => {
  const { data: cartItems, isLoading, refetch } = useGetAllCartItemsQuery();
  const [increasedQuantity] = useIncreaseItemMutation();
  const [decreasedQuantity] = useDecreaseItemMutation();
  const [deleteQuantity] = useDeleteCartMutation();
  const [removeCartItem] = useRemoveCartMutation();

  const cart = cartItems?.data;
  const cartData = cartItems?.data?.items;

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
                onClick={() => toast.success("Checkout Successfully!")}
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
    </div>
  );
};

export default SoloStoveCart;
