import React, { useState } from "react";
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
} from "../../../../Redux/sampler/productApis";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../../../../Redux/sampler/cartApis";

const { Panel } = Collapse;
const SCProductDetails = () => {
  const { id } = useParams();

  const { data: getSingleProduct, refetch } = useGetSingleProductApisQuery({
    id,
  });
  const product = getSingleProduct?.data;
  const [selectedSize, setSelectedSize] = useState("8");

  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bookmarkUpdate] = useBookmarkUpdateMutation();

  const [addCart, { isLoading }] = useAddToCartMutation();

  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  const thumbnailImages = (
    <div className="flex flex-col gap-2">
      {product?.images?.map((image, index) => (
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
  const seller = {
    name: "menique",
    registrationNumber: "Business registration number",
    phone: "+123 456 7890",
    avatar: "https://picsum.photos/seed/800/400",
  };
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
        variantId: null,
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
                  src={product?.images[selectedImageIndex]}
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
          <p className="text-gray-600 mb-4">{product?.description}</p>

          <div className="mb-6">
            <span className="text-2xl font-bold">${product?.price}</span>
            <div className="flex items-center gap-2 mt-2">
              <Rate disabled defaultValue={product?.avgRating} />
              <span className="text-gray-500">({product?.avgRating})</span>
            </div>
          </div>

          {/* <div className="mb-6">
            <h3 className="font-medium mb-2">Options</h3>
            <div className="flex gap-2">
              <div className="w-16 h-16 border rounded cursor-pointer">
                <img
                  src={product.images[0]}
                  alt="Option 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div> */}

          {/* <div className="mb-6">
            <h3 className="font-medium mb-2">Select size</h3>
            <div className="flex gap-2">
              {product?.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded border ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div> */}

          <div className="flex gap-4 items-center mb-6">
            <Button
              type="primary"
              size="large"
              className="flex-1 bg-blue-500"
              // onClick={showModal}
              onClick={() =>
                handleClickAddToCart(product?._id, product?.bussiness?._id)
              }
            >
              Add to cart
            </Button>
          </div>

          <Collapse
            defaultActiveKey={["1"]}
            className="bg-gray-50 border-0 rounded-lg mt-5"
          >
            <Panel header="About item" key="1" className="border-0 ">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2 text-sm text-gray-600">
                  {/* <div className="flex items-center gap-2">
                    <span>Made by</span>
                    <a href="#" className="text-blue-500">
                      {product?.seller?.name}
                    </a>
                  </div>
                  <div>Free Worldwide Shipping</div>
                  <div>Ships from: {product?.seller?.location}</div>
                  <div>Order today to get by Nov 5-20</div>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Itaque dolorum at dolore nostrum, pariatur odio ipsum quidem
                    fuga eum cum! Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Sunt repellendus temporibus suscipit
                    asperiores cumque magnam itaque sequi et dolor
                    exercitationem sit, fugiat quia ut accusamus quam amet
                    tenetur tempora ab!
                  </div>*/}
                  {product?.description}
                </div>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <IdcardOutlined className="text-gray-400" />
                  <span>{seller?.registrationNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  <span>{seller?.phone}</span>
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
                    src={seller?.avatar}
                    alt={seller?.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <span className="font-medium">{seller?.name}</span>
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
                  <span>{seller?.registrationNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-gray-400" />
                  <span>{seller?.phone}</span>
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
          src={product?.images[selectedImageIndex]}
          alt={product?.name}
          className="w-full h-[500px] object-contain"
        />
        <div className="flex justify-center gap-2 mt-4">
          {product?.images.map((_, index) => (
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
