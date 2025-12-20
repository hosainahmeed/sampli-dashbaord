import React, { memo, useState, useMemo, Suspense, lazy } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Skeleton,
} from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { useGetShippingRatesForOfferShipmentMutation } from "../../Redux/businessApis/shipo_business_apis/shippoOfferShipmentApis";
import { useGetSingleOfferCampaignTrackQuery } from "../../Redux/sampler/campaignApis";
import { useLocation, useParams } from "react-router-dom";
import { SHIPPO_STATUS_CONFIG } from "../../constant/shippoRelate";

// Lazy load components
const ShippingProviderModal = lazy(() => import("./ShippingProviderModal"));
const ShippingInformation = lazy(() => import("./timeline-card/ShippingInformation"));
const OrderSummary = lazy(() => import("./timeline-card/OrderSummary"));
const TimelineSection = lazy(() => import("./timeline-card/TimelineSection"));
const OrderHeader = lazy(() => import("./timeline-card/OrderHeader"));

const { Text } = Typography;

const LoadingSkeleton = () => (
  <div style={{ padding: '16px' }}>
    <Skeleton active paragraph={{ rows: 4 }} />
  </div>
);

function TimeLineCard({ order }) {
  const { id } = useParams();
  const [getShippingRatesForOfferShipment, { isLoading: getShippingRatesForOfferShipmentLoading }] =
    useGetShippingRatesForOfferShipmentMutation();
  const [providerList, setProviderList] = useState(null);
  const [isModalOpenProvider, setIsModalOpenProvider] = useState(false);
  const { data: trackData, isLoading } = useGetSingleOfferCampaignTrackQuery(
    { id },
    { skip: !id }
  );

  const subtotal = order?.amount || 0;
  const shipping = 10;

  const shippoTimelineData = useMemo(() => {
    if (!trackData?.data?.trackingData) return null;

    const { tracking_status, tracking_history } = trackData?.data?.trackingData;
    const currentStatus = tracking_status?.status;

    // Create timeline items from tracking history
    const historyItems = tracking_history?.map((item) => {
      const config = SHIPPO_STATUS_CONFIG[item.status] || {
        title: item.status,
        description: item.status_details,
        color: "#8c8c8c",
        icon: <ClockCircleOutlined />,
      };

      return {
        status: item.status,
        title: config.title,
        description: item.status_details || config.description,
        date: new Date(item.status_date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        location: item.location
          ? `${item.location.city}, ${item.location.state} ${item.location.zip}`
          : null,
        color: config.color,
        icon: config.icon,
        isCurrent: item.status === currentStatus,
        order: config.timelineOrder || 0,
      };
    });

    // Sort by date
    return historyItems?.sort(
      (a, b) => new Date(a.status_date || a.date) - new Date(b.status_date || b.date)
    );
  }, [trackData]);

  // Get timeline items based on order status

  const handleProceedToShipping = async (shippingAddressId) => {
    try {
      if (!shippingAddressId) {
        throw new Error("Shipping address is required");
      }
      const res = await getShippingRatesForOfferShipment({
        id: shippingAddressId,
      }).unwrap();
      if (res?.success) {
        setIsModalOpenProvider(true);
        setProviderList(res?.data);
      } else {
        throw new Error(res?.message || "Failed to fetch shipping rates");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
        error?.message ||
        error ||
        "Failed to proceed to shipping"
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalOpenProvider(false);
  };

  // Get current shipping status
  const getCurrentShippingStatus = () => {
    if (shippoTimelineData) {
      const lastItem = shippoTimelineData[shippoTimelineData.length - 1];
      return {
        status: lastItem.title,
        description: lastItem.description,
        color: lastItem.color,
      };
    }
    return null;
  };

  const shippingStatus = getCurrentShippingStatus();

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Card loading={isLoading} className="order-timeline-card">
        {/* Order Header */}
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
          <OrderHeader order={order} shippingStatus={shippingStatus} />
        </Suspense>
        <Divider />
        {/* Order Summary */}
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
          <OrderSummary subtotal={subtotal} shipping={shipping} />
        </Suspense>
        {/* Timeline Section */}
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
          <TimelineSection order={order} shippoTimelineData={shippoTimelineData} trackData={trackData} />
        </Suspense>
        {/* Shipping Information */}
        <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
          <ShippingInformation trackData={trackData} />
        </Suspense>
        {/* Action Button for Accepted orders without shipping */}
        {order?.status === "Accepted" && !shippoTimelineData && (
          <div className="order-action-section" style={{ marginTop: 24 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Space
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Text>Current Campaign Status:</Text>
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
        {/* Shipping Provider Modal */}
        <Suspense fallback={null}>
          <ShippingProviderModal
            isModalOpenProvider={isModalOpenProvider}
            handleModalCancel={handleModalCancel}
            providerList={providerList}
            getShippingRatesForOfferShipmentLoading={
              getShippingRatesForOfferShipmentLoading
            }
          />
        </Suspense>
      </Card>
    </Suspense>
  );
}

export default memo(TimeLineCard);