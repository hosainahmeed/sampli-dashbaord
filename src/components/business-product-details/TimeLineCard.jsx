import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Image,
} from "antd";
import {
  EnvironmentOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { useGetShippingRatesForOfferShipmentMutation } from "../../Redux/businessApis/shipo_business_apis/shippoOfferShipmentApis";
import ShippingProviderModal from "./ShippingProviderModal";
const { Text, Title } = Typography;
function TimeLineCard({ order }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [getShippingRatesForOfferShipment, { isLoading: getShippingRatesForOfferShipmentLoading }] =
    useGetShippingRatesForOfferShipmentMutation();
  const [providerList, setProviderList] = useState(null);
  const [isModalOpenProvider, setIsModalOpenProvider] = useState(false);
  const subtotal = order?.amount || 0;
  const shipping = 10;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!order?.product?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImgIndex(prevIndex =>
        (prevIndex + 1) % order.product.images.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [order?.product?.images]);

  const handleProceedToShipping = async (shippingAddressId) => {
    try {
      if (!shippingAddressId) {
        throw new Error("Shipping address is required");
      }
      const res = await getShippingRatesForOfferShipment({ id: shippingAddressId }).unwrap();
      if (res?.success) {
        setIsModalOpenProvider(true);
        setProviderList(res?.data);
      } else {
        throw new Error(res?.message || "Failed to fetch shipping rates");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || error || "Failed to proceed to shipping");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpenProvider(false);
  };



  return (
    <Card className="order-timeline-card">
      {/* Order Header */}
      <div className="order-header">
        <Row gutter={16} align="middle">
          <Col flex="none">
            <Image
              width={80}
              height={80}
              src={order?.product?.images?.[currentImgIndex] || ""}
              alt={order?.product?.name}
              preview={false}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>{order?.product?.name}</Title>
            <Text type="secondary">{order?.campaign?.name}</Text>
          </Col>
          <Col flex="none">
            <Title level={4} style={{ margin: 0, color: "#1890ff" }}>${order?.amount}</Title>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Order Summary */}
      <div className="order-summary-section">
        <Title level={5}>Order Summary</Title>
        <Row justify="space-between" style={{ marginTop: 16 }}>
          <Col>
            <Text>Subtotal (1 item)</Text>
          </Col>
          <Col>
            <Text>${subtotal.toFixed(2)}</Text>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginTop: 8 }}>
          <Col>
            <Text>Shipping</Text>
          </Col>
          <Col>
            <Text>${shipping.toFixed(2)}</Text>
          </Col>
        </Row>
        <Divider style={{ margin: "12px 0" }} />
        <Row justify="space-between">
          <Col>
            <Text strong>Total</Text>
          </Col>
          <Col>
            <Title level={4} style={{ margin: 0 }}>${total.toFixed(2)}</Title>
          </Col>
        </Row>
      </div>

      {/* Action Button */}
      {order?.status === 'Accepted' && (
        <div className="order-action-section" style={{ marginTop: 24 }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Text>Current Status:</Text>
                <Tag color="blue" style={{ fontSize: 14, padding: "4px 8px" }}>
                  {order?.status}
                </Tag>
              </Space>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                loading={getShippingRatesForOfferShipmentLoading}
                onClick={() => handleProceedToShipping(order?._id)}
                icon={<EnvironmentOutlined />}
              >
                Proceed to Shipping
              </Button>
            </Col>
          </Row>
        </div>
      )}

      <ShippingProviderModal
        isModalOpenProvider={isModalOpenProvider}
        handleModalCancel={handleModalCancel}
        providerList={providerList}
        getShippingRatesForOfferShipmentLoading={getShippingRatesForOfferShipmentLoading}
      />

    </Card>
  );
}

export default TimeLineCard;