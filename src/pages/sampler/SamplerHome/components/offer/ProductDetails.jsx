import React, { useState, useRef } from "react";
import { Modal, Button, Descriptions, Carousel, Form, Input } from "antd";
import toast from "react-hot-toast";
import productImage from "/public/product_image.svg";
import {
  useAcceptCampaignOfferMutation,
  useGetOneCampaignQuery,
} from "../../../../../Redux/sampler/campaignApis";
import { useGetShippingAddressQuery } from "../../../../../Redux/sampler/shippingAddressApis";
import { Link } from "react-router-dom";

const ProductDetails = ({ productId, visible, onCancel }) => {
  const { data: shippingAddresses, isLoading } = useGetShippingAddressQuery();
  const { data: getOneCampaign } = useGetOneCampaignQuery({
    id: productId,
  });

  console.log(getOneCampaign);

  const [postCampaign, { isLoading: campaignLoading }] =
    useAcceptCampaignOfferMutation();
  const [selectAddressId, setSelectedAddressId] = useState("");

  const images = getOneCampaign?.data?.product?.images;

  const [activeIndex, setActiveIndex] = useState(0);
  const mainCarouselRef = useRef(null);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
    setActiveIndex(currentSlide);
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: onChange,
    arrows: true,
  };

  const handleThumbnailClick = (index) => {
    if (mainCarouselRef.current) {
      mainCarouselRef.current.goTo(index);
      setActiveIndex(index);
    }
  };

  const [page, setPage] = useState(1);

  const handleClick = async () => {
    if (page === 2) {
      try {
        const data = {
          campaign: getOneCampaign?.data?._id,
          product: getOneCampaign?.data?.product?._id,
          business: getOneCampaign?.data?.product?.bussiness,
          shippingAddress: selectAddressId,
          amount: getOneCampaign?.data?.product?.price,
        };
        const res = await postCampaign(data);
        console.log(res);
        // toast.success(res?.data?.data?.message);
      } catch (error) {
        console.log(error);
      }
      onCancel();
    } else {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Modal
      title="Offer details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      className="rounded-lg overflow-y-auto !h-screen  "
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        transform: "translateX(0)",
      }}
      centered
    >
      <div>
        {page === 1 && (
          <div className="flex flex-col items-center mt-10">
            <div className="w-full mb-4">
              <Carousel ref={mainCarouselRef} {...carouselSettings}>
                {images?.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-64"
                  >
                    <img
                      src={image}
                      className="max-h-full max-w-full object-contain mx-auto"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="flex justify-center gap-2 mb-6 overflow-x-auto w-full">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-1 rounded transition-all ${
                    activeIndex === index
                      ? "border-2 border-blue-500"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-16 w-16 object-cover"
                  />
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold">
              {getOneCampaign?.data?.product?.name}
            </h2>
            <div
              className="text-sm text-gray-500 mt-2"
              dangerouslySetInnerHTML={{
                __html: getOneCampaign?.data?.product?.shortDescription,
              }}
            />

            <div className="w-full mt-4">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Brand's name">
                  {getOneCampaign?.data?.product?.brand}
                </Descriptions.Item>
                <Descriptions.Item label="Product ID">
                  {getOneCampaign?.data?.product?._id}
                </Descriptions.Item>
                <Descriptions.Item label="END DATE">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date("2025-03-10T00:00:00.000Z"))}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Shipping from">
                  Area 59, Delaware, USA
                </Descriptions.Item> */}
                <Descriptions.Item label="Rewards">
                  $
                  {getOneCampaign?.data?.totalBugget /
                    getOneCampaign?.data?.numberOfReviewers}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  {getOneCampaign?.data?.numberOfReviewers}
                </Descriptions.Item>
              </Descriptions>
            </div>

            <div className="w-full mt-4">
              <h4 className="font-medium text-gray-600 text-xl">
                Description of the products
              </h4>
              <div
                className="overflow-y-auto h-40 scrollbar-none"
                dangerouslySetInnerHTML={{
                  __html: getOneCampaign?.data?.product?.description,
                }}
              />
            </div>
          </div>
        )}

        {/* {
  "campaign": "68c0f5498644386c670bcb18",
  "product": "68bc062288e64974e368c4d6",
  "business": "68bc03ef88e64974e368c4c3",
  "shippingAddress": "68bea496d2be427e9654b773",
  "amount": 4
} */}

        {page === 2 && (
          <div className="flex flex-col mt-10 h-screen w-full text-gray-500">
            <h2 className="text-xl font-semibold text-black">
              Select one of your shipping addresses
            </h2>
            {shippingAddresses?.data && shippingAddresses.data.length > 0 ? (
              <div className="space-y-4">
                {shippingAddresses.data.map((address, index) => (
                  <div
                    key={address._id}
                    className={` rounded-lg p-4 bg-gray-50 cursor-pointer ${
                      selectAddressId === address?._id
                        ? "border border-blue-500"
                        : "border border-gray-300"
                    }`}
                    onClick={() => setSelectedAddressId(address?._id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-800">
                        Address {index + 1}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Street: </span>
                        <span className="text-gray-800">{address.street1}</span>
                      </div>
                      {/* <div>
                        <span className="text-gray-600">Street 2: </span>
                        <span className="text-gray-800">{address.street2}</span>
                      </div> */}
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
              <Link
                to="/sampler/settings/basic-details-settings-sampler"
                className="text-center py-8 text-gray-500"
              >
                <p>No shipping addresses found.</p>
                <Button type="primary" className="mt-3">
                  Add Your First Address
                </Button>
              </Link>
            )}
          </div>
        )}

        <div className="flex justify-between w-full gap-5 mt-6">
          {/* <Button
            type="default"
            onClick={onCancel}
            className="py-2 border-gray-300"
          >
            Reject Offer
          </Button> */}
          <Button
            type="primary"
            className="w-full py-2"
            onClick={handleClick}
            loading={campaignLoading}
            disabled={page === 2 && selectAddressId === ""}
          >
            {page === 1 ? "Next" : "Accept Offer"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails;
