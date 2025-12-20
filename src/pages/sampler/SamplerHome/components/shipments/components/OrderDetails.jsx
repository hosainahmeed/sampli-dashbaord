import React, { useState } from "react";
import { Steps, Button, Divider, Modal } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CarOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";
import { MdArrowBack, MdEmail, MdOutlineMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoLinkExternal } from "react-icons/go";
import productImage from "/public/product_image.svg";
import {
  useGetOrderDetailsByIdQuery,
  useGetOrderTrackOrderByIdQuery,
} from "../../../../../../Redux/sampler/orderApis";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Contact, Contact2Icon } from "lucide-react";

const { Step } = Steps;

const OrderDetails = ({ setIsClicked, id }) => {
  const { data: getOrderDetails } = useGetOrderDetailsByIdQuery({ id });
  const { data: getOrderTrack } = useGetOrderTrackOrderByIdQuery({ id });
  console.log(getOrderTrack);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    Navigate("/sampler/campaign/return-items");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const statusMap = {
    UNKNOWN: { title: "Order reviewing", icon: <ShoppingCartOutlined /> },
    PROCESSED: { title: "Processing order", icon: <CheckCircleOutlined /> },
    TRANSIT: { title: "Item shipped", icon: <CarOutlined /> },
    OUT_FOR_DELIVERY: { title: "Out for delivery", icon: <CarOutlined /> },
    DELIVERED: { title: "Delivered", icon: <DeliveredProcedureOutlined /> },
    RETURNED: {
      title: "Returned to sender",
      icon: <MdOutlineMarkEmailUnread />,
    },
    FAILURE: { title: "Delivery failed", icon: <MdEmail /> },
  };
  return (
    <div className="pb-10">
      <div
        className="text-gray-500 flex gap-1    cursor-pointer mt-1 mb-5 hover:text-gray-600"
        onClick={() => setIsClicked(false)}
      >
        <MdArrowBack />
        Back
      </div>
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <div>
          <div className="flex items-center space-x-4 justify-between gap-3">
            <div className="text-sm text-gray-500">
              <strong className="text-black">Order date:</strong>
              <div className="mt-1">
                {getOrderDetails?.data?.createdAt &&
                  new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(getOrderDetails?.data?.createdAt))}
              </div>
            </div>
            {/* <div className="text-sm text-gray-500">
              <strong className="text-black">Order no:</strong>
              <div className="mt-1">477368782</div>
            </div> */}
            <div>
              <strong className="text-black text-sm">Status:</strong>
              <div className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                {getOrderDetails?.data?.deliveryStatus}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-start justify-between">
          <div className="flex flex-col gap-4">
            {getOrderDetails?.data?.items?.map((item, index) => (
              <div key={index}>
                <div className="flex gap-2 border border-gray-200 rounded-lg p-2 shadow-sm">
                  <img
                    src={item.product?.images?.[0]}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-md font-semibold mb-2">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty:{" "}
                      <strong className="text-black">{item.quantity}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      Total:{" "}
                      <strong className="text-black">${item.price}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex gap-2">
              {/* <Button onClick={showModal}>Cancel Order</Button> */}
              {getOrderDetails?.data?.shipping?.labelUrl && (
                <Button
                  onClick={() => {
                    const url = getOrderDetails?.data?.shipping?.labelUrl;
                    if (!url) return;
                    window.open(url, "_blank");
                  }}
                >
                  Download Label
                </Button>
              )}
              {getOrderTrack === undefined ? (
                <button
                  onClick={() => toast.error("Order is not shipped yet")}
                  className="border flex items-center gap-2 text-nowrap !text-[14px] hover:bg-gray-100 cursor-pointer border-blue-500 px-3 py-1 !text-blue-500 rounded-md"
                >
                  Track Item
                  <GoLinkExternal className="text-blue-700" />
                </button>
              ) : (
                <button
                  onClick={() =>
                    window.open(
                      getOrderDetails?.data?.shipping?.trackingUrl,
                      "_blank"
                    )
                  }
                  className="border flex items-center gap-2 text-nowrap !text-[14px] hover:bg-gray-100 cursor-pointer border-blue-500 px-3 py-1 !text-blue-500 rounded-md"
                >
                  Track Item
                  <GoLinkExternal className="text-blue-700" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold">Order History</h4>
          {getOrderTrack === undefined ? (
            <div>Product is not shipped yet</div>
          ) : (
            getOrderTrack?.data?.trackingData?.tracking_history && (
              <Steps
                current={
                  getOrderTrack?.data?.trackingData?.tracking_history?.length -
                  1
                }
                direction="vertical"
                className="mt-4"
              >
                {getOrderTrack?.data?.trackingData?.tracking_history?.map(
                  (item) => {
                    const statusInfo = statusMap[item.status] || {
                      title: item.status,
                      icon: <CheckCircleOutlined />,
                    };

                    return (
                      <Step
                        key={item.object_id}
                        title={statusInfo.title}
                        description={new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(new Date(item.status_date))}
                        icon={statusInfo.icon}
                      />
                    );
                  }
                )}
              </Steps>
            )
          )}
        </div>
        {/* 
        <div className="flex justify-between bg-gray-100 py-5 px-1 border-y border-gray-400 my-5">
          <div>
            Return period:{" "}
            <span className="text-gray-500">Mar 23 - Mar 30 2024</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-gray-500">Return Policy</div>
            <Link
              to={"/sampler/campaign/return-items"}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Return item
            </Link>
          </div>
        </div> */}

        <h4 className="font-semibold text-xl !mb-5 !mt-12">
          Shipping Information
        </h4>

        <>
          <div className="">
            {/* Shipping Address */}
            <div className="flex justify-between  w-full">
              <div>
                <h5 className="text-lg font-semibold mb-2">Shipping Address</h5>
                <p className="text-sm text-gray-700 font-medium">
                  Name: {getOrderDetails?.data?.shippingAddress?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {getOrderDetails?.data?.shippingAddress?.street1}
                  {getOrderDetails?.data?.shippingAddress?.street2 &&
                    `, ${getOrderDetails?.data?.shippingAddress?.street2}`}
                </p>
                <p className="text-sm text-gray-500">
                  {getOrderDetails?.data?.shippingAddress?.city},{" "}
                  {getOrderDetails?.data?.shippingAddress?.state}{" "}
                  {getOrderDetails?.data?.shippingAddress?.zip},{" "}
                  {getOrderDetails?.data?.shippingAddress?.country}
                </p>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-2">
                  Contact Information
                </h5>
                <p className="text-sm text-gray-500 mt-2 flex gap-2 items-center">
                  <Contact className="text-[10px]" />{" "}
                  {getOrderDetails?.data?.shippingAddress?.phone}
                </p>
                <p className="text-sm text-gray-500 flex gap-2 items-center">
                  <MdOutlineMarkEmailUnread className="!text-[25px]" />{" "}
                  {getOrderDetails?.data?.shippingAddress?.email}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 gap-8 mt-5">
            <div>
              <h5 className="font-xl">Billing Address</h5>
              <p className="text-sm text-gray-500">
                {getOrderTrack?.data?.trackingData?.address_to?.country}
              </p>
              <p className="text-sm text-gray-500">
                {getOrderTrack?.data?.trackingData?.address_to?.state},{" "}
                {getOrderTrack?.data?.trackingData?.address_to?.city},{" "}
                {getOrderTrack?.data?.trackingData?.address_to?.zip}
              </p>
            </div>
            <div>
            <h5 className="font-medium">Payment Details</h5>

            <h5 className="text-sm">
              <span className=" text-gray-500">Items total:</span>{" "}
              <span>$23.00</span>
            </h5>
            <h5 className="text-sm">
              <span className="text-gray-500">Delivery Fees:</span>{" "}
              <span>$23.00</span>
            </h5>
            <h5 className="text-sm">
              <span>Total: $23.00</span>
            </h5>
          </div>
          </div> */}
        </>
      </div>

      {/* <Modal
        title={<div className="text-center text-xl">Cancel Order</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText="Yes, cancel"
        cancelText="No, don't cancel"
      >
        <p>Reason for cancellation</p>
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="5"
          className="p-5 w-full border outline-none border-gray-200 rounded-3xl"
        ></textarea>
      </Modal> */}
    </div>
  );
};

export default OrderDetails;
