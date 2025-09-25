import React, { useEffect, useRef, useState } from "react";
import { Carousel, Typography, Card, Timeline, Tag, Button, Skeleton, Empty } from "antd";
import { FaAngleLeft, FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderDetailsByIdQuery, useGetOrderTrackOrderByIdQuery } from "../../../Redux/sampler/orderApis";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { CheckCircleOutlined } from "@ant-design/icons";
import ContactInformationCustomer from "../../../components/business-product-details/ContactInformationCustomer";
import ShippingAddressCustomer from "../../../components/business-product-details/ShippingAddressCustomer";
import { GoLinkExternal } from "react-icons/go";

const { Title, Text } = Typography;

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Delivered":
//       return "green";
//     case "Waiting to be shipped":
//       return "orange";
//     case "Shipped":
//     case "Shipped":
//       return "blue";
//     default:
//       return "purple";
//   }
// };

const formatDateTime = (iso) => {
  if (!iso) return null;
  try {
    const dt = new Date(iso);
    return dt.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return iso;
  }
};

const SHIPPO_STATUS_MAP = {
  UNKNOWN: "Order processed",
  PRE_TRANSIT: "Order processed",
  TRANSIT: "Item shipped",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  RETURNED: "Returned to sender",
  FAILURE: "Delivery failed",
};

const BASE_TIMELINE = [
  { key: "processed", label: "Order processed" },
  { key: "payment", label: "Payment confirmed" },
  { key: "shipped", label: "Item shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderDetails = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
  const navigate = useNavigate();

  const { data: orderDetails, isLoading: orderLoading } = useGetOrderDetailsByIdQuery({ id: orderId }, { skip: !orderId });
  const { data: trackOrder, isLoading: trackLoading } = useGetOrderTrackOrderByIdQuery({ id: orderId }, { skip: !orderId });

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!orderLoading) {
      setActiveIndex(0);
      carouselRef.current?.goTo?.(0);
    }
  }, [orderLoading, orderDetails?.data?.items?.length]);

  const buildTimelineItems = () => {
    const trackingHistory = trackOrder?.data?.trackingData?.tracking_history || [];
    const latestTrack = trackOrder?.data?.trackingData?.tracking_status;

    const trackingEvents = trackingHistory.map((t) => {
      const mappedLabel = SHIPPO_STATUS_MAP[t.status] || t.status || null;
      return {
        rawStatus: t.status,
        label: mappedLabel,
        date: t.status_date,
        // details: t.status_details,
        location: t.location,
      };
    });

    if (latestTrack && !trackingEvents.some((e) => e.date === latestTrack.status_date)) {
      trackingEvents.push({
        rawStatus: latestTrack.status,
        label: SHIPPO_STATUS_MAP[latestTrack.status] || latestTrack.status,
        date: latestTrack.status_date,
        // details: latestTrack.status_details,
        location: latestTrack.location,
      });
    }

    let completedIndex = -1;

    if (orderDetails?.data?.createdAt) completedIndex = Math.max(completedIndex, 0);
    if ((orderDetails?.data?.paymentStatus || "").toLowerCase() === "success") completedIndex = Math.max(completedIndex, 1);

    const shippoStatus = latestTrack?.status;
    const shippingInfo = orderDetails?.data?.shipping || {};

    const shippedEvidence = (
      shippoStatus === "TRANSIT" ||
      shippoStatus === "OUT_FOR_DELIVERY" ||
      shippoStatus === "PRE_TRANSIT" ||
      !!shippingInfo?.trackingNumber ||
      (shippingInfo?.status && shippingInfo.status !== "QUEUED")
    );
    if (shippedEvidence) completedIndex = Math.max(completedIndex, 2);

    const deliveredEvidence = (shippoStatus === "DELIVERED") || (orderDetails?.data?.deliveryStatus === "Delivered");
    if (deliveredEvidence) completedIndex = Math.max(completedIndex, 3);

    const items = BASE_TIMELINE.map((step, idx) => {
      let event = null;
      if (step.key === "payment") {
        if ((orderDetails?.data?.paymentStatus || "").toLowerCase() === "success") {
          event = {
            date: orderDetails?.data?.updatedAt || orderDetails?.data?.createdAt,
            details: "Payment succeeded",
            location: null,
          };
        }
      } else {
        event = trackingEvents.find((ev) => {
          if (!ev.label) return false;
          return ev.label.toLowerCase().includes(step.label.toLowerCase().split(" ")[0]);
        }) || null;
      }

      const isCompleted = idx <= completedIndex;
      const isActive = idx === (completedIndex + 1) && !isCompleted;

      const dot = isCompleted ? (
        <CheckCircleOutlined style={{ color: "#16a34a", fontSize: 18 }} />
      ) : isActive ? (
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#f59e0b" }} />
      ) : (
        <div style={{ width: 12, height: 12, borderRadius: 999, border: "2px solid #e5e7eb", background: "white" }} />
      );

      const labelTagStyle = {
        background: isCompleted ? "#ecfdf5" : "#f3f4f6",
        color: isCompleted ? "#065f46" : "#6b7280",
        borderRadius: 999,
        fontWeight: 600,
        padding: "4px 10px",
        display: "inline-block",
        marginBottom: 6,
      };

      return {
        key: step.key,
        dot,
        children: (
          <div>
            <div style={labelTagStyle}>{step.label}</div>
            <div className="text-gray-500 text-sm">
              {event?.date ? formatDateTime(event.date) : (idx === 0 ? formatDateTime(orderDetails?.data?.createdAt) : "Pending")}
            </div>
            {event?.details && <div className="text-gray-600 text-sm mt-1">{event.details}</div>}
            {event?.location && (
              <div className="text-gray-500 text-xs mt-1">
                {event.location.city}, {event.location.state} {event.location.zip}
              </div>
            )}
          </div>
        ),
      };
    });

    return items;
  };

  const timelineItems = buildTimelineItems();

  if (orderLoading) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  const items = orderDetails?.data?.items || [];
  const selectedItem = items[activeIndex] || items[0] || null;

  return (
    <div className="p-6">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black transition-all mb-4 w-fit"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <Text className="text-lg">Back</Text>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <Title level={3} className="m-0">
            Order ID: #{orderDetails?.data?._id}
          </Title>
          {/* <Tag color={getStatusColor(orderDetails?.data?.deliveryStatus)}>
            {orderDetails?.data?.deliveryStatus || "Processing"}
          </Tag> */}
        </div>
        <p className="text-gray-500">
          {formatDateTime(orderDetails?.data?.createdAt)}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        {orderDetails?.data?.shipping?.labelUrl && <a href={orderDetails?.data?.shipping?.labelUrl} download target="_blank">
          <Button type="default"
            loading={orderLoading || trackLoading || !orderDetails?.data?.shipping?.labelUrl}
            disabled={!orderDetails?.data?.shipping?.labelUrl || orderLoading || trackLoading}
            className="flex items-center">
            Download shipping label
            <FaDownload className="text-blue-700" />
          </Button>
        </a>}
        {orderDetails?.data?.shipping?.trackingUrl &&
          <Button onClick={() => {
            if (orderDetails?.data?.shipping?.trackingUrl) {
              window.open(orderDetails?.data?.shipping?.trackingUrl, '_blank');
            }
          }}
            type="primary"
            loading={orderLoading || trackLoading || !orderDetails?.data?.shipping?.trackingUrl}
            disabled={!orderDetails?.data?.shipping?.trackingUrl || orderLoading || trackLoading}
            className="flex items-center">
            Track Item
            <GoLinkExternal className="text-blue-700" />
          </Button>}
      </div>

      {/* Product Carousel */}
      <div className="my-6 max-w-[600px]">
        <div className="relative">
          <Carousel
            ref={carouselRef}
            afterChange={(idx) => setActiveIndex(idx)}
            dots={true}
            slidesToShow={1}
            adaptiveHeight
          >
            {items?.length ? items?.map((it, idx) => (
              <div key={it._id || idx} className="p-4">
                <Card bordered className="flex items-center gap-4">
                  <div className="w-28 h-28 bg-white p-2 flex items-center justify-center rounded-md border border-gray-300">
                    {!it?.product?.images?.[0] ? <Skeleton.Image /> : <img
                      src={it?.product?.images?.[0]}
                      alt={it?.product?.name}
                      className="object-contain max-h-full max-w-full"
                    />}
                  </div>

                  {!it?.product?.name ? <Skeleton.Input size="small" /> : <div className="flex-1">
                    <Title level={5} className="m-0">{it?.product?.name}</Title>
                    <Text className="block text-gray-600">Price: ${parseFloat(it?.price).toFixed(2)}</Text>
                    <Text className="block text-gray-600">Quantity: {it?.quantity}</Text>
                    <div className="mt-2">
                      <Text className="text-sm text-gray-500">{it?.product?._id ? `Product ID: ${it?.product?._id}` : null}</Text>
                    </div>
                  </div>}
                </Card>
              </div>
            )) : (
              <div className="p-6">
                <Card>
                  <Empty description="No products found for this order." image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Card>
              </div>
            )}
          </Carousel>

          {/* Prev / Next Buttons */}
          {items.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
              <Button
                shape="circle"
                size="small"
                type="text"
                onClick={() => carouselRef.current?.prev?.()}
                style={{ pointerEvents: "auto", background: "white" }}
              >
                <LeftOutlined />
              </Button>
              <Button
                shape="circle"
                size="small"
                type="text"
                onClick={() => carouselRef.current?.next?.()}
                style={{ pointerEvents: "auto", background: "white" }}
              >
                <RightOutlined />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Timeline + Details */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        <div>
          <Card loading={orderLoading || trackLoading} className="p-4">
            <Title level={4}>Timeline</Title>
            <div className="mt-4">
              <Timeline mode="left">
                {timelineItems.map((t) => (
                  <Timeline.Item key={t.key} dot={t.dot}>
                    {t.children}
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Selected product details */}
          {selectedItem ? (
            <OrderItem item={selectedItem} orderDetails={orderDetails?.data} />
          ) : (
            <Card>
              <div className="text-gray-500">No selected product details.</div>
            </Card>
          )}
          <div className="mt-5">
            <ContactInformationCustomer order={orderDetails?.data} />
          </div>
          <ShippingAddressCustomer order={orderDetails?.data} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

const OrderItem = ({ item, orderDetails }) => {
  const formatPrice = (price) => {
    const p = Number(price ?? 0);
    return `$${p.toFixed(2)}`;
  };

  return (
    <Card className="mb-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg border border-gray-200 p-2 flex-shrink-0">
          <img
            className="w-full h-full object-contain"
            src={item?.product?.images?.[0]}
            alt={item?.product?.name}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {item?.product?.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Medium Black
              </p>
            </div>
            <div className="text-right">
              <div className="font-medium">
                {formatPrice(item?.variant?.price ?? item?.price)} x {item?.quantity}
              </div>
              <div className="font-semibold">
                {formatPrice(item?.price * item?.quantity)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{item?.quantity} items</span>
            <span>{formatPrice(orderDetails?.subTotal ?? 0)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{orderDetails?.deliveryFee ? formatPrice(orderDetails.deliveryFee) : formatPrice(0)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-400">
            <span>Total</span>
            <span></span>
            <span>{formatPrice(orderDetails?.totalPrice ?? 0)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
