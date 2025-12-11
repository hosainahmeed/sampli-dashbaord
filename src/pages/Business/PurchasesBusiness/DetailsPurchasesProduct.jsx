import { Button, Card, Typography } from "antd";
import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { GoLinkExternal } from "react-icons/go";
import TimeLineCard from "../../../components/business-product-details/TimeLineCard";
import ContactInformationCustomer from "../../../components/business-product-details/ContactInformationCustomer";
import ShippingAddressCustomer from "../../../components/business-product-details/ShippingAddressCustomer";
// import BillingAddressCustomer from "../../../components/business-product-details/BillingAddressCustomer";
import { useGetCampaignPurchaseByIdQuery } from "../../../Redux/businessApis/campaign/campaignPurchaseApis";
import toast from "react-hot-toast";

const { Text, Title } = Typography;

function DetailsPurchasesProduct() {
  const { id } = useParams();
  const { data, isLoading } = useGetCampaignPurchaseByIdQuery(id, { skip: !id });
  const order = data?.data;
  const navigate = useNavigate();

  const handleTrackItem = (url) => {
    try {
      if (!id) {
        throw new Error('Product not found!')
      }
      window.location.href = url
    } catch (error) {
      toast.error(error?.data?.message || error?.message || 'Something went wrong!')
    }
  }

  return (
    <div className="p-6">

      <div
        className="flex items-center w-fit gap-2 text-gray-500 cursor-pointer hover:text-black transition-all"
        onClick={() => navigate(-1)}
      >
        <FaAngleLeft />
        <Text className="text-lg">Back</Text>
      </div>

      <div className="flex justify-between border-b pb-4 border-gray-200 mt-4">
        <div>
          <div className="flex items-center gap-2">
            <Title level={3} className="m-0">
              Campaign ID: #{order?._id?.slice(0, 8)}
            </Title>
          </div>
          <p className="text-gray-500 mt-2">
            {new Date(order?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            disabled={isLoading || !order?.product?._id}
            onClick={() => navigate(`/product/${order?.product?._id}`, { state: { productId: order?.product?._id } })}
          >Go to item</Button>
          <Button
            disabled={!order?.shipping?.trackingUrl}
            onClick={() => handleTrackItem(order?.shipping?.trackingUrl)}
            type="primary" className="flex items-center">
            Track Item
            <GoLinkExternal className="text-blue-700 ml-1" />
          </Button>
        </div>
      </div>
      <div className="flex !mt-12 justify-between xl:flex-row flex-col items-start gap-4">

        <div className="w-full xl:flex-1">
          <TimeLineCard
            order={order}
          />
        </div>
        <div className="w-full xl:flex-1 flex flex-col gap-4">
          <Card loading={isLoading} className="shadow p-4">
            <Title level={3} className="mt-6">
              Customer
            </Title>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <LuUserRound />
              <h1>{order?.shippingAddress?.name}</h1>
            </div>
            <div className="flex items-center text-[var(--body-text-2)] justify-start gap-2">
              <FiMapPin />
              <Text>{order?.shippingAddress?.street1}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state}, {order?.shippingAddress?.zip}, {order?.shippingAddress?.country}</Text>
            </div>

          </Card>

          {order?.shippingAddress && <ContactInformationCustomer isLoading={isLoading} order={order} />}
          {order?.shippingAddress && <ShippingAddressCustomer isLoading={isLoading} order={order} />}
          {/* <BillingAddressCustomer order={order} /> */}
        </div>
      </div>


      {/* <div className="mt-10">
        <Title level={4}>Product Details</Title>
        <div className="flex items-start gap-6 mt-4">
          <img
            src={order?.product?.images?.[0]}
            alt={order?.product?.name}
            className="w-32 h-32 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-semibold">{order?.product?.name}</h2>
            <p className="text-gray-600">Amount: ${order?.amount}</p>
            <p className="text-gray-600">
              Campaign: {order?.campaign?.name} (Reward: $
              {order?.campaign?.amountForEachReview})
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DetailsPurchasesProduct;
