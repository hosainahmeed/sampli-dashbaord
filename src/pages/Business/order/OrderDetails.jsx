import { Button, Card, Typography, Timeline, Tag } from "antd";
import React from "react";
import { FaAngleLeft, FaDownload } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { GoLinkExternal } from "react-icons/go";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import ContactInformationCustomer from "../../../components/business-product-details/ContactInformationCustomer";
import ShippingAddressCustomer from "../../../components/business-product-details/ShippingAddressCustomer";
import { useGetOrderDetailsByIdQuery, useTrackOrderQuery } from "../../../Redux/sampler/orderApis";

const { Text, Title } = Typography;

function OrderDetails() {
  const location = useLocation();
  const { orderId } = location.state;
  const { data: orderDetails, isLoading: orderLoading } = useGetOrderDetailsByIdQuery(orderId, { skip: !orderId });
  const { data: trackOrder } = useTrackOrderQuery(orderId, { skip: !orderId });

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'green';
      case 'transit':
        return 'blue';
      case 'processing':
        return 'orange';
      case 'waiting to be shipped':
        return 'purple';
      default:
        return 'default';
    }
  };

  const getTimelineItems = () => {
    const trackingHistory = trackOrder?.data?.trackingData?.tracking_history || [];
    const currentStatus = trackOrder?.data?.trackingData?.tracking_status;

    // Create timeline items from tracking history
    const items = trackingHistory.map((item, index) => ({
      dot: item.status === 'DELIVERED' ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
        item.status === 'TRANSIT' ? <ClockCircleOutlined style={{ color: '#1890ff' }} /> :
          <ClockCircleOutlined style={{ color: '#faad14' }} />,
      children: (
        <div>
          <div className="font-medium">
            {item.status === 'UNKNOWN' ? 'Order processed' :
              item.status === 'TRANSIT' ? 'Item shipped' :
                item.status === 'DELIVERED' ? 'Delivered' : item.status}
          </div>
          <div className="text-gray-500 text-sm">
            {formatDate(item.status_date)}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            {item.status_details}
          </div>
          {item.location && (
            <div className="text-gray-500 text-xs">
              {item.location.city}, {item.location.state} {item.location.zip}
            </div>
          )}
        </div>
      )
    }));

    return items.reverse(); // Show latest first
  };

  return (
    <div className="p-6">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-black transition-all mb-4"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <Text className="text-lg">Back</Text>
      </div>

      <div className="flex justify-between items-start border-b pb-4 border-gray-200">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Title level={3} className="m-0">
              Order ID: #{orderDetails?.data?._id}
            </Title>
            <Tag color={getStatusColor(orderDetails?.data?.deliveryStatus)}>
              {orderDetails?.data?.deliveryStatus || 'Processing'}
            </Tag>
          </div>
          <p className="text-gray-500">
            {formatDate(orderDetails?.data?.createdAt)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="default" onClick={() => {
            if (orderDetails?.data?.shipping?.labelUrl) {
              const a = document.createElement('a');
              a.href = orderDetails?.data?.shipping?.labelUrl;
              a.download = orderDetails?.data?.shipping?.labelUrl.split('/').pop();
              a.click();
            }
          }}
            className="flex items-center">
            Download shipping label
            <FaDownload className="text-blue-700" />
          </Button>
          <Button onClick={() => {
            if (orderDetails?.data?.shipping?.trackingUrl) {
              window.open(orderDetails?.data?.shipping?.trackingUrl, '_blank');
            }
          }} type="primary" className="flex items-center">
            Track Item
            <GoLinkExternal className="text-blue-700" />
          </Button>
        </div>
      </div>

      <Title className="mt-6 mb-4" level={4}>
        Order Item
      </Title>

      <div className="mb-8">
        {orderLoading ? (
          <Card
            loading
            title="Order Item"
            className="mb-8"
          />
        ) : orderDetails?.data?.items?.map((item) => (
          <OrderItem key={item._id} item={item} orderDetails={orderDetails?.data} />
        ))}
      </div>


      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">
       <div>
          <Title level={4} className="mb-4">
            Timeline
          </Title>
          <Card className="p-4">
            {trackOrder?.data?.trackingData ? (
              <Timeline items={getTimelineItems()} />
            ) : (
              <div className="text-gray-500">
                <Timeline
                  items={[
                    {
                      dot: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                      children: (
                        <div>
                          <div className="font-medium">Order processed</div>
                          <div className="text-gray-500 text-sm">
                            {formatDate(orderDetails?.data?.createdAt)}
                          </div>
                        </div>
                      )
                    },
                    {
                      dot: <ClockCircleOutlined style={{ color: '#faad14' }} />,
                      children: (
                        <div>
                          <div className="font-medium">Payment Confirmed</div>
                          <div className="text-gray-500 text-sm">
                            {formatDate(orderDetails?.data?.createdAt)}
                          </div>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            )}
          </Card>
        </div>

       <div className="space-y-4">
          <Card className="p-4">
            <Title level={4} className="mb-4">
              Customer
            </Title>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <LuUserRound />
                <span>{orderDetails?.data?.customer || 'Micheal Scott'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FiShoppingBag />
                <span>1 order</span>
              </div>
            </div>
          </Card>

          <ContactInformationCustomer order={orderDetails?.data} />
          <ShippingAddressCustomer order={orderDetails?.data} />
        </div>
      </div> */}
    </div>
  );
}

export default OrderDetails;

const OrderItem = ({ item, orderDetails }) => {
  console.log(orderDetails?.deliveryFee)
  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`;
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
                $ {parseFloat(item?.price).toFixed(2)} x {item?.quantity}
              </div>
              <div className="font-semibold">
                $ {parseFloat(item?.price * item?.quantity).toFixed(2)}
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
            <span>$ {parseFloat(orderDetails?.subTotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>$ {parseFloat(orderDetails?.deliveryFee).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-400">
            <span>Total</span>
            <span></span>
            <span>$ {parseFloat(orderDetails?.totalPrice).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};