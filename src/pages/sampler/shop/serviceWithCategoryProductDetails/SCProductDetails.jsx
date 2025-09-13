import React, { useState, useEffect } from "react";
import { Button, Rate, Modal, Collapse } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  IdcardOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import AddToCartItem from "./AddToCartItem";
import { useParams } from "react-router-dom";
import {
  useBookmarkUpdateMutation,
  useGetSingleProductApisQuery,
  useGetVariantProductApisQuery,
} from "../../../../Redux/sampler/productApis";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../../../../Redux/sampler/cartApis";

const { Panel } = Collapse;
const SCProductDetails = ({ referral }) => {
  const { id } = useParams();

  const { data: getSingleProduct, refetch } = useGetSingleProductApisQuery({
    id,
  });

  const { data: getVariantProduct } = useGetVariantProductApisQuery({
    id,
  });

  const product = getSingleProduct?.data;
  const variants = getVariantProduct?.data || [];

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [bookmarkUpdate] = useBookmarkUpdateMutation();
  const [addCart, { isLoading }] = useAddToCartMutation();

  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      setSelectedVariant(variants[0]);
    }
  }, [variants, selectedVariant]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  const getCurrentImages = () => {
    if (
      selectedVariant &&
      selectedVariant.images &&
      selectedVariant.images.length > 0
    ) {
      return selectedVariant.images;
    }
    return product?.images || [];
  };

  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return product?.price;
  };

  const getGroupedVariants = () => {
    const grouped = {};
    variants.forEach((variant) => {
      const option = variant.variantOption || "Default";
      if (!grouped[option]) {
        grouped[option] = [];
      }
      grouped[option].push(variant);
    });
    return grouped;
  };

  const currentImages = getCurrentImages();
  const currentPrice = getCurrentPrice();
  const groupedVariants = getGroupedVariants();

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const thumbnailImages = (
    <div className="flex flex-col gap-2">
      {currentImages?.map((image, index) => (
        <div
          key={index}
          className={`w-16 h-16 border rounded cursor-pointer ${
            selectedImageIndex === index ? "border-blue-500" : "border-gray-200"
          }`}
          onClick={() => setSelectedImageIndex(index)}
        >
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickBookmark = async (product) => {
    try {
      const res = await bookmarkUpdate({
        id: product,
      }).unwrap();
      toast.success(res?.message);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAddToCart = async (productId, bussinessId) => {
    try {
      const data = {
        productId,
        bussinessId,
        variantId: selectedVariant?._id || null,
        referral: referral,
      };
      const res = await addCart({
        data,
      }).unwrap();
      toast.success(res?.message);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Image gallery */}
        <div className="md:w-1/2 relative">
          <div className="flex gap-4">
            {thumbnailImages}
            <div className="flex-1 relative">
              <button className="absolute top-4 right-4 z-10">
                {product?.isBookmark ? (
                  <HeartFilled
                    className="text-2xl font-bold !text-red-500 rounded-full p-1 "
                    onClick={() => {
                      handleClickBookmark(product?._id);
                    }}
                  />
                ) : (
                  <HeartOutlined
                    className="text-2xl text-gray-600 font-bold rounded-full p-1"
                    onClick={() => {
                      handleClickBookmark(product?._id);
                    }}
                  />
                )}
              </button>
              <div className="border border-gray-200 rounded-xl">
                <img
                  src={currentImages[selectedImageIndex]}
                  alt={product?.name}
                  className="w-full rounded-lg cursor-pointer object-cover object-center border h-[50vh]"
                  onClick={() => setPreviewVisible(true)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2 ">{product?.name}</h1>
          <p className="text-gray-600 mb-4">{product?.shortDescription}</p>

          <div className="mb-6">
            <span className="text-2xl font-bold">${currentPrice}</span>
            <div className="flex items-center gap-2 mt-2">
              <Rate disabled defaultValue={product?.avgRating} />
              <span className="text-gray-500">({product?.avgRating})</span>
            </div>
          </div>

          {/* Enhanced Variant Selection */}
          {variants.length > 0 && (
            <div className="mb-6">
              {Object.entries(groupedVariants).map(
                ([optionType, variantList]) => (
                  <div key={optionType} className="mb-4">
                    <h3 className="font-medium mb-3 text-gray-800">
                      Select {optionType}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {variantList.map((variant) => {
                        const isSelected = selectedVariant?._id === variant._id;

                        return (
                          <div
                            key={variant._id}
                            className={`
                            relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md
                            ${
                              isSelected
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }
                          `}
                            onClick={() => handleVariantSelect(variant)}
                          >
                            {/* Selection indicator */}
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}

                            <div className="text-center">
                              <div
                                className={`font-medium text-lg mb-1 ${
                                  isSelected ? "text-blue-700" : "text-gray-800"
                                }`}
                              >
                                {variant.variantValue}
                              </div>
                              {/* <div
                                className={`text-sm font-semibold ${
                                  isSelected ? "text-blue-600" : "text-gray-600"
                                }`}
                              >
                                ${variant.price}
                              </div> */}

                              {/* Show color preview if it's a color variant */}
                              {optionType.toLowerCase() === "color" &&
                                variant.color && (
                                  <div
                                    className="w-8 h-8 rounded-full mx-auto mt-2 border-2 border-gray-200"
                                    style={{
                                      backgroundColor:
                                        variant.color.toLowerCase(),
                                    }}
                                  />
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* Show selected variant info */}
              {selectedVariant && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Selected: {selectedVariant.variantOption}
                      </div>
                      <div className="text-lg font-semibold text-blue-700">
                        {selectedVariant.variantValue} - $
                        {selectedVariant.price}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">Price</div>
                      <div className="text-xl font-bold text-green-600">
                        ${selectedVariant.price}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Show current variant images if different from main product */}
          {currentImages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">
                {selectedVariant &&
                selectedVariant.images &&
                selectedVariant.images.length > 0
                  ? "Variant Images"
                  : "Product Images"}
              </h3>
              <div className="flex gap-2">
                {currentImages?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded cursor-pointer border-2 ${
                      selectedImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Option ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 items-center mb-6">
            <Button
              type="primary"
              size="large"
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              loading={isLoading}
              disabled={variants.length > 0 && !selectedVariant}
              onClick={() =>
                handleClickAddToCart(product?._id, product?.bussiness?._id)
              }
            >
              Add to cart
              {selectedVariant && ` - $${selectedVariant.price}`}
            </Button>
          </div>

          <Collapse
            defaultActiveKey={["1"]}
            className="bg-gray-50 border-0 rounded-lg mt-5"
          >
            <Panel header="About item" key="1" className="border-0 ">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                </div>
              </div>
            </Panel>
          </Collapse>

          <Collapse
            defaultActiveKey={["2"]}
            className="bg-gray-50 border-0 rounded-lg !mt-5"
          >
            <Panel header="About seller" key="1" className="border-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product?.bussiness?.logo}
                    alt={product?.bussiness?.bussinessName}
                    className="w-20 h-20 rounded-full"
                  />
                  <span className="font-medium">
                    {product?.bussiness?.bussinessName}
                  </span>
                </div>
                <Button
                  type="link"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Follow Store
                </Button>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <IdcardOutlined className="text-gray-400" />
                  <span>Business phone number</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  <span>{product?.bussiness?.phoneNumber}</span>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>

      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        className="product-preview-modal"
        centered
      >
        <img
          src={currentImages[selectedImageIndex]}
          alt={product?.name}
          className="w-full h-[500px] object-contain"
        />
        <div className="flex justify-center gap-2 mt-4">
          {currentImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                selectedImageIndex === index ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      </Modal>

      <AddToCartItem visible={isModalOpen} onCancel={handleCancel} />
    </div>
  );
};

export default SCProductDetails;
