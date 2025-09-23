import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import { Button } from "antd";

const OfferCardSampler = ({ product, processing }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className=" bg-white  rounded-md shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between">
      {/* Product Image */}
      <div className=" flex justify-center w-full">
        <img
          src={product?.product?.images?.[0]}
          alt={product?.product?.name}
          className="w-full h-full  object-contain object-center"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold truncate">
          {product?.product?.name}
        </h3>
        <div
          className="text-gray-500 text-xs"
          dangerouslySetInnerHTML={{ __html: product?.product?.description }}
        />

        {/* Rewards & Due */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-700">
            <span className="text-gray-500 ">Rewards:</span>{" "}
            <span className="text-black">
              $
              {product?.amountForEachReview
                ? product?.amountForEachReview
                : product?.campaign?.amountForEachReview}
            </span>
          </span>
          <span className="text-gray-700">
            <span className="text-gray-500 ">Due:</span>{" "}
            <span className="text-black">
              {`${Math.ceil(
                Math.abs(
                  new Date(
                    product?.endDate
                      ? product?.endDate
                      : product?.campaign?.endDate
                  ) - new Date()
                ) /
                  1000 /
                  60 /
                  60 /
                  24
              )} days left`}
            </span>
          </span>
        </div>
      </div>

      {/* Offer Status Button */}
      <div className="  p-2 ">
        {product?.userOffer ? (
          <Button
            className={` !w-full  !font-medium !text-sm !py-4 !bg-blue-100 !cursor-not-allowed`}
          >
            {product?.userOffer?.status}
          </Button>
        ) : (
          <div>
            {!processing && (
              <Button
                onClick={showModal}
                className={` !w-full  !font-medium !text-sm !py-4 ${
                  product?.status === "Active"
                    ? "!text-white !bg-blue-500 !cursor-pointer"
                    : product?.status === "Scheduled"
                    ? "!cursor-not-allowed !text-black !py-6"
                    : "!text-white !bg-blue-500 "
                } ${processing && "!cursor-not-allowed !text-black "}`}
                disabled={product.status === "Scheduled" || processing}
              >
                {product.status === "Active" ? (
                  "Accept Offer"
                ) : product.status === "Scheduled" ? (
                  <div>
                    Campaign starts on{" "}
                    <div className="text-sm text-blue-700">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(product?.startDate))}
                    </div>
                  </div>
                ) : (
                  "Accept Offer"
                )}
              </Button>
            )}
          </div>
        )}
        <ProductDetails
          productId={product?._id}
          visible={isModalVisible}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default OfferCardSampler;
